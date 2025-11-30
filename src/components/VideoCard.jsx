// src/components/VideoCard.jsx
import { useState } from 'react';

export default function VideoCard({ id, title }) {
  if (!id) return null;

  // Clean YouTube thumbnail URL (no extra spaces!)
  const thumbnailUrl = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  const handleClick = () => {
    // Redirect to YouTube in new tab
    window.open(`https://youtube.com/watch?v=${id}`, '_blank');
  };

  return (
    <div className="max-w-xl w-full">
      <a href={`https://youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
        <div
        className="relative aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Watch video: ${title} on YouTube`}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for: ${title}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault fails
            e.target.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
          }}
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/30 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-black/40 transition-colors">
            <svg
              className="w-8 h-8 text-white ml-0.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      </a>
      <p className="mt-3 text-lg font-medium text-slate-900 dark:text-white text-center">
        {title}
      </p>
    </div>
  );
}