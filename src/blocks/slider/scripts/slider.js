import { Slide } from './_slide.js';
import { NavPanel } from './_nav-panel.js';

export class Slider {
    constructor(props) {
        this.id = props.id;
        this.disabledStyleClasses = props.disabledStyleClasses;
        this.onlyDisabledStyleClasses = props.onlyDisabledStyleClasses;
        this.onlyDisabledStyleFunctions = props.onlyDisabledStyleFunctions;
        this.onlyActiveStyleFunctions = props.onlyActiveStyleFunctions;
        this.endless = props.endless;
        this.margin = props.margin;
        this.transition = props.transition;
        this.activeRaise = props.activeRaise;

        this.sliderEl = document.querySelector(this.id);
        this.sliderWindowEl = this.sliderEl.querySelector('.slider__window');
        this.slidesEl = this.sliderEl.querySelectorAll('.slider__window > *');
        this.slidesCount = this.slidesEl.length;
        this.slides = [];
        this.widthTrack = 0;

        this.init();
    }

    init() {
        for (let i = 0; i < this.slidesCount; i++) {
            let slide = new Slide(this, this.slidesEl[i], i);
            this.slides.push(slide);
        }

        this.leftEdge = this.slides[0];
        this.rightEdge = this.slides[this.slidesCount - 1];

        this.navPanel = new NavPanel(this);

        this.slides.forEach(slide => {
            slide.setStyle();

            this.widthTrack += this.margin + slide.width;
        });

        if (this.endless) {
            for (let i = 0; i < Math.trunc(this.slidesCount / 2); i++) {
                this.insertLeft();
            }
        }

        this.listenersInit(true)
    }

    listenersInit(listen) {
        if (listen) {
            this.swichListenFunc = event => {
                if (this.navPanel.btnNextEl.contains(event.target)) {
                    this.navPanel.next();
                }
                else if (this.navPanel.btnPrevEl.contains(event.target)) {
                    this.navPanel.prev();
                }
                else if (this.navPanel.navPointsEl) {
                    if (this.navPanel.navPointsEl.contains(event.target)) {
                        this.navPanel.navPointsSwich(event.target);
                    }
                }
            }

            this.resizeListenFunc = event => {
                if (event.type === 'resize' && this.pageWidthChangeCheck()) {
                    setTimeout(() => this.scalingTranslate(), this.transition);
                }
            }

            this.sliderEl.addEventListener('click', this.swichListenFunc);
            window.addEventListener('resize', this.resizeListenFunc);
            this.navPanel.mouseSwipe(true);

        } else {
            this.sliderEl.removeEventListener('click', this.swichListenFunc);
            window.removeEventListener('resize', this.resizeListenFunc);
            this.navPanel.mouseSwipe(false);
        }
    }

    insertRight() {
        this.leftEdge.setRightEdge()
    }

    insertLeft() {
        this.rightEdge.setLeftEdge()
    }

    scalingTranslate() {
        let curSlide = this.navPanel.curSlideNum;
        this.widthTrack = 0;

        this.slides.forEach(slide => {
            slide.width = slide.slideEl.offsetWidth;
            this.widthTrack += this.margin + slide.width;
            slide.rightMoveInit = false;

            slide.primaryTranslateInit();
            slide.setTranslate();
        });

        if (this.endless) {
            this.leftEdge = this.slides[0];
            this.rightEdge = this.slides[this.slidesCount - 1];

            if (this.endless) {
                for (let i = 0; i < Math.trunc(this.slidesCount / 2); i++) {
                    this.insertLeft();
                }
            }
        }

        this.navPanel.curSlideNum = 0;
        this.navPanel.setPosition(curSlide);
        this.isMinScope = true;
    }

    pageWidthChangeCheck() {
        this.savedPageWidth;

        if (this.savedPageWidth !== document.body.clientWidth) {
            this.savedPageWidth = document.body.clientWidth;
            return true;
        } else {
            return false;
        }
    }
}