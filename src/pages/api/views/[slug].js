// src/pages/api/views/[slug].js
export const prerender = false;

export async function GET({ params, request }) {
  const slug = params.slug || 'unknown';
  const namespace = 'vk-blog';
  const key = slug;

  const url = new URL(request.url);
  const noIncrement = url.searchParams.get('no-increment') === '1';

  let count = 0;
  try {
    if (noIncrement) {
      // Fetch without incrementing
      const res = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
      const data = await res.json();
      count = data?.value || 0;
    } else {
      // Increment and get new count
      const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
      const data = await res.json();
      count = data?.value || 0;
    }
  } catch (e) {
    count = 0;
  }

  return new Response(JSON.stringify({ value: count }), {
    headers: { 'Content-Type': 'application/json' }
  });
}