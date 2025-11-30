import { massMessages, massUniqId } from './constants.js';

function generateUniqId() {
  const i = Math.floor(Math.random() * (933 - 1 + 1)) + 1;
  if(massUniqId.includes(i)){
    return generateUniqId();
  }
  else {
    massUniqId.push(i);
    return i;
  }
}

function generateMessage() {
  let message = '';
  const countMessage = Math.floor(Math.random() * 2) + 1;
  const usedIndexes = [];

  for(let i = 0; i < countMessage; i++) {
    let randomIndex;
    do
    {
      randomIndex = Math.floor(Math.random() * massMessages.length);
    }
    while (usedIndexes.includes(randomIndex));

    usedIndexes.push(randomIndex);
    message += `${massMessages[randomIndex]  } `;
  }

  return message;
}

export{
  generateUniqId,
  generateMessage,
};
