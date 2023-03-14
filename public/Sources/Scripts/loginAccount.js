function listenToSubmit() {
  document.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let userData = {
      username: username,
      password: password,
    };

    localStorage.setItem('userdata', JSON.stringify(userData));
    setUser();
  });
}

function setUser() {
  let existedUserdata = JSON.parse(localStorage.getItem('userdata'));
  console.log(existedUserdata);
  let setUsername =
    existedUserdata === null ? 'guest' : existedUserdata['username'];

  let t = document.querySelector('.user-mode');
  t.innerHTML = '<span>Logged in as Customer: ' + setUsername + '</span>';
  console.log(t.innerHTML);
}

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    setUser();
    listenToSubmit();
  });
})();
