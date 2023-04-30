const comments = document.getElementById('comments');
const loading = document.getElementById('loading');
const NUMBER_OF_COMMENTS = 5;

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('https://jsonplaceholder.typicode.com/comments')
//         .then(response => response.json())
//         .then(json => {
//             loading.remove()
//             comments.innerHTML = '';
//             let index = Math.floor(Math.random() * 494)
//             for (const comment of json.slice(index, index + NUMBER_OF_COMMENTS)) {
//                 comments.innerHTML += `
//     <div class="main-section">
//         <p class="header-text">${comment.name}</p>
//         <p class="contact-text">${comment.email}</p>
//         <p class="main-section-text">${comment.body}</p>
//     </div>
//     `
//             }
//         }).catch(_ => {
//         loading.remove()
//         comments.innerHTML = `<div><p class="error-text">Что-то пошло не так</p></div>`
//     })
// })

// document.addEventListener('DOMContentLoaded', () => {
//   fetch('products/', {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     },
//   })
//     .then(response => response.json())
//     .then(json => {
//       loading.remove()
//       comments.innerHTML = '';
//       let index = Math.floor(Math.random() * 494)
//       for (const comment of json.slice(index, index + NUMBER_OF_COMMENTS)) {
//         comments.innerHTML += `
//     <div class="main-section">
//         <p class="header-text">${comment.name}</p>
//         <p class="contact-text">${comment.email}</p>
//         <p class="main-section-text">${comment.body}</p>
//     </div>
//     `
//       }
//     }).catch(_ => {
//     loading.remove()
//     comments.innerHTML = `<div><p class="error-text">Что-то пошло не так</p></div>`
//   })
// })


function displayProduct() {
  let page = 0;
  let itemsPerPage = 2;
  const button = document.querySelector("#downloadProductsButton");
  comments.innerHTML = '';
  makeProductRequest(page, itemsPerPage, button);

  button.addEventListener("click", (event) => {
    event.preventDefault();
    page += 1;
    makeProductRequest(page, itemsPerPage, button);
  });
}

function makeProductRequest(page, itemsPerPage, button) {
  fetch('products?cursor='  + page + "&limit=" + itemsPerPage, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["statusCode"] !== undefined && data["statusCode"] !== 200) {
        let alertMessage = data["exceptionResponse"];
        if (typeof (alertMessage) !== "string") alertMessage = alertMessage["message"];
        alert(alertMessage);
      } else {
        if (data.length <= itemsPerPage){
          button.style.display = "none";
        }
        for (let i = 0; i < Math.min(itemsPerPage, data.length); i++) {
          renderProduct(data[i]);
        }
      }
    });
}

function renderProduct(product) {
  const comments = document.getElementById('comments');
  const path = "Sources/MediaSources/product_" + product.id + ".jpg"
  comments.innerHTML += `
      <div class="product-item">
        <img src=${path} alt="${product.title}">
        <div class="product-info">
          <h2 class="product-name">${product.title}</h2>
          <p class="product-price">${product.price + " RUB"}</p>
          <p class="product-description">${product.description}</p>
          <div class="product-quantity">
            <button class="button-minus">-</button>
            <input type="number" class="input-quantity" value="1" min="1">
            <button class="button-plus">+</button>
          </div>
          <button class="button-add-to-cart">Add to Cart</button>
        </div>
      </div>
    `
}

(function() {
  document.addEventListener("DOMContentLoaded", () => {
    displayProduct();
  });
})();