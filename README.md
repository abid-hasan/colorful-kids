# Colorful Kids

চার বছরের শিশুর জন্য বাংলা অথবা ইংরেজিতে রঙের নাম শুনে সঠিক রং বেছে নেওয়ার ছোট ওয়েব অ্যাপ। Chrome-এর ল্যাপটপ ও মোবাইল বিন্যাসের জন্য তৈরি।

## লোকালি চালানো

Node.js 22.12+ (অথবা সমর্থিত নতুন সংস্করণ) লাগবে।

```sh
npm install
npm run dev
```

তারপর http://127.0.0.1:5174/ খুলুন। পোর্টটি ব্যস্ত থাকলে `npm run dev -- --port 5175` চালান।

Production build:

```sh
npm run build
npm run preview
```

`npm run preview` যে লোকাল ঠিকানা দেখাবে, সেটি খুলুন। সরাসরি `index.html` ডাবল-ক্লিক করে নয়, এই সার্ভার ব্যবহার করে অ্যাপ চালাতে হবে।

## কী আছে

- একটিমাত্র বাংলা / English ভাষা নির্বাচন; UI ও রঙের অডিও একসঙ্গে বদলায়।
- প্রতিটি অডিওতে শুধু একটি রঙের নাম: যেমন “নীল” অথবা “Blue”।
- পাঁচ রাউন্ডের খেলা, প্রতি সঠিক উত্তরে একটি তারা।
- ভুল হলে নরম দোলা ও সাউন্ড; দুইবার ভুলের পর দৃশ্যমান ইঙ্গিত। কোনো পয়েন্ট কাটা নেই।
- যেকোনো রঙে চাপ দিয়ে নাম শোনার আলাদা শেখার পাতা।
- সবসময় ১০টি রঙের সংগ্রহ থেকে প্রতি প্রশ্নে ৪টি অপশন।
- পুনরায় শোনা, বিরতি, সাউন্ড এফেক্ট ও অ্যানিমেশন। কোনো সেটিংস প্যানেল নেই।
- শুধু ভাষা স্থানীয় ব্রাউজারে মনে রাখা হয়; নাম সবসময় Colorful Kids।

প্রথমবার খেলা শুরু বা রঙে চাপ দেওয়ার পর শব্দ বাজে। ট্যাব আড়ালে গেলে খেলা থামে; ফিরে এসে আবার চালানো যায়। সাউন্ড সবসময় চালু। ডিভাইসের reduced-motion accessibility preference সম্মান করা হয়; অ্যাপের ভেতরে এই সেটিং নেই।

## GitHub Pages

1. নিজের GitHub repository-তে সোর্স ফাইলগুলো রাখুন।
2. Settings → Pages → Build and deployment → Source: **GitHub Actions** নির্বাচন করুন।
3. `main`-এ push করলে `.github/workflows/deploy.yml` build করে `dist/` প্রকাশ করবে। অন্য default branch হলে workflow-এর branch নাম বদলান।

Vite-এর relative base (`./`) repository subpath-এ assets চালানোর জন্য কনফিগার করা। একটিমাত্র HTML entry হওয়ায় SPA rewrite লাগবে না। এখানে কোনো repository তৈরি, commit, push বা deployment করা হয়নি।

## অডিও ও ফন্ট

অডিও আগে থেকেই `public/audio/bn/` ও `public/audio/en/`-এ আছে। অ্যাপ চালাতে Python, Azure, API key বা TTS সেবা লাগে না। মডেলগুলো ওয়েবসাইটে লোড হয় না।

- অডিও উৎস ও অবাণিজ্যিক লাইসেন্সের তথ্য: `public/AUDIO-LICENSE.md`
- মডেল revision, পাঠ্য, hash ও যাচাই: `public/audio/provenance.json`
- `scripts/generate_audio.py` ও `scripts/voice-requirements.txt` পুরোনো MMS কণ্ঠের জন্য; বর্তমান Google voice pack পুনরায় তৈরি করে না।
- Baloo Da 2 ও Nunito ফন্ট self-hosted; SIL Open Font License কপি `public/fonts/`-এ আছে।

Google AI Studio-র Gero পুরুষ কণ্ঠে ২৬টি ক্লিপ বসানো হয়েছে: দুই ভাষায় দশটি রঙের নাম ও সঠিক/ভুল/সমাপ্তির প্রতিক্রিয়া। সব WAV-এর দৈর্ঘ্য ও শব্দের উপস্থিতি এবং MP3 decoding যাচাই হয়েছে। মূল WAV `audio-source/google-ai-studio/`-এ আছে।

## কাজের কাঠামো

- `src/main.ts`: খেলার অবস্থা, স্ক্রিন ও ভাষা
- `src/i18n.ts`: দুই ভাষার UI লেখা
- `src/colors.ts`: রঙের তালিকা ও shuffle
- `src/audio.ts`: একবারে একটি ভয়েস এবং নরম প্রতিক্রিয়ার শব্দ
- `src/style.css`: responsive UI, animation, reduced motion

ম্যানুয়ালি যাচাই করুন: দুই ভাষায় শুরু, সঠিক/ভুল উত্তর, ইঙ্গিত, পাঁচ রাউন্ড শেষ, ভাষা পাল্টানো, বিরতি এবং ছোট স্ক্রিন। কোনো স্বয়ংক্রিয় test file যুক্ত করা হয়নি।
