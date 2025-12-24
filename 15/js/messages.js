const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorDataTemplate = document.querySelector('#errorData').content.querySelector('.errorData');
const messageTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');

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
                     messageElement.querySelector('.errorData__button');
  if (closeButton) {
    if (closeButton.classList.contains('errorData__button')) {
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

const showLoadingMessage = () => {
  const loadingMessage = messageTemplate.cloneNode(true);
  document.body.appendChild(loadingMessage);
  return loadingMessage;
};

const isAnyMessageOpen = () => isMessageOpen;

export { showSuccessMessage, showErrorMessage, showErrorDataMessage, showLoadingMessage, isAnyMessageOpen };
