import './index.css';
import { popupEditAvatarForm, buttonForCloseEditAvatar, popupEditAvatar, profileAvatar, popupEdit, buttonForCloseEdit, popupEditForm, popupAdd, placesGrid, popupAddForm, buttonForCloseAdd, popupImage, buttonForCloseImage, popupEditNameInput, profileName, popupEditDescriptionInput, profileDescription } from './components/utils';
import * as validation from './components/validate';
import { openPopup, closePopup, handleSubmitEditPopup, handleEditButton, handleSubmitAddPopup, handleSubmitEditAvatarPopup } from './components/modal'
import { createCard } from './components/card';
import { getUser, getInitialCards } from './components/api'
import { errorShow } from './components/error';

Promise.all([
    getUser()
        .then((user) => { fillUserInfo(user) }),
    getInitialCards()
        .then((cards) => { cards.reverse().forEach(obj => placesGrid.prepend(createCard(obj))) })
]).catch((err) => { errorShow(err.message) })

function fillUserInfo(user) {
    if (user.name) profileName.textContent = user.name;
    if (user.about) profileDescription.textContent = user.about;
    if (user.avatar) profileAvatar.src = `${user.avatar}`;
}

function fillPopupInputs() {
    popupEditNameInput.value = profileName.textContent;
    popupEditDescriptionInput.value = profileDescription.textContent;
}

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

//editAvatar popup
popupEditAvatarForm.addEventListener('submit', handleSubmitEditAvatarPopup);
buttonForCloseEditAvatar.addEventListener('click', () => closePopup(popupEditAvatar));
document.querySelector('.profile__avatar-btn').addEventListener('click', () => openPopup(popupEditAvatar));

//click outside popup window for close
[popupAdd, popupEdit, popupImage, popupEditAvatar].forEach((popup) => {
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

export { fillPopupInputs, fillUserInfo }