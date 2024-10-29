// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// 
const container = document.querySelector('.content');
const placesSection = container.querySelector('.places');
const places = placesSection.querySelector('.places__list');

// функция создания
function addCard(imageValue, titleValue, deleteCard) {
    // функция удаления
    function deleteCard (evn) {
        evn.target.parentElement.remove();
    }
    // темплейт
    const placeTemplate = document.querySelector('#card-template').content;
    // клонируем
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
    // наполняем
    placeElement.querySelector('.card__image').src = imageValue;
    placeElement.querySelector('.card__title').textContent = titleValue;
    // вешаем слушатель на кнопку удалить
    deleteBtn = placeElement.querySelector('.card__delete-button');
    deleteBtn.addEventListener('click', deleteCard);
    // добавляем
    places.append(placeElement);
}

//вывод карточек
initialCards.forEach(function (elem) {
    let link = elem.link;
    let name = elem.name;
    addCard(link, name);
});