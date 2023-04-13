import * as validation from './validate';
import { popupEditAvatarSubmit, popupEditAvatarForm, popupEditAvatarInput, popupEdit, popupEditNameInput, popupEditDescriptionInput, popupAdd, placesGrid, popupAddForm, popupAddNameInput, popupAddDescriptionInput, popupEditForm, popupEditSubmit, popupAddSubmit, popupImage, popupEditAvatar, popupDeleteCard } from './utils'
import { createCard } from './card';
import { fillPopupInputs, fillUserInfo } from '../index';
import { changeUserInfo, addCard, changeUserAvatar, deleteCard } from './api';
import { errorShow } from './error';

const EditFormInputList = popupEditForm.querySelectorAll('.profile-edit-form__input');

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
    EditFormInputList.forEach((inputElement) => {
        validation.hideError(popupEditForm, inputElement, { inputErrorClass: 'profile-edit-form__input_invalid' });
    });
    validation.toggleButton(popupEditForm, popupEditSubmit);

    openPopup(popupEdit);
}

function handleEditAvatarButton() {
    validation.toggleButton(popupEditAvatarForm, popupEditAvatarSubmit);
    openPopup(popupEditAvatar);
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

function handleSubmitDeleteCard() {
    deleteCard(popupDeleteCard.deleteInfo.id)
        .then(() => {
            popupDeleteCard.deleteInfo.node.remove();
            closePopup(popupDeleteCard);
        })
        .catch((err) => { errorShow(err.message) })
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

export { handleEditAvatarButton, openPopup, closePopup, handleSubmitEditPopup, handleEditButton, handleSubmitAddPopup, handleSubmitEditAvatarPopup, handleSubmitDeleteCard };