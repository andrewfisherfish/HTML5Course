'use strict';

((window) => {
    window.Keyboard = (keyCode) => {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;

        key.downHandler = (event) => {
            event.preventDefault();

            if (event.keyCode !== key.code) {
                return;
            }

            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        };

        key.upHandler = (event) => {
            event.preventDefault();

            if (event.keyCode !== key.code) {
                return;
            }

            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        };

        window.addEventListener('keydown', key.downHandler.bind(key), false);

        window.addEventListener('keyup', key.upHandler.bind(key), false);

        return key;
    };
})(window);
