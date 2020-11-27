import { Field } from '../abstract-classes/_field';

export class Name extends Field {
    constructor(props, form) {
        super(props, form);
        this.inputEl = this.formEl.querySelector('.form__name');
    }
}