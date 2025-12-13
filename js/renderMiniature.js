const miniatureContainer = document.querySelector('.pictures');

const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();


const createMiniature = function (post) {

  const miniatureElement = miniatureTemplate.cloneNode(true);
  const miniatureImg = miniatureElement.querySelector('.picture__img');
  const miniatureLikes = miniatureElement.querySelector('.picture__likes');
  const miniatureComments = miniatureElement.querySelector('.picture__comments');

  miniatureImg.src = post.url;
  miniatureImg.alt = post.description;
  miniatureLikes.textContent = post.likes;
  miniatureComments.textContent = post.comments.length;

  return miniatureElement;
};

const renderMiniature = function (posts) {

  posts.forEach((post) => {
    const thumbnail = createMiniature(post);
    fragment.appendChild(thumbnail);
  });

  miniatureContainer.appendChild(fragment);
};


export {
  renderMiniature,
  miniatureContainer
};
