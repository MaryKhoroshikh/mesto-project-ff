// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
import { initialCards } from './cards.js'
import { createCard, deleteCard } from './card.js'
import './pages/index.css'
// 
const container = document.querySelector('.content');
const placesSection = container.querySelector('.places');
const profileSection = container.querySelector('.profile');
const placesContainer = placesSection.querySelector('.places__list');

//вывод карточек
initialCards.forEach(function (elem) {
    placesContainer.append(createCard(elem, deleteCard));
});

//спринт 6

//открытие модального окна редактирования профиля

const buttonEditProfile = profileSection.querySelector('.profile__edit-button');
const modalEditProfile = document.querySelector('.popup_type_edit');

// функция открытия модального окна
function openModal (popup) {
    popup.classList.add('popup_is-opened');

    const exit = popup.querySelector('.popup__close');
    const innerPopup = popup.querySelector('.popup__content');
    
    exit.addEventListener('click', () => closeModal(popup));
    
    innerPopup.addEventListener('click', (evt) => evt.stopPropagation());
    popup.addEventListener('click', () => closeModal(popup));

    document.addEventListener('keydown', function (evt) {
        if (evt.code === "Escape") {
            closeModal(popup);
        }
    });
}

// функция закрытия модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    //удаление слушателей не сделано!
}

buttonEditProfile.addEventListener('click', () => openModal(modalEditProfile));

// работа с модальным окном редактирования профиля
// Находим форму в DOM
const formElement = modalEditProfile.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
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

