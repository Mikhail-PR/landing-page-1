import { Form } from '../../form/scripts/form';

new Form({
    formEl: document.querySelector('.footer .form'),

    emailProps: {
        errStyleClass: 'form--email-alert',
        errAlertClass: 'form__enter-email-alert',
        errText: 'Incorrect email',
    }
});