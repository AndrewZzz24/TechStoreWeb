const comments = document.getElementById('comments');
const loading = document.getElementById('loading');
const NUMBER_OF_COMMENTS = 5;

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(json => {
            loading.remove()
            comments.innerHTML = '';
            let index = Math.floor(Math.random() * 494)
            for (const comment of json.slice(index, index + NUMBER_OF_COMMENTS)) {
                comments.innerHTML += `
    <div class="main-section">
        <p class="header-text">${comment.name}</p>
        <p class="contact-text">${comment.email}</p>
        <p class="main-section-text">${comment.body}</p>
    </div>
    `
            }
        }).catch(_ => {
        loading.remove()
        comments.innerHTML = `<div><p class="error-text">Что-то пошло не так</p></div>`
    })
})