from pathlib import Path
import json,html
root=Path(__file__).resolve().parent
m=json.loads((root/'manifest.json').read_text())
parts=['''<!doctype html><html lang="bn"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Number audio review — Colorful Kids</title><style>body{font:18px system-ui;background:#f7f3e8;color:#263c3a;margin:0;padding:24px}main{max-width:1100px;margin:auto}h1{font-size:28px}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}button{font:inherit;background:#fffef9;border:1px solid #b5c4b6;border-radius:12px;padding:18px;cursor:pointer;color:inherit}button:focus-visible{outline:3px solid #176b68}button[aria-pressed=true]{background:#d2e3d6}button:disabled{opacity:.45;cursor:default}strong{display:block;font-size:30px}small{display:block;margin-top:8px}header{position:sticky;top:0;background:#f7f3e8;padding:10px 0}#status{min-height:28px}p{font-size:15px}</style><main><header><h1>সংখ্যার অডিও · Gero</h1><button id="stop">থামাও</button><span id="status" role="status"></span></header><p>প্রতিটি সংখ্যা ট্যাপ করে শুনুন। উচ্চারণ ও ক্লিপের শুরু–শেষ যাচাই বাকি।</p>''']
for lang,label in [('bn','বাংলা ১–১০০'),('en','English 1–100')]:
 parts.append('<h2>'+label+'</h2><section>')
 for item in m['items'][lang]:
  number=str(item['number']);number=number.translate(str.maketrans('0123456789','০১২৩৪৫৬৭৮৯')) if lang=='bn' else number
  parts.append(f'<button data-file="{item.get("file","")}" aria-pressed="false" {"disabled" if "file" not in item else ""}><strong>{number}</strong><small lang="{lang}">{html.escape(item["spoken"])}</small></button>')
 parts.append('</section>')
parts.append('''</main><script>const audio=new Audio();const status=document.querySelector('#status');function stop(){audio.pause();document.querySelectorAll('[aria-pressed=true]').forEach(b=>b.setAttribute('aria-pressed','false'));status.textContent=''}document.querySelector('#stop').onclick=stop;document.querySelectorAll('[data-file]').forEach(b=>b.onclick=()=>{stop();b.setAttribute('aria-pressed','true');audio.src=b.dataset.file;status.textContent=' · '+b.innerText.replace(/\\n/g,' ');audio.play().catch(()=>{status.textContent='অডিও চালানো যায়নি'})});audio.onended=stop;document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});</script></html>''')
(root/'review.html').write_text(''.join(parts))
