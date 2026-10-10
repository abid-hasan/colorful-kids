# Color-name audio attribution

The twenty MP3 files in `audio/bn/` and `audio/en/` contain individual synthesized Bengali or English color names, generated locally from Meta's Massively Multilingual Speech (MMS) text-to-speech models:

- Bengali: [facebook/mms-tts-ben](https://huggingface.co/facebook/mms-tts-ben), revision `0da99de6074c8829121cdabfbdba423af18e8e56`.
- English: [facebook/mms-tts-eng](https://huggingface.co/facebook/mms-tts-eng), revision `c71de0fe7204c83f1c10820a7d696d0b450048ba`.
- Model creator: Meta / the MMS authors.
- Model license: [Creative Commons Attribution–NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/).

These assets are intended for this personal, noncommercial learning app. Retain this attribution when sharing them. Commercial use requires separate license review and/or replacement audio. No claim of exclusive rights in synthesized output is made.

Processing: synthesize each name at speaking rate 0.90 and seed 42; normalize each waveform to a peak of 0.78; keep each language in a separate file with 120 milliseconds of leading and 200 milliseconds of trailing silence; encode MP3 using FFmpeg. `audio/provenance.json` records the exact input text, model revisions, output hashes, durations, and decoded-signal measurements.

## Recreate the audio

From the project root, with Python and FFmpeg installed:

```sh
python3 -m venv .venv-voice
.venv-voice/bin/python -m pip install -r scripts/voice-requirements.txt
.venv-voice/bin/python scripts/generate_audio.py
```

The first run downloads the pinned public models from Hugging Face. Later runs can use the local cache. No cloud speech account or API key is required. The bundled MP3 files require no Python, model downloads, or speech API at runtime.

Generation checks reject unknown input tokens, nonfinite or silent waveforms, and clipping in decoded MP3 output. They cannot establish pronunciation quality; a Bengali-speaking adult should review pronunciation by ear.
