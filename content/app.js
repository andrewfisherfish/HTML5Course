//http://www.html5rocks.com/en/tutorials/offline/storage/#apis
var initModule = (function() {
    var btn = document.getElementById('do');
    var text = document.getElementById('text');

    text.value = window.localStorage.getItem('text');

    btn.addEventListener('click', function(e) {
        window.localStorage.setItem('text', text.value);
    });
}());

//http://www.html5rocks.com/en/tutorials/workers/basics/
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

//https://developer.mozilla.org/en-US/docs/Web/API/notification
var notifsDemo = (function() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        //var notification = new Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                //var notification = new Notification("Hi there!");
            }
        }, function() {
            console.log('access default');
        });
    } else {
        console.log('access denied');
    }
}());

//http://www.html5rocks.com/en/tutorials/dnd/basics/#toc-dataTransfer
var draggerDropper = (function() {

    function handleСontainerDragTarget(e) {
        switch (e.type) {
            case 'dragenter':
                this.classList.add('enter');
                break;
            case 'dragleave':
                this.classList.remove('enter');
                break;
            case 'dragover':
                this.classList.add('enter');
                e.preventDefault();
                break;
            case 'drop':
                this.classList.remove('enter');
                var elId = e.dataTransfer.getData('text/html');
                var el = document.getElementById(elId);

                if (el) {
                    this.appendChild(el);

                    break;
                }

                if (e.dataTransfer.files.length > 0) {
                    e.preventDefault();
                }
                break;
        }
    }

    function handleDragTarget(e) {
        switch (e.type) {
            case 'dragenter':
                this.classList.add('enter');
                break;
            case 'dragleave':
                this.classList.remove('enter');
                break;
            case 'dragover':
                this.classList.add('enter');
                e.preventDefault();
                break;
            case 'drop':
                this.classList.remove('enter');

                if (e.dataTransfer.files.length > 0) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        this.style.backgroundImage = 'url(' + e.target.result + ')';
                    }.bind(this);

                    reader.readAsDataURL(e.dataTransfer.files[0]);
                }

                e.preventDefault();
                break;
        }
    }

    function handleDragSource(e) {
        switch (e.type) {
            case 'dragstart':
                var msg = e.target.id;
                this.classList.add('start');
                e.dataTransfer.setData('text/html', msg);
                break;
            case 'dragend':
                this.classList.remove('start');
                break;
        }
    }

    var cols = document.querySelectorAll('.dragable-container');

    [].forEach.call(cols, function(col) {
        col.addEventListener('dragstart', handleDragSource, false);
        col.addEventListener('dragend', handleDragSource, false);
        col.addEventListener('dragover', handleDragTarget, false);
        col.addEventListener('dragenter', handleDragTarget, false);
        col.addEventListener('dragleave', handleDragTarget, false);
        col.addEventListener('drop', handleDragTarget, false);
    });

    var containers = document.querySelectorAll('.dropable-container');

    [].forEach.call(containers, function(container) {
        container.addEventListener('dragover', handleСontainerDragTarget, false);
        container.addEventListener('dragenter', handleСontainerDragTarget, false);
        container.addEventListener('dragleave', handleСontainerDragTarget, false);
        container.addEventListener('drop', handleСontainerDragTarget, false);
    });

}());


//http://blog.teamtreehouse.com/building-an-html5-text-editor-with-the-filesystem-apis
//http://www.html5rocks.com/en/tutorials/file/filesystem/
var fileWriter = (function() {
    // Check for support.
    if (window.requestFileSystem) {

    } else {
        console.log('fileAPI not supported');
        return;
    }

    var opt_errorHandler = function() {

    };

    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(fs) {

        // fs.root is a DirectoryEntry object.
        fs.root.getFile('someVeryCustomName.txt', {
            create: true
        }, function(fileEntry) {

            fileEntry.createWriter(function(writer) { // writer is a FileWriter object.

                writer.onwrite = function(e) {};
                writer.onerror = function(e) {};

                var bb = new BlobBuilder();
                bb.append('Hello World!');

                writer.write(bb.getBlob('text/plain'));

            }, opt_errorHandler);
        });

    }, opt_errorHandler);
}());


var geoLocator = (function() {
    // check for Geolocation support
    if (navigator.geolocation) {
        console.log('Geolocation is supported!');
    } else {
        console.log('Geolocation is not supported for this Browser/OS version yet.');
        return;
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = (lat2 - lat1).toRad();
        var dLon = (lon2 - lon1).toRad();
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    };

    var errorsHandler = function() {
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from locaton provider)
        //   3: timed out
    };

    var startPos;

    navigator.geolocation.getCurrentPosition(function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    }, errorsHandler);

    navigator.geolocation.watchPosition(function(position) {
        document.getElementById('currentLat').innerHTML = position.coords.latitude;
        document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });
}());

//http://shapeshed.com/html5-speech-recognition-api/
//https://github.com/Daniel-Hug/speech-input/blob/gh-pages/speech-input.js
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
var speechRecognition = (function() {
    var recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
        console.log(event);
    };

    var startSpeechRecognition = document.getElementById('startSpeechRecognition');
    startSpeechRecognition.addEventListener('click', function(e) {
        recognition.start();
    });
}());
