// объявления и инициализация глобальных констант и переменных 
// обработчики событий (при открытии и закрытии попапов; 
// при отправке форм; 
// обработчик, открывающий попап при клике по изображению карточки;
// вызовы других функций, подключённых из созданных модулей, 
// которым нужно будет передавать объявленные здесь переменные и обработчики.
import '../pages/index.css';
import  { initialCards } from './cards.js';
import { cardTemplate, createCard, removeCard, likeCard } from './card.js';
export const cardList = document.querySelector('.places__list');



function addFirstCards() {
  initialCards.forEach((card) => {
    const place = createCard(card, removeCard, likeCard);
    cardList.append(place);
  });
}

// initialCards.forEach((card) => {
//     cardList.append(createCard(card, removeCard, likeCard));
// });

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
// const formAddNewPlace = document.forms.new-place;
// const formEditProfile = document.forms.edit-profile;
const popupEditProfile= document.querySelector('.popup_type_edit');
const editProfileName = document.querySelector('.popup__input_type_name');
const editProfileDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
 

// // отправка формы
// formEditProfile.addEventListener('submit', function(evt) {
//     evt. evt.preventDefault();
//     // функция открытия попапа 
//     // (editProfileName.value, editProfileDescription.value);
//     editProfileName.value = '';
//     editProfileDescription.value = '';
//   });

formAddNewPlace.addEventListener('submit', createCard);

function openModalWindow(evt, editButton) {
  evt.classList.add('.popup_is-opened');
  evt.classList.add('.popup_is-animated');
  editButton.addEventListener('click', openModalWindow => {
  
  });
};

editButton.addEventListener('click', () => {
  openModalWindow(profileModal);
  editProfileName.value = profileTitle.textContent;
  editProfileDescription.value = profileDescription.textContent;
});

 
  
  closeButton.addEventListener('click', (evt) => {
    closeModalWindow(popupEditProfile);
  });


