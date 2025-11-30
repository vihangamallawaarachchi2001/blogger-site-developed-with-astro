export default function readingTime(text = '') {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / wordsPerMinute));
  return `${minutes} min read`;
}
