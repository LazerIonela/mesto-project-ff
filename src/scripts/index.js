// объявления и инициализация глобальных констант и переменных
// обработчики событий (при открытии и закрытии попапов;
// обработчики событий при отправке форм;
// обработчик, открывающий попап при клике по изображению карточки;
// вызовы других функций, подключённых из созданных модулей,
// которым нужно будет передавать объявленные здесь переменные и обработчики.
import "../pages/index.css";
import { validationConfig } from "./constants.js";
import {
  getUserInfoApi,
  getInitialCardsApi,
  editProfileApi,
  editAvatarApi,
  postCardApi,
} from "./api.js";
import { createCard, removeCard, likeCard } from "./card.js";
import { openModalWindow, closeModalWindow } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { handleSubmit } from "./utils.js";

let userId;

const cardList = document.querySelector(".places__list");

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
// const profileSubmitButton = popupEditProfile.querySelector(".popup__button");
// const cardSubmitButton = popupAddCard.querySelector(".popup__button");
// const avatarSubmitButton = popupEditAvatar.querySelector(".popup__button");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupOpenImage = document.querySelector(".popup_type_image");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");

const editProfileName = document.querySelector(".popup__input_type_name");
const editProfileDescription = document.querySelector(".popup__input_type_description");
const editAvatarUrl = popupEditAvatar.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const formEditProfile = document.forms["edit-profile"];
const formAddNewPlace = document.forms["new-place"];
const formEditAvatar = document.forms["avatar"];

const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModalWindow(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModalWindow(popup);
    }
  });
});

function openImage(evt) {
  openModalWindow(popupOpenImage);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
}

Promise.all([getUserInfoApi(), getInitialCardsApi()])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;

    initialCards.forEach((card) => {
      cardList.append(
        createCard(card, likeCard, removeCard, openImage, userId)
      );
    });
  })
  .catch(console.error);

addButton.addEventListener("click", (evt) => {
  openModalWindow(popupAddCard); //деактивация кнопки выполнена в validation.js
});

editButton.addEventListener("click", (evt) => {
  openModalWindow(popupEditProfile); //деактивация кнопки выполнена в validation.js

  editProfileName.value = profileTitle.textContent;
  editProfileDescription.value = profileDescription.textContent;
});

profileAvatar.addEventListener("click", (evt) => {
  openModalWindow(popupEditAvatar); //деактивация кнопки выполнена в validation.js
});

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return editProfileApi(
      editProfileName.value,
      editProfileDescription.value
    ).then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModalWindow(popupEditProfile);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleCreateCard(evt) {
  function makeRequest() {
    return postCardApi(cardName.value, cardLink.value).then((card) => {
      cardList.prepend(
        createCard(card, likeCard, removeCard, openImage, userId)
      );
      closeModalWindow(popupAddCard);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleEditAvatar(evt) {
  function makeRequest() {
    return editAvatarApi(editAvatarUrl.value).then((data) => {
      profileAvatar.style = `background-image: url(${data.avatar})`;
      closeModalWindow(popupEditAvatar);
      formEditAvatar.reset();
    });
  }
  handleSubmit(makeRequest, evt);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddNewPlace.addEventListener("submit", handleCreateCard);
formEditAvatar.addEventListener("submit", handleEditAvatar);

enableValidation(validationConfig);
