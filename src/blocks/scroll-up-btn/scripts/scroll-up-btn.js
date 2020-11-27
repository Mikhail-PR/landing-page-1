const upBtnEl = document.querySelector('.scroll-up-btn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        upBtnEl.classList.add('scroll-up-btn--show');
    } else {
        upBtnEl.classList.remove('scroll-up-btn--show');
    }
});