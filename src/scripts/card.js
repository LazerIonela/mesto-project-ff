// функция создания карточки, 
// функции-обработчики событий удаления и лайка карточки;
const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, removeCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;

  const removeButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  removeButton.addEventListener('click', removeCard);
  likeButton.addEventListener('click', likeCard);

  cardElement.querySelector('.card__image').addEventListener('click', openImage);

  return cardElement;
};

export function removeCard(evt) {
  const card = evt.target.closest('.places__item');
  card.remove();
};

export function likeCard(evt) {
  evt.target.classList.add('card__like-button_is-active');
};
