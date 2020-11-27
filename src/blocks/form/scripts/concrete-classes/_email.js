import { ComplexValidation } from '../abstract-classes/_complex-validation';

export class Email extends ComplexValidation {
    constructor(props, form) {
        super(props, form);
        this.inputEl = this.formEl.querySelector('.form__email');
    }

    validate(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}