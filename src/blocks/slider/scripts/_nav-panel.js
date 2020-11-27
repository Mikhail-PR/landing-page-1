export class NavPanel {
    constructor(slider) {
        this.slider = slider;
        this.btnNextEl = this.slider.sliderEl.querySelector('.btn-next');
        this.btnPrevEl = this.slider.sliderEl.querySelector('.btn-prev');
        this.counterEl = this.slider.sliderEl.querySelector('.slider__counter');

        this.curSlideNum = 0;
        this.counterInit();
        this.setCount();
        this.addNavPoints();
    }

    next() {
        if (this.curSlideNum < this.slider.slidesCount - 1) {
            this.curSlideNum++;
            this.setCount();

            this.slider.slides.forEach(slide => {
                slide.leftMove();
            });

            if (this.slider.endless) {
                this.slider.insertRight();
            }

        } else if (this.slider.endless) {
            this.curSlideNum = 0;
            this.setCount();

            this.slider.slides.forEach(slide => {
                slide.leftMove();
            });

            this.slider.insertRight();
        }
    }

    prev() {
        if (this.curSlideNum !== 0) {
            this.curSlideNum--;
            this.setCount();

            this.slider.slides.forEach(slide => {
                slide.rightMove();
            });

            if (this.slider.endless) {
                this.slider.insertLeft();
            }

        } else if (this.slider.endless) {
            this.curSlideNum = this.slider.slidesCount - 1;
            this.setCount();

            this.slider.slides.forEach(slide => {
                slide.rightMove();
            });

            this.slider.insertLeft();
        }
    }

    setPosition(targetPosition) {
        if (this.curSlideNum < targetPosition) {
            for (let i = this.curSlideNum; i < targetPosition; i++) {
                this.next();
            }
        }

        if (this.curSlideNum > targetPosition) {
            for (let i = this.curSlideNum; i > targetPosition; i--) {
                this.prev();
            }
        }
    }

    navPointsSwich(clickedPoint) {
        let targetPosition = [...this.navPointsEl.children].indexOf(clickedPoint);

        this.setPosition(targetPosition);
    }

    addNavPoints() {
        this.navPointsEl = this.slider.sliderEl.querySelector('.slider__nav-points');

        if (this.navPointsEl) {
            this.pointsEl = [];

            this.slider.slides.forEach(slide => {
                let pointEl = document.createElement('div');
                pointEl.classList.add('slider__btn-point');
                this.navPointsEl.append(pointEl);

                this.pointsEl.push(pointEl);
                slide.pointEl = pointEl;
            });
        }
    }

    mouseSwipe(listen) {
        if (listen) {
            this.mousedownListener = event => {
                if (this.slider.slides[this.curSlideNum].slideEl.contains(event.target)) {
                    this.slider.sliderWindowEl.addEventListener('mousemove', this.mousemoveListener);
                    this.slider.sliderWindowEl.addEventListener('mouseup', this.mouseupListener);
                    this.slider.sliderWindowEl.addEventListener('touchmove', this.mousemoveListener);
                    this.slider.sliderWindowEl.addEventListener('touchend', this.mouseupListener);
                    this.rightRemoveSelect = false;
                    this.leftRemoveSelect = false;
                    let tuch = null;

                    if (event.type === 'mousedown') {
                        tuch = event;
                    } else if (event.type === 'touchstart') {
                        tuch = event.touches[0];
                    }

                    this.downX = tuch.screenX;
                    this.slider.slides[this.curSlideNum].selectSlide(true);
                }
            }

            this.mousemoveListener = event => {
                let tuch = null;

                if (event.type === 'mousemove') {
                    tuch = event;
                } else if (event.type === 'touchmove') {
                    tuch = event.touches[0];
                }

                if (tuch.screenX < this.downX && !this.rightRemoveSelect) {
                    this.rightRemoveSelect = true;
                    this.leftRemoveSelect = false;
                    this.nextSelect = true;
                    this.prevSelect = false;

                    this.slider.slides[this.curSlideNum].selectSlide(true, false, true);
                }

                if (tuch.screenX > this.downX && !this.leftRemoveSelect) {
                    this.leftRemoveSelect = true;
                    this.rightRemoveSelect = false;
                    this.prevSelect = true;
                    this.nextSelect = false;

                    this.slider.slides[this.curSlideNum].selectSlide(true, true, false);
                }
            }

            this.mouseupListener = () => {
                this.slider.sliderWindowEl.removeEventListener('mousemove', this.mousemoveListener);
                this.slider.sliderWindowEl.removeEventListener('mouseup', this.mouseupListener);
                this.slider.sliderWindowEl.removeEventListener('touchmove', this.mousemoveListener);
                this.slider.sliderWindowEl.removeEventListener('touchend', this.mouseupListener);

                this.slider.slides[this.curSlideNum].selectSlide(false);

                if (this.nextSelect) {
                    this.next()
                } else if (this.prevSelect) {
                    this.prev()
                }

                this.prevSelect = false;
                this.nextSelect = false;
            }

            this.slider.sliderWindowEl.addEventListener('mousedown', this.mousedownListener);
            this.slider.sliderWindowEl.addEventListener('touchstart', this.mousedownListener);

        } else {
            this.slider.sliderWindowEl.removeEventListener('mousedown', this.mousedownListener);
            this.slider.sliderWindowEl.removeEventListener('mousemove', this.mousemoveListener);
            this.slider.sliderWindowEl.removeEventListener('mouseup', this.mouseupListener);
            this.slider.sliderWindowEl.removeEventListener('touchstart', this.mousedownListener);
            this.slider.sliderWindowEl.removeEventListener('touchmove', this.mousemoveListener);
            this.slider.sliderWindowEl.removeEventListener('touchend', this.mouseupListener);
        }
    }

    counterInit() {
        if (this.counterEl) {
            this.curNumEl = this.slider.sliderEl.querySelector('.slider__cur-num');
            this.countEl = this.slider.sliderEl.querySelector('.slider__count');
            this.countEl.textContent = '/' + this.slider.slidesCount;
        }
    }

    setCount() {
        if (this.counterEl) {
            const num = this.curSlideNum + 1;
            this.curNumEl.textContent = num < 10 ? '0' + num : num;
        }
    }
}