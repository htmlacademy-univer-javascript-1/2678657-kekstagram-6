import { generatePosts } from './data.js';
import { renderMiniature } from './renderMiniature.js';

const posts = generatePosts();

renderMiniature(posts);

export { posts };

