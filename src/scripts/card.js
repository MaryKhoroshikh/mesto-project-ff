import { ownerID } from './index.js'
import { deleteFromServerCard, putLike, deleteLike } from './api.js'


function createCard(cardData, deleteCard, toggleLikeCard, openImagePopup) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placeElement.querySelector('.card__image');
    const cardDeleteButton = placeElement.querySelector('.card__delete-button');
    const cardLikeButton = placeElement.querySelector('.card__like-button');
    const cardLikesNumber = placeElement.querySelector('.card__number-of-likes');
    const titleValue = cardData.name;
    let hasMyLike = cardData.likes.some((elem) => elem._id === ownerID);
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
    
    cardDeleteButton.addEventListener('click', (event) => {
        deleteCard(event);
        deleteFromServerCard(cardData)
            .catch((err) => console.log(`Произошла ошибка: ${err}`));
    });
    cardLikeButton.addEventListener('click', (event) => {
        toggleLikeCard(event);
        if (!hasMyLike) {
            putLike(cardData)
                .then((res) => {
                    cardLikesNumber.textContent = res.likes.length
                    hasMyLike = true;
                })
                .catch((err) => console.log(`Произошла ошибка: ${err}`));
        } else {
            deleteLike(cardData)
                .then((res) => {
                    cardLikesNumber.textContent = res.likes.length;
                    hasMyLike = false;
                })
                .catch((err) => console.log(`Произошла ошибка: ${err}`));
        }
    });
    cardImage.addEventListener('click', () => openImagePopup(cardImage.src, cardImage.alt));
    
    return placeElement;
}

function deleteCard (event) {
    event.target.closest('.places__item').remove();
}

function toggleLikeCard (event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, toggleLikeCard }