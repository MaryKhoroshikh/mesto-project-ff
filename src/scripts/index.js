import { createCard, deleteCard, likeCard} from './card.js'
import { openModal, closeModal, closeWithOverlay } from './modal.js'
import '../pages/index.css'
import { enableValidation, clearValidation, validationConfig } from './validation.js'
import { getInitialCards, getProfile, postCard } from './api.js'


export const ownerID = "51e16379f74f19a5d50fc63e";

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

const formEditAvatar = document.forms.edit_avatar;
const avatarInput = formEditAvatar.elements.avatar;

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
    fetch('https://nomoreparties.co/v1/wff-cohort-28/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '78d3b3a3-1ec4-4d78-97c9-c99f9bcb0626',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value,
          about: jobInput.value
        })
      });
}

function handleAddCard(event) {
    const elem = {name: place_nameInput.value, link: linkInput.value, owner: {_id: ownerID}};
    event.preventDefault();
    sendCard(elem);
    closeModal(modalAddCard);
    formAddCard.reset();
}

function handleEditAvatar(event) {
    event.preventDefault();
    profileImage.style.backgroundImage = `url("${avatarInput.value}")`;
    closeModal(modalEditAvatar);
    fetch('https://nomoreparties.co/v1/wff-cohort-28/users/me/avatar', {
        method: 'PATCH',
        headers: {
          authorization: '78d3b3a3-1ec4-4d78-97c9-c99f9bcb0626',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarInput.value,
        })
      });
}

function openImagePopup (src, alt) {
    imgContainerModalBigImage.src = src;
    imgCaptionModalBigImage.textContent = alt;
    openModal(modalBigImage);
}

function sendCard(newCard) {
    postCard(newCard)
        .then((res) => {
            placesContainer.prepend(createCard(res, deleteCard, likeCard, openImagePopup));
        });
}

Promise.all([getInitialCards, getProfile]).then(() => {
    getProfile()
        .then((result) => {
            profileTitle.textContent = result.name;
            profileDescription.textContent = result.about;
            profileImage.style.backgroundImage = `url("${result.avatar}")`;
        })
        .catch((err) => console.log(`Ошибка: ${err}`));

    getInitialCards()
        .then((array) => {
            array.forEach(function (elem) { 
                placesContainer.append(createCard(elem, deleteCard, likeCard, openImagePopup));
            });
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`));
});

//слушатели
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

modalBigImage.querySelector('.popup__close').addEventListener('click', () => closeModal(modalBigImage));
modalAddCard.querySelector('.popup__close').addEventListener('click', () => closeModal(modalAddCard));
modalEditProfile.querySelector('.popup__close').addEventListener('click', () => closeModal(modalEditProfile));
modalEditAvatar.querySelector('.popup__close').addEventListener('click', () => closeModal(modalEditAvatar));
modalBigImage.addEventListener('click', closeWithOverlay);
modalAddCard.addEventListener('click', closeWithOverlay);
modalEditProfile.addEventListener('click', closeWithOverlay);
modalEditAvatar.addEventListener('click', closeWithOverlay);

//валидация форм
enableValidation(validationConfig);