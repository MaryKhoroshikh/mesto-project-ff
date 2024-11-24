import { initialCards } from './cards.js'
import { createCard, deleteCard, likeCard} from './card.js'
import { openModal, closeModal, closeWithOverlay } from './modal.js'
import './pages/index.css'

const container = document.querySelector('.content');
const placesSection = container.querySelector('.places');
const placesContainer = placesSection.querySelector('.places__list');

const profileSection = container.querySelector('.profile');
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector('.profile__description');
const buttonAddCard = profileSection.querySelector('.profile__add-button');
const buttonEditProfile = profileSection.querySelector('.profile__edit-button');

const modalImage = document.querySelector('.popup_type_image');
const image = modalImage.querySelector('.popup__image');
const caption = modalImage.querySelector('.popup__caption');
const modalAddCard = document.querySelector('.popup_type_new-card');
const modalEditProfile = document.querySelector('.popup_type_edit');

const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formAddCard = document.forms.new_place;
const place_nameInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;

function editProfileFormSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(modalEditProfile);
}

function addCardFormSubmit(event) {
    const elem = {name: place_nameInput.value, link: linkInput.value};
    event.preventDefault();
    placesContainer.prepend(createCard(elem, deleteCard, likeCard, openImagePopup));
    closeModal(modalAddCard);
    formAddCard.reset();
}

function openImagePopup (src, alt) {
    image.src = src;
    caption.textContent = alt;
    openModal(modalImage);
}

initialCards.forEach(function (elem) {
    placesContainer.append(createCard(elem, deleteCard, likeCard, openImagePopup));
});

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(modalEditProfile);
});
buttonAddCard.addEventListener('click', () => openModal(modalAddCard));

formAddCard.addEventListener('submit', addCardFormSubmit);
formEditProfile.addEventListener('submit', editProfileFormSubmit);

modalImage.querySelector('.popup__close').addEventListener('click', () => closeModal(modalImage));
modalAddCard.querySelector('.popup__close').addEventListener('click', () => closeModal(modalAddCard));
modalEditProfile.querySelector('.popup__close').addEventListener('click', () => closeModal(modalEditProfile));
modalImage.addEventListener('click', closeWithOverlay);
modalAddCard.addEventListener('click', closeWithOverlay);
modalEditProfile.addEventListener('click', closeWithOverlay);