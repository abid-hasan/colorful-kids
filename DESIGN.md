---
name: "Colorful Kids"
description: "রং ও তিন বর্ণমালার স্টিকার অ্যালবাম"
colors:
  purple: "#176b68"
  purple-dark: "#10534f"
  ink: "#263c3a"
  muted: "#626b62"
  paper: "#fffef9"
  ground: "#f7f3e8"
  soft: "#e4ede5"
  white: "#ffffff"
  language-track: "#e9e2f3"
  listen-hover: "#dfcff3"
  green: "#24734b"
  gold: "#f2ca56"
  star-stroke: "#977315"
  bn-paper: "#f8ebd9"
  bn-ink: "#744721"
  en-paper: "#e7effb"
  en-ink: "#315a83"
  ar-paper: "#e6f2ec"
  ar-ink: "#245f4a"
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
    fontSize: "clamp(32px, 4vw, 48px)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Baloo, Nunito, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "Baloo, Nunito, sans-serif"
    fontSize: "19px"
  label:
    fontFamily: "Baloo, Nunito, sans-serif"
    fontSize: "18px"
    fontWeight: 600
rounded:
  action: "16px"
  sheet: "32px"
  sheet-mobile: "25px"
  tile: "22%"
  segment-track: "14px"
  segment: "10px"
spacing:
  small: "8px"
  medium: "18px"
  grid: "24px"
  large: "28px"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.white}"
    rounded: "{rounded.action}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.purple-dark}"
  button-listen:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.purple-dark}"
    rounded: "{rounded.action}"
    padding: "13px 26px"
  button-icon:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.purple-dark}"
    rounded: "50%"
    size: "48px"
  button-text:
    textColor: "{colors.purple-dark}"
    padding: "8px 16px"
  navigation:
    backgroundColor: "{colors.language-track}"
    rounded: "{rounded.segment-track}"
    padding: "4px"
  subject-door:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.action}"
    padding: "20px 28px"
  learning-tile:
    backgroundColor: "{colors.soft}"
    rounded: "{rounded.tile}"
  sheet:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.sheet}"
    padding: "28px 36px 36px"
---

# Design System: Colorful Kids

## Overview

**Creative North Star: "স্টিকার অ্যালবাম"**

স্টিকার অ্যালবামের উষ্ণ সাদা পাতা, শান্ত ল্যাভেন্ডার পটভূমি, বরইরঙা লেখা এবং বেগুনি নিয়ন্ত্রণ বজায় থাকে। রঙের স্ব্যাচ ও বাংলা, ইংরেজি, আরবি অক্ষরই শিক্ষণীয় দৃশ্য; বড় স্পর্শযোগ্য tile শোনা এবং চেনার কাজ সামনে রাখে।

স্বাগত পর্দা চারটি বিষয় বেছে নেওয়ার shelf। প্রতিটি বিষয় আগে শেখার tray খোলে, তারপর একই উপাদান দিয়ে সংক্ষিপ্ত খেলা। অলংকারমূলক বাড়তি লেখা ও footer নেই।

**Key Characteristics:**

- শান্ত কাগজে উজ্জ্বল রং ও বড় প্রকৃত অক্ষর।
- বাংলা/English UI switch; বর্ণমালার উচ্চারণ নিজস্ব ভাষায়।
- প্রথম ভুলেই সঠিক উদাহরণ; সরাসরি Next।
- স্বাধীন উত্তরে তারা, সহায়তায় শেষ করলে check।

## Colors

### Primary

`purple` মূল action, `purple-dark` hover ও নির্বাচিত নিয়ন্ত্রণের লেখা। `soft` replay ও icon button-এর নরম ক্ষেত্র।

### Secondary

দশটি `swatch-*` শেখার রং। বাংলা tile-এ উষ্ণ `bn-paper`/`bn-ink`, ইংরেজিতে নীল `en-paper`/`en-ink`, আরবিতে সবুজ `ar-paper`/`ar-ink` বিষয়গুলো আলাদা করে।

### Tertiary

`gold` ও `star-stroke` স্বাধীন সাফল্যের তারা; `green` check, শোনা হয়েছে এবং সঠিক উত্তরের feedback। অবস্থা শুধু রং দিয়ে বোঝানো হয় না।

### Neutral

`ground` বাইরের জায়গা, `paper` board ও subject entrance, `ink` মূল লেখা, `muted` নির্দেশ ও সহায়ক লেখা।

**The Color-as-Content Rule.** উজ্জ্বল রঙের বড় ক্ষেত্র শিক্ষণীয় স্ব্যাচে রাখুন; চারপাশ শান্ত থাকুক।

## Typography

