import { initialCards } from './cards.js'
import { createCard, deleteCard, likeCard} from './card.js'
import { openModal, closeModal, closeWithOverlay } from './modal.js'
import '../pages/index.css'
import { enableValidation, clearValidation } from './validation.js'

const container = document.querySelector('.content');
const sectionPlaces = container.querySelector('.places');
const placesContainer = sectionPlaces.querySelector('.places__list');

const sectionProfile= container.querySelector('.profile');
const profileTitle = sectionProfile.querySelector('.profile__title');
const profileDescription = sectionProfile.querySelector('.profile__description');
const buttonAddCard = sectionProfile.querySelector('.profile__add-button');
const buttonEditProfile = sectionProfile.querySelector('.profile__edit-button');

const modalBigImage = document.querySelector('.popup_type_image');
const imgContainerModalBigImage = modalBigImage.querySelector('.popup__image');
const imgCaptionModalBigImage = modalBigImage.querySelector('.popup__caption');
const modalAddCard = document.querySelector('.popup_type_new-card');
const modalEditProfile = document.querySelector('.popup_type_edit');

const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formAddCard = document.forms.new_place;
const place_nameInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;

function handleEditProfile(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(modalEditProfile);
}

function handleAddCard(event) {
    const elem = {name: place_nameInput.value, link: linkInput.value};
    event.preventDefault();
    placesContainer.prepend(createCard(elem, deleteCard, likeCard, openImagePopup));
    closeModal(modalAddCard);
    formAddCard.reset();
}

function openImagePopup (src, alt) {
    imgContainerModalBigImage.src = src;
    imgCaptionModalBigImage.textContent = alt;
    openModal(modalBigImage);
}

initialCards.forEach(function (elem) {
    placesContainer.append(createCard(elem, deleteCard, likeCard, openImagePopup));
});

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEditProfile, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    });
    openModal(modalEditProfile);
});
buttonAddCard.addEventListener('click', () => {
    clearValidation(formAddCard, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    });
    formAddCard.reset();
    openModal(modalAddCard);
});

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});

formAddCard.addEventListener('submit', handleAddCard);
formEditProfile.addEventListener('submit', handleEditProfile);

modalBigImage.querySelector('.popup__close').addEventListener('click', () => closeModal(modalBigImage));
modalAddCard.querySelector('.popup__close').addEventListener('click', () => closeModal(modalAddCard));
modalEditProfile.querySelector('.popup__close').addEventListener('click', () => closeModal(modalEditProfile));
modalBigImage.addEventListener('click', closeWithOverlay);
modalAddCard.addEventListener('click', closeWithOverlay);
modalEditProfile.addEventListener('click', closeWithOverlay);