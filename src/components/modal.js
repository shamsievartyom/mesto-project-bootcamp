import * as validation from './validate';
import { profileName, profileDescription, popupEdit, popupEditNameInput, popupEditDescriptionInput, popupAdd, placesGrid, popupAddForm, popupAddNameInput, popupAddDescriptionInput, cardTemplate, popupImage, popupImagePicture, popupImageTitle, popupEditForm, popupEditSubmit } from './utils'
import { createCard } from './card';

function fillPopupInputs() {
    popupEditNameInput.value = profileName.textContent;
    popupEditDescriptionInput.value = profileDescription.textContent;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
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
        validation.checkValid(popupEditForm, inputElement, { inputErrorClass: 'profile-edit-form__input_invalid' });
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
    closePopup(popupAdd);
}



export { fillPopupInputs, openPopup, closePopup, handleSubmitEditPopup, handleEditButton, handleSubmitAddPopup };