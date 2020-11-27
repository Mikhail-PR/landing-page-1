import { Form } from '../../form/scripts/form';

new Form({
    formEl: document.querySelector('.section-contacts .form'),

    phoneProps: {
        errStyleClass: 'form--phone-alert',
        errAlertClass: 'form__enter-phone-alert',
        errText: 'Incorrect phone',
    },

    cityProps: {
        errStyleClass: 'form--city-alert',
        errAlertClass: 'form__enter-city-alert',
        errText: 'Select city',
    },

    productProps: {
        errStyleClass: 'form--product-alert',
        errAlertClass: 'form__enter-product-alert',
        errText: 'Select product',
    },

    privacytProps: {
        errStyleClass: 'form--privacy-alert',
        errAlertClass: 'form__enter-privacy-alert',
        errText: 'Accept the privacy policy',
    },
});