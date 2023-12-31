// функция открытия модального окна, 
// функция закрытия модального окна, 
// функция-обработчик события нажатия Esc 
// функция-обработчик события клика по оверлею;

export function openModalWindow(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
    
  document.addEventListener('keydown', exitEsc);
  document.addEventListener('mousedown', exitOverlay);

  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', function() {
    closeModalWindow(popup);
  });
};

export function closeModalWindow(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', exitEsc);
  document.removeEventListener('mousedown', exitOverlay);
};
  
export function exitEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModalWindow(popup);
  }
};
  
export function exitOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    const popup = document.querySelector('.popup_is-opened');
    closeModalWindow(popup);
  }
};
