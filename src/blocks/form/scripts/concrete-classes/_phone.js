import { ComplexValidation } from '../abstract-classes/_complex-validation';

export class Phone extends ComplexValidation {
    constructor(props, form) {
        super(props, form);
        this.inputEl = this.formEl.querySelector('.form__phone');
    }

    validate(phoneNumber) {
        const re = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g;
        return re.test(String(phoneNumber).toLowerCase());
    }
}