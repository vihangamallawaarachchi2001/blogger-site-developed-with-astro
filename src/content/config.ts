// src/content/config.ts
import { defineCollection } from 'astro:content';

// Explicitly define the 'posts' collection
const posts = defineCollection({
  // You can leave schema empty if you don't need validation
});

export const collections = { posts };