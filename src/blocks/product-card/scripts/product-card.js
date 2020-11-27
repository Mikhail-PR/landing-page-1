const cardsContainerEl = document.querySelector('.slider__window');

const showInfo = e => {
    const btnEl = e.target.closest('.product-card__btn');

    if (btnEl) {
        const cardEl = btnEl.closest('.product-card');
        const cardElIsActive = !cardEl.classList.contains('product-card--disabled');

        if (cardElIsActive) {
            cardEl.classList.remove('product-card--info-disable');

            btnChange(btnEl, 'btn product-card__link btn--medium btn--filled btn--shadow btn--min', 'SOLICITAR INFO');
            mobileMarginCalc(cardEl);
        }
    }
}

export const btnChange = function (btnEl, btnClass, btnText) {
    if (!btnEl) btnEl = this.slideEl.querySelector('.product-card__link');

    if (btnEl) {
        const btnTextEl = btnEl.querySelector('.btn__text');
        btnEl.className = '';

        btnEl.className = btnClass || 'btn product-card__btn btn--medium btn--transparent btn--min';
        btnTextEl.textContent = btnText || 'VER DETALLES';
    }
}

cardsContainerEl.addEventListener('click', showInfo);




export const mobileMarginCalc = cardEl => {
    const clientWidth = document.body.clientWidth;

    if (clientWidth <= 853) {
        if (!cardEl) cardEl = cardsContainerEl.querySelector(':not(product-card--disabled)');
        const textElIsDisable = cardEl.classList.contains('product-card--info-disable');

        if (textElIsDisable) {
            cardsContainerEl.style.marginBottom = '0px';
        } else {
            marginAdd(cardEl);
        }
    } else {
        cardsContainerEl.style.marginBottom = '0px';
    }
}

const marginAdd = cardEl => {
    const dropdownEl = cardEl.querySelector('.product-card__text');
    const dropdownElHeight = dropdownEl.offsetHeight;
    cardsContainerEl.style.marginBottom = `${dropdownElHeight + 20}px`;
}

window.addEventListener('resize', () => mobileMarginCalc());
