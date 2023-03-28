import './index.css';

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_profile-edit');
const buttonForCloseEdit = popupEdit.querySelector('.profile-edit-form__close-icon');
const popupEditNameInput = popupEdit.querySelector('.name-input');
const popupEditDescriptionInput = popupEdit.querySelector('.description-input');
const popupEditSubmit = popupEdit.querySelector('.profile-edit-form__submit-btn');
const popupEditForm = popupEdit.querySelector('.profile-edit-form');

const popupAdd = document.querySelector('.popup_type_add-card');
const placesGrid = document.querySelector('.places-grid');
const cardTemplate = document.querySelector('.card-template');
const popupAddForm = popupAdd.querySelector('.profile-edit-form');
const popupAddNameInput = popupAdd.querySelector('.name-input');
const popupAddDescriptionInput = popupAdd.querySelector('.description-input');
const buttonForCloseAdd = popupAdd.querySelector('.profile-edit-form__close-icon');

const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup-image__picture');
const popupImageTitle = popupImage.querySelector('.popup-image__title');
const buttonForCloseImage = popupImage.querySelector('.profile-edit-form__close-icon');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Зелёные горы',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Озеро среди снега',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Серые 9-ти этажки',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Мелкая растительность возле гор',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Железная дорога в лесу',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Скала возле водоёма',
    }
];

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
        checkValid(popupEditForm, inputElement, { inputErrorClass: 'profile-edit-form__input_invalid' });
    });
    toggleButton(popupEditForm, popupEditSubmit);

    openPopup(popupEdit);
}

function createCard(obj) {
    const card = cardTemplate.content.cloneNode('.places-grid__card');
    const cardImage = card.querySelector('.place__image');
    cardImage.src = obj.link;
    obj.alt ? cardImage.alt = obj.alt : cardImage.alt = obj.name;//add alt=name if alt=undefined
    card.querySelector('.place__name').textContent = obj.name;
    card.querySelector('.place__like-btn').addEventListener('click', (event) => {//add listener 4 like
        event.target.classList.toggle('place__like-btn_active');
    })
    card.querySelector('.place__delete-btn').addEventListener('click', (event) => {//add listener 4 delete
        event.target.closest('.places-grid__card').remove();
    })
    card.querySelector('.place__image-btn').addEventListener('click', () => {//add listener 4 image
        popupImagePicture.src = cardImage.src;
        popupImagePicture.alt = cardImage.alt;
        popupImageTitle.textContent = obj.name;
        openPopup(popupImage);
    })
    return card;
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

initialCards.reverse().forEach(obj => placesGrid.prepend(createCard(obj)));//default cards

buttonForCloseImage.addEventListener('click', () => closePopup(popupImage));
popupImage.addEventListener('click', () => closePopup(popupImage));
popupImagePicture.addEventListener('click', (evt) => evt.stopPropagation());
//add popup
popupAddForm.addEventListener('submit', handleSubmitAddPopup);
buttonForCloseAdd.addEventListener('click', () => closePopup(popupAdd));
document.querySelector('.profile__add-btn').addEventListener('click', () => openPopup(popupAdd));
popupAdd.addEventListener('click', () => closePopup(popupAdd));
//edit popup
popupEditForm.addEventListener('submit', handleSubmitEditPopup);
buttonForCloseEdit.addEventListener('click', () => closePopup(popupEdit));
document.querySelector('.profile__edit-btn').addEventListener('click', handleEditButton);
popupEdit.addEventListener('click', () => closePopup(popupEdit));
//esc for exit all popups
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        if (popupEdit.classList.contains('popup_opened')) closePopup(popupEdit)
        else if (popupAdd.classList.contains('popup_opened')) closePopup(popupAdd)
        else if (popupImage.classList.contains('popup_opened')) closePopup(popupImage)
    }
});
//popups window stop propagation
document.querySelectorAll('.popup-edit-window').forEach((el) => {
    el.addEventListener('click', (evt) => evt.stopPropagation());
})

//VALIDATION

const configValidation = {
    formSelector: '.profile-edit-form',
    inputFieldSelector: '.profile-edit-form__input',
    buttonSubmitSelector: '.profile-edit-form__submit-btn',
    inputErrorClass: 'profile-edit-form__input_invalid',
}

function showError(formElement, inputElement, errorMessage, config) {
    const errorField = formElement.querySelector('#error-' + inputElement.id);
    errorField.textContent = errorMessage;
    inputElement.classList.add(config.inputErrorClass)
}

function hideError(formElement, inputElement, config) {
    const errorField = formElement.querySelector('#error-' + inputElement.id);
    errorField.textContent = '';
    inputElement.classList.remove(config.inputErrorClass)
}

function checkValid(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
        hideError(formElement, inputElement, config);
    } else {
        showError(formElement, inputElement, inputElement.validationMessage, config);
    }
}

function toggleButton(formElement, buttonSubmitForm) {
    if (formElement.checkValidity()) {
        buttonSubmitForm.disabled = false;
    } else {
        buttonSubmitForm.disabled = true;
    }
}

function setEventListener(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputFieldSelector);
    const buttonSubmitForm = formElement.querySelector(config.buttonSubmitSelector);

    toggleButton(formElement, buttonSubmitForm);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValid(formElement, inputElement, config);
            toggleButton(formElement, buttonSubmitForm);
        });
    });
}

function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector);
    formsList.forEach((formElement) => {
        setEventListener(formElement, config);
    });
}

enableValidation(configValidation);