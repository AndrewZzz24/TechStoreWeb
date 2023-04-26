function loginButton() {
  const button = document.querySelector('#loginButton');
  button.addEventListener('click', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let userData = {
      username: username,
      password: password,
    };

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    console.log(userData);

    fetch('users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == null || data['statusCode'] === 500) {
          alert('asdasd');
        } else {
          console.log(JSON.stringify(userData));
          localStorage.setItem('userdata', JSON.stringify(data));
          setUser();
        }
      });
  });
}

function signInButton() {
  // const signinButton = document.querySelector("#signinButton");
  // signinButton.addEventListener("click", (event) => {
  //   event.preventDefault();

  const email = document.getElementById('signInEmail').value.trim();
  const username = document.getElementById('signInUsername').value.trim();
  const password = document.getElementById('signInPassword').value.trim();
  const surname = document.getElementById('signInSurname').value.trim();
  const name = document.getElementById('signInName').value.trim();

  let createUser = {
    email: email.toString(),
    username: username.toString(),
    password: password.toString(),
    name: name.toString(),
    surname: surname.toString(),
  };

  document.getElementById('signInEmail').value = '';
  document.getElementById('signInUsername').value = '';
  document.getElementById('signInPassword').value = '';
  document.getElementById('signInSurname').value = '';
  document.getElementById('signInName').value = '';

  console.log(createUser);

  fetch('users/create-customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createUser),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data == null || data['statusCode'] === 500) {
        alert('Аккаунт с такими данными уже существует');
      } else {
        console.log(JSON.stringify(data));
        localStorage.setItem('userdata', JSON.stringify(data));
        setUser();
      }
    });
  // });
}

function setUser() {
  let existedUserdata = JSON.parse(localStorage.getItem('userdata'));
  console.log(existedUserdata);
  let setUsername =
    existedUserdata === null ? 'guest' : existedUserdata['username'];
  if (setUsername === undefined) return;
  let t = document.querySelector('.user-mode');
  t.innerHTML = '<span>Logged in as Customer: ' + setUsername + '</span>';
  console.log(t.innerHTML);
}

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    setUser();
    loginButton();
    // signInButton();
  });
})();
