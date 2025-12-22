import { initValidation } from './validate.js';
import { createSender } from './api.js';
import { isAnyMessageOpen } from './messages.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const submitButton = uploadForm.querySelector('.img-upload__submit');

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

function hideEditForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  uploadForm.reset();
  pristine.reset();

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

  createSender(
    formData,
    () => {
      hideEditForm();
    },
    submitButton
  );
});

uploadInput.addEventListener('change', () => {
  showEditForm();
});

uploadCancel.addEventListener('click', hideEditForm);
