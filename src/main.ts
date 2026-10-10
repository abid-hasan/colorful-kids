import './style.css';
import { colors, shuffle, type Color } from './colors';
import { Sound } from './audio';
import { icon } from './icons';
import { messages, type Language } from './i18n';

function loadLanguage(): Language {
  try {
    const saved = localStorage.getItem('colorful-kids.language');
    const legacy = JSON.parse(localStorage.getItem('colorful-kids.settings') ?? '{}');
    return (saved ?? legacy.language) === 'en' ? 'en' : 'bn';
  } catch { return 'bn'; }
}
const settings = { language: loadLanguage() };
const app = document.querySelector<HTMLDivElement>('#app')!;
const announcer = document.querySelector<HTMLDivElement>('#announcer')!;
const sound = new Sound();
let page: 'welcome' | 'game' | 'finish' | 'learn' = 'welcome';
let status: 'ready' | 'speaking' | 'correct' | 'wrong' | 'error' = 'ready';
let completed = 0;
let wrong = 0;
let selected = '';
let target: Color = colors[0];
let choices: Color[] = [];
let deck: Color[] = [];
let lastTarget = '';
let paused = false;
let learned = '';
let token = 0;
const t = () => messages[settings.language];
const number = (n: number) => new Intl.NumberFormat(settings.language === 'bn' ? 'bn-BD' : 'en-US').format(n);
const name = (color: Color) => settings.language === 'bn' ? color.bn : color.en;
const pool = () => colors;
function persist() { try { localStorage.setItem('colorful-kids.language', settings.language); } catch { /* Storage is optional. */ } }
function announce(text: string) { announcer.textContent = text; }
function cancel() { token++; sound.stop(); }
function logo() { return '<span class="logo-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'; }
function starTrail() {
  return `<div class="star-trail" aria-label="${t().progress}: ${number(completed)} / ${number(5)}">${Array.from({ length: 5 }, (_, i) => `<span class="star-slot ${i < completed ? 'earned' : ''}" aria-hidden="true">${icon('star')}</span>`).join('')}</div>`;
}
function waves() { return '<span class="sound-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'; }
function swatch(color: Color, index: number, kind: 'preview' | 'choice' | 'learn') {
  const active = selected === color.id;
  const isCorrect = kind === 'choice' && status === 'correct' && active;
  const isWrong = kind === 'choice' && status === 'wrong' && active;
  const isHint = kind === 'choice' && wrong >= 2 && color.id === target.id && status === 'ready';
  const disabled = kind === 'choice' && (status !== 'ready' || paused);
  const label = kind === 'choice' ? `${t().colorOption} ${number(index + 1)}` : name(color);
  return `<button class="swatch ${color.id === 'white' ? 'white-swatch' : ''} ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''} ${isHint ? 'is-hint' : ''} ${kind !== 'choice' && learned === color.id && status === 'speaking' ? 'is-speaking' : ''}" style="--swatch:${color.hex};--swatch-ink:${color.ink};--tilt:${[-5, 4, 3, -4][index % 4]}deg" data-action="${kind}" data-color="${color.id}" aria-label="${label}" ${disabled ? 'disabled' : ''}>
    <span class="swatch-face">${isCorrect ? `<span class="answer-mark">${icon('check')}</span>` : isWrong ? `<span class="answer-mark">${icon('replay')}</span>` : kind === 'learn' ? icon('sound') : '<span class="swatch-shine"></span>'}</span>
    ${kind === 'learn' ? `<span class="swatch-label">${name(color)}</span>` : ''}
    ${isCorrect ? '<span class="spark spark-a"></span><span class="spark spark-b"></span><span class="spark spark-c"></span>' : ''}
  </button>`;
}
function header() {
  return `<header class="site-header"><button class="brand" data-action="home" aria-label="${t().home}">${logo()}<span><span class="brand-name" lang="en">Colorful Kids</span><small>${t().tagline}</small></span></button>
    <div class="header-actions"><div class="language-switch" role="group" aria-label="${settings.language === 'bn' ? 'ভাষা' : 'Language'}"><button lang="bn" data-action="language" data-lang="bn" aria-pressed="${settings.language === 'bn'}">বাংলা</button><button lang="en" data-action="language" data-lang="en" aria-pressed="${settings.language === 'en'}">English</button></div></div>
  </header>`;
}
function welcome() {
  return `<section class="welcome-board"><div class="welcome-copy"><h1>${t().welcome}<br><span>${t().welcomeAccent}</span></h1><p class="intro">${t().intro}</p><button class="primary start-button" data-action="start">${t().start}${icon('arrow')}</button><p class="sound-note">${icon('sound')}${t().soundOn}</p></div>
    <div class="preview-area"><div class="preview-caption">${t().preview}${icon('arrow', 'caption-line')}</div><div class="preview-colors">${colors.slice(0, 4).map((c, i) => swatch(c, i, 'preview')).join('')}</div><p class="preview-hint">${status === 'error' ? t().error : status === 'speaking' && learned ? `${name(colors.find(c => c.id === learned)!)} ${t().speaking}` : t().previewHint}</p></div>
    <span class="board-dot dot-a" aria-hidden="true"></span><span class="board-dot dot-b" aria-hidden="true"></span></section>
    <div class="how-it-works" aria-label="${t().how}"><span>${icon('sound')}${t().step1}</span><span class="step-arrow" aria-hidden="true">${icon('arrow')}</span><span>${icon('hand')}${t().step2}</span><span class="step-arrow" aria-hidden="true">${icon('arrow')}</span><span>${icon('star')}${t().step3}</span></div><p class="session-note">${t().five}</p>`;
}
function game() {
  const feedback = status === 'correct' ? t().correct : status === 'wrong' ? t().wrong : status === 'error' ? t().error : status === 'speaking' ? t().speaking : wrong >= 2 ? t().hint : t().choose;
  return `<section class="game-board"><div class="game-topline"><button class="text-button" data-action="home">${icon('back')}<span>${t().back}</span></button><span class="round-label">${t().round} ${number(status === 'correct' ? completed : Math.min(completed + 1, 5))} <span>/ ${number(5)}</span></span><button class="icon-button" data-action="pause" aria-label="${t().pause}">${icon('pause')}</button></div>
    <div class="game-heading"><h1>${t().question}</h1><p>${t().prompt}</p></div>
    <button class="listen-button ${status === 'speaking' ? 'playing' : ''}" data-action="replay" ${status === 'correct' || status === 'wrong' || paused ? 'disabled' : ''}>${status === 'speaking' ? waves() : icon('sound')}<span>${status === 'speaking' ? t().speaking : t().listen}</span></button>
    <div class="choice-grid count-${choices.length}">${choices.map((c, i) => swatch(c, i, 'choice')).join('')}</div>
    <div class="feedback ${status}" role="status">${status === 'correct' ? icon('star') : ''}<span>${feedback}${status === 'correct' ? ` <strong>— ${name(target)}</strong>` : ''}</span></div>
    <div class="progress-area">${starTrail()}<span>${t().stars}</span></div>
    ${paused ? `<div class="pause-overlay"><div>${icon('pause')}<h2>${t().paused}</h2><p>${t().pausedSub}</p><button class="primary" data-action="resume">${t().resume}${icon('play')}</button></div></div>` : ''}
    </section>`;
}
function finish() {
  return `<section class="finish-board"><div class="celebration" aria-hidden="true">${[0, 1, 2, 3, 4].map(i => `<span style="--i:${i}">${icon('star')}</span>`).join('')}</div><h1>${t().finish}</h1><p>${t().finishSub}</p><button class="primary" data-action="start">${icon('replay')}${t().again}</button><button class="text-button" data-action="learn">${t().learn}${icon('arrow')}</button></section>`;
}
function learn() {
  return `<section class="learn-board"><h1>${t().learnTitle}</h1><p>${t().learnSub}</p><div class="learn-colors">${colors.map((c, i) => swatch(c, i, 'learn')).join('')}</div><div class="learn-status" role="status">${status === 'error' ? t().error : status === 'speaking' && learned ? `${name(colors.find(c => c.id === learned)!)}…` : t().previewHint}</div></section>`;
}
function render() {
  const focus = document.activeElement as HTMLElement | null;
  const action = focus?.dataset.action;
  const color = focus?.dataset.color;
  const lang = focus?.dataset.lang;
  document.documentElement.lang = settings.language;
  document.title = 'Colorful Kids';
  app.innerHTML = `${header()}<main><nav class="mode-tabs" aria-label="${settings.language === 'bn' ? 'খেলার ধরন' : 'Activity'}"><button data-action="play-tab" aria-current="${page !== 'learn' ? 'page' : 'false'}">${icon('play')}${t().play}</button><button data-action="learn" aria-current="${page === 'learn' ? 'page' : 'false'}">${icon('star')}${t().learn}</button></nav>${page === 'welcome' ? welcome() : page === 'game' ? game() : page === 'finish' ? finish() : learn()}</main><footer>${icon('heart')}<span>${t().footer}</span><span class="footer-dots" aria-hidden="true"><i></i><i></i><i></i></span></footer>`;
  if (action) {
    const selector = `[data-action="${CSS.escape(action)}"]${color ? `[data-color="${CSS.escape(color)}"]` : ''}${lang ? `[data-lang="${lang}"]` : ''}`;
    app.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
  }
}
function focusHeading() { const h = app.querySelector<HTMLElement>('h1'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
async function speak(color: Color) {
  cancel();
  const current = token;
  status = 'speaking'; learned = color.id;
  render();
  const ok = await sound.play(color.id, settings.language);
  if (current !== token) return;
  status = ok ? 'ready' : 'error';
  render();
  if (!ok) announce(t().error);
}
function nextQuestion() {
  announce('');
  if (!deck.length) {
    deck = shuffle(pool());
    if (deck[0].id === lastTarget) deck.push(deck.shift()!);
  }
  target = deck.shift()!; lastTarget = target.id;
  choices = shuffle([target, ...shuffle(pool().filter(c => c.id !== target.id)).slice(0, 3)]);
  wrong = 0; selected = ''; paused = false;
  void speak(target);
}
function start() {
  cancel(); sound.unlock(); completed = 0; deck = []; lastTarget = ''; page = 'game'; nextQuestion(); focusHeading();
}
async function feedback(kind: 'correct' | 'wrong' | 'finish', current: number) {
  sound.effect(kind);
  await new Promise(resolve => setTimeout(resolve, 650));
  if (current !== token) return;
  await sound.feedback(kind, settings.language);
}
async function choose(id: string) {
  if (page !== 'game' || status !== 'ready' || paused) return;
  cancel(); selected = id;
  const current = token;
  const correct = id === target.id;
  status = correct ? 'correct' : 'wrong';
  if (correct) completed++; else wrong++;
  render(); announce(correct ? `${t().correct} ${name(target)}` : t().wrong);
  await Promise.all([
    feedback(correct ? 'correct' : 'wrong', current),
    new Promise(resolve => setTimeout(resolve, correct ? 1700 : 1100)),
  ]);
  if (current !== token) return;
  if (!correct) { status = 'ready'; selected = ''; render(); return; }
  if (completed === 5) {
    page = 'finish'; status = 'ready'; render(); focusHeading();
    void feedback('finish', current);
  } else nextQuestion();
}
function pause() {
  if (page !== 'game' || paused) return;
  const wasCorrect = status === 'correct';
  cancel(); paused = true; status = 'ready';
  if (wasCorrect) {
    if (completed === 5) { page = 'finish'; paused = false; }
    else { if (!deck.length) deck = shuffle(pool()); target = deck.shift()!; lastTarget = target.id; choices = shuffle([target, ...shuffle(pool().filter(c => c.id !== target.id)).slice(0, 3)]); wrong = 0; }
  }
  render();
}
function changeLanguage(language: Language) {
  if (language === settings.language) return;
  const wasCorrect = page === 'game' && status === 'correct';
  cancel(); settings.language = language; persist(); status = 'ready'; announce('');
  if (wasCorrect) {
    if (completed === 5) { page = 'finish'; render(); }
    else nextQuestion();
  } else if (page === 'game' && !paused) void speak(target);
  else { render(); if (learned && (page === 'learn' || page === 'welcome')) void speak(colors.find(c => c.id === learned)!); }
}
app.addEventListener('click', event => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
  if (!button || button.disabled) return;
  sound.unlock();
  switch (button.dataset.action) {
    case 'language': changeLanguage(button.dataset.lang as Language); break;
    case 'start': start(); break;
    case 'home': cancel(); page = 'welcome'; status = 'ready'; learned = ''; paused = false; render(); break;
    case 'play-tab': if (page === 'learn') { cancel(); page = 'welcome'; status = 'ready'; learned = ''; render(); } break;
    case 'learn': if (button.dataset.color) void speak(colors.find(c => c.id === button.dataset.color)!); else { cancel(); page = 'learn'; status = 'ready'; learned = ''; render(); focusHeading(); } break;
    case 'preview': void speak(colors.find(c => c.id === button.dataset.color)!); break;
    case 'choice': choose(button.dataset.color!); break;
    case 'replay': void speak(target); break;
    case 'pause': pause(); break;
    case 'resume': paused = false; void speak(target); break;
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { if (page === 'game') pause(); else { cancel(); status = 'ready'; render(); } }
});
render();
