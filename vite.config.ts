import { defineConfig } from 'vite';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const feedback = ['bn', 'en'].flatMap(language =>
  ['correct', 'wrong', 'finish'].map(id => `${language}/${id}`)
).filter(clip => existsSync(fileURLToPath(new URL(`./public/audio/${clip}.mp3`, import.meta.url))));

export default defineConfig({
  base: './',
  define: { 'import.meta.env.VOICE_FEEDBACK': JSON.stringify(feedback) },
  server: { port: 5174, strictPort: true },
});
