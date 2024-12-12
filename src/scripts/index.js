import '../pages/index.css'
import { createCard, deleteCard, toggleLikeCard, cardDataForDeletion, eventForDeletion} from './card.js'
import { openModal, closeModal, closeWithOverlay } from './modal.js'
import { enableValidation, clearValidation, validationConfig } from './validation.js'
import { getInitialCards, getProfile, postCard, patchProfile, patchAvatar, deleteFromServerCard } from './api.js'

export const ownerID = "51e16379f74f19a5d50fc63e";
const textDefaultSave = 'Сохранить';
const textDefaultDelete = 'Да';
const textSaving = 'Сохранение...';
const textDeletion = 'Удаление...';

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
const place_nameInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;

function handleEditProfile(event) {
    event.preventDefault();
    renderLoading(true, formEditProfile, textSaving, textDefaultSave);
    patchProfile(nameInput,jobInput)
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
        .finally(() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
            renderLoading(false, formEditProfile, textSaving, textDefaultSave);
            closeModal(modalEditProfile);  
        });
}

function handleAddCard(event) {
    event.preventDefault();
    renderLoading(true, formAddCard, textSaving, textDefaultSave);
    postCard({name: place_nameInput.value, link: linkInput.value, owner: {_id: ownerID}})
        .then((res) => {
            placesContainer.prepend(createCard(res, deleteCard, toggleLikeCard, openImagePopup, ownerID));
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
    patchAvatar(avatarInput)
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
        .finally(() => {
            profileImage.style.backgroundImage = `url("${avatarInput.value}")`;
            closeModal(modalEditAvatar);
            renderLoading(false, formEditAvatar, textSaving, textDefaultSave);
            formEditAvatar.reset();
        });
}

function handleConfirmDeletion(event) {
    event.preventDefault();
    renderLoading(true, formConfirmDeletion, textDeletion, textDefaultDelete);
    deleteFromServerCard(cardDataForDeletion)
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
        .finally(() => {
            deleteCard(eventForDeletion);
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
    if (isLoading) {
        form.querySelector('.popup__button').textContent = textLoading;
    } else {
        form.querySelector('.popup__button').textContent = textDefault;
    }
}

Promise.all([getInitialCards, getProfile]).then(() => {
    getProfile()
        .then((result) => {
            profileTitle.textContent = result.name;
            profileDescription.textContent = result.about;
            profileImage.style.backgroundImage = `url("${result.avatar}")`;
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`));
    getInitialCards()
        .then((array) => {
            array.forEach(function (elem) { 
                placesContainer.append(createCard(elem, deleteCard, toggleLikeCard, openImagePopup, ownerID));
            });
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`));
});

//валидация форм
enableValidation(validationConfig);

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
formConfirmDeletion.addEventListener('submit', handleConfirmDeletion);

modalBigImage.querySelector('.popup__close').addEventListener('click', () => closeModal(modalBigImage));
modalAddCard.querySelector('.popup__close').addEventListener('click', () => closeModal(modalAddCard));
modalEditProfile.querySelector('.popup__close').addEventListener('click', () => closeModal(modalEditProfile));
modalEditAvatar.querySelector('.popup__close').addEventListener('click', () => closeModal(modalEditAvatar));
modalConfirmDeletion.querySelector('.popup__close').addEventListener('click', () => closeModal(modalConfirmDeletion));
modalBigImage.addEventListener('click', closeWithOverlay);
modalAddCard.addEventListener('click', closeWithOverlay);
modalEditProfile.addEventListener('click', closeWithOverlay);
modalEditAvatar.addEventListener('click', closeWithOverlay);
modalConfirmDeletion.addEventListener('click', closeWithOverlay);