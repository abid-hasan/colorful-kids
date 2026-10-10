# Colorful Kids voice assets

The 26 MP3 files in `audio/bn/` and `audio/en/` were generated in Google AI Studio on 2026-10-10 with `gemini-3.8-flash-tts`, voice **Gero** (Masculine; Clear and friendly; Low pitch), for this color-learning app. Each language has ten color names and three spoken feedback clips.

Original WAV files are retained outside the published site in `audio-source/google-ai-studio/`. `audio/provenance.json` records the text, file hashes, duration, source signal measurements and processing. Audio was converted to mono 24 kHz, 96 kbps MP3 with FFmpeg loudness normalization (I=-18, TP=-2, LRA=7).

These are generated outputs from Google AI Studio, subject to the applicable Google service terms. No Creative Commons license or exclusive ownership is asserted for these outputs. See https://ai.google.dev/gemini-api/terms for the provider terms.

The old Meta MMS recordings and their original attribution were moved to `audio-source/mms-legacy/`; they are not part of the published voice pack. The legacy `scripts/generate_audio.py` produces those older MMS voices and must not be used to recreate this Google voice pack.

The app uses bundled audio files: visitors need no API key, Google account or runtime TTS service.
