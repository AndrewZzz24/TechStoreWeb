function loginButton() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  let userData = {
    username: username,
    password: password
  };

  fetch("users/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("ПОКАЗЫВАЮ В ЛОГИН = " + JSON.stringify(data));
      if (data["statusCode"] !== undefined && data["statusCode"] !== 200) {
        let alertMessage = data["exceptionResponse"];
        if (typeof (alertMessage) !== "string") alertMessage = alertMessage["message"];
        alert(alertMessage);
      } else {
        localStorage.setItem("userdata", JSON.stringify(data));
        setUser();
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      }
    });
}

function signInButton() {
  const email = document.getElementById("signInEmail").value.trim();
  const username = document.getElementById("signInUsername").value.trim();
  const password = document.getElementById("signInPassword").value.trim();
  const surname = document.getElementById("signInSurname").value.trim();
  const name = document.getElementById("signInName").value.trim();

  let createUser = {
    email: email,
    username: username,
    password: password,
    name: name,
    surname: surname
  };

  console.log(createUser);

  fetch("users/create-customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createUser)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("ПОКАЗЫВАЮ В САЙНИН = " + JSON.stringify(data));
      if (data["statusCode"] !== undefined && data["statusCode"] !== 201) {
        let alertMessage = data["exceptionResponse"];
        if (typeof (alertMessage) !== "string") alertMessage = alertMessage["message"];
        alert(alertMessage);
      } else {
        localStorage.setItem("userdata", JSON.stringify(data));
        setUser();
        document.getElementById("signInEmail").value = "";
        document.getElementById("signInUsername").value = "";
        document.getElementById("signInPassword").value = "";
        document.getElementById("signInSurname").value = "";
        document.getElementById("signInName").value = "";
      }
    });
}

function setUser() {
  let existedUserdata = JSON.parse(localStorage.getItem("userdata"));
  console.log(existedUserdata);
  let setUsername =
    existedUserdata === null ? "guest" : existedUserdata["username"];
  if (setUsername === undefined) return;
  let t = document.querySelector(".user-mode");
  t.innerHTML = "<span>Logged in as Customer: " + setUsername + "</span>";
  console.log(t.innerHTML);
}

(function() {
  document.addEventListener("DOMContentLoaded", () => {
    setUser();
    // loginButton();
    // signInButton();
  });
})();
