// функция открытия модального окна
function openModal (popup) {
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', escapeModal);
}

// функция закрытия модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escapeModal);
}

//функция закрытия открытого модального окна нажатием esc
function escapeModal(event) {
    if (event.code === "Escape") {
        const openPopup = document.querySelector('.popup_is-opened');
        closeModal(openPopup);
    }
}

//функция закрытия открытого модального окна нажатием на overlay

function closeWithOverlay(event) {
    if(event.target === event.currentTarget) {
      closeModal(event.target);
    }
}

export { openModal, closeModal, closeWithOverlay }