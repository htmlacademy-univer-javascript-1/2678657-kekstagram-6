import {
  MASS_NAMES,
  COUNT_POSTS,
  MAX_COUNT_MESSAGES,
  MIN_LIKES,
  MAX_LIKES,
  MASS_MESSAGES,
  MIN_AVATAR_NUM,
  MAX_AVATAR_NUM } from './constants.js';
import { generateUniqId, getRandomNumberInRange } from './util.js';

function generateComments(count) {
  const massiveCommentsObj = [];
  for(let i = 0 ; i<count; i++){
    const commentObj = {
      id: generateUniqId(),
      avatar: `img/avatar-${getRandomNumberInRange(MIN_AVATAR_NUM,MAX_AVATAR_NUM)}.svg`,
      message: generateMessage(),
      name: MASS_NAMES[getRandomNumberInRange(0, MASS_NAMES.length - 1)],
    };
    massiveCommentsObj.push(commentObj);
  }
  return massiveCommentsObj;
}

function generatePosts() {
  const massiveObject = [];
  for(let i = 1; i<=COUNT_POSTS; i++){
    const obj = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Описание фотографии.',
      likes: getRandomNumberInRange(MIN_LIKES,MAX_LIKES),
      comments: generateComments(getRandomNumberInRange(0,MAX_COUNT_MESSAGES)),
    };
    massiveObject.push(obj);
  }
  return massiveObject;
}

function generateMessage() {
  let message = '';
  const countMessage = getRandomNumberInRange(1, 2);
  const usedIndexes = [];

  for(let i = 0; i < countMessage; i++) {
    let randomIndex;
    do
    {
      randomIndex = getRandomNumberInRange(0, MASS_MESSAGES.length - 1);
    }
    while (usedIndexes.includes(randomIndex));

    usedIndexes.push(randomIndex);
    message += `${MASS_MESSAGES[randomIndex]  } `;
  }

  return message;
}
const posts = generatePosts();

export{
  generateComments,
  generatePosts,
  generateMessage,
  posts,
};
