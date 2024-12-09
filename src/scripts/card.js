import { ownerID } from './index.js'

function createCard(cardData, deleteCard, likeCard, openImagePopup) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placeElement.querySelector('.card__image');
    const cardDeleteButton = placeElement.querySelector('.card__delete-button');
    const cardLikeButton = placeElement.querySelector('.card__like-button');
    const cardLikesNumber = placeElement.querySelector('.card__number-of-likes');
    const titleValue = cardData.name;
    const hasMyLike = cardData.likes.some(function (elem) { return elem._id === ownerID});
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
        fetch(`https://nomoreparties.co/v1/wff-cohort-28/cards/${cardData._id}`, {
            method: 'DELETE',
            headers: {
              authorization: '78d3b3a3-1ec4-4d78-97c9-c99f9bcb0626'
            }
        });
    });
    cardLikeButton.addEventListener('click', (event) => {
        likeCard(event);
        if (!hasMyLike) {
            fetch(`https://nomoreparties.co/v1/wff-cohort-28/cards/likes/${cardData._id}`, {
                method: 'PUT',
                headers: {
                  authorization: '78d3b3a3-1ec4-4d78-97c9-c99f9bcb0626'
                }
            }).then((res)=>res.json()).then((res)=>{cardLikesNumber.textContent = res.likes.length;});
        } else {
            fetch(`https://nomoreparties.co/v1/wff-cohort-28/cards/likes/${cardData._id}`, {
                method: 'DELETE',
                headers: {
                  authorization: '78d3b3a3-1ec4-4d78-97c9-c99f9bcb0626'
                }
            }).then((res)=>res.json()).then((res)=>{cardLikesNumber.textContent = res.likes.length;});
        }
    });
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