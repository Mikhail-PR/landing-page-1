import { Slider } from '../../slider/scripts/slider.js';
import { mobileMarginCalc } from '../../product-card/scripts/product-card.js';
import { btnChange } from '../../product-card/scripts/product-card.js';

new Slider({
    id: '#section-slider-slider',
    disabledStyleClasses: ['product-card--disabled'],
    onlyDisabledStyleClasses: ['product-card--info-disable'],
    onlyDisabledStyleFunctions: [btnChange],
    onlyActiveStyleFunctions: [mobileMarginCalc],
    endless: true,
    margin: 145,
    transition: 2000,
    activeRaise: 150
});