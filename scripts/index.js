// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// 
const container = document.querySelector('.content');
const placesSection = container.querySelector('.places');
const placesContainer = placesSection.querySelector('.places__list');

// функция создания
function createCard(Value, deleteCard) {
    // функция удаления
    function deleteCard (evn) {
        evn.target.parentElement.remove();
    }
    // параметры
    const imageValue = Value[0];
    const titleValue = Value[1];
    // темплейт
    const placeTemplate = document.querySelector('#card-template').content;
    // клонируем
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
    // наполняем
    const cardImage = placeElement.querySelector('.card__image');
    cardImage.src = imageValue;
    cardImage.alt = titleValue;
    placeElement.querySelector('.card__title').textContent = titleValue;
    // вешаем слушатель на кнопку удалить
    placeElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    // возвращаем карточку
    return placeElement;
}

// функция удаления
function deleteCard (evn) {
    evn.target.parentElement.remove();
}

//вывод карточек
initialCards.forEach(function (elem) {
    const link = elem.link;
    const name = elem.name;
    const values = [{link}, {name}];
    placesContainer.append(createCard(values));
});