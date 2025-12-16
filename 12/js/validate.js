import { HASHTAG_REGEX } from './constants.js';

let ErrorMessage = '';

const validateHashtags = (value) => {
  ErrorMessage = '';

  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  const hashtags = trimmed.split(/\s+/).filter((hashtag) => hashtag.length > 0);

  if (hashtags.length > 5) {
    ErrorMessage = 'Нельзя указать больше 5 хэштегов';
    return false;
  }
  const lowerCaseTags = [];

  for (const hashtag of hashtags) {
    const lowerTag = hashtag.toLowerCase();

    if (!hashtag.startsWith('#')) {
      ErrorMessage = 'Хэштег должен начинаться с символа #';
      return false;
    }

    if (hashtag === '#') {
      ErrorMessage = 'Хэштег не может состоять только из решётки';
      return false;
    }

    if (!hashtag.match(HASHTAG_REGEX)) {
      ErrorMessage = 'Хэштег может содержать только буквы и цифры';
      return false;
    }

    if (lowerCaseTags.includes(lowerTag)) {
      ErrorMessage = 'Хэштеги не должны повторяться';
      return false;
    }

    lowerCaseTags.push(lowerTag);
  }

  return true;
};

const getHashtagErrorMessage = () => ErrorMessage;


const validateDescription = (value) => value.length <= 140;


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
