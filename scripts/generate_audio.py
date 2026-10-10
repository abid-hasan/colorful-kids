"""Generate bundled color-name audio locally. Requires ffmpeg and voice-requirements.txt."""
from pathlib import Path
import hashlib
import json
import subprocess
import tempfile

import numpy as np
import torch
from scipy.io.wavfile import write
from transformers import AutoTokenizer, VitsModel, set_seed

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "audio"
COLORS = {
    "red": ("লাল", "Red"), "blue": ("নীল", "Blue"),
    "yellow": ("হলুদ", "Yellow"), "green": ("সবুজ", "Green"),
    "orange": ("কমলা", "Orange"), "purple": ("বেগুনি", "Purple"),
    "pink": ("গোলাপি", "Pink"), "brown": ("বাদামি", "Brown"),
    "black": ("কালো", "Black"), "white": ("সাদা", "White"),
}
REVISIONS = {
    "ben": "0da99de6074c8829121cdabfbdba423af18e8e56",
    "eng": "c71de0fe7204c83f1c10820a7d696d0b450048ba",
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    torch.set_num_threads(4)
    clips, sources, report = {}, {}, {}
    for language_index, lang in enumerate(("ben", "eng")):
        name = f"facebook/mms-tts-{lang}"
        revision = REVISIONS[lang]
        print(f"Loading {name}@{revision}", flush=True)
        tokenizer = AutoTokenizer.from_pretrained(name, revision=revision)
        model = VitsModel.from_pretrained(name, revision=revision, use_safetensors=True).eval()
        model.speaking_rate = 0.90
        sources[lang] = {"model": name, "url": f"https://huggingface.co/{name}",
                         "revision": revision, "model_license": "CC-BY-NC-4.0"}
        for color, names in COLORS.items():
            spoken = names[language_index]
            set_seed(42)
            inputs = tokenizer(spoken, return_tensors="pt")
            if tokenizer.unk_token_id in inputs.input_ids[0].tolist():
                raise RuntimeError(f"Unknown token in {color}/{lang}: {spoken}")
            with torch.inference_mode():
                wave = model(**inputs).waveform.squeeze().cpu().numpy()
            rate = model.config.sampling_rate
            peak = float(np.max(np.abs(wave)))
            if not np.all(np.isfinite(wave)) or peak < 0.001:
                raise RuntimeError(f"Invalid audio: {color}/{lang}")
            wave = wave * (0.78 / peak)
            clips[color, lang] = (wave, rate)
            print(f"Generated {color}/{lang}: {len(wave)/rate:.2f}s", flush=True)
        del model
    with tempfile.TemporaryDirectory(prefix="color-names-") as temp:
        for language_index, (lang, folder) in enumerate((("ben", "bn"), ("eng", "en"))):
            (OUT / folder).mkdir(exist_ok=True)
            for color, names in COLORS.items():
                wave, rate = clips[color, lang]
                padded = np.concatenate((np.zeros(int(rate * .12)), wave,
                                         np.zeros(int(rate * .20))))
                wav = Path(temp) / f"{folder}-{color}.wav"
                mp3 = OUT / folder / f"{color}.mp3"
                write(wav, rate, (padded * 32767).astype(np.int16))
                subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav),
                                "-codec:a", "libmp3lame", "-q:a", "2", str(mp3)], check=True)
                decoded = subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(mp3),
                                          "-f", "f32le", "-acodec", "pcm_f32le", "-"],
                                         check=True, capture_output=True).stdout
                decoded = np.frombuffer(decoded, dtype=np.float32)
                peak = float(np.max(np.abs(decoded)))
                rms = float(np.sqrt(np.mean(decoded ** 2)))
                if not np.all(np.isfinite(decoded)) or peak >= 1 or rms < .001:
                    raise RuntimeError(f"Invalid decoded MP3: {color}/{lang}")
                report[f"{folder}/{color}"] = {
                    "text": names[language_index], "language": folder,
                    "file": str(mp3.relative_to(OUT)),
                    "duration_seconds": round(len(decoded) / rate, 3),
                    "decoded_peak": round(peak, 5), "decoded_rms": round(rms, 5),
                    "sha256": hashlib.sha256(mp3.read_bytes()).hexdigest(),
                }
    (OUT / "provenance.json").write_text(json.dumps({
        "generator": "scripts/generate_audio.py", "sources": sources, "seed": 42,
        "speaking_rate": .90, "sample_rate": rate,
        "processing": "One color name per file; peak normalization to 0.78; 120ms leading and 200ms trailing silence; MP3 encoding",
        "review_status": "Token and decoded-signal checks passed; human pronunciation review remains recommended",
        "assets": report,
    }, ensure_ascii=False, indent=2) + "\n")
    print(f"Generated and verified {len(report)} files in {OUT}", flush=True)


if __name__ == "__main__":
    main()
