# ভয়েস নমুনা

এই ফোল্ডারের অডিও স্থানীয়ভাবে Meta MMS-এর বাংলা ও ইংরেজি মডেল দিয়ে তৈরি। কোনো Azure অ্যাকাউন্ট, API key বা পেইড জেনারেশন সেবা লাগে না। মডেল প্রথমবার ডাউনলোড করতে ইন্টারনেট লাগে; তৈরি অডিও চালাতে মডেল লাগে না।

## উৎস

- বাংলা: https://huggingface.co/facebook/mms-tts-ben
- ইংরেজি: https://huggingface.co/facebook/mms-tts-eng
- নির্মাতা: Meta / MMS research authors
- মডেলের লাইসেন্স: CC-BY-NC-4.0 — https://creativecommons.org/licenses/by-nc/4.0/

এই পরীক্ষাটি ব্যক্তিগত, অবাণিজ্যিক শেখার অ্যাপের জন্য। মডেল বা তার লাইসেন্সকে unrestricted commercial license হিসেবে উপস্থাপন করা যাবে না। মূল মডেল অ্যাপের সঙ্গে বিতরণ করার প্রয়োজন নেই।

## নমুনা

- `red-bn-en.mp3`: “লাল রং খুঁজে বের করো।” → “Find red.”
- `blue-bn-en.mp3`: “নীল রং খুঁজে বের করো।” → “Find blue.”

WAV মূল ফাইলও রাখা হয়েছে। শব্দের মাত্রা সমন্বয় ও দুই ভাষার মাঝে ৫৫০ মিলিসেকেন্ড বিরতি যুক্ত করা হয়েছে। সুনির্দিষ্ট মডেল revision এবং ব্যবহৃত লেখাগুলো `provenance.json`-এ থাকবে।

এগুলো প্রাথমিক নমুনা; শিশুর অ্যাপে চূড়ান্ত ব্যবহারের আগে শুনে উচ্চারণ ও গতি যাচাই করতে হবে।

## আবার তৈরি করা

Python virtual environment-এ `scripts/voice-requirements.txt` ইনস্টল করে `python scripts/generate_voice_preview.py` চালান। MP3 তৈরির জন্য `ffmpeg` প্রয়োজন।
