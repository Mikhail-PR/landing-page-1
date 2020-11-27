export class Field {
    constructor(props, form) {
        this.form = form;
        this.formEl = form.formEl;

        this.errStyleClass = props.errStyleClass;
        this.errAlertClass = props.errAlertClass;
        this.errText = props.errText;

        this.listenFunc = (e, isBtnCheck) => {
            if (e) {
                if (e.target === this.inputEl) this.correctCheck();
            } else {
                !isBtnCheck ? this.correctCheck() : this.correctCheck(true);
            }
        }
    }

    correctCheck() {
        this.inputEl.value === '' ? this.showErr() : this.removeErr();
    }

    showErr() {
        if (!this.errEl) this.createErrEl();

        this.formEl.append(this.errEl);
        this.formEl.classList.add(this.errStyleClass);
        this.isCorrect = false;
    }

    removeErr() {
        if (this.errEl) this.errEl.remove();

        this.formEl.classList.remove(this.errStyleClass);
        this.isCorrect = true;
    }

    createErrEl() {
        this.errEl = document.createElement('p');
        this.errEl.classList.add(this.errAlertClass);
        this.errEl.textContent = this.errText;
    }
}