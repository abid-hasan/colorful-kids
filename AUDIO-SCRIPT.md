# Colorful Kids — নতুন ভয়েসের স্ক্রিপ্ট

মোট **২৬টি ক্লিপ তৈরি ও অ্যাপে বসানো হয়েছে**। Google AI Studio, Gemini 3.8 Flash TTS, Gero ফ্রেন্ডলি পুরুষ কণ্ঠ। মূল WAV: `audio-source/google-ai-studio/`; অ্যাপের MP3: `public/audio/bn/` ও `public/audio/en/`। নিচের তালিকা ভবিষ্যতে পুনরায় তৈরির স্ক্রিপ্ট।

| ফাইলের নাম | বাংলা কণ্ঠে ঠিক এই লেখা | English voice: exact text |
| --- | --- | --- |
| red.mp3 | লাল | Red |
| blue.mp3 | নীল | Blue |
| yellow.mp3 | হলুদ | Yellow |
| green.mp3 | সবুজ | Green |
| orange.mp3 | কমলা | Orange |
| purple.mp3 | বেগুনি | Purple |
| pink.mp3 | গোলাপি | Pink |
| brown.mp3 | বাদামি | Brown |
| black.mp3 | কালো | Black |
| white.mp3 | সাদা | White |
| correct.mp3 | বাহ! একদম ঠিক! | Yay! You found it! |
| wrong.mp3 | আবার চেষ্টা করো | Let’s try again |
| finish.mp3 | দারুণ খেলেছ! | You did wonderfully! |

## কণ্ঠের নির্দেশনা

চার বছরের শিশুর উপযোগী উষ্ণ, পরিষ্কার, স্বাভাবিক কণ্ঠ। একটু ধীরে বলবে; অতিরঞ্জিত অভিনয় নয়। ভুল উত্তরের প্রতিক্রিয়া উৎসাহদায়ক হবে। রঙের নামের আগে বা পরে কোনো বাক্য যোগ করবে না। ব্যাকগ্রাউন্ড মিউজিক বা ইফেক্ট থাকবে না। প্রতিটি ক্লিপ আলাদা MP3; শুরু–শেষে দীর্ঘ নীরবতা নয়। প্রতিটি ক্লিপ ১২ সেকেন্ডের কম রাখুন।

আগে নীল, বেগুনি এবং “আবার চেষ্টা করো” শুনে উচ্চারণ পছন্দ হচ্ছে কি না যাচাই করা ভালো। তারপর পুরো প্যাক তৈরি করুন। বাংলা ও ইংরেজি এক ক্লিপে মেশাবেন না।

## কোথায় তৈরি করা যায়

- [Azure Speech-এর ভাষা ও কণ্ঠের তালিকা](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts): বাংলাদেশি বাংলার `bn-BD-NabanitaNeural` (নারী) বা `bn-BD-PradeepNeural` (পুরুষ)। Azure account/resource প্রয়োজন।
- [ElevenLabs Bengali TTS](https://elevenlabs.io/text-to-speech/bengali): বাংলা ভয়েস বেছে MP3 download করা যায়; free tier আছে। কোন কণ্ঠের উচ্চারণ ভালো লাগছে আগে নমুনা শুনুন। প্রকাশের আগে নির্বাচিত plan-এর ব্যবহারের শর্ত দেখুন।
- [Google Cloud TTS voices](https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types): `bn-IN` বাংলা, ভারতের উচ্চারণ; Cloud setup প্রয়োজন।

## অ্যাপে বসানো

বাংলা ফাইলগুলো `public/audio/bn/`, ইংরেজিগুলো `public/audio/en/`-এ রাখুন। একই নামের পুরোনো রঙের ক্লিপ প্রতিস্থাপন করুন। সার্ভার বন্ধ করে `npm run dev` আবার চালান; প্রকাশের জন্য `npm run build` করুন। Vite চালু বা build হওয়ার সময় বিদ্যমান feedback ফাইল শনাক্ত করে।

সঠিক–ভুলের ছোট ইফেক্টের পরে ভয়েস বাজবে; ভয়েস শেষ হলে পরের প্রশ্ন/চেষ্টা শুরু হবে। ভাষা বদলালে বা খেলা ছাড়লে আগের ভয়েস বন্ধ হবে। কোনো feedback ফাইল অনুপস্থিত থাকলে শুধু ইফেক্ট থাকবে, অনুপস্থিত ফাইল বারবার ডাউনলোডের চেষ্টা করবে না।

নতুন ফাইল বসানোর সময় উৎস, ব্যবহৃত voice এবং license লিখে `public/AUDIO-LICENSE.md` ও `public/audio/provenance.json` হালনাগাদ করতে হবে; পুরোনো MMS provenance নতুন কণ্ঠের জন্য প্রযোজ্য নয়। অ্যাপ চালানোর সময় কোনো TTS account বা API key লাগবে না।
