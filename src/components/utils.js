const profileAvatar = document.querySelector('.profile__avatar-image');
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
const popupAddSubmit = popupAdd.querySelector('.profile-edit-form__submit-btn');
const buttonForCloseAdd = popupAdd.querySelector('.profile-edit-form__close-icon');

const popupEditAvatar = document.querySelector('.popup_type_profile-image-edit');
const buttonForCloseEditAvatar = popupEditAvatar.querySelector('.profile-edit-form__close-icon');
const popupEditAvatarForm = popupEditAvatar.querySelector('.profile-edit-form');
const popupEditAvatarInput = popupEditAvatar.querySelector('.description-input');
const popupEditAvatarSubmit = popupEditAvatar.querySelector('.profile-edit-form__submit-btn');

const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup-image__picture');
const popupImageTitle = popupImage.querySelector('.popup-image__title');
const buttonForCloseImage = popupImage.querySelector('.profile-edit-form__close-icon');

const popupDeleteCard = document.querySelector('.popup_type_confirm-delete');
const buttonForCloseDeleteCard = popupDeleteCard.querySelector('.profile-edit-form__close-icon');
const buttonSubmitDeleteCard = popupDeleteCard.querySelector('.profile-edit-form__submit-btn');

export { buttonSubmitDeleteCard, buttonForCloseDeleteCard, popupDeleteCard, popupEditAvatarSubmit, popupEditAvatarInput, popupEditAvatarForm, buttonForCloseEditAvatar, popupEditAvatar, profileAvatar, profileName, profileDescription, popupEdit, buttonForCloseEdit, popupEditNameInput, popupEditDescriptionInput, popupEditSubmit, popupEditForm, popupAdd, placesGrid, cardTemplate, popupAddForm, popupAddNameInput, popupAddDescriptionInput, buttonForCloseAdd, popupImage, popupImagePicture, popupImageTitle, buttonForCloseImage, popupAddSubmit }