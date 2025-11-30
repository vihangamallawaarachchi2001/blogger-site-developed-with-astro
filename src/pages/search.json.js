import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ✅ Use GET (uppercase) — Astro 4+ endpoint syntax
export async function GET() {
  const postsDir = path.resolve('./src/content/posts');
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const { data } = matter(raw);
    return {
      title: data.title || file.replace('.mdx', ''),
      description: data.description || '',
      tags: data.tags || [],
      slug: file.replace('.mdx', '')
    };
  });

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}