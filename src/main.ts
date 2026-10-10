import './style.css';
import banglaMarks from './bangla-marks.json';
import { shuffle } from './colors';
import { subjects, type Item, type SubjectId } from './curriculum';
import { Sound } from './audio';
import { icon } from './icons';
import { messages, type Language } from './i18n';

const app = document.querySelector<HTMLDivElement>('#app')!;
const announcer = document.querySelector<HTMLDivElement>('#announcer')!;
const sound = new Sound();
const read = <T>(key: string, fallback: T): T => { try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback; } catch { return fallback; } };
let language: Language = (() => { try { return localStorage.getItem('colorful-kids.language') === 'en' ? 'en' : 'bn'; } catch { return 'bn'; } })();
const storedSeen = read<unknown>('colorful-kids.heard', {});
let seen: Record<string, boolean> = storedSeen && typeof storedSeen === 'object' && !Array.isArray(storedSeen) ? storedSeen as Record<string, boolean> : {};
let subjectId: SubjectId = 'colors';
const asked: Partial<Record<SubjectId, Set<string>>> = {};
let page: 'home' | 'learn' | 'game' | 'finish' = 'home';
let phase: 'ready' | 'speaking' | 'wrong' | 'reveal' | 'correct' | 'error' = 'ready';
let speaking = false;
let activeId = '';
let selectedId = '';
let paused = false;
let token = 0;
let idleTimer: ReturnType<typeof setTimeout> | undefined;
let queue: Item[] = [];
let target: Item;
let choices: Item[] = [];
let results: { id: string; independent: boolean }[] = [];
let errorContext: 'prompt' | 'reveal' | 'learn' = 'prompt';
const t = () => messages[language];
const subject = () => subjects.find(s => s.id === subjectId)!;
const pool = () => subject().items(language);
const number = (n: number) => n.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US');
const title = () => subject().title[language];
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
const escape = (text: string) => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
function cancel() { announcer.textContent = ''; token++; clearTimeout(idleTimer); sound.stop(); speaking = false; }
function persistSeen(item: Item) {
  seen[`${subjectId}:${subjectId === 'colors' ? language : ''}:${item.id}`] = true;
  try { localStorage.setItem('colorful-kids.heard', JSON.stringify(seen)); } catch { /* Optional local progress. */ }
}
function hasHeard(item: Item) { return !!seen[`${subjectId}:${subjectId === 'colors' ? language : ''}:${item.id}`]; }
function logo() { return '<span class="logo-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'; }
function glyph(item: Item) {
  // Use the bundled font's outlines: standalone combining marks otherwise gain a dotted circle.
  if (subjectId === 'bn' && Object.hasOwn(banglaMarks, item.symbol)) {
    const mark = banglaMarks[item.symbol as keyof typeof banglaMarks];
    return `<svg class="bangla-mark" viewBox="${mark.viewBox}" aria-hidden="true" focusable="false"><path fill="currentColor" transform="scale(1,-1)" d="${mark.path}"/></svg>`;
  }
  if (item.hex) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="${item.hex}"/></svg>`;
    return `<img class="color-face ${item.id === 'white' ? 'white-face' : ''}" src="data:image/svg+xml,${encodeURIComponent(svg)}" width="160" height="160" alt="" draggable="false">`;
  }
  return `<span class="letter" lang="${subjectId}" dir="${subjectId === 'ar' ? 'rtl' : 'ltr'}">${escape(item.symbol)}</span>`;
}
function header() {
  return `<header class="site-header"><button class="brand" data-action="home" aria-label="${t().home}">${logo()}<span lang="en">Colorful Kids</span></button><div class="language-switch" role="group" aria-label="${t().language}">${(['bn','en'] as const).map(l => `<button lang="${l}" data-action="language" data-value="${l}" aria-pressed="${language === l}">${l === 'bn' ? 'বাংলা' : 'English'}</button>`).join('')}</div></header>`;
}
function home() {
  return `<section class="home"><h1>${t().pick}</h1><div class="subject-shelf">${subjects.map(s => `<button class="subject-door subject-${s.id}" data-action="subject" data-value="${s.id}"><span class="subject-art" aria-hidden="true">${s.id === 'colors' ? '<span class="color-stack"><i></i><i></i><i></i></span>' : `<span lang="${s.id}" dir="${s.id === 'ar' ? 'rtl' : 'ltr'}">${s.sample}</span>`}</span><span class="subject-title">${s.title[language]}${icon('arrow')}</span></button>`).join('')}</div></section>`;
}
function navigation() {
  return `<div class="activity-heading"><button class="icon-button" data-action="home" aria-label="${t().home}">${icon('back')}</button><h1>${title()}</h1><nav class="mode-tabs" aria-label="${title()}"><button data-action="learn" aria-current="${page === 'learn' ? 'page' : 'false'}">${icon('sound')}${t().learn}</button><button data-action="start" aria-current="${page !== 'learn' ? 'page' : 'false'}">${icon('play')}${t().play}</button></nav></div>`;
}
function tile(item: Item, index: number, mode: 'learn' | 'choice') {
  const teaching = mode === 'choice' && (phase === 'reveal' || (phase === 'error' && errorContext === 'reveal'));
  const shown = teaching && item.id === target?.id;
  const correct = phase === 'correct' && item.id === target?.id && mode === 'choice';
  const wrong = phase === 'wrong' && item.id === selectedId && mode === 'choice';
  const isSpeaking = speaking && activeId === item.id && mode === 'learn';
  const disabled = mode === 'choice' && ((!['ready','speaking'].includes(phase) && !shown) || paused);
  return `<button class="learning-tile ${item.hex ? 'color-tile' : 'letter-tile'} ${correct ? 'is-correct' : ''} ${shown ? 'is-revealed' : teaching ? 'is-muted' : ''} ${wrong ? 'is-wrong' : ''} ${isSpeaking ? 'is-speaking' : ''}" data-action="${mode === 'learn' ? 'hear' : shown ? 'replay' : 'choose'}" data-value="${item.id}" aria-label="${escape(mode === 'learn' || shown ? item.spoken : `${t().option} ${number(index + 1)}`)}" ${disabled ? 'disabled' : ''}><span class="tile-face">${glyph(item)}${correct || shown ? `<span class="answer-mark">${icon('check')}</span>` : wrong ? `<span class="answer-mark">${icon('sound')}</span>` : ''}</span>${mode === 'learn' ? `<span class="tile-label">${icon('sound')}${hasHeard(item) ? `<span class="heard" aria-label="${t().seen}">${icon('check')}</span>` : ''}</span>` : ''}</button>`;
}
function learn() {
  return `${navigation()}<section class="learning-board"><div class="learn-top"><p>${phase === 'error' ? t().error : t().touch}</p></div><div class="learning-grid ${subjectId === 'colors' ? 'all-colors' : ''}" dir="${subjectId === 'ar' ? 'rtl' : 'ltr'}">${pool().map((item,i) => tile(item,i,'learn')).join('')}</div><div class="learn-bottom"><button class="primary" data-action="start">${t().start}${icon('play')}</button></div></section>`;
}
function replayButton() {
  return `<button class="listen-button ${speaking ? 'playing' : ''}" data-action="replay" ${phase === 'wrong' || phase === 'correct' || paused ? 'disabled' : ''}>${icon('sound')}<span>${speaking ? t().listening : phase === 'error' ? t().retry : t().listen}</span></button>`;
}
function progress() {
  return `<div class="progress-track" aria-label="${t().progress}: ${number(results.length)} / ${number(5)}">${Array.from({length:5},(_,i) => `<span class="progress-slot ${results[i] ? results[i].independent ? 'earned' : 'assisted' : ''}">${icon(results[i] && !results[i].independent ? 'check' : 'star')}</span>`).join('')}</div>`;
}
function game() {
  const reveal = phase === 'reveal' || (phase === 'error' && errorContext === 'reveal');
  return `${navigation()}<section class="game-board"><div class="game-meta"><span>${t().round} ${number(Math.min(results.length + 1,5))} / ${number(5)}</span><button class="icon-button" data-action="pause" aria-label="${t().pause}">${icon('pause')}</button></div>${paused ? `<div class="paused-state"><h2>${t().paused}</h2><button class="primary" data-action="resume">${icon('play')}${t().resume}</button></div>` : `<h2>${reveal ? t().remember : subjectId === 'colors' ? t().findColor : t().findLetter}</h2>${replayButton()}<div class="choice-grid">${choices.map((item,i) => tile(item,i,'choice')).join('')}</div><div class="feedback" role="status">${phase === 'error' ? t().error : reveal ? '' : phase === 'correct' ? t().correct : phase === 'wrong' ? t().remember : ''}</div>${reveal ? `<button class="primary next-button" data-action="continue" ${speaking || phase === 'error' ? 'disabled' : ''}>${t().next}${icon('arrow')}</button>` : ''}${progress()}`}</section>`;
}
function finish() {
  const independent = results.filter(r => r.independent).length;
  return `${navigation()}<section class="finish-board"><div class="finish-star" aria-hidden="true">${icon('star')}</div><h2>${t().finish}</h2><div class="finish-results"><span>${icon('star')}<strong>${number(independent)}</strong>${t().independent}</span>${independent < 5 ? `<span>${icon('check')}<strong>${number(5-independent)}</strong>${t().together}</span>` : ''}</div><div class="finish-actions"><button class="primary" data-action="start">${icon('replay')}${t().again}</button><button class="text-button" data-action="learn">${t().more}${icon('arrow')}</button></div></section>`;
}
function render(focusTitle = false) {
  const focused = document.activeElement as HTMLElement | null;
  const action = focused?.dataset.action, value = focused?.dataset.value;
  document.documentElement.lang = language;
  app.innerHTML = `${header()}<main class="subject-${subjectId}">${page === 'home' ? home() : page === 'learn' ? learn() : page === 'game' ? game() : finish()}</main>`;
  if (focusTitle) { const h = app.querySelector<HTMLElement>('h1'); if(h) {h.tabIndex=-1;h.focus({preventScroll:true});} }
  else if (action) app.querySelector<HTMLElement>(`[data-action="${CSS.escape(action)}"]${value ? `[data-value="${CSS.escape(value)}"]` : ''}`)?.focus({preventScroll:true});
}
async function hear(item: Item) {
  cancel(); const current = token; activeId = item.id; speaking = true; phase = 'speaking'; render();
  const ok = await sound.playFile(item.audio);
  if (current !== token) return;
  speaking = false; phase = ok ? 'ready' : 'error'; errorContext = 'learn';
  if (ok) persistSeen(item); render();
}
function scheduleReplay() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { if (page === 'game' && phase === 'ready' && !paused) void prompt(false); }, 9000);
}
async function prompt(remind = true) {
  cancel(); const current = token; speaking = true; phase = 'speaking'; errorContext = 'prompt'; render();
  const ok = await sound.playFile(target.audio);
  if (current !== token) return;
  speaking = false; phase = ok ? 'ready' : 'error'; render();
  if (ok && remind) scheduleReplay();
}
function nextQuestion() {
  cancel(); announcer.textContent=''; selectedId='';paused=false;phase='ready';
  if (!queue.length) { page='finish';render(true);sound.effect('finish');return; }
  target=queue.shift()!;
  (asked[subjectId] ??= new Set()).add(target.id);
  choices=shuffle([target,...shuffle(pool().filter(e=>e.id!==target.id)).slice(0,3)]);
  void prompt();
}
function start() {
  cancel();
  const history = asked[subjectId] ??= new Set<string>();
  const fresh = shuffle(pool().filter(item => !history.has(item.id)));
  const remaining = shuffle(pool().filter(item => history.has(item.id)));
  queue = [...fresh, ...remaining].slice(0, 5);
  if (fresh.length < 5) history.clear();
  results=[];page='game';window.scrollTo(0,0);nextQuestion();
}
async function reveal() {
  cancel();const current=token;phase='reveal';speaking=true;errorContext='reveal';render();
  const ok=await sound.playFile(target.audio);
  if(current!==token)return;
  speaking=false;if(!ok)phase='error';render();
}
function continueAfterTeaching() {
  if (phase !== 'reveal' || speaking || paused) return;
  results.push({id:target.id,independent:false});
  nextQuestion();
}
function pause() { if(page!=='game'||paused)return;cancel();if(phase==='wrong'){phase='reveal';errorContext='reveal';}paused=true;render(); }
async function choose(id: string) {
  if(page!=='game'||paused||!['ready','speaking'].includes(phase))return;
  cancel();const current=token;selectedId=id;
  if(id!==target.id){
    phase='wrong';render();sound.effect('wrong');
    await delay(450);if(current!==token)return;
    await reveal();
    return;
  }
  phase='correct';speaking=true;render();sound.effect('correct');
  results.push({id:target.id,independent:true});
  announcer.textContent=`${t().correct} ${target.spoken}`;
  await delay(600);if(current!==token)return;
  await completeCorrect();
}
async function completeCorrect() {
  const current=token;speaking=true;phase='correct';render();
  const ok=await sound.playFile(target.audio);if(current!==token)return;
  if(!ok){results.pop();phase='error';speaking=false;errorContext='prompt';render();return;}
  speaking=false;render();await delay(700);if(current!==token)return;
  nextQuestion();
}
app.addEventListener('click',event=>{
  const button=(event.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
  if(!button||button.disabled)return;
  sound.unlock();const value=button.dataset.value!;
  switch(button.dataset.action){
    case 'home':cancel();page='home';phase='ready';paused=false;activeId='';render(true);break;
    case 'subject':cancel();subjectId=value as SubjectId;page='learn';phase='ready';activeId='';render(true);break;
    case 'learn':cancel();page='learn';phase='ready';activeId='';paused=false;render(true);break;
    case 'hear':void hear(pool().find(e=>e.id===value)!);break;
    case 'start':start();break;
    case 'choose':void choose(value);break;
    case 'continue':continueAfterTeaching();break;
    case 'replay':if(phase==='reveal'||(phase==='error'&&errorContext==='reveal'))void reveal();else void prompt();break;
    case 'pause':pause();break;
    case 'resume':paused=false;if(phase==='reveal'||(phase==='error'&&errorContext==='reveal'))void reveal();else if(phase==='correct')void completeCorrect();else void prompt();break;
    case 'language':{
      if(value===language)break;cancel();language=value as Language;
      try{localStorage.setItem('colorful-kids.language',language);}catch{}
      activeId='';
      if(page==='game'){
        const items=subject().items(language);target=items.find(e=>e.id===target.id)!;choices=choices.map(c=>items.find(e=>e.id===c.id)!);queue=queue.map(c=>items.find(e=>e.id===c.id)!);
        if(paused)render();else if(phase==='wrong'||phase==='reveal'||(phase==='error'&&errorContext==='reveal'))void reveal();else if(phase==='correct')void completeCorrect();else void prompt();
      }else{phase='ready';render();}break;
    }
  }
});
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(page==='game')pause();else{cancel();phase='ready';render();}}});
render();
