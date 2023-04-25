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
      userId: userdata["id"], title: title, message: description
    };

    document.getElementById("feedback-form-id").reset();

    fetch("support/create-support-request", {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(supportRequest)
    }).then(response => response.json())
      .then(data => {
        if (data == null || data["statusCode"] === 500) {
          alert("invalid support request");
        } else {
          console.log(JSON.stringify(supportRequest));
          renderSuggest(data);
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
  let allData = [];
  let page = 0;
  let itemsPerPage = 2;
  const button = document.querySelector("#downloadButton");
  fetch("support/get-user-support-requests/" + userdata["id"], {
    method: "POST", headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
    .then(data => {
      if (data == null || data["statusCode"] === 500) {
        alert("invalid support request");
      } else {
        console.log(JSON.stringify(data));
        let stringified = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < itemsPerPage; i++) {
          if (i >= data.length) {
            button.style.display = "none";
            break;
          }
          renderSuggest(data[i]);
        }
        allData = data;
      }
    });
  button.addEventListener("click", (event) => {
    event.preventDefault();
    page += 1;
    for (let i = 0; i < itemsPerPage; i++) {
      if (i + itemsPerPage * page >= allData.length) {
        button.style.display = "none";
        break;
      }
      renderSuggest(allData[i + itemsPerPage * page]);
    }
    if (itemsPerPage * (page + 1) >= allData.length) {
      button.style.display = "none";
    }
  });

}

function renderSuggest(suggestObject) {
  let tbody = document.querySelector(".grid-from-table-body");
  let template = document.querySelector("#feedback-form-response");

  let clone = template.content.cloneNode(true);
  let td = clone.querySelectorAll("td");

  td[0].textContent = suggestObject["title"];
  td[1].textContent = suggestObject["userId"];
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

