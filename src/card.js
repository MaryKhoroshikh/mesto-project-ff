import { openModal } from './modal.js'

// функция создания
function createCard(cardData, deleteCard, likeCard, openImage) {
    // параметры
    const titleValue = cardData.name;
    // темплейт
    const placeTemplate = document.querySelector('#card-template').content;
    // клонируем
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
    // наполняем
    const cardImage = placeElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = titleValue;
    placeElement.querySelector('.card__title').textContent = titleValue;
    // вешаем слушатель на кнопку удалить
    placeElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    //вешаем слушатель на кнопку лайка карточки
    placeElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    //вешаем слушатель на изображение карточки
    cardImage.addEventListener('click', openImage);
    // возвращаем карточку
    return placeElement;
}
// функция удаления
function deleteCard (event) {
    event.target.closest('.places__item').remove();
}
//функция лайка
function likeCard (event) {
    event.target.classList.toggle('card__like-button_is-active');
}
//функция просмотра изображения
function openImage (event) {
    const modalImage = document.querySelector('.popup_type_image');
    const image = modalImage.querySelector('.popup__image');
    const caption = modalImage.querySelector('.popup__caption');
    image.src = event.target.src;
    caption.textContent = event.target.alt;
    openModal(modalImage);
}

export { createCard, deleteCard, likeCard, openImage }