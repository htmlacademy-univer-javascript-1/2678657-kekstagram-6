import { initValidation } from './validate.js';
import { postSender } from './api.js';
import { isAnyMessageOpen, showFileTypeErrorMessage } from './messages.js';
import { DEFAULT_UPLOAD_IMAGE, FILE_TYPES } from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const submitButton = uploadForm.querySelector('.img-upload__submit');

const previewPhoto = document.querySelector('.img-upload__preview img');
const effectsPreview = uploadOverlay.querySelectorAll('.effects__preview');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
}, false);


initValidation(pristine, hashtagsInput, descriptionInput);


function closeOnEsc(evt){
  if (isAnyMessageOpen()) {
    return;
  }
  const isFieldFocused = hashtagsInput.matches(':focus') || descriptionInput.matches(':focus');

  if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden') && !isFieldFocused){
    evt.preventDefault();
    hideEditForm();
  }
}

function stopOnHashtags(evt){
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function stopOnDescription(evt){
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function validateHashtagsOnInput() {
  pristine.validate(hashtagsInput);
}

function validateDescriptionOnInput() {
  pristine.validate(descriptionInput);
}


const showEditForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', closeOnEsc);
  hashtagsInput.addEventListener('keydown', stopOnHashtags);
  descriptionInput.addEventListener('keydown', stopOnDescription);
  hashtagsInput.addEventListener('input', validateHashtagsOnInput);
  descriptionInput.addEventListener('input', validateDescriptionOnInput);
};

const resetUploadForm = () => {
  uploadInput.value = '';
  uploadForm.reset();
  pristine.reset();
  previewPhoto.src = DEFAULT_UPLOAD_IMAGE;
  effectsPreview.forEach((effect) => {
    effect.style.backgroundImage = `url(${DEFAULT_UPLOAD_IMAGE})`;
  });
};

function hideEditForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetUploadForm();

  document.removeEventListener('keydown', closeOnEsc);
  hashtagsInput.removeEventListener('keydown', stopOnHashtags);
  descriptionInput.removeEventListener('keydown', stopOnDescription);
  hashtagsInput.removeEventListener('input', validateHashtagsOnInput);
  descriptionInput.removeEventListener('input', validateDescriptionOnInput);
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }

  const formData = new FormData(uploadForm);

  postSender(
    formData,
    () => {
      hideEditForm();
    },
    submitButton
  );
});

const updatePhotos = () => {
  const file = uploadInput.files[0];

  if (!file) {
    return;
  }

  const isValidType = FILE_TYPES.some((type) => type.includes('/') && file.type === type);

  if (!isValidType) {
    showFileTypeErrorMessage();
    uploadInput.value = '';
    hideEditForm();
    return;
  }

  const blob = URL.createObjectURL(file);
  previewPhoto.src = blob;

  effectsPreview.forEach((effect) => {
    effect.style.backgroundImage = `url(${blob})`;
  });
};


uploadInput.addEventListener('change', () => {
  showEditForm();
  updatePhotos();
});

uploadCancel.addEventListener('click', hideEditForm);
