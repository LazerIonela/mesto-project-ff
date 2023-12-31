// объявления и инициализация глобальных констант и переменных 
// обработчики событий (при открытии и закрытии попапов; 
// обработчики событий при отправке форм; 
// обработчик, открывающий попап при клике по изображению карточки;
// вызовы других функций, подключённых из созданных модулей, 
// которым нужно будет передавать объявленные здесь переменные и обработчики.
import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, removeCard, likeCard, openImage } from './card.js';
import { openModalWindow, closeModalWindow } from './modal.js';

const cardList = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');

const editProfileName = document.querySelector('.popup__input_type_name');
const editProfileDescription = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formEditProfile = document.forms['edit-profile'];
const formAddNewPlace = document.forms['new-place'];

const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');

initialCards.forEach((card) => {
    cardList.append(createCard(card, removeCard, likeCard, openImage));
});

addButton.addEventListener('click', (evt) => {
    openModalWindow(popupAddCard);
});

editButton.addEventListener('click', (evt) => {
    openModalWindow(popupEditProfile);
    editProfileName.value = profileTitle.textContent;
    editProfileDescription.value = profileDescription.textContent;
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = editProfileName.value;
    profileDescription.textContent = editProfileDescription.value;
    
    closeModalWindow(popupEditProfile);
};

function handleCreateCard(evt) {
    evt.preventDefault();
    const newCard = createCard({ name: cardName.value, link: cardLink.value }, removeCard, likeCard, openImage);
    cardList.prepend(newCard);

    closeModalWindow(popupAddCard);
};
  
formEditProfile.addEventListener('submit', handleFormSubmit);
formAddNewPlace.addEventListener('submit', handleCreateCard);
