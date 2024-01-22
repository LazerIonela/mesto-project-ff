// объявления и инициализация глобальных констант и переменных 
// обработчики событий (при открытии и закрытии попапов; 
// обработчики событий при отправке форм; 
// обработчик, открывающий попап при клике по изображению карточки;
// вызовы других функций, подключённых из созданных модулей, 
// которым нужно будет передавать объявленные здесь переменные и обработчики.
import '../pages/index.css';
import { initialCards } from './cards.js';
import { getUserInfo, getInitialCards, editProfile, editAvatar, postCard } from './api.js';
import { createCard, removeCard, likeCard } from './card.js';
import { openModalWindow, closeModalWindow } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';


const cardList = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.popup__button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const editProfileName = document.querySelector('.popup__input_type_name');
const editProfileDescription = document.querySelector('.popup__input_type_description');
const editAvatarUrl = document.querySelector('.popup__input_type_url');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const formEditProfile = document.forms['edit-profile'];
const formAddNewPlace = document.forms['new-place'];
const formEditAvatar = document.forms['avatar'];

const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');
const avatarLink = formEditAvatar.elements.link;

let userId;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputError: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };

function openImage(evt) {
    openModalWindow(popupOpenImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
  };

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.computedStyleMap.backgroundImage = `url(${userInfo.avatar})`;

    initialCards.forEach((card) => {
        cardList.append(createCard(card, userId, removeCard, likeCard, openImage));
  });
  })
  .catch((err) => {
    console.log(err);
});

addButton.addEventListener('click', (evt) => {
    openModalWindow(popupAddCard);

    clearValidation(formAddNewPlace, validationConfig); 
});

editButton.addEventListener('click', (evt) => {
    openModalWindow(popupEditProfile);

    editProfileName.value = profileTitle.textContent;
    editProfileDescription.value = profileDescription.textContent;
    
    clearValidation(formEditProfile, validationConfig); 
});

profileAvatar.addEventListener('click', (evt) => {
    openModalWindow(popupEditAvatar);
    
    clearValidation(formEditAvatar, validationConfig); 
});


function handleFormSubmit(evt) {
    evt.preventDefault();
    editProfile(editProfileName.value, editProfileDescription.value)
    .then((res) => {
      profileTitle.textContent = editProfileName.value;
      profileDescription.textContent = editProfileDescription.value;
      closeModalWindow(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
});
};

function handleCreateCard(evt) {
    evt.preventDefault();
    saveButton.textContent = saveButton.getAttribute('data-loading');
    const card = {name: cardName.value, link: cardLink.value};
    postCard(card)
      .then((card) => {
        const newCard = createCard(card, userId, removeCard, likeCard, openImage);
        cardList.prepend(newCard);
        closeModalWindow(popupAddCard);
        formAddNewPlace.reset();
      })
      .catch((err) => {
        console.log(err);
});
};

function handleEditAvatar(evt) {
    evt.preventDefault();
    saveButton.textContent = saveButton.getAttribute('data-loading');
    editAvatar(avatarLink.value)
      .then((res) => {
        profileAvatar.src = res.avatar;
        closeModalWindow(popupEditAvatar);
        formEditAvatar.reset();
      })
      .catch((err) => {
      console.log(err);
    });
};
  
formEditProfile.addEventListener('submit', handleFormSubmit);
formAddNewPlace.addEventListener('submit', handleCreateCard);
formEditAvatar.addEventListener('submit', handleEditAvatar);

enableValidation(validationConfig);
