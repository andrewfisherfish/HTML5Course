'use strict';

(function() {
    var resourceCache = {};
    var readyCallbacks = [];

    function updateStatus() {
        if (isReady()) {
            readyCallbacks.forEach((func) => {
                func();
            });
        }
    }

    function getJsonData(url) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dataObject;

                try {
                    dataObject = JSON.parse(xmlhttp.responseText);
                } catch (Error) {
                    dataObject = xmlhttp.responseText;
                }

                resourceCache[url] = dataObject;

                updateStatus();
            }
        };

        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }

    function getImageData(url) {
        var img = new Image();
        img.onload = function() {
            resourceCache[url] = img;

            updateStatus();
        };
        resourceCache[url] = false;
        img.src = url;
    }

    function getFileExt(path) {
        var dotInd = path.lastIndexOf('.') + 1;

        if (dotInd === 0 || path.length - dotInd > 4) return '';

        return path.substring(dotInd);
    }

    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if (resourceCache[url]) {
            return resourceCache[url];
        }

        var ext = getFileExt(url);
        switch (ext) {
            case 'png':
            case 'jpeg':
                getImageData(url);
                break;
            case 'json':
                getJsonData(url);
                break;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) &&
                !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.Resources = {
        load,
        get,
        onReady,
        isReady
    };
})();
