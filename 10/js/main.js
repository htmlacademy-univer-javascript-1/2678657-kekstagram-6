import { generatePosts } from './data.js';
import { renderMiniature, miniatureContainer } from './renderMiniature.js';
import { openBigPicture } from './fullscreen.js';

const posts = generatePosts();

renderMiniature(posts);

miniatureContainer.addEventListener('click', (evt) => {
  evt.preventDefault();
  const miniature = evt.target.closest('.picture');

  const miniatures = Array.from(miniatureContainer.querySelectorAll('.picture'));
  const index = miniatures.indexOf(miniature);

  const post = posts[index];

  openBigPicture(post);
});

export { posts };

