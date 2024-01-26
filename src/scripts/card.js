// функция создания карточки,
// функции-обработчики событий удаления и лайка карточки;
import { deleteCardApi, putLikeApi, deleteLikeApi } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card, likeCard, removeCard, openImage, userId) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const removeButton = cardElement.querySelector(".card__delete-button");
  const amountOfLikes = cardElement.querySelector(".card__likes");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  amountOfLikes.textContent = card.likes.length;

  const isLiked = card.likes.some((like) => {
    return like._id === userId;
  });

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (card.owner._id === userId) {
    removeButton.addEventListener("click", () => {
      removeCard(card._id, cardElement);
    });
  } else {
    removeButton.classList.add("card__delete-button-hide");
  }

  likeButton.addEventListener("click", () =>
    likeCard(card._id, likeButton, amountOfLikes)
  );
  cardImage.addEventListener("click", (evt) => openImage(evt));

  return cardElement;
}

export function removeCard(cardId, cardElement) {
  deleteCardApi(cardId)
    .then(() => cardElement.remove())
    .catch(console.error);
}

export function likeCard(cardId, likeButton, amountOfLikes) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? deleteLikeApi : putLikeApi;
  likeMethod(cardId)
    .then((card) => {
      likeButton.classList.toggle("card__like-button_is-active");
      amountOfLikes.textContent = card.likes.length;
    })
    .catch(console.error);
}