বাংলার Baloo Da 2 CSS-এ `Baloo`; ইংরেজি UI-তে Nunito আগে। উভয় font self-hosted এবং `font-synthesis:none`। Arabic learning glyph-এ Arial, sans-serif ব্যবহার হয়; এটি শেখার লিপি, display heading নয়। Brand সব ভাষায় Nunito-তে Colorful Kids।

Home heading display, activity heading 30px, game heading headline। Tile label label-role; শেখার নির্দেশ body-role। সাধারণ body-র একক সর্বজনীন size নেই। অক্ষরের desktop size 50–76px, আরবিতে 64–88px; game choice-এ 84px ও 100px। 750px থেকে home heading 34px এবং activity 25px; 480px থেকে home 32px, game 27px। শিরোনামে balanced wrapping থাকে।

## Layout

Header সর্বোচ্চ 1160px; main সর্বোচ্চ 1040px এবং desktop-এ মোট 48px পাশের জায়গা। Subject shelf 1.1fr/1fr: রঙের entrance বাম পাশে তিন সারি জুড়ে, তিনটি alphabet entrance ডানে। সারি 130px, gap 18px। 750px থেকে shelf সমান দুই কলাম, gap 14px।

Learning board-এ উপরে নির্দেশ ও group navigation, মাঝে tiles, নিচে উচ্চারিত নাম ও play। Alphabet group পাঁচ বা ছয়টি অক্ষরের ভারসাম্যপূর্ণ set; desktop-এ সেই অনুযায়ী পাঁচ বা ছয় কলাম। রঙের দশটি tile একসঙ্গে পাঁচ কলামে। 750px থেকে alphabet তিন কলাম; 480px থেকে সব learning grid দুই কলাম। Board-এর radius mobile-এ ছোট হয়।

Game-এ desktop চারটি choice এক সারিতে, প্রতিটি সর্বোচ্চ 155px; 750px থেকে 2×2 (সর্বোচ্চ 145px), 480px থেকে সর্বোচ্চ 130px। প্রথম ভুলের reveal-এ choice grid-এর জায়গায় একটি নামযুক্ত example ও Next থাকে। Main 750px থেকে মোট 32px পাশের জায়গা রাখে; 360px-এ controls আরও সংকুচিত ও প্রয়োজনমতো wrap করে।

## Elevation & Depth

Board ও tile মূলত tonal layering-এ পৃথক; স্থায়ী sheet বা primary-button shadow নেই। Subject entrance hover-এ 4px ওঠে এবং `0 10px 24px #263c3a12` ambient shadow পায়। Tile hover 5px, primary hover 2px ওঠে। রঙের entrance-এ তিনটি কাত করা স্ব্যাচের overlap অ্যালবামের material বজায় রাখে।

## Shapes

Board বড় গোল কোণ, action ছোট গোল কোণ, learning face সমান width/height-এর নরম squircle। Subject entrance action radius ব্যবহার করে। Color-stack স্ব্যাচে 26% radius ও rotation; শেখার tile সোজা থাকে। চার বৃত্তের logo -8deg কাত। UI icon inline SVG; color-face-ও SVG এবং forced-color-adjust:none দিয়ে মূল রং সংরক্ষণ করে। সাদা স্ব্যাচে দৃশ্যমান border আছে।

## Components

### Buttons and navigation

Primary button অন্তত 56px উঁচু; replay অন্তত 62px, phone-এ 56px। Icon button 48px, ছোট screen-এর কিছু control 44px। Keyboard focus 3px `purple-dark` outline ও 5px offset। Disabled action ফিকে হয়; উত্তর tile নিজের রং রাখে।

Explore/Play segmented navigation-এ `aria-current`; বাংলা/English switch-এ `aria-pressed`। Track নরম বেগুনি, নির্বাচিত segment paper। Back subject shelf-এ ফেরায়। Settings dialog নেই।

### Subject shelf and learning tiles

রং, বাংলা, ইংরেজি, আরবি—চারটি entrance। অক্ষরের group navigation শুরু ও শেষে যথাযথভাবে disabled। একটি tile চাপলে শুধু তার নাম বাজে; সফল playback-এর পর heard check থাকে। এই check mastery নয়। Spoken name নিচের status-এ আসে।

105টি alphabet recording: বাংলা 50, ইংরেজি 26, আরবি 29; আরবির শেষ চারটি ওয়াও, হা, হামজা, ইয়া। Alphabet audio subject-এর ভাষাতেই থাকে; UI switch শুধু interface ও রঙের নামের ভাষা বদলায়। সব দশটি রং এক group-এ থাকে।

### Recognition and teaching reveal

