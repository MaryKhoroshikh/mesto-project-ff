function createCard(cardData, deleteCard, likeCard, openImagePopup) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placeElement.querySelector('.card__image');
    const cardDeleteButton = placeElement.querySelector('.card__delete-button');
    const titleValue = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = titleValue;
    //check card
    if (cardData.owner) { if (!(cardData.owner._id === '51e16379f74f19a5d50fc63e')) {cardDeleteButton.remove();}}
    placeElement.querySelector('.card__title').textContent = titleValue;
    cardDeleteButton.addEventListener('click', (event) => {
        deleteCard(event);
        fetch(`https://nomoreparties.co/v1/wff-cohort-28/cards/${cardData._id}`, {
            method: 'DELETE',
            headers: {
              authorization: '78d3b3a3-1ec4-4d78-97c9-c99f9bcb0626'
            }
        });
    });
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