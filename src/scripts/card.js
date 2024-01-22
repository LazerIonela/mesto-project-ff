// функция создания карточки, 
// функции-обработчики событий удаления и лайка карточки;
import { deleteCard, putLike, deleteLike } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, removeCard, likeCard, openImage, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const removeButton = cardElement.querySelector('.card__delete-button');
  const amountOfLikes = cardElement.querySelector('.card__likes');

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  amountOfLikes.textContent = card.likes.length;

  likeButton.addEventListener('click', (evt) => {
    likeCard(evt, card._id, amountOfLikes);
  });

  const isLikedByMe = card.likes.some((like) => {
    return like._id === userId;
  });

  if (isLikedByMe) {
    likeButton.classList.add('card__like-button_is-active');
  } 
    
  cardElement.querySelector('.card__image').addEventListener('click', openImage);

  return cardElement;
};

export function removeCard(evt, cardId) {
  deleteCard(cardId)
    .then((res) => evt.target.closest('.card').remove())
    .catch((err) => console.log(err));
}; 

export function likeCard(evt, cardId, amountOfLikes) {
  if (!evt.target.classList.contains('card__like-button_is-active')) {
    const likeMethod = isLikedByMe ? deleteLike : putLike;
    likeMethod(cardId)
      .then((res) => {
        amountOfLikes.textContent = res.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => console.log(err));
  };
};
