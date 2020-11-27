import { ComplexValidation } from './abstract-classes/_complex-validation';
import { Name } from './concrete-classes/_name';
import { Email } from './concrete-classes/_email';
import { Text } from './concrete-classes/_text';
import { Phone } from './concrete-classes/_phone';
import { City } from './concrete-classes/_city';
import { Product } from './concrete-classes/_product';
import { Privacy } from './concrete-classes/_privacy';

export class Form {
    constructor(props) {
        this.formEl = props.formEl;
        this.fields = [];
        this.init(props);
    }

    init(props) {
        if (props.nameProps) this.fields.push(new Name(props.nameProps, this));
        if (props.emailProps) this.fields.push(new Email(props.emailProps, this));
        if (props.textProps) this.fields.push(new Text(props.textProps, this));
        if (props.phoneProps) this.fields.push(new Phone(props.phoneProps, this));
        if (props.cityProps) this.fields.push(new City(props.cityProps, this));
        if (props.productProps) this.fields.push(new Product(props.productProps, this));
        if (props.privacytProps) this.fields.push(new Privacy(props.privacytProps, this));

        this.formEl.addEventListener('input', e => this.fields.forEach(element => element.listenFunc(e)));

        this.formEl.addEventListener('submit', e => {
            e.preventDefault();

            this.fields.forEach(element => !(element instanceof ComplexValidation) ? element.listenFunc() : element.listenFunc(null, true));
            this.isIncorrect = this.fields.some(element => element.isCorrect === false);

            if (!this.isIncorrect) this.formEl.submit();
        });
    }
}