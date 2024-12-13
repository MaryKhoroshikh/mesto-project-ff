import { openModal } from './modal.js'
import { putLike, deleteLike } from './api.js'
import { deleteCardCallback } from './index.js'

function createCard(cardData, deleteCard, toggleLikeCard, openImagePopup, ownerID) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placeElement.querySelector('.card__image');
    const cardDeleteButton = placeElement.querySelector('.card__delete-button');
    const cardLikeButton = placeElement.querySelector('.card__like-button');
    const cardLikesNumber = placeElement.querySelector('.card__number-of-likes');
    const titleValue = cardData.name;
    let hasMyLike = cardData.likes.some((elem) => elem._id === ownerID);
    const cardID = cardData._id;
    cardLikesNumber.textContent = cardData.likes.length;
    cardImage.src = cardData.link;
    cardImage.alt = titleValue;
    placeElement.querySelector('.card__title').textContent = titleValue;
    //check card
    if (!(cardData.owner._id === ownerID)) {
        cardDeleteButton.remove();
    }
    if (hasMyLike) {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    }
    cardDeleteButton.addEventListener('click', (event) => deleteCardCallback(event, cardID));
    cardLikeButton.addEventListener('click', (event) => likeToggleCallback(event.target, cardID, cardLikesNumber));
    cardImage.addEventListener('click', () => openImagePopup(cardImage.src, cardImage.alt));
    return placeElement;
}

const likeToggleCallback = (buttonLikeClicked, cardID, cardLikesNumber) => {
    const toggleLikeMethod = buttonLikeClicked.classList.contains('card__like-button_is-active') ? deleteLike : putLike;
    toggleLikeMethod(cardID).
        then((res) => {
            toggleLikeCard(buttonLikeClicked);
            cardLikesNumber.textContent = res.likes.length;
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`));
}

function deleteCard (event) {
    event.target.closest('.places__item').remove();
}

function toggleLikeCard (event) {
    event.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, toggleLikeCard }