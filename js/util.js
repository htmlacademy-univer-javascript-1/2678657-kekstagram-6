//import { massUniqId, COUNT_POSTS, MAX_COUNT_MESSAGES } from './constants.js';

import { TIMEOUT_DELAY } from './constants.js';

function generateUniqId() {
  /*const i = getRandomNumberInRange(1, COUNT_POSTS * MAX_COUNT_MESSAGES);
  if(massUniqId.includes(i)){
    return generateUniqId();
  }
  else {
    massUniqId.push(i);
    return i;
  }*/
  const id = crypto.randomUUID();
  return id;
}


function getRandomNumberInRange(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function debounce (callback, timeoutDelay = TIMEOUT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export{
  generateUniqId,
  getRandomNumberInRange,
  debounce,
};
