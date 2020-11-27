import { Checkbox } from '../abstract-classes/_checkbox';

export class Privacy extends Checkbox {
    constructor(props, form) {
        super(props, form);
        this.inputEl = this.formEl.querySelector('.form__license > .form__checkbox');
    }
}