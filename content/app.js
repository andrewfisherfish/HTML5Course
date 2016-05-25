var initModule = (function() {
    var btn = document.getElementById('do');
    var text = document.getElementById('text');

    text.value = window.localStorage.getItem('text');

    btn.addEventListener('click', function(e) {
        window.localStorage.setItem('text', text.value);
    });
}());

var workerTest = (function() {

    var blob = new Blob([
        document.querySelector('#worker1').textContent
    ], {
        type: "text/javascript"
    });

    var myWorker = new Worker(window.URL.createObjectURL(blob));

    myWorker.postMessage('some message');

    myWorker.addEventListener('message', function(e) {
        console.log(e.data);
    });

}());


var notifsDemo = (function() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Hi there!");
            }
        }, function() {
            console.log('access default');
        });
    } else {
        console.log('access denied');
    }
}());


var draggerDropper = (function() {
    if (Modernizr.draganddrop) {
        // Browser supports HTML5 DnD.
    } else {
        // Fallback to a library solution.
    }

    document.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text', 'Customized text');
        event.dataTransfer.effectAllowed = 'copy';
    }, false);
}());
