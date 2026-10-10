---
name: "রঙের খেলা · Colorful Kids"
description: "শিশুর রঙ চেনার জন্য শান্ত স্টিকার অ্যালবাম"
colors:
  purple: "#7550ba"
  purple-dark: "#5e3b9f"
  ink: "#302844"
  muted: "#716581"
  paper: "#fffefa"
  ground: "#f4f0fb"
  caption: "#796641"
  white: "#ffffff"
  language-track: "#e9e2f3"
  tab-active: "#e5daf5"
  listen: "#ece3f8"
  listen-hover: "#dfcff3"
  focus: "#603aa5"
  correct: "#24734b"
  wrong: "#93641d"
  error: "#9b3b45"
  star-fill: "#f2ca56"
  star-stroke: "#c59523"
  swatch-red: "#EC485A"
  swatch-blue: "#3783E6"
  swatch-yellow: "#F6C842"
  swatch-green: "#36A972"
  swatch-orange: "#F18B35"
  swatch-purple: "#9460CF"
  swatch-pink: "#EE8DB5"
  swatch-brown: "#935E3E"
  swatch-black: "#303039"
  swatch-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Baloo, Nunito, sans-serif"
    fontSize: "clamp(44px, 4.5vw, 62px)"
    fontWeight: 800
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  display-en:
    fontFamily: "Nunito, Baloo, sans-serif"
    fontSize: "49px"
    fontWeight: 800
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Baloo, Nunito, sans-serif"
    fontSize: "36px"
    fontWeight: 800
    lineHeight: 1.22
  body:
    fontFamily: "Baloo, Nunito, sans-serif"
    fontSize: "19px"
    lineHeight: 1.6
  label:
    fontFamily: "Baloo, Nunito, sans-serif"
    fontSize: "17px"
    fontWeight: 700
rounded:
  action: "16px"
  sheet: "32px"
  sheet-mobile: "25px"
  dialog: "24px"
  option: "12px"
  sticker: "26%"
  pill: "30px"
spacing:
  small: "8px"
  control: "15px"
  medium: "24px"
  large: "30px"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.white}"
    rounded: "{rounded.action}"
    padding: "13px 30px"
  button-primary-hover:
    backgroundColor: "{colors.purple-dark}"
  button-listen:
    backgroundColor: "{colors.listen}"
    textColor: "#604094"
    rounded: "28px"
    padding: "10px 21px"
  button-icon:
    rounded: "50%"
    size: "44px"
  navigation:
    backgroundColor: "{colors.tab-active}"
    textColor: "#563589"
    rounded: "{rounded.pill}"
    padding: "11px 24px"
  language:
    backgroundColor: "{colors.language-track}"
    rounded: "14px"
    padding: "4px"
  sticker:
    rounded: "{rounded.sticker}"
  setting-option:
    rounded: "{rounded.option}"
  setting-toggle:
    backgroundColor: "{colors.purple}"
    width: "42px"
    height: "25px"
    rounded: "20px"
  sheet:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.sheet}"
---

# Design System: রঙের খেলা · Colorful Kids

## Overview

**Creative North Star: "স্টিকার অ্যালবাম"**

স্টিকার অ্যালবামের মতো উষ্ণ সাদা পাতায় রঙের টুকরোগুলো প্রধান বিষয়। শান্ত ল্যাভেন্ডার পটভূমি, গাঢ় বরইরঙা লেখা এবং বেগুনি নিয়ন্ত্রণ শিশুকে শোনা ও স্পর্শ করার দিকে রাখে।

বাংলা ও ইংরেজির জন্য নিজস্বভাবে রাখা Baloo Da 2 ও Nunito ব্যবহার হয়। রঙের স্টিকার, সামান্য কাত হওয়া ভঙ্গি এবং অর্জিত তারার মৃদু নড়াচড়া আনন্দ আনে; পৃষ্ঠাটি প্রশস্ত ও কম ঘন থাকে।

**Key Characteristics:**

