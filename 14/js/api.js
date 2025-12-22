import { showSuccessMessage, showErrorMessage, showLoadingMessage } from './messages.js';
import { DATA_URL, SERVER_URL } from './constants.js';

const loadData = (onSuccess, onError) => {
  const loadingMessage = showLoadingMessage();
  return  fetch(DATA_URL, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onError)
    .finally(() => {
      loadingMessage.remove();
    });
};
const createSender = (formData, onSuccess, submitButton) => {
  submitButton.disabled = true;

  const loadingMessage = showLoadingMessage();

  return fetch(SERVER_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    })
    .then(() => {
      onSuccess();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      loadingMessage.remove();

      submitButton.disabled = false;
    });
};

export { loadData, createSender };
