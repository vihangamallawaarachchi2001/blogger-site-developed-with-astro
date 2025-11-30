// scripts/generate-search-data.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.resolve('./src/content/posts');
const outDir = path.resolve('./public');

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

const posts = files.map(file => {
  const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const { data } = matter(raw);
  return {
    title: data.title || file.replace('.mdx', ''),
    description: data.description || '',
    tags: data.tags || [],
    slug: file.replace('.mdx', '')
  };
});

fs.writeFileSync(path.join(outDir, 'search.json'), JSON.stringify(posts, null, 2));
console.log('✅ Generated public/search.json');