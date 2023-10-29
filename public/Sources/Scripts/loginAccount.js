function loginButton() {
  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  let userData = {
    formFields: [
      { id: "email", value: email },
      { id: "password", value: password }
    ]
  };

  fetch("api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // if (data["statusCode"] !== undefined && data["statusCode"] !== 200) {
      if (data['status'] !== "OK") {
        // let alertMessage = data["exceptionResponse"];
        // if (alertMessage === undefined || typeof (alertMessage) !== "string") {
        //   alertMessage = alertMessage["message"];
        // }
        // alert(alertMessage);
        // let msg = ""
        // console.log(data['formFields'].map(value => msg += value['error']))
        alert(JSON.stringify(data))
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

  // let createUser = {
  //   email: email,
  //   username: username,
  //   password: password,
  //   surname: surname,
  //   name: name
  // };

  let createUser = {
    formFields: [
      { id: "email", value: email },
      { id: "username", value: username },
      { id: "password", value: password },
      { id: "surname", value: surname },
      { id: "name", value: name }
    ]
  };

  console.log(createUser);

  fetch("api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createUser)
  })
    .then((response) => response.json())
    .then((data) => {
      // if (data["statusCode"] !== undefined && data["statusCode"] !== 200) {
      if (data['status'] !== "OK") {
        // let alertMessage = data["exceptionResponse"];
        // if (alertMessage === undefined || typeof (alertMessage) !== "string") {
        //   alertMessage = alertMessage["message"];
        // }
        // alert(alertMessage);
        // let msg = ""
        // console.log(data['formFields'].map(value => msg += value['error']))
        alert(JSON.stringify(data))
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
  console.log("userdata= ", existedUserdata);

  let setUsername =
    existedUserdata === null ? "guest" : existedUserdata["user"]["email"];
  if (setUsername === undefined) return;
  let loginButtonInNav = document.querySelector("#login");
  loginButtonInNav.innerHTML = `${setUsername}`;

  let mode = "guest";
  if (setUsername !== "guest") {
    mode = "customer";
  }

  let loginInBox = document.querySelector("#logInBox");
  let signInBox = document.querySelector("#signInBox");
  loginInBox.style.display = mode === "guest" ? "block" : "none";
  signInBox.style.display = mode === "guest" ? "block" : "none";
  console.log("logged in as", loginButtonInNav.innerHTML);

  let changeInfoBox = document.querySelector("#changeInfoBox");
  let logoutBox = document.querySelector("#logoutBox");
  let deleteAccountBox = document.querySelector("#deleteAccountBox");
  changeInfoBox.style.display = mode === "guest" ? "none" : "block";
  logoutBox.style.display = mode === "guest" ? "none" : "block";
  deleteAccountBox.style.display = mode === "guest" ? "none" : "block";

  if (mode !== "guest") {
    let changedName = document.querySelector("#changedName");
    let changedSurname = document.querySelector("#changedSurname");
    // changedName.value = existedUserdata["name"];
    // changedSurname.value = existedUserdata["surname"];
  }
}

(function() {
  document.addEventListener("DOMContentLoaded", () => {
    setUser();
  });
})();

function changeAccountData() {
  let existedUserdata = JSON.parse(localStorage.getItem("userdata"));

  const oldPassword = document.getElementById("oldPassword").value.trim();
  const changedPassword = document.getElementById("oldPassword").value.trim();
  const changedName = document.getElementById("changedName").value.trim();
  const changedSurname = document.getElementById("changedSurname").value.trim();

  let changeAccountData = {
    oldPassword: oldPassword,
    changedPassword: changedPassword,
    changedName: changedName,
    changedSurname: changedSurname
  };

  console.log(changeAccountData);

  fetch("users/account/change-account-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(changeAccountData)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["statusCode"] !== undefined && data["statusCode"] !== 201) {
        console.log("Exception: ", data);
        let alertMessage = data["exceptionResponse"];
        if (alertMessage !== undefined && typeof (alertMessage) !== "string") alertMessage = alertMessage["message"];
        alert(alertMessage);
      } else {
        document.getElementById("oldPassword").value = "";
        document.getElementById("changedPassword").value = "";
        document.getElementById("changedName").value = "";
        document.getElementById("changedSurname").value = "";
        console.log("response data", data);
        localStorage.setItem("userdata", JSON.stringify(data));
        setUser();
      }
    });
}

function logOut() {
  localStorage.clear();
  setUser();
}

function deleteUser() {
  let existedUserdata = JSON.parse(localStorage.getItem("userdata"));

  fetch("users/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["statusCode"] !== undefined && data["statusCode"] !== 201) {
        console.log("Exception: ", data);
        let alertMessage = data["exceptionResponse"];
        if (alertMessage !== undefined && typeof (alertMessage) !== "string") alertMessage = alertMessage["message"];
        alert(alertMessage);
      } else {
        logOut();
      }
    });
}
