import { massNames } from './constants.js';
import { generateUniqId, generateMessage } from './util.js';

function generateComments(count) {
  const massiveCommentsObj = [];
  for(let i = 0 ; i<count; i++){
    const commentObj = {
      id: generateUniqId(),
      avatar: `img/avatar-${Math.floor(Math.random() * (6 - 1 + 1)) + 1}.svg`,
      message: generateMessage(),
      name: massNames[Math.floor(Math.random() * massNames.length)],
    };
    massiveCommentsObj.push(commentObj);
  }
  return massiveCommentsObj;
}

function generateObjects() {
  const massiveObject = [];
  for(let i = 1; i<26; i++){
    const obj = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Описание фотографии.',
      likes: Math.floor(Math.random() * (200 - 15 + 1)) + 15,
      comments: generateComments(Math.floor(Math.random() * (30 - 0 + 1)) + 0),
    };
    massiveObject.push(obj);
  }
  return massiveObject;
}

export{
  generateComments,
  generateObjects,
};
