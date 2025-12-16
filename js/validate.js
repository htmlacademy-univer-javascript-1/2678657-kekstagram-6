import { HASHTAG_REGEX,
  MAX_LENGTH_COMMENT,
  MAX_COUNT_HASHTEGS,
  MAX_LENGTH_ONE_HASHTEG } from './constants.js';

let errorMessage = '';

const validateHashtags = (value) => {
  errorMessage = '';

  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  const hashtags = trimmed.split(/\s+/).filter((hashtag) => hashtag.length > 0);

  if (hashtags.length > MAX_COUNT_HASHTEGS) {
    errorMessage = `Нельзя указать больше ${MAX_COUNT_HASHTEGS} хэштегов`;
    return false;
  }
  const lowerCaseTags = [];

  for (const hashtag of hashtags) {
    const lowerTag = hashtag.toLowerCase();

    if (!hashtag.startsWith('#')) {
      errorMessage = 'Хэштег должен начинаться с символа #';
      return false;
    }

    if (hashtag === '#') {
      errorMessage = 'Хэштег не может состоять только из решётки';
      return false;
    }

    if (!hashtag.match(HASHTAG_REGEX)) {
      errorMessage = 'Хэштег может содержать только буквы и цифры';
      return false;
    }

    if (lowerCaseTags.includes(lowerTag)) {
      errorMessage = 'Хэштеги не должны повторяться';
      return false;
    }

    if (hashtag.length > MAX_LENGTH_ONE_HASHTEG) {
      errorMessage = `Максимальная длина одного хэш-тега ${MAX_LENGTH_ONE_HASHTEG} символов, включая решётку`;
      return false;
    }


    lowerCaseTags.push(lowerTag);
  }

  return true;
};

const getHashtagErrorMessage = () => errorMessage;


const validateDescription = (value) => value.length <= MAX_LENGTH_COMMENT;


const initValidation = (pristine, hashtagsInput, descriptionInput) => {
  pristine.addValidator(
    hashtagsInput,
    validateHashtags,
    getHashtagErrorMessage
  );

  pristine.addValidator(
    descriptionInput,
    validateDescription,
  );
};

export { initValidation, validateHashtags, validateDescription };
