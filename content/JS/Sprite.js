'use strict';

((Resources) => {
    function UnitSprite(_options) {

        let options = Object.assign({
            orientation: 'right',
            position: {
                x: 0,
                y: 0
            }
        }, _options);

        var that = {
            _x: options.position.x,
            _y: options.position.y,
            get position() {
                return {
                    x: this._x,
                    y: this._y
                };
            },
            set position(coords) {
                this._x = Math.min(Math.max(0, coords.x), this.context.canvas.clientWidth);
                this._y = Math.min(Math.max(0, coords.y), this.context.canvas.clientHeight);
            },

            _moveToX: options.position.x,
            _moveToY: options.position.y,

            get moveToPosition() {
                return {
                    x: this._moveToX,
                    y: this._moveToY
                };
            },
            set moveToPosition(coords) {
                this._moveToX = coords.x;
                this._moveToY = coords.y;
            },
            _isSelected: false,
            set isSelected(val) {
                this._isSelected = val;
            },
            get isSelected() {
                return this._isSelected;
            },
            isMoved() {
                return this.moveToPosition.x !== this.position.x || this.moveToPosition.y !== this.position.y;
            },

            isInRect(coords) {
                return coords.x >= this.renderPosition.x && coords.y >= this.renderPosition.y && coords.x <= this.renderPosition.x + this.size.width && coords.y <= this.renderPosition.y + this.size.height;
            },

            eventsHandler(type, coords) {
                switch (type) {
                    case 'press':
                        var isInRect = this.isInRect(coords);

                        if (this.isSelected && !isInRect) {
                            this.walk(coords);
                        }

                        this.isSelected = isInRect;
                        break;
                }
            },

            get frames() {
                return this.animationData[this.stateName];
            },
            _frameIndex: 0,
            get frame() {
                return this.frames[this._frameIndex];
            },
            get size() {
                return {
                    width: this.frame.width,
                    height: this.frame.height
                };
            },
            get halfSize() {
                return {
                    width: this.size.width / 2,
                    height: this.size.height / 2
                };
            },
            get animationData() {
                return options.animationData;
            },

            _stateName: 'rest',
            get stateName() {
                return this._stateName;
            },
            set stateName(val) {
                this._stateName = val;
            },

            zIndex: 1,
            easingValue: 0.3,
            get image() {
                return Resources.get(this.animationData.src);
            },

            rest() {
                this.stateName = 'rest';
            },

            walk(coords) {
                this.stateName = 'walk';
                this.moveToPosition = coords;
            },

            context: options.context,

            get renderPosition() {
                return {
                    x: Math.min(Math.max(0, this.position.x - this.halfSize.width), this.context.canvas.clientWidth - this.size.width),
                    y: Math.min(Math.max(0, this.position.y - this.size.height), this.context.canvas.clientHeight - this.size.height)
                };
            },

            render() {
                this.context.save();

                //translate image
                //this.context.scale(-1, 1);

                this.context.drawImage(
                    this.image,
                    this.frame.x,
                    this.frame.y,
                    this.size.width,
                    this.size.height,
                    this.renderPosition.x,
                    this.renderPosition.y,
                    this.size.width,
                    this.size.height);

                this.context.restore();

                return this;
            },

            update() {
                if (this.isMoved) {
                    let easingValue = this.easingValue,
                        xDistance = this.moveToPosition.x - this.position.x,
                        yDistance = this.moveToPosition.y - this.position.y,
                        distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

                    if (distance < this.halfSize.width) {
                        easingValue = 1;
                    }

                    this.position = {
                        x: this.position.x + xDistance * easingValue,
                        y: this.position.y + yDistance * easingValue
                    };
                } else {
                    this.stateName = 'rest';
                }

                this._frameIndex += 1;

                if (this._frameIndex >= this.frames.length - 1) {
                    this._frameIndex = 0;
                }

                return this;
            }
        };

        return that;
    }

    window.UnitSprite = UnitSprite;
})(window.Resources);

((Resources) => {
    var LayerSprite = function(_options) {

        let options = Object.assign({
            orientation: 'right',
            position: {
                x: 0,
                y: 0
            }
        }, _options);

        var that = {
            zIndex: 0,
            context: options.context,
            image: Resources.get('content/images/battle-backgrounds/CmBkDrDd.png'),
            eventsHandler() {

            },
            get size() {
                return {
                    width: options.width,
                    height: options.height
                };
            },
            render() {
                this.context.drawImage(
                    this.image,
                    0,
                    0,
                    this.size.width,
                    this.size.height,
                    0,
                    0,
                    this.size.width,
                    this.size.height);

                return this;
            },
            update() {
                return this;
            }
        };

        return that;
    };

    window.LayerSprite = LayerSprite;
})(window.Resources);
