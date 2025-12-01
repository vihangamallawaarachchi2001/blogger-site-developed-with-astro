// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';


import react from '@astrojs/react';


import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321/',
  integrations: [mdx({}), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});