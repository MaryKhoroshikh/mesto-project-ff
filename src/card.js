function createCard(cardData, deleteCard, likeCard, openImagePopup) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placeElement.querySelector('.card__image');
    const titleValue = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = titleValue;
    placeElement.querySelector('.card__title').textContent = titleValue;
    placeElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    placeElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => openImagePopup(cardImage.src, cardImage.alt));
    return placeElement;
}

function deleteCard (event) {
    event.target.closest('.places__item').remove();
}

function likeCard (event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard }