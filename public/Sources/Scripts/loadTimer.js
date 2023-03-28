(function () {
  let startTime = new Date().getTime();

  function timer() {
    document.getElementById('load-time').innerHTML =
      'Loaded in ' + (new Date().getTime() - startTime) + 'ms';
  }

  document.addEventListener('DOMContentLoaded', (_) => {
    timer();
  });
})();