- শান্ত কাগজের পটভূমিতে উজ্জ্বল শিক্ষণীয় রঙ।
- গোলাকার অক্ষর, বড় স্পর্শযোগ্য স্টিকার।
- একটি ভাষা নিয়ন্ত্রণে পুরো UI এবং শুধু নির্বাচিত ভাষার রঙের নামের অডিও।
- সফলতায় স্টিকার ওঠে ও তারা জমে; ভুলে কোমল দুলুনি।

## Colors

শান্ত বেগুনি পরিবেশের মধ্যে শেখার রঙগুলো উজ্জ্বল ও পরস্পর স্পষ্ট। উপরকার token মানগুলো normative; একবারের অলংকারের সব রঙ token করা হয়নি।

### Primary

`purple` মূল action; `purple-dark` hover। `listen` এবং `tab-active` একই পরিবারের নরম ক্ষেত্র।

### Secondary

`swatch-*` শিক্ষণীয় বিষয়বস্তু; এগুলো action palette নয়। দশটি রঙের নাম ও মান `src/colors.ts` থেকে নেওয়া। সাদা স্টিকারে আলাদা inset border থাকে।

### Tertiary

`star-fill` ও `star-stroke` অর্জন বোঝায়। `correct`, `wrong`, `error` feedback-এর লেখা রাঙায়; চিহ্ন ও ভাষাও একই অবস্থা জানায়।

### Neutral

`ground` বাইরের জায়গা, `paper` কাজের পাতা, `ink` প্রধান লেখা, `muted` সহায়ক লেখা, `caption` স্টিকারের পাশে নির্দেশ। সংশোধিত muted ও caption-ই বর্তমান মান।

**The Color-as-Content Rule.** উজ্জ্বল রঙের বড় ক্ষেত্র শিক্ষণীয় স্টিকারে রাখুন; চারপাশ শান্ত থাকুক।

## Typography

বাংলার display/body font Baloo Da 2, CSS family alias `Baloo`; fallback Nunito, sans-serif। ইংরেজিতে Nunito আগে এবং Baloo fallback। উভয় font `/fonts/` থেকে self-hosted। বাংলা regular/bold/extra এবং ইংরেজি bold/extra font ফাইলের বিদ্যমান weight mapping বজায় রাখতে হবে; `font-synthesis:none` ব্যবহৃত।

স্বাগত শিরোনাম display; খেলার শিরোনাম headline। সাধারণ intro-এর line-height 1.6; body-এর একক সর্বজনীন size নেই। ইংরেজি intro 17px, বাংলা 19px; খেলায় যথাক্রমে 15px ও 16px। ছোট নোট desktop-এ 12–14px। Mobile-এ স্বাগত শিরোনাম বাংলা 42px, ইংরেজি 36px; খেলার শিরোনাম 29px ও 26px। 360px-এর নিচে আরও ছোট হয়। শিরোনামে balanced wrapping ব্যবহার হয়।

## Layout

Header সর্বোচ্চ 1160px, main সর্বোচ্চ 1040px। Desktop main-এর দুই পাশে মোট 64px জায়গা থাকে। স্বাগত পাতায় 1.03fr/1fr দুই কলাম; padding 70px 62px 62px ও gap 35px। অন্য পাতাগুলো একই sheet ভাষা রাখলেও ভেতরের বিন্যাস কাজ অনুযায়ী বদলায়।

850px-এ padding ও ফাঁক কমে। 600px-এ main-এর দুই পাশে 14px, স্বাগত এক কলামে আসে, লেখা কেন্দ্রে ও স্টিকার 2×2। তিনটি game choice-এর শেষটি দ্বিতীয় সারির কেন্দ্রে; চারটি choice 2×2। Explore desktop-এ পাঁচ ও mobile-এ দুই কলাম। 360px-এ game sticker 112px হয়। 1400px থেকে sheet কিছুটা উঁচু হয়। বাস্তব spacing অসংখ্য context-dependent মানে গঠিত; নতুন সার্বজনীন scale কল্পনা করা হয়নি।

