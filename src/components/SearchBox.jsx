import { useEffect, useMemo, useState, useRef } from 'react';
import Fuse from 'fuse.js';

export default function SearchBox({ className = '' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [active, setActive] = useState(-1);
  const inputRef = useRef();

  useEffect(() => {
    let mounted = true;
    fetch('/search.json')
      .then((r) => r.json())
      .then((posts) => {
        if (!mounted) return;
        const f = new Fuse(posts, {
          keys: ['title', 'description', 'tags'],
          threshold: 0.4,
          includeScore: true,
        });
        setFuse(f);
      })
      .catch(() => setFuse(null));
    return () => (mounted = false);
  }, []);

  // debounce query
  useEffect(() => {
    if (!fuse || !query) return setResults([]);
    const id = setTimeout(() => {
      const res = fuse.search(query).slice(0, 8).map((r) => r.item);
      setResults(res);
      setActive(-1);
    }, 180);
    return () => clearTimeout(id);
  }, [query, fuse]);

  function onKey(e) {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && active >= 0) {
      window.location.href = `/blog/${results[active].slug}`;
    }
  }

  return (
    <div className={`relative ${className}`} onKeyDown={onKey}>
      <input
        ref={inputRef}
        className="px-3 py-2 rounded border w-64 md:w-80 bg-white dark:bg-slate-800"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {}}
        aria-label="Search posts"
      />
      {results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border rounded shadow-lg">
          {results.map((r, i) => (
            <a
              key={r.slug}
              href={`/blog/${r.slug}`}
              className={`block px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                i === active ? 'bg-slate-100 dark:bg-slate-800' : ''
              }`}
              onMouseEnter={() => setActive(i)}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {r.description}
                  </div>
                </div>
                <div className="text-xs text-slate-400 pl-3">{r.tags?.slice(0, 2).join(', ')}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
