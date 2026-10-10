export type Color = { id: string; bn: string; en: string; hex: string; ink: string };
export const colors: Color[] = [
  { id: 'red', bn: 'লাল', en: 'Red', hex: '#EC485A', ink: '#fff' },
  { id: 'blue', bn: 'নীল', en: 'Blue', hex: '#3783E6', ink: '#fff' },
  { id: 'yellow', bn: 'হলুদ', en: 'Yellow', hex: '#F6C842', ink: '#45330a' },
  { id: 'green', bn: 'সবুজ', en: 'Green', hex: '#36A972', ink: '#fff' },
  { id: 'orange', bn: 'কমলা', en: 'Orange', hex: '#F18B35', ink: '#52270a' },
  { id: 'purple', bn: 'বেগুনি', en: 'Purple', hex: '#9460CF', ink: '#fff' },
  { id: 'pink', bn: 'গোলাপি', en: 'Pink', hex: '#EE8DB5', ink: '#5b2341' },
  { id: 'brown', bn: 'বাদামি', en: 'Brown', hex: '#935E3E', ink: '#fff' },
  { id: 'black', bn: 'কালো', en: 'Black', hex: '#303039', ink: '#fff' },
  { id: 'white', bn: 'সাদা', en: 'White', hex: '#FFFFFF', ink: '#45404F' },
];
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
