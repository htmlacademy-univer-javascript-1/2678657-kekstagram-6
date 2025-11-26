const massMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];

const massNames = [
  'Артём',
  'Елена',
  'Андрей',
  'Екатерина',
  'Данил',
  'Ольга'
];

const massUniqId = [];

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

function generateComments(count) {
  const massiveCommentsObj = [];
  for(let i = 0 ; i<count; i++){
    const commentObj = {
      id: generateUniqId(),
      avatar: `img/avatar-${Math.floor(Math.random() * (6 - 1 + 1)) + 1}.svg`,
      message: massMessages[Math.floor(Math.random() * massMessages.length)],
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

generateObjects();