## Elevation & Depth

নরম ambient shadow কাগজ ও স্টিকার আলাদা করে; কোনো শক্ত offset outline নেই। স্বাগত পাতার shadow `0 12px 50px #64527606`, স্টিকারের `0 8px 16px #30284414`, মূল button-এর `0 6px 15px #7550ba22`। Button hover-এ `0 9px 18px #7550ba2a`। Dialog-এর `0 22px 90px #2e1a4940`, backdrop blur 4px; pause overlay blur 6px।

## Shapes

বড় sheet, ছোট action এবং প্রায় squircle স্টিকার একই নরম পরিবারের। Desktop sheet 32px, mobile 25px। স্টিকারে 26% radius, explore-এ 24%; সমান width/height-এর সঙ্গে এই অনুপাত রাখুন। Logo চারটি রঙিন বৃত্ত এবং -8deg rotation। Icons inline SVG, 24px viewBox, সাধারণ stroke 1.8 ও গোল cap/join; এগুলো font glyph নয়।

## Components

### Buttons

মূল button বেগুনি, সাদা লেখা, অন্তত 58px উঁচু; mobile-এ 54px। Hover-এ 2px ওঠে, active-এ 1px নামে। Listening pill নরম বেগুনি ও 52px উঁচু (mobile 49px); playback-এ animated bars। Icon button বৃত্তাকার 44px; কিছু mobile header control ছোট হয়। Text button secondary navigation-এ থাকে। Focus 3px solid outline এবং 5px offset।

### Navigation and language

দুটি activity tab: selected-এ নরম বেগুনি পটভূমি ও গাঢ় লেখা; `aria-current` বর্তমান পাতা বোঝায়। বাংলা/English একটিমাত্র segmented control; selected-এ white face ও `aria-pressed`। একই নির্বাচন UI, সংখ্যা এবং এক-ভাষার color-name audio নিয়ন্ত্রণ করে।

### Sticker and progress

স্টিকার button-এর face পূর্ণ রঙে ভরা; preview/game-এ -5, 4, 3, -4deg পুনরাবৃত্ত tilt। Hover সোজা হয়ে 5px ওঠে, active 0.94 scale। সঠিক উত্তরে check, ভুলে replay চিহ্ন; disabled অবস্থায় রঙ ফিকে হয় না। Explore-এ শব্দের SVG ও নাম থাকে। পাঁচটি star slot earned হলে সোনালি হয়।

সঠিক উত্তরের pop 0.65s, ভুলের wiggle 0.45s, star stamp 0.5s; প্রধান ease `cubic-bezier(.16,1,.3,1)`। OS reduced-motion সব animation/transition বন্ধ করে। স্থির চিহ্ন ও feedback তখনও থাকে।

### নির্দিষ্ট খেলার নিয়ম

নাম দুই ভাষাতেই Colorful Kids। শুধু বাংলা/English টগল থাকবে; settings dialog নেই। সব দশটি রং থেকে প্রতি প্রশ্নে চারটি অপশন; সাউন্ড ও অ্যানিমেশন চালু।

## Do's and Don'ts

### Do:

- Do রঙের স্টিকারকে সবচেয়ে দৃশ্যমান উপাদান রাখুন।
- Do বাংলা/ইংরেজি বদলালে লেখা, সংখ্যা ও রঙের নাম একসঙ্গে বদলান।
- Do keyboard focus, ভুল/সঠিকের চিহ্ন এবং কম অ্যানিমেশন বজায় রাখুন।

### Don't:

- Don't নির্বাচিত ভাষার অডিওতে অন্য ভাষা বা বাক্য যোগ করুন।
- Don't শুধু রঙ দিয়ে ভুল/সঠিক অবস্থা বোঝান; চিহ্ন ও লেখা রাখুন।
- Don't বর্তমান CSS/SVG স্টিকারকে অপ্রয়োজনীয় raster ছবি দিয়ে প্রতিস্থাপন করুন।
