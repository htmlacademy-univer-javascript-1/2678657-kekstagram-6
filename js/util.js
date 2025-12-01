import { massUniqId, COUNTPOSTS, MAXCOUNTMESSAGES } from './constants.js';

function generateUniqId() {
  const i = getRandomNumberInRange(1, COUNTPOSTS * MAXCOUNTMESSAGES);
  if(massUniqId.includes(i)){
    return generateUniqId();
  }
  else {
    massUniqId.push(i);
    return i;
  }
}


function getRandomNumberInRange(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export{
  generateUniqId,
  getRandomNumberInRange,
};
