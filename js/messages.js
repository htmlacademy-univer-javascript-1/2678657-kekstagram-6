const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorDataTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const typeErrorTemplate = document.querySelector('#typeError').content.querySelector('.typeError');
const messageTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');

let isMessageOpen = false;

const showMessage = (template) => {
  const messageElement = template.cloneNode(true);
  isMessageOpen = true;


  messageElement.style.zIndex = '2';
  document.body.appendChild(messageElement);

  const closeMessage = () => {
    messageElement.remove();
    isMessageOpen = false;
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onDocumentClick);
    submitButton.disabled = false;

    const uploadInput = document.querySelector('.img-upload__input');

    if (template === typeErrorTemplate) {
      setTimeout(() => {
        if (uploadInput) {
          uploadInput.click();
        }
      }, 100);
    }
  };

  function onEscKeyDown(evt){
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  }

  function onDocumentClick(evt){
    if (evt.target === messageElement) {
      closeMessage();
    }
  }

  const closeButton = messageElement.querySelector('.success__button') ||
                     messageElement.querySelector('.error__button') ||
                     messageElement.querySelector('.data-error__button') ||
                     messageElement.querySelector('.typeError__button');
  if (closeButton) {
    if (closeButton.classList.contains('data-error__button')) {
      closeButton.addEventListener('click', () => {
        closeMessage();
        location.reload();
      });
    } else {
      closeButton.addEventListener('click', closeMessage);
    }
  }


  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onDocumentClick);
};

const showSuccessMessage = () => {
  showMessage(successTemplate);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

const showErrorDataMessage = () => {
  showMessage(errorDataTemplate);
};

const showFileTypeErrorMessage = () => {
  showMessage(typeErrorTemplate);
};
const showLoadingMessage = () => {
  const loadingMessage = messageTemplate.cloneNode(true);
  document.body.appendChild(loadingMessage);
  return loadingMessage;
};

const isAnyMessageOpen = () => isMessageOpen;

export { showSuccessMessage, showErrorMessage, showErrorDataMessage, showLoadingMessage, isAnyMessageOpen, showFileTypeErrorMessage };
