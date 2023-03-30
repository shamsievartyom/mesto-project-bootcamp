import * as validation from './validate';
import { profileName, profileDescription, popupEdit, popupEditNameInput, popupEditDescriptionInput, popupAdd, placesGrid, popupAddForm, popupAddNameInput, popupAddDescriptionInput, popupEditForm, popupEditSubmit, popupAddSubmit, popupImage } from './utils'
import { createCard } from './card';
import { fillPopupInputs } from '../index';

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc)
}

function handleSubmitEditPopup(event) {
    event.preventDefault();

    profileName.textContent = popupEditNameInput.value
    profileDescription.textContent = popupEditDescriptionInput.value;
    closePopup(popupEdit)
}

function handleEditButton() {
    fillPopupInputs();

    //validation before open 
    const inputList = popupEditForm.querySelectorAll('.profile-edit-form__input');
    inputList.forEach((inputElement) => {
        validation.hideError(popupEditForm, inputElement, { inputErrorClass: 'profile-edit-form__input_invalid' });
    });
    validation.toggleButton(popupEditForm, popupEditSubmit);

    openPopup(popupEdit);
}

function handleSubmitAddPopup(event) {
    event.preventDefault();

    const placeCard = {
        name: popupAddNameInput.value,
        link: popupAddDescriptionInput.value,
    }
    placesGrid.prepend(createCard(placeCard));
    popupAddForm.reset();
    validation.toggleButton(popupAddForm, popupAddSubmit);
    closePopup(popupAdd);
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        if (popupEdit.classList.contains('popup_opened')) closePopup(popupEdit)
        else if (popupAdd.classList.contains('popup_opened')) closePopup(popupAdd)
        else if (popupImage.classList.contains('popup_opened')) closePopup(popupImage)
    }
}

export { openPopup, closePopup, handleSubmitEditPopup, handleEditButton, handleSubmitAddPopup };