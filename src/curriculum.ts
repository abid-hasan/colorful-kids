import alphabetData from './alphabets.json';
import { colors } from './colors';
import type { Language } from './i18n';

export type SubjectId = 'colors' | 'bn' | 'en' | 'ar';
export type Item = { id: string; symbol: string; spoken: string; audio: string; hex?: string };
export type Subject = { id: SubjectId; title: Record<Language, string>; sample: string; items: (language: Language) => Item[] };
export const subjects: Subject[] = [
  { id: 'colors', title: { bn: 'রং', en: 'Colors' }, sample: '', items: language => colors.map(c => ({ id: c.id, symbol: '', spoken: c[language], hex: c.hex, audio: `audio/${language}/${c.id}.mp3?v=gero-20261010` })) },
  ...(['bn', 'en', 'ar'] as const).map(id => ({
    id, title: { bn: id === 'bn' ? 'বাংলা' : id === 'en' ? 'ইংরেজি' : 'আরবি', en: id === 'bn' ? 'Bangla' : id === 'en' ? 'English' : 'Arabic' },
    sample: id === 'bn' ? 'অ আ' : id === 'en' ? 'A B' : 'ا ب',
    items: () => alphabetData[id].map(e => ({ ...e, audio: `audio/alphabets/${id}/${e.id}.mp3?v=8` })),
  })),
];
