import { initialCards } from './cards.js'
import { createCard, deleteCard, likeCard} from './card.js'
import { openModal, closeModal, closeWithOverlay } from './modal.js'
import './pages/index.css'
// 
const container = document.querySelector('.content');
const placesSection = container.querySelector('.places');
const profileSection = container.querySelector('.profile');
const placesContainer = placesSection.querySelector('.places__list');
const modalImage = document.querySelector('.popup_type_image');
const image = modalImage.querySelector('.popup__image');
const caption = modalImage.querySelector('.popup__caption');

//вывод карточек
initialCards.forEach(function (elem) {
    placesContainer.append(createCard(elem, deleteCard, likeCard, openImage));
});

//открытие модального окна редактирования профиля
const buttonEditProfile = profileSection.querySelector('.profile__edit-button');
const modalEditProfile = document.querySelector('.popup_type_edit');

buttonEditProfile.addEventListener('click', () => {
    //записываем значения установленные в профиле в поля формы
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(modalEditProfile);
});

// работа с модальным окном редактирования профиля
const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
//находим значения установленные в профиле
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector('.profile__description');

function editProfileFormSubmit(event) {
    event.preventDefault();
    const job = jobInput.value;
    const name = nameInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = job;

    closeModal(modalEditProfile);
}

formEditProfile.addEventListener('submit', editProfileFormSubmit);

//открытие модального окна добавления карточки
const buttonAddCard = profileSection.querySelector('.profile__add-button');
const modalAddCard = document.querySelector('.popup_type_new-card');

buttonAddCard.addEventListener('click', () => openModal(modalAddCard));

const formAddCard = document.forms.new_place;
const place_nameInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;

function addCardFormSubmit(event) {
    event.preventDefault();
    
    const place = place_nameInput.value;
    const link = linkInput.value;
    const elem = {name: place, link: link}
    placesContainer.prepend(createCard(elem, deleteCard, likeCard, openImage));

    closeModal(modalAddCard);
    formAddCard.reset();
}

formAddCard.addEventListener('submit', addCardFormSubmit);

//функция просмотра изображения
function openImage (event) {
    image.src = event.target.src;
    caption.textContent = event.target.alt;
    openModal(modalImage);
}

//слушатели закрытия модального окна по крестику
modalImage.querySelector('.popup__close').addEventListener('click', () => closeModal(modalImage));
modalAddCard.querySelector('.popup__close').addEventListener('click', () => closeModal(modalAddCard));
modalEditProfile.querySelector('.popup__close').addEventListener('click', () => closeModal(modalEditProfile));

//слушатели закрытия модального окна по клику на overlay
modalImage.addEventListener('click', closeWithOverlay);
modalAddCard.addEventListener('click', closeWithOverlay);
modalEditProfile.addEventListener('click', closeWithOverlay);