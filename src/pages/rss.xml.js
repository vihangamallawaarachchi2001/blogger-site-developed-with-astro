import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function get() {
  const postsDir = path.resolve('./src/content/posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

  const items = files.map(file => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const { data } = matter(raw);

    return `
      <item>
        <title>${data.title}</title>
        <description>${data.description}</description>
        <pubDate>${new Date(data.date).toUTCString()}</pubDate>
        <link>https://example.com/blog/${file.replace('.mdx', '')}</link>
      </item>
    `;
  });

  const rss = `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>VK Blog</title>
        <description>VK Personal Blog</description>
        <link>https://example.com</link>
        ${items.join('')}
      </channel>
    </rss>
  `;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml' }
  });
}
