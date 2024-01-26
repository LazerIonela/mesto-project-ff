export function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter; // универсально получаем кнопку сабмита из `evt`
  const initialText = submitButton.textContent; // записываем начальный текст кнопки до вызова запроса

  renderLoading(true, submitButton, initialText, loadingText); // изменяем текст кнопки до вызова запроса

  request()
    .then(() => {
      evt.target.reset(); // любую форму нужно очищать после успешного ответа от сервера, а также деактивация 'reset' кнопки сабмита
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`); // в каждом запросе нужно ловить ошибку
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText); // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    });
}
