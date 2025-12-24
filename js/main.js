import { loadData } from './api.js';
import { renderMiniature, miniatureContainer } from './renderMiniature.js';
import { openBigPicture } from './fullscreen.js';
import { showErrorDataMessage } from './messages.js';

let posts = [];

loadData(
  (data) => {
    posts = data;
    renderMiniature(posts);
  },
  () => showErrorDataMessage()
);

miniatureContainer.addEventListener('click', (evt) => {
  const img = evt.target;
  if (img.matches('.picture__img')) {
    evt.preventDefault();
    const miniature = evt.target.closest('.picture');
    const miniatures = Array.from(miniatureContainer.querySelectorAll('.picture'));
    const index = miniatures.indexOf(miniature);

    const post = posts[index];

    openBigPicture(post);
  }
});

export { posts };
