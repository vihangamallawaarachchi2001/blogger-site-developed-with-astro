export const prerender = false;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET({ params }) {
  const slug = params.slug || '';
  try {
    const file = path.resolve(`./src/content/posts/${slug}.mdx`);
    const raw = fs.readFileSync(file, 'utf-8');
    const { data } = matter(raw);
    const title = (data.title || slug).replace(/&/g, '&amp;');
    const author = data.author || 'VK';
    const date = data.date || '';

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7c3aed"/>
          <stop offset="100%" stop-color="#4f46e5"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#0f172a"/>
      <g transform="translate(60,120)">
        <rect x="-60" y="-120" width="1200" height="630" rx="24" fill="rgba(255,255,255,0.02)"/>
        <text x="0" y="0" font-family="Inter, Arial" font-size="48" fill="white" font-weight="700">${title}</text>
        <text x="0" y="80" font-family="Inter, Arial" font-size="20" fill="rgba(255,255,255,0.7)">${author} • ${date}</text>
      </g>
    </svg>`;

    return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
  } catch (e) {
    // fallback generic image
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="100%" height="100%" fill="#111827"/><text x="40" y="320" font-family="Inter, Arial" font-size="48" fill="#fff">VK Blog</text></svg>`;
    return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
  }
}
