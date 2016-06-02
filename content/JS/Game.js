'use strict';

((Resources, UnitSprite, LayerSprite, Keyboard, Pointer) => {
    var GameObjectsList = (function() {
        var list = [];

        function sort(reverse) {
            return list = list.sort(function(a, b) {
                return (a.zIndex > b.zIndex && reverse !== true) || (a.zIndex < b.zIndex && reverse === true);
            });
        }

        function add(o) {
            list.push(o);
            sort();
            return this;
        }

        function all() {
            return sort();
        }

        function forEach(action, reverse) {
            sort(reverse).forEach(action);
        }

        return {
            add,
            sort,
            all,
            forEach
        };
    }());

    let Game = ((GameObjectsList) => {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 480;
        document.body.appendChild(canvas);

        //var stateMachine = null;

        var pointerInst = Pointer(canvas);

        pointerInst.press = () => {
            GameObjectsList.forEach((entity) => {
                entity.eventsHandler('press', pointerInst.position);
            }, true);
        };

        function update() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            GameObjectsList.forEach((entity) => {
                entity.update();
            });
        }

        function render(lagOffset) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            GameObjectsList.forEach((entity) => {
                entity.render(lagOffset);
            });
        }

        var start = (() => {
            let fps = 60,
                start = Date.now(),
                frameDuration = 8000 / fps,
                lag = 0;

            let loop = () => {
                requestAnimationFrame(loop);

                let current = Date.now(),
                    elapsed = current - start;
                start = current;
                lag += elapsed;

                while (lag >= frameDuration) {
                    update();
                    lag -= frameDuration;
                }

                let lagOffset = lag / frameDuration;
                render(lagOffset);
            };

            return loop;
        })();

        function init() {
            // var UnitsSettings = Resources.get('content/units.json').units;
            // console.log(UnitsSettings);

            var SpritesData = Resources.get('content/sprites-data.json');

            GameObjectsList.add(LayerSprite({
                context: context,
                width: canvas.width,
                height: canvas.height
            }));

            GameObjectsList.add(UnitSprite({
                context: context,
                unitType: 'crauser',
                animationData: SpritesData['crauser'],
                position: {
                    x: 0,
                    y: 100
                },
                ticksPerFrame: 9
            }));

            var aaa = UnitSprite({
                context: context,
                unitType: 'crauser',
                animationData: SpritesData['crauser'],
                position: {
                    x: 0,
                    y: 300
                },
                ticksPerFrame: 5
            });

            GameObjectsList.add(aaa);
        }

        return {
            init,
            start
        };

    })(GameObjectsList);

    window.onload = function() {
        Resources.load([
            'content/sprites-data.json',
            'content/units.json',
            'content/images/units-sprites/crusader-left.png',
            'content/images/units-sprites/crusader-right.png',
            'content/images/battle-backgrounds/CmBkDrDd.png'
        ]);

        Resources.onReady(() => {
            Game.init();
            Game.start();
        });
    };

})(
    window.Resources,
    window.UnitSprite,
    window.LayerSprite,
    window.Keyboard,
    window.Pointer
);
