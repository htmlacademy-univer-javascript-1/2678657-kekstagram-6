const MiniatureContainer = document.querySelector('.pictures');

const MiniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();


const createMiniature = function (post) {

  const MiniatureElement = MiniatureTemplate.cloneNode(true);
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

  MiniatureContainer.appendChild(fragment);
};

export { renderMiniature };
