import { posts } from './main.js';
import { MAX_RANDOM_POST_COUNT } from './constants.js';
import { renderMiniature } from './renderMiniature.js';
import { debounce } from './util.js';

const filterSection = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterButtons = filterForm.querySelectorAll('.img-filters__button');


const comparePostsWithComments = (postA, postB) => {
  const countA = postA.comments.length;
  const countB = postB.comments.length;

  return countB - countA;
};

const getRandomPosts = (postsArray, count) => {
  const filteredPosts = [...postsArray].sort(() => Math.random() - 0.5);

  return filteredPosts.slice(0, count);
};

const filterPosts = (filterId) => {
  let filteredPosts = [...posts];
  switch (filterId) {
    case 'filter-random':
      filteredPosts = getRandomPosts(posts, MAX_RANDOM_POST_COUNT);
      break;
    case 'filter-discussed':
      filteredPosts = [...posts].sort(comparePostsWithComments);
      break;
    case 'filter-default':
    default:
      break;
  }
  return filteredPosts;
};

const updatePosts = debounce((filterId) => {
  const currentPosts = document.querySelectorAll('.picture');
  currentPosts.forEach((photo) => photo.remove());
  const filteredPosts = filterPosts(filterId);

  renderMiniature(filteredPosts);
});

const onFilterButtonClick = (evt) => {
  const button = evt.target;

  if (!button.classList.contains('img-filters__button')) {
    return;
  }

  filterButtons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  button.classList.add('img-filters__button--active');

  updatePosts(button.id);
};

const initFilters = () => {
  filterSection.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', onFilterButtonClick);
};

export {initFilters};
