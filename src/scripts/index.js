import '../pages/index.css'
import { createCard, deleteCard, toggleLikeCard } from './card.js'
import { openModal, closeModal, closeWithOverlay } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'
import { getInitialCards, getProfile, postCard, patchProfile, patchAvatar, deleteFromServerCard, putLike, deleteLike } from './api.js'

let cardIDForDeletion;
let eventForDeletion;
let ownerID;

const textDefaultSave = 'Сохранить';
const textDefaultDelete = 'Да';
const textSaving = 'Сохранение...';
const textDeletion = 'Удаление...';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const container = document.querySelector('.content');
const sectionPlaces = container.querySelector('.places');
const placesContainer = sectionPlaces.querySelector('.places__list');
const sectionProfile= container.querySelector('.profile');
const profileTitle = sectionProfile.querySelector('.profile__title');
const profileDescription = sectionProfile.querySelector('.profile__description');
const profileImage = sectionProfile.querySelector('.profile__image');
const buttonAddCard = sectionProfile.querySelector('.profile__add-button');
const buttonEditProfile = sectionProfile.querySelector('.profile__edit-button');

const modalBigImage = document.querySelector('.popup_type_image');
const imgContainerModalBigImage = modalBigImage.querySelector('.popup__image');
const imgCaptionModalBigImage = modalBigImage.querySelector('.popup__caption');
const modalAddCard = document.querySelector('.popup_type_new-card');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalEditAvatar = document.querySelector('.popup_type_avatar');
const modalConfirmDeletion = document.querySelector('.popup_type_confirm-deletion');

const formConfirmDeletion = document.forms.confirm_deletion;
const formEditAvatar = document.forms.edit_avatar;
const avatarInput = formEditAvatar.elements.avatar;
const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formAddCard = document.forms.new_place;
const placeNameInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;

const deleteCardCallback = (event, cardID) => {
    openModal(document.querySelector('.popup_type_confirm-deletion'));
    cardIDForDeletion = cardID;
    eventForDeletion = event;
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

function handleEditProfile(event) {
    event.preventDefault();
    renderLoading(true, formEditProfile, textSaving, textDefaultSave);
    patchProfile({name: nameInput.value, about: jobInput.value})
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
        .finally(() => {
            closeModal(modalEditProfile);
            renderLoading(false, formEditProfile, textSaving, textDefaultSave);
        });
}

function handleAddCard(event) {
    event.preventDefault();
    renderLoading(true, formAddCard, textSaving, textDefaultSave);
    postCard({name: placeNameInput.value, link: linkInput.value})
        .then((res) => {
            placesContainer.prepend(createCard(res, deleteCardCallback, likeToggleCallback, openImagePopup, ownerID));
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
        .finally(() => {
            closeModal(modalAddCard);
            renderLoading(false, formAddCard, textSaving, textDefaultSave);
            formAddCard.reset();
        });
}

function handleEditAvatar(event) {
    event.preventDefault();
    renderLoading(true, formEditAvatar, textSaving, textDefaultSave);
    patchAvatar({avatar: avatarInput.value})
        .then((res) => {
            profileImage.style.backgroundImage = `url("${res.avatar}")`;
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
        .finally(() => {
            closeModal(modalEditAvatar);
            renderLoading(false, formEditAvatar, textSaving, textDefaultSave);
            formEditAvatar.reset();
        });
}

function handleConfirmDeletion(event) {
    event.preventDefault();
    renderLoading(true, formConfirmDeletion, textDeletion, textDefaultDelete);
    deleteFromServerCard(cardIDForDeletion)
        .then((res) => {
            deleteCard(eventForDeletion);
            console.log(res);
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
        .finally(() => {   
            closeModal(modalConfirmDeletion);
            renderLoading(false, formConfirmDeletion, textDeletion, textDefaultDelete);
        });
}

function openImagePopup (src, alt) {
    imgContainerModalBigImage.src = src;
    imgCaptionModalBigImage.textContent = alt;
    openModal(modalBigImage);
}

function renderLoading (isLoading, form, textLoading, textDefault) {
    form.querySelector('.popup__button').textContent = isLoading ? textLoading : textDefault;
}

Promise.all([getInitialCards(), getProfile()]).then(([cardsData, profileData]) => {
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url("${profileData.avatar}")`;
    ownerID = profileData._id;
    cardsData.forEach(function (elem) { 
        placesContainer.append(createCard(elem, deleteCardCallback, likeToggleCallback, openImagePopup, ownerID));
    });
});

enableValidation(validationConfig);

buttonEditProfile.addEventListener('click', () => {
    clearValidation(formEditProfile, validationConfig);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(modalEditProfile);
});
buttonAddCard.addEventListener('click', () => {
    clearValidation(formAddCard, validationConfig);
    formAddCard.reset();
    openModal(modalAddCard);
});
profileImage.addEventListener('click', () => {
    clearValidation(formEditAvatar, validationConfig);
    formEditAvatar.reset();
    openModal(modalEditAvatar);
});

formAddCard.addEventListener('submit', handleAddCard);
formEditProfile.addEventListener('submit', handleEditProfile);
formEditAvatar.addEventListener('submit', handleEditAvatar);
formConfirmDeletion.addEventListener('submit', handleConfirmDeletion);

[modalBigImage, modalAddCard, modalEditProfile, modalEditAvatar, modalConfirmDeletion].forEach(modal => {
    modal.querySelector('.popup__close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', closeWithOverlay);
});