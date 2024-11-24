function openModal (popup) {
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', closeWithEscape);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeWithEscape);
}

function closeWithEscape(event) {
    if (event.code === "Escape") {
        const openPopup = document.querySelector('.popup_is-opened');
        closeModal(openPopup);
    }
}

function closeWithOverlay(event) {
    if(event.target === event.currentTarget) {
      closeModal(event.target);
    }
}

export { openModal, closeModal, closeWithOverlay }