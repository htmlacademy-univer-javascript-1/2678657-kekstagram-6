import {MAX_COMMENTS_VIEW} from './constants.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');

const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const cancelButton = bigPicture.querySelector('.big-picture__cancel');

let shownComments = 0;
let currentComments = [];

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;

  return commentElement;
};

const renderComments = () => {
  socialComments.innerHTML = '';

  const commentsToRender = currentComments.slice(0, shownComments);

  commentsToRender.forEach((comment) => {
    const commentElement = createComment(comment);
    socialComments.appendChild(commentElement);
  });

  if(currentComments.length === 0) {
    socialCommentCount.innerHTML = 'Комментариев нет';
  }
  else{
    socialCommentCount.innerHTML = `<span class="social__comment-shown-count">${shownComments}</span> из <span class="social__comment-total-count">${currentComments.length}</span> комментариев`;
  }

  if (shownComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  shownComments += MAX_COMMENTS_VIEW;

  if (shownComments > currentComments.length) {
    shownComments = currentComments.length;
  }

  renderComments();
};

const fillBigPicture = (post) => {
  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  currentComments = [...post.comments];
  shownComments = Math.min(MAX_COMMENTS_VIEW, currentComments.length);

  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderComments();

};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', сloseWindowWithKey);
};

function сloseWindowWithKey(evt) {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (post) => {
  fillBigPicture(post);


  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', сloseWindowWithKey);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};


cancelButton.addEventListener('click', () => {
  closeBigPicture();
});


export { openBigPicture };
