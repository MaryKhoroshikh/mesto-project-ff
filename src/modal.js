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

export { openModal, closeModal }