এক session-এ একই learning group থেকে পাঁচটি প্রশ্ন, প্রতিটিতে চার choice। প্রথম সঠিক উত্তরে নাম আবার শোনানো হয় ও independent star জমে। প্রথম ভুলে সংক্ষিপ্ত সাউন্ড ইফেক্টের পর সঠিক item ও নাম দেখিয়ে শোনানো হয়। Audio শেষ হলে Next সরাসরি পরের প্রশ্নে যায় এবং assisted check জমে। সঠিক, ভুল ও সমাপ্তির প্রতিক্রিয়ায় শুধু সাউন্ড ইফেক্ট বাজে; কোনো প্রশংসার voice নেই। সঠিক উত্তরের ইফেক্ট শেষে item-এর নাম শোনানো হয়। দ্বিতীয় ভুল পর্যন্ত অপেক্ষা, elimination hint বা delayed retry queue নেই। পাঁচটি encounter-এই session শেষ হয়।

Replay, pause/resume এবং audio-error retry রয়েছে। Finish স্বাধীন ও assisted সংখ্যা আলাদা দেখায়। Correct pop 0.6s, wrong wiggle 0.4s, listening pulse 1s; সাধারণ ease `cubic-bezier(.16,1,.3,1)`। OS reduced-motion animation/transition বন্ধ করে, স্থির feedback বজায় রাখে।

## Do's and Don'ts

### Do:

- Do বড় প্রকৃত অক্ষর ও স্ব্যাচকে শেখার কেন্দ্র রাখুন।
- Do বাংলা/English UI পরিবর্তন এবং subject-language উচ্চারণের পার্থক্য বজায় রাখুন।
- Do keyboard focus, স্পষ্ট check/star এবং reduced-motion সমর্থন রাখুন।
- Do প্রথম ভুলেই শেখান এবং assisted credit আলাদা রাখুন।

### Don't:

- Don't UI-তে filler copy বা decorative footer ফেরত আনুন।
- Don't heard marker-কে mastery বা assisted check-কে earned star বলুন।
- Don't রঙের name clip-এ বাক্য বা দুই ভাষা মেশান।
- Don't দ্বিতীয় ভুলের hint কিংবা delayed retry loop ফিরিয়ে আনুন।


### বর্তমান শেখা ও খেলার নিয়ম

আগের ছোট দলের নিয়মের পরিবর্তে শেখায় পুরো বর্ণমালা এক তালিকায় থাকে। খেলায় পুরো বিষয় থেকে পাঁচটি আলাদা প্রশ্ন আসে; একই পেজ খোলা থাকা অবস্থায় পরের পর্বে আগে না-আসা প্রশ্ন অগ্রাধিকার পায়। প্রথম ভুলে চারটি অপশন একই জায়গায় থাকে: সঠিকটি সামান্য বড়, বর্ডার ও চেকসহ দেখা যায়, বাকিগুলো ম্লান হয়। সঠিকটিতে ট্যাপ করলে নাম আবার শোনা যায়। নামের পরে Next চালু হয়। ফলাফলে নিরপেক্ষ সমাপ্তির লেখা, স্বাধীন ও সহায়তাপ্রাপ্ত উত্তর আলাদা; feedback শুধুই সাউন্ড ইফেক্ট।


## Current palette — October 2026

Warm cream ground, ivory cards, dark botanical ink, deep teal actions. Bangla uses clay, English mist blue, Arabic pale olive. Primary actions use white on #176b68 (6.29:1). White learning swatches use #80887c borders. Learning color data stays unchanged. All UI color roles are CSS custom properties; do not restore purple action styling. Arabic cards size glyphs relative to card width and preserve lower dots. Removed group-controls, spoken-name and teaching-example styles must not return.

- `--scroll-thumb`: `#899b91`
- `--selection`: `#cce5da`
- `--control-track`: `#e5e7db`
- `--control-ink`: `#46594f`
- `--soft-hover`: `#d2e3d6`
- `--swatch-border`: `#80887c`
- `--progress-empty`: `#818b7c`
- `--star-stroke`: `#866419`
- `--warm-ink`: `#975031`
- `--bn-ink`: `#804428`
- `--bn-paper`: `#f8e6d7`
- `--en-ink`: `#315f79`
- `--en-tile-ink`: `#315f79`
- `--en-paper`: `#e6eff1`
- `--ar-ink`: `#31664f`
- `--ar-tile-ink`: `#285b47`
- `--ar-paper`: `#e7eedb`
- `--brand-red`: `#ec485a`
- `--brand-yellow`: `#f6c842`
- `--brand-blue`: `#3783e6`
- `--brand-green`: `#36a972`
- `--card-shadow`: `#263c3a12`
- `--ground`: `#f7f3e8`
- `--paper`: `#fffef9`
- `--ink`: `#263c3a`
- `--muted`: `#626b62`
- `--action`: `#176b68`
- `--action-hover`: `#10534f`
- `--line`: `#d9dfd3`
- `--soft`: `#e4ede5`
- `--green`: `#24734b`
- `--gold`: `#f2ca56`
