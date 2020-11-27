import { Field } from './_field';

export class ComplexValidation extends Field {
    correctCheck(isBtnCheck) {
        let inputText = this.inputEl.value;

        if (!this.validate(inputText)) {
            this.showErr();

        } else {
            this.removeErr();
        }

        if (inputText === '' && !isBtnCheck) {
            this.removeErr();
        }
    }
}