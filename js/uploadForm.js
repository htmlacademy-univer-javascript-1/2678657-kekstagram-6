import { initValidation } from './validate.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
}, false);


initValidation(pristine, hashtagsInput, descriptionInput);

const showEditForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function hideEditForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  uploadForm.reset();
  pristine.reset();
}

uploadInput.addEventListener('change', () => {
  showEditForm();
}
);

uploadCancel.addEventListener('click', hideEditForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' &&
      !uploadOverlay.classList.contains('hidden') &&
      !hashtagsInput.matches(':focus') &&
      !descriptionInput.matches(':focus')) {
    evt.preventDefault();
    hideEditForm();
  }
});

hashtagsInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

descriptionInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

hashtagsInput.addEventListener('input', () => pristine.validate(hashtagsInput));
descriptionInput.addEventListener('input', () => pristine.validate(descriptionInput));

