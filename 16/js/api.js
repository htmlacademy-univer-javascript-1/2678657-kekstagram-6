import { showSuccessMessage, showErrorMessage, showLoadingMessage } from './messages.js';
import { SERVER_URL } from './constants.js';

const loadData = (onSuccess, onError) => {
  const loadingMessage = showLoadingMessage();
  return  fetch(`${SERVER_URL}/data`, {
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
const postSender = (formData, onSuccess, submitButton) => {
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
    });
};

export { loadData, postSender };
