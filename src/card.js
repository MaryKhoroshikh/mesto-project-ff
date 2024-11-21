// функция создания
function createCard(cardData, deleteCard) {
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
    // возвращаем карточку
    return placeElement;
}

// функция удаления
function deleteCard (event) {
    event.target.closest('.places__item').remove();
}

export { createCard, deleteCard }