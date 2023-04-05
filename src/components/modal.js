import * as validation from './validate';
import { popupEditAvatarSubmit, popupEditAvatarForm, popupEditAvatarInput, profileName, profileDescription, popupEdit, popupEditNameInput, popupEditDescriptionInput, popupAdd, placesGrid, popupAddForm, popupAddNameInput, popupAddDescriptionInput, popupEditForm, popupEditSubmit, popupAddSubmit, popupImage, popupEditAvatar } from './utils'
import { createCard } from './card';
import { fillPopupInputs, fillUserInfo } from '../index';
import { changeUserInfo, addCard, changeUserAvatar } from './api';
import { errorShow } from './error';

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

    popupEditSubmit.value = 'Сохранение...';

    const user = {
        name: popupEditNameInput.value,
        about: popupEditDescriptionInput.value,
    }
    changeUserInfo(user)
        .then((user) => {
            fillUserInfo(user);
            closePopup(popupEdit)
        })
        .catch((err) => {
            errorShow(err.message)
        })
        .finally(() => { popupEditSubmit.value = 'Сохранить' })
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

    popupAddSubmit.value = 'Сохранение...';

    const placeCard = {
        name: popupAddNameInput.value,
        link: popupAddDescriptionInput.value,
    }
    addCard(placeCard)
        .then((card) => {
            placesGrid.prepend(createCard(card));
            popupAddForm.reset();
            validation.toggleButton(popupAddForm, popupAddSubmit);
            closePopup(popupAdd);
        })
        .catch(err => {
            errorShow(err.message)
        })
        .finally(() => { popupAddSubmit.value = 'Создать' })
}

function handleSubmitEditAvatarPopup(event) {
    event.preventDefault();

    popupEditAvatarSubmit.value = 'Сохранение...';

    changeUserAvatar({ avatar: popupEditAvatarInput.value })
        .then((user) => {
            fillUserInfo(user);
            popupEditAvatarForm.reset();
            closePopup(popupEditAvatar);
        })
        .catch(err => { errorShow(err.message); })
        .finally(() => { popupEditAvatarSubmit.value = 'Сохранить' })
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        if (popupEdit.classList.contains('popup_opened')) closePopup(popupEdit)
        else if (popupAdd.classList.contains('popup_opened')) closePopup(popupAdd)
        else if (popupImage.classList.contains('popup_opened')) closePopup(popupImage)
        else if (popupEditAvatar.classList.contains('popup_opened')) closePopup(popupEditAvatar)
    }
}

export { openPopup, closePopup, handleSubmitEditPopup, handleEditButton, handleSubmitAddPopup, handleSubmitEditAvatarPopup };