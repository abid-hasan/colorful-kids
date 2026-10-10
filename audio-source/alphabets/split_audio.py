"""Split complete Gero alphabet batches at silence; never guess a mismatched count."""
import hashlib
import json
import pathlib
import re
import struct
import subprocess
import wave

ROOT = pathlib.Path(__file__).resolve().parent
manifest_path = ROOT / 'manifest.json'
manifest = json.loads(manifest_path.read_text())
for lang, entries in manifest['languages'].items():
    source = ROOT / 'batches' / f'{lang}.wav'
    if not source.exists():
        continue
    if lang in manifest.get('batches', {}) and all((ROOT / e.get('file', 'missing')).is_file() for e in entries):
        print(f'{lang}: already split; preserving reviewed clips')
        continue
    data = source.read_bytes()
    if data[:4] != b'RIFF' or struct.unpack('<I', data[4:8])[0] + 8 != len(data):
        raise ValueError(f'{source}: incomplete WAV')
    with wave.open(str(source)) as w:
        duration = w.getnframes() / w.getframerate()
        params, frames = w.getparams(), w.readframes(w.getnframes())
    # Preserve the vendor export; normalize its inconsistent byte-rate header for seeking.
    normalized = ROOT / 'working' / f'{lang}.wav'
    normalized.parent.mkdir(exist_ok=True)
    with wave.open(str(normalized), 'wb') as w:
        w.setparams(params)
        w.writeframes(frames)
    result = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(normalized), '-af',
                             'silencedetect=noise=-38dB:d=0.6', '-f', 'null', '-'],
                            capture_output=True, text=True, check=True)
    spans = []
    start = 0.0
    for event, number in re.findall(r'silence_(start|end): ([0-9.]+)', result.stderr):
        value = float(number)
        if event == 'start':
            if value - start > 0.12:
                spans.append([start, value])
        else:
            start = value
    if duration - start > 0.12:
        spans.append([start, duration])
    print(f'{lang}: {duration:.2f}s, {len(spans)} segments, expected {len(entries)}')
    (ROOT / 'batches' / f'{lang}-boundaries.json').write_text(json.dumps(spans, indent=2)+'\n')
    if len(spans) != len(entries):
        print('Count mismatch: no clips written. Inspect boundaries before continuing.')
        continue
    outdir = ROOT / 'clips' / lang
    outdir.mkdir(parents=True, exist_ok=True)
    for entry, (start, end) in zip(entries, spans):
        begin = max(0, start - 0.12)
        finish = min(duration, end + 0.18)
        target = outdir / f"{entry['id']}.mp3"
        subprocess.run(['ffmpeg','-v','error','-y','-ss',str(begin),'-i',str(normalized),
                        '-t',str(finish-begin),'-af','loudnorm=I=-18:TP=-2:LRA=7',
                        '-ar','24000','-ac','1','-b:a','96k',str(target)], check=True)
        entry.update(status='split; pronunciation review pending', file=str(target.relative_to(ROOT)),
                     start=round(begin,4),end=round(finish,4),sha256=hashlib.sha256(target.read_bytes()).hexdigest())
    manifest.setdefault('batches',{})[lang] = {'file':str(source.relative_to(ROOT)),
        'duration':duration,'sha256':hashlib.sha256(data).hexdigest(),'segments':len(spans)}
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
