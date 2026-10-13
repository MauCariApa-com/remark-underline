# remark-underline


This Remark plugin converts custom syntax `,,,text,,,` into underlined text, which now supports other Markdown formats inside (like bold and italic).

SYNTAX:
* This is text ,,,that is underlined,,,.
* This is text ,,,**bold and underlined**,,,
* This is text ,,,*italic and underlined*,,,.

HTML RESULT:
* This is text `<u>that is underlined</u>`.
* This is text `<u><strong>bold and underlined</strong></u>`.
* This is text `<u><em>italic and underlined</em></u>`.

INSTALLATION (Astro 7.x):
```javascript
// astro.config.mjs

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkUnderline from './src/utils/remark-underline.mjs'; // set proper path

export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  markdown: {
    processor: unified({
      syntaxHighlight: 'shiki',
      shikiConfig: { wrap: true },
      remarkPlugins: [
        remarkUnderline //place plugin here
      ],
    })
  },
  integrations: [
    tailwind(),
    sitemap(),
    preact(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
```
