import './index.css';
import { popupEdit, buttonForCloseEdit, popupEditForm, popupAdd, placesGrid, popupAddForm, buttonForCloseAdd, popupImage, buttonForCloseImage, popupEditNameInput, profileName, popupEditDescriptionInput, profileDescription } from './components/utils';
import * as validation from './components/validate';
import { openPopup, closePopup, handleSubmitEditPopup, handleEditButton, handleSubmitAddPopup } from './components/modal'
import { createCard } from './components/card';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];

function fillPopupInputs() {
    popupEditNameInput.value = profileName.textContent;
    popupEditDescriptionInput.value = profileDescription.textContent;
}

initialCards.reverse().forEach(obj => placesGrid.prepend(createCard(obj)));//default cards

//image popup
buttonForCloseImage.addEventListener('click', () => closePopup(popupImage));

//add popup
popupAddForm.addEventListener('submit', handleSubmitAddPopup);
buttonForCloseAdd.addEventListener('click', () => closePopup(popupAdd));
document.querySelector('.profile__add-btn').addEventListener('click', () => openPopup(popupAdd));

//edit popup
popupEditForm.addEventListener('submit', handleSubmitEditPopup);
buttonForCloseEdit.addEventListener('click', () => closePopup(popupEdit));
document.querySelector('.profile__edit-btn').addEventListener('click', handleEditButton);

//click outside popup window for close
[popupAdd, popupEdit, popupImage].forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup)
        }
    })
})

const configValidation = {
    formSelector: '.profile-edit-form',
    inputFieldSelector: '.profile-edit-form__input',
    buttonSubmitSelector: '.profile-edit-form__submit-btn',
    inputErrorClass: 'profile-edit-form__input_invalid',
}

validation.enableValidation(configValidation);

export { fillPopupInputs }