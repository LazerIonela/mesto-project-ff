// функция создания карточки, 
// функции-обработчики событий удаления и лайка карточки;
// import { cardTemplate } from './index.js';


const cardTemplate = document.querySelector('#card-template').content;
function createCard(card, removeCard, likeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;

  const removeButton = document.querySelector('.card__delete-button');
  const likeButton = document.querySelector('.card__like-button');

  removeButton.addEventListener('click', removeCard);
  likeButton.addEventListener('click', likeCard);
  
  return cardElement;
}


function removeCard(evt) {
  const card = evt.target.closest('.places__item');
  card.remove();
}

function likeCard(evt) {
  evt.target.classList.add('card__like-button_is-active');
}

export { cardTemplate, createCard, removeCard, likeCard };