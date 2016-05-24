/**
*   Play CSS animation.
*
*   $elm - jQuery unit block
*   animation - name of animation (rest, attack, defence, walk, die)
*   duration - total duration time of animation (milliseconds)
*   callback - callback function triggered when animation ends
*/
var play = function ($elm, animation, duration, callback) {
    if (!$elm || !animation) {
        return; // nothing to animate
    }
    
    $elm.removeClass('rest');
    $elm.addClass(animation);
    if (!duration) {
        // get default duration from CSS
        var cssDuration = $elm.css('-moz-animation-duration') ||
                          $elm.css('-o-animation-duration') ||
                          $elm.css('-webkit-animation-duration') ||
                          $elm.css('animation-duration');
        
        duration = cssDuration.match('[0-9.]+')[0] * 1000;
    } else {
        var cssDuration = duration / 1000 + 's';
    }
    
    var setCssDuration = function($elm, dur) {
        $elm.css({'-moz-animation-duration': dur, 
                  '-o-animation-duration': dur, 
                  '-webkit-animation-duration': dur, 
                  'animation-duration': dur});
    }
    
    setCssDuration($elm, cssDuration);

    // wait for CSS animation ends
    $elm.delay(duration).queue(function () {
        setCssDuration($elm, '');
        if (animation != 'die') {
            $elm.removeClass(animation);
            $elm.addClass('rest');
        }
        $elm.dequeue();
        if (callback) callback();
    });
}
