// @todo: Темплейт карточки
// @todo: DOM узлы

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания 

function createCard (card, removeCard) {

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;

    removeButton.addEventListener('click', removeCard);

    return cardElement;
};

// @todo: Функция удаления карточки

function removeCard(evt) {
    const card = evt.target.closest('.places__item');
    card.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
    cardList.append(createCard(card, removeCard));
});
