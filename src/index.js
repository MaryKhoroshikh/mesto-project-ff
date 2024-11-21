import { initialCards } from './cards.js'
import { createCard, deleteCard, likeCard, openImage } from './card.js'
import { openModal, closeModal } from './modal.js'
import './pages/index.css'
// 
const container = document.querySelector('.content');
const placesSection = container.querySelector('.places');
const profileSection = container.querySelector('.profile');
const placesContainer = placesSection.querySelector('.places__list');

//вывод карточек
initialCards.forEach(function (elem) {
    placesContainer.append(createCard(elem, deleteCard, likeCard, openImage));
});

//открытие модального окна редактирования профиля
const buttonEditProfile = profileSection.querySelector('.profile__edit-button');
const modalEditProfile = document.querySelector('.popup_type_edit');

buttonEditProfile.addEventListener('click', () => openModal(modalEditProfile));

// работа с модальным окном редактирования профиля
const formElement = document.forms.edit_profile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
//находим значения установленные в профиле и записываем их в поля формы
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector('.profile__description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    const job = jobInput.value;
    const name = nameInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = job;

    modalEditProfile.classList.remove('popup_is-opened');
}

formElement.addEventListener('submit', handleFormSubmit);

//открытие модального окна добавления карточки
const buttonAddCard = profileSection.querySelector('.profile__add-button');
const modalAddCard = document.querySelector('.popup_type_new-card');

buttonAddCard.addEventListener('click', () => openModal(modalAddCard));

const formAddCard = document.forms.new_place;
const place_nameInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;

function addCardFormSubmit(evt) {
    evt.preventDefault();
    
    const place = place_nameInput.value;
    const link = linkInput.value;
    const elem = {name: place, link: link}
    placesContainer.prepend(createCard(elem, deleteCard, likeCard, openImage));

    modalAddCard.classList.remove('popup_is-opened');
    place_nameInput.value = '';
    linkInput.value = '';
}

formAddCard.addEventListener('submit', addCardFormSubmit);