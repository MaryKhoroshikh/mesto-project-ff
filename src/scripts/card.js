function createCard(cardData, deleteCardCallback, likeToggleCallback, openImagePopup, ownerID) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placeElement.querySelector('.card__image');
    const cardDeleteButton = placeElement.querySelector('.card__delete-button');
    const cardLikeButton = placeElement.querySelector('.card__like-button');
    const cardLikesNumber = placeElement.querySelector('.card__number-of-likes');
    const titleValue = cardData.name;
    const cardID = cardData._id;
    const hasMyLike = cardData.likes.some((elem) => elem._id === ownerID);
    if (hasMyLike) {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    }
    if (!(cardData.owner._id === ownerID)) {
        cardDeleteButton.remove();
    }
    cardImage.src = cardData.link;
    cardImage.alt = titleValue;
    placeElement.querySelector('.card__title').textContent = titleValue;
    cardLikesNumber.textContent = cardData.likes.length;
    cardDeleteButton.addEventListener('click', (event) => deleteCardCallback(event, cardID));
    cardLikeButton.addEventListener('click', (event) => likeToggleCallback(event.target, cardID, cardLikesNumber));
    cardImage.addEventListener('click', () => openImagePopup(cardImage.src, cardImage.alt));
    return placeElement;
}

function deleteCard (event) {
    event.target.closest('.places__item').remove();
}

function toggleLikeCard (event) {
    event.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, toggleLikeCard }