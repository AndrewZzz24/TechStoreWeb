(function () {
    let startTime = new Date().getTime();

    function timer() {
        document.getElementById('load-time').innerHTML = 'Loaded in ' + (new Date().getTime() - startTime) / 1000 + ' seconds';
    }

    document.addEventListener("DOMContentLoaded", _ => {
        timer()
    });
})();