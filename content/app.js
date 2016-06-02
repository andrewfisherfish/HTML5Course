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


var fileWriter = (function() {
    var opt_errorHandler = function() {

    };
    
    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(fs) {

        // fs.root is a DirectoryEntry object.
        fs.root.getFile('log.txt', {
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
