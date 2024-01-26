// функция открытия модального окна,
// функция закрытия модального окна,
// функция-обработчик события нажатия Esc
// функция-обработчик события клика по оверлею;
export function openModalWindow(popup) {
  popup.classList.add("popup_is-animated");

  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);

  document.addEventListener("keydown", handleEscape);
}

export function closeModalWindow(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

export function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModalWindow(popup);
  }
}
