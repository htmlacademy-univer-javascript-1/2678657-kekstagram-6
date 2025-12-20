const MASS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const MASS_NAMES = [
  'Артём',
  'Елена',
  'Андрей',
  'Екатерина',
  'Данил',
  'Ольга'
];

const massUniqId = [];

const COUNT_POSTS = 25;
const MAX_COUNT_MESSAGES = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_NUM = 1;
const MAX_AVATAR_NUM = 6;

const MAX_COMMENTS_VIEW = 5;

const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]+$/i;

const MAX_LENGTH_COMMENT = 140;

const MAX_COUNT_HASHTEGS = 5;

const MAX_LENGTH_ONE_HASHTEG = 20;

const DATA_URL =  'https://29.javascript.htmlacademy.pro/kekstagram/data';

const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

export{
  MASS_MESSAGES,
  MASS_NAMES,
  massUniqId,
  COUNT_POSTS,
  MAX_COUNT_MESSAGES,
  MIN_LIKES,
  MAX_LIKES,
  MIN_AVATAR_NUM,
  MAX_AVATAR_NUM,
  MAX_COMMENTS_VIEW,
  HASHTAG_REGEX,
  MAX_LENGTH_COMMENT,
  MAX_COUNT_HASHTEGS,
  MAX_LENGTH_ONE_HASHTEG,
  DATA_URL,
  SERVER_URL,
};
