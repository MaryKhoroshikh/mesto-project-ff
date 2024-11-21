// функция открытия модального окна
function openModal (popup) {
    popup.classList.add('popup_is-opened', 'popup_is-animated');

    const exit = popup.querySelector('.popup__close');
    const innerPopup = popup.querySelector('.popup__content');
    
    exit.addEventListener('click', closeModal);
    
    innerPopup.addEventListener('click', (event) => event.stopPropagation());
    popup.addEventListener('click', closeModal);

    document.addEventListener('keydown', escapeModal);

    function escapeModal(event) {
        if (event.code === "Escape") {
            popup.classList.remove('popup_is-opened');
            document.removeEventListener('keydown', escapeModal);
        }
    }
}

// функция закрытия модального окна
function closeModal(event) {
    event.target.closest('.popup').classList.remove('popup_is-opened');
    event.target.closest('.popup').removeEventListener('click', closeModal);
    event.target.removeEventListener('click', closeModal);
}

export { openModal, closeModal}