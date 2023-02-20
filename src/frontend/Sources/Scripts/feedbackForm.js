function listenToSubmit() {
    document.addEventListener("submit", (event) => {
        event.preventDefault()

        const title = document.getElementById("title").value.trim()
        const contact = document.getElementById("contact").value.trim()
        const description = document.getElementById("description").value.trim()
        const suggestObject = {"title": title, "contact": contact, "description": description}

        document.getElementById("feedback-form-id").reset();

        if (localStorage.getItem("feedbackStorage") === null) {
            localStorage.setItem("feedbackStorage", JSON.stringify([]))
        }

        let feedback_storage = JSON.parse(localStorage.getItem("feedbackStorage"))
        feedback_storage.push(JSON.stringify(suggestObject))
        localStorage.setItem("feedbackStorage", JSON.stringify(feedback_storage))

        renderSuggest(suggestObject)
    })
}

function displayMetrics() {
    let feedback_storage = JSON.parse(localStorage.getItem("feedbackStorage"))
    if (feedback_storage === null) return
    for (let i = 0; i < feedback_storage.length; i++) {
        renderSuggest(JSON.parse(feedback_storage[i]))
    }
}

function renderSuggest(suggestObject) {
    let tbody = document.querySelector(".grid-from-table-body");
    let template = document.querySelector('#feedback-form-response');

    let clone = template.content.cloneNode(true);
    let td = clone.querySelectorAll("td");

    td[0].textContent = suggestObject["title"];
    td[1].textContent = suggestObject["contact"];
    td[2].textContent = suggestObject["description"];

    tbody.appendChild(clone);
}

(function () {
    document.addEventListener(
        "DOMContentLoaded",
        () => {
            listenToSubmit();
            displayMetrics();
        })
})();