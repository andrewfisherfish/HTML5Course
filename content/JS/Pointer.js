'use strict';

((window) => {
    window.Pointer = (element, scale = 1) => {
        let pointer = {
            element,
            scale,
            _x: 0,
            _y: 0,
            get x() {
                return this._x / this.scale;
            },
            get y() {
                return this._y / this.scale;
            },
            get centerX() {
                return this.x;
            },
            get centerY() {
                return this.y;
            },
            get position() {
                return {
                    x: this.x,
                    y: this.y
                };
            },
            isDown: false,
            isUp: true,
            tapped: false,
            downTime: 0,
            elapsedTime: 0,

            press: undefined,
            release: undefined,
            tap: undefined,
            move: undefined,

            moveHandler(event) {
                event.preventDefault();

                let element = event.target;
                this._x = (event.pageX - element.offsetLeft);
                this._y = (event.pageY - element.offsetTop);
                if (this.move) {
                    this.move();
                }
            },
            touchmoveHandler(event) {
                event.preventDefault();

                let element = event.target;
                this._x = (event.targetTouches[0].pageX - element.offsetLeft);
                this._y = (event.targetTouches[0].pageY - element.offsetTop);
            },
            downHandler(event) {
                event.preventDefault();

                this.isDown = true;
                this.isUp = false;
                this.tapped = false;
                this.downTime = Date.now();
                if (this.press) {
                    this.press();
                }
            },
            touchstartHandler(event) {
                event.preventDefault();

                let element = event.target;
                this._x = event.targetTouches[0].pageX - element.offsetLeft;
                this._y = event.targetTouches[0].pageY - element.offsetTop;
                this.isDown = true;
                this.isUp = false;
                this.tapped = false;
                this.downTime = Date.now();
                if (this.press) {
                    this.press();
                }
            },
            upHandler(event) {
                event.preventDefault();

                this.elapsedTime = Math.abs(this.downTime - Date.now());
                if (this.elapsedTime <= 200 && this.tapped === false) {
                    this.tapped = true;
                    if (this.tap) {
                        this.tap();
                    }
                }
                this.isUp = true;
                this.isDown = false;
                if (this.release) {
                    this.release();
                }
            },
            touchendHandler(event) {
                event.preventDefault();

                this.elapsedTime = Math.abs(this.downTime - Date.now());
                if (this.elapsedTime <= 200 && this.tapped === false) {
                    this.tapped = true;
                    if (this.tap) {
                        this.tap();
                    }
                }
                this.isUp = true;
                this.isDown = false;
                if (this.release) {
                    this.release();
                }
            }
        };

        element.addEventListener('mousemove', pointer.moveHandler.bind(pointer), false);

        element.addEventListener('mousedown', pointer.downHandler.bind(pointer), false);

        window.addEventListener('mouseup', pointer.upHandler.bind(pointer), false);

        element.addEventListener('touchmove', pointer.touchmoveHandler.bind(pointer), false);

        element.addEventListener('touchstart', pointer.touchstartHandler.bind(pointer), false);

        element.addEventListener('touchend', pointer.touchendHandler.bind(pointer), false);

        element.style.touchAction = 'none';

        return pointer;
    };
})(window);
