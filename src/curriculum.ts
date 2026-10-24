import numberData from './numbers.json';
import alphabetData from './alphabets.json';
import { colors } from './colors';
import type { Language } from './i18n';

export type SubjectId = 'colors' | 'bn' | 'en' | 'en-lower' | 'ar' | 'numbers-bn' | 'numbers-en';
export type Item = { id: string; symbol: string; spoken: string; audio: string; hex?: string };
export type Subject = { id: SubjectId; title: Record<Language, string>; sample: string; items: (language: Language) => Item[] };
export const subjects: Subject[] = [
  { id: 'colors', title: { bn: 'রং', en: 'Colors' }, sample: '', items: language => colors.map(c => ({ id: c.id, symbol: '', spoken: c[language], hex: c.hex, audio: `audio/${language}/${c.id}.mp3?v=gero-20261010` })) },
  ...(['bn', 'en', 'ar'] as const).map(id => ({
    id, title: { bn: id === 'bn' ? 'বাংলা' : id === 'en' ? 'ইংরেজি' : 'আরবি', en: id === 'bn' ? 'Bangla' : id === 'en' ? 'English' : 'Arabic' },
    sample: id === 'bn' ? 'অ আ' : id === 'en' ? 'A B' : 'ا ب',
    items: () => alphabetData[id].map(e => ({ ...e, audio: `audio/alphabets/${id}/${e.id}.mp3?v=8` })),
  })),
  {
    id: 'en-lower', title: { bn: 'ইংরেজি ছোট হাতের', en: 'English Lowercase' }, sample: 'a b',
    items: () => alphabetData.en.map(e => ({ ...e, symbol: e.symbol.toLowerCase(), audio: `audio/alphabets/en/${e.id}.mp3?v=8` })),
  },
  ...(['bn', 'en'] as const).map(language => ({
    id: `numbers-${language}` as SubjectId,
    title: { bn: language === 'bn' ? 'বাংলা সংখ্যা' : 'ইংরেজি সংখ্যা', en: language === 'bn' ? 'Bangla Numbers' : 'English Numbers' },
    sample: language === 'bn' ? '১ ২ ৩' : '1 2 3',
    items: () => numberData[language].map(item => ({ ...item, audio: `audio/numbers/${language}/${item.id}.mp3?v=1` })),
  })),
];
