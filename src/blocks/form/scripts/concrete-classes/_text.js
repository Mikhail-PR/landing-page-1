import { Field } from '../abstract-classes/_field';

export class Text extends Field {
    constructor(props, form) {
        super(props, form);
        this.inputEl = this.formEl.querySelector('.form__text');
    }
}