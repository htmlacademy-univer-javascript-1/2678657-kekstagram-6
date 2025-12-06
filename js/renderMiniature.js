const miniatureContainer = document.querySelector('.pictures');

const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();


const createMiniature = function (post) {

  const MiniatureElement = miniatureTemplate.cloneNode(true);
  const MiniatureImg = MiniatureElement.querySelector('.picture__img');
  const MiniatureLikes = MiniatureElement.querySelector('.picture__likes');
  const MiniatureComments = MiniatureElement.querySelector('.picture__comments');

  MiniatureImg.src = post.url;
  MiniatureImg.alt = post.description;
  MiniatureLikes.textContent = post.likes;
  MiniatureComments.textContent = post.comments.length;

  return MiniatureElement;
};

const renderMiniature = function (posts) {

  posts.forEach((post) => {
    const thumbnail = createMiniature(post);
    fragment.appendChild(thumbnail);
  });

  miniatureContainer.appendChild(fragment);
};

export { renderMiniature };
