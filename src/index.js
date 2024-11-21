// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
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

//спринт 6

//открытие модального окна редактирования профиля

const buttonEditProfile = profileSection.querySelector('.profile__edit-button');
const modalEditProfile = document.querySelector('.popup_type_edit');

buttonEditProfile.addEventListener('click', () => openModal(modalEditProfile));

// работа с модальным окном редактирования профиля
// Находим форму в DOM
const formElement = document.forms.edit_profile;
// Находим поля формы в DOM
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
//находим значения установленные в профиле и записываем их в поля формы
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector('.profile__description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;
// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    const job = jobInput.value;
    const name = nameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    modalEditProfile.classList.remove('popup_is-opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//добавление карточки
//открытие модального окна добавления карточки
const buttonAddCard = profileSection.querySelector('.profile__add-button');
const modalAddCard = document.querySelector('.popup_type_new-card');

buttonAddCard.addEventListener('click', () => openModal(modalAddCard));

const formAddCard = document.forms.new_place;
// Находим поля формы в DOM
const place_nameInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;

function addCardFormSubmit(evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    const place = place_nameInput.value;
    const link = linkInput.value;
    const elem = {name: place, link: link}
    placesContainer.prepend(createCard(elem, deleteCard));

    modalAddCard.classList.remove('popup_is-opened');
    place_nameInput.value = '';
    linkInput.value = '';
}

formAddCard.addEventListener('submit', addCardFormSubmit);