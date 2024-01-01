// функция открытия модального окна, 
// функция закрытия модального окна, 
// функция-обработчик события нажатия Esc 
// функция-обработчик события клика по оверлею;

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        closeModalWindow(popup);
      };
      if (evt.target.classList.contains('popup__close')) {
        closeModalWindow(popup);
      };
  });
});

export function openModalWindow(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
    
  document.addEventListener('keydown', exitEsc);
};

export function closeModalWindow(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', exitEsc);
};
  
export function exitEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModalWindow(popup);
  }
};
  