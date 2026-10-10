"""Generate local Bengali/English previews with Meta MMS; no API credentials."""
from pathlib import Path
import json
import subprocess

import numpy as np
import torch
from scipy.io.wavfile import write
from transformers import AutoTokenizer, VitsModel, set_seed

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "audio-preview"
OUT.mkdir(exist_ok=True)
SAMPLES = {
    "red": {"ben": "লাল রং খুঁজে বের করো।", "eng": "Find red."},
    "blue": {"ben": "নীল রং খুঁজে বের করো।", "eng": "Find blue."},
}
torch.set_num_threads(4)
clips = {}
sources = {}
for lang in ("ben", "eng"):
    name = f"facebook/mms-tts-{lang}"
    print(f"Loading {name}", flush=True)
    tokenizer = AutoTokenizer.from_pretrained(name)
    model = VitsModel.from_pretrained(name, use_safetensors=True).eval()
    model.speaking_rate = 0.90
    sources[lang] = {
        "model": name,
        "url": f"https://huggingface.co/{name}",
        "revision": getattr(model.config, "_commit_hash", None),
        "model_license": "CC-BY-NC-4.0",
    }
    for color, texts in SAMPLES.items():
        set_seed(42)
        inputs = tokenizer(texts[lang], return_tensors="pt")
        with torch.inference_mode():
            wave = model(**inputs).waveform.squeeze().cpu().numpy()
        rate = model.config.sampling_rate
        peak = float(np.max(np.abs(wave)))
        if not np.all(np.isfinite(wave)) or peak < 0.001:
            raise RuntimeError(f"Invalid audio: {color}/{lang}")
        wave = wave * (0.82 / peak)
        clips[color, lang] = (wave, rate)
        print(f"Generated {color}/{lang}: {len(wave)/rate:.2f}s", flush=True)
    del model

for color in SAMPLES:
    bn, rate = clips[color, "ben"]
    en, en_rate = clips[color, "eng"]
    if rate != en_rate:
        raise RuntimeError("Sample rates must match before concatenating")
    combined = np.concatenate([
        np.zeros(int(rate * 0.15)), bn, np.zeros(int(rate * 0.55)),
        en, np.zeros(int(rate * 0.25)),
    ])
    wav = OUT / f"{color}-bn-en.wav"
    write(wav, rate, (combined * 32767).astype(np.int16))
    subprocess.run([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav),
        "-codec:a", "libmp3lame", "-q:a", "2", str(OUT / f"{color}-bn-en.mp3"),
    ], check=True)

(OUT / "provenance.json").write_text(json.dumps({
    "generator": "scripts/generate_voice_preview.py",
    "sources": sources,
    "seed": 42,
    "speaking_rate": 0.90,
    "processing": "Peak normalization, 550ms language gap, MP3 encoding",
    "texts": SAMPLES,
    "review_status": "Generated preview; pronunciation needs listening review",
}, ensure_ascii=False, indent=2) + "\n")
print(f"Previews saved to {OUT}", flush=True)
