import {
  MASSNAMES,
  COUNTPOSTS,
  MAXCOUNTMESSAGES,
  MINLIKES,
  MAXLIKES,
  MASSMESSAGES,
  MINAVATARNUM,
  MAXAVATARNUM } from './constants.js';
import { generateUniqId, getRandomNumberInRange } from './util.js';

function generateComments(count) {
  const massiveCommentsObj = [];
  for(let i = 0 ; i<count; i++){
    const commentObj = {
      id: generateUniqId(),
      avatar: `img/avatar-${getRandomNumberInRange(MINAVATARNUM,MAXAVATARNUM)}.svg`,
      message: generateMessage(),
      name: MASSNAMES[getRandomNumberInRange(0, MASSNAMES.length - 1)],
    };
    massiveCommentsObj.push(commentObj);
  }
  return massiveCommentsObj;
}

function generatePosts() {
  const massiveObject = [];
  for(let i = 0; i<COUNTPOSTS; i++){
    const obj = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Описание фотографии.',
      likes: getRandomNumberInRange(MINLIKES,MAXLIKES),
      comments: generateComments(getRandomNumberInRange(0,MAXCOUNTMESSAGES)),
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
      randomIndex = getRandomNumberInRange(0, MASSMESSAGES.length - 1);
    }
    while (usedIndexes.includes(randomIndex));

    usedIndexes.push(randomIndex);
    message += `${MASSMESSAGES[randomIndex]  } `;
  }

  return message;
}

export{
  generateComments,
  generatePosts,
  generateMessage,
};
