function listenToSubmit() {
  document.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    if (userdata === null) {
      alert("You have to log in first");
      return;
    }
    let supportRequest = {
      userId: userdata["id"],
      title: title,
      message: description
    };

    fetch("support/create-support-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(supportRequest)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["statusCode"] !== undefined && data["statusCode"] !== 201) {
          let alertMessage = data["exceptionResponse"];
          if (typeof (alertMessage) !== "string") alertMessage = alertMessage["message"];
          alert(alertMessage);
        } else {
          renderSuggest(data);
          document.getElementById("feedback-form-id").reset();
        }
      });
  });
}

function displayReviews() {
  const userdata = JSON.parse(localStorage.getItem("userdata"));

  if (userdata === null) {
    alert("You have to log in first");
    return;
  }

  let page = 0;
  let itemsPerPage = 2;
  const button = document.querySelector("#downloadButton");
  makeRequest(page, itemsPerPage, userdata, button);

  button.addEventListener("click", (event) => {
    event.preventDefault();
    page += 1;
    makeRequest(page, itemsPerPage, userdata, button);
  });
}

function makeRequest(page, itemsPerPage, userdata, button) {
  fetch("users/" + userdata["id"] + "/support-requests?cursor=" + page + "&limit=" + itemsPerPage, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["statusCode"] !== undefined && data["statusCode"] !== 201) {
        console.log(data)
        let alertMessage = data["exceptionResponse"];
        if (typeof (alertMessage) !== "string") alertMessage = alertMessage["message"];
        alert(alertMessage);
      } else {
        if (data.length <= itemsPerPage){
          button.style.display = "none";
        }
        for (let i = 0; i < Math.min(itemsPerPage, data.length); i++) {
          renderSuggest(data[i]);
        }
      }
    });
}

function renderSuggest(suggestObject) {
  let tbody = document.querySelector(".grid-from-table-body");
  let template = document.querySelector("#feedback-form-response");

  let clone = template.content.cloneNode(true);
  let td = clone.querySelectorAll("td");

  const date = new Date(suggestObject["createdAt"]);
  const options = {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  const formattedDate = date.toLocaleString('ru', options);

  td[0].textContent = suggestObject["title"];
  td[1].textContent = formattedDate;
  td[2].textContent = suggestObject["message"];
  td[3].textContent = suggestObject["status"];

  tbody.appendChild(clone);
}

(function() {
  document.addEventListener("DOMContentLoaded", () => {
    listenToSubmit();
    displayReviews();
  });
})();
