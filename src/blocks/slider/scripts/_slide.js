export class Slide {
    constructor(slider, slideEl, slideNum) {
        this.slider = slider;
        this.slideEl = slideEl;
        this.width = this.slideEl.offsetWidth;
        this.slideNum = slideNum;
        this.activeRaise = this.slider.activeRaise;
        this.rightMoveInit = false;
        this.raise = 0;

        this.init();
        this.setTranslate();
    }

    init() {
        this.slideEl.style.position = 'absolute';
        this.slideEl.style.left = '50%';
        this.slideEl.style.WebkitTransition = `${this.slider.transition}ms`;
        this.primaryTranslateInit();
    }

    primaryTranslateInit() {
        if (this.slideNum > 0) {
            this.prevSlide = this.slider.slides[this.slideNum - 1];
            this.leftTranslate = this.prevSlide.width + this.slider.margin;
            this.startTranslate = this.prevSlide.width + this.prevSlide.startTranslate + this.slider.margin;
        } else {
            this.startTranslate = -(this.width / 2);
            this.leftTranslate = this.width + this.slider.margin;
            this.active = true;
        }
        this.curTranslate = this.startTranslate;
    }

    setTranslate() {
        this.slideEl.style.transform = `translate(${this.curTranslate}px, ${this.raise}px)`;
    }

    leftMove() {
        this.curTranslate -= this.leftTranslate;
        this.setTranslate();
        this.setStyle();
    }

    rightMove() {
        if (!this.rightMoveInit) {
            if (this.slideNum !== this.slider.slidesCount - 1) {
                this.nextSlide = this.slider.slides[this.slideNum + 1];
                this.rightTranslate = this.nextSlide.width + this.slider.margin;
            } else {
                this.rightTranslate = this.width + this.slider.margin;
            }
            this.rightMoveInit = true;
        }

        this.curTranslate += this.rightTranslate;
        this.setTranslate();
        this.setStyle();
    }

    checkActive() {
        this.active = this.curTranslate === this.slider.slides[0].startTranslate;
    }

    setStyle() {
        this.checkActive();

        if (this.active) {
            this.slider.disabledStyleClasses.forEach(disableClass => {
                this.slideEl.classList.remove(disableClass);
            });

            if (this.slider.onlyActiveStyleFunctions) {
                this.slider.onlyActiveStyleFunctions.forEach(activeFunc => {
                    activeFunc.call(this);
                });
            }

            if (this.activeRaise) {
                this.raise = this.activeRaise;
                this.setTranslate();
            }

            if (this.slider.navPanel.pointsEl) {
                this.slider.navPanel.pointsEl[this.slideNum].classList.add('slider__btn-point--active');
            }

            if (!this.slider.endless) {
                if (this === this.slider.leftEdge) {
                    this.slider.navPanel.btnPrevEl.classList.add('slider__btn--disabled');

                } else if (this === this.slider.rightEdge) {
                    this.slider.navPanel.btnNextEl.classList.add('slider__btn--disabled');

                } else {
                    this.slider.navPanel.btnPrevEl.classList.remove('slider__btn--disabled');
                    this.slider.navPanel.btnNextEl.classList.remove('slider__btn--disabled');
                }
            }
        } else {
            this.slider.disabledStyleClasses.forEach(disableClass => {
                this.slideEl.classList.add(disableClass);
            });

            if (this.slider.onlyDisabledStyleClasses) {
                this.slider.onlyDisabledStyleClasses.forEach(disableClass => {
                    this.slideEl.classList.add(disableClass);
                });
            }

            if (this.activeRaise) {
                this.raise = 0;
                this.setTranslate();
            }

            if (this.slider.onlyDisabledStyleFunctions) {
                this.slider.onlyDisabledStyleFunctions.forEach(disableFunc => {
                    disableFunc.call(this);
                });
            }

            if (this.slider.navPanel.pointsEl) {
                this.slider.navPanel.pointsEl[this.slideNum].classList.remove('slider__btn-point--active');
            }
        }
    }

    setLeftEdge() {
        this.curTranslate -= this.slider.widthTrack;
        this.slider.leftEdge = this;

        if (this.slideNum === 0) {
            this.slider.rightEdge = this.slider.slides[this.slider.slidesCount - 1];
        } else {
            this.slider.rightEdge = this.slider.slides[this.slideNum - 1];
        }
        this.copyPasteNode();
        this.setTranslate();
    }

    setRightEdge() {
        this.curTranslate += this.slider.widthTrack;
        this.slider.rightEdge = this;

        if (this.slideNum === this.slider.slidesCount - 1) {
            this.slider.leftEdge = this.slider.slides[0];
        } else {
            this.slider.leftEdge = this.slider.slides[this.slideNum + 1];
        }

        this.copyPasteNode();
        this.setTranslate();
    }

    copyPasteNode() {
        let cutSlide = this.slideEl.cloneNode(true);
        this.slideEl.remove();
        this.slideEl = cutSlide;
        this.slider.sliderWindowEl.append(this.slideEl);
    }

    selectSlide(selected, isLeft, isRight) {
        if (selected) {
            if (this.activeRaise) {
                this.raise = this.activeRaise - 15;
            } else {
                this.raise = -15;
            }
        } else {
            if (this.activeRaise) {
                this.raise = this.activeRaise;
            } else {
                this.raise = 0;
            }
            this.curTranslate = this.slider.slides[0].startTranslate;
        }

        if (isLeft) {
            this.curTranslate = this.slider.slides[0].startTranslate;
            this.curTranslate += 30;
        }

        if (isRight) {
            this.curTranslate = this.slider.slides[0].startTranslate;
            this.curTranslate -= 30;
        }

        this.setTranslate();
    }
}