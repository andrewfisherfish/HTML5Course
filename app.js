var initModule = (function() {
    var btn = document.getElementById('do');
    var text = document.getElementById('text');

    text.value = window.localStorage.getItem('text');

    btn.addEventListener('click', function(e) {
        window.localStorage.setItem('text', text.value);
    });
}());
