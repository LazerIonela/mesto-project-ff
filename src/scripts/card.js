// функция создания карточки, 
// функции-обработчики событий удаления и лайка карточки;
import { deleteCardApi, putLikeApi, deleteLikeApi } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, removeCard, likeCard, openImage, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const removeButton = cardElement.querySelector('.card__delete-button');
  const amountOfLikes = cardElement.querySelector('.card__likes');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  amountOfLikes.textContent = card.likes.length;

  const isLiked = card.likes.some((like) => {
    return like._id === userId;
  });

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  };

  if (card.owner._id === userId) {
    removeButton.addEventListener('click', () => {
      removeCard(card._id);
    });
  } else {
      removeButton.classList.add('card__delete-button-hide');
    };
  
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', openImage);

  return cardElement;
};

export function removeCard(cardId) {
  deleteCardApi(cardId)
    .then(() => evt.target.closest(".places__item").remove())
    .catch((err) => console.log(err));
}; 

export function likeCard(cardId) {
    const likeMethod = isLikedByMe ? deleteLikeApi : putLikeApi;
    likeMethod(cardId)
      .then((card) => {
        amountOfLikes.textContent = card.likes.length;
        evt.target.classList.toggle('cards__like-button_active'); 
      })
      .catch((err) => console.log(err));
};
