import { Field } from './_field';

export class Checkbox extends Field {
    correctCheck() {
        if (!this.inputEl.checked) {
            this.showErr();
        } else {
            this.removeErr();
        }
    }
}