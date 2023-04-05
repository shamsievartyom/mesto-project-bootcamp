const error = document.querySelector('.error-shower');
let timer;

function errorShow(err) {
    error.textContent = err;
    error.classList.add('popup_opened')
    clearTimeout(timer);
    timer = setTimeout(function () { error.classList.remove('popup_opened') }, 5000)
}

export { errorShow }