fetch("https://car-website-dhn5.onrender.com/cars")
  .then(res => res.json())
  .then(cars => {

    let container = document.getElementById("carContainer");

    container.innerHTML = ""; // important (prevents duplicates)

    cars.forEach(car => {
      let div = document.createElement("div");
      div.className = "car-card";

      div.innerHTML = `
        <h3>${car.name}</h3>
        <img src="${car.image}" />
        <p>Price: £${car.price}</p>
      `;

      container.appendChild(div);
    });

  })
  .catch(err => console.log("Error loading cars:", err));


// CART SYSTEM
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  let count = document.getElementById("cartCount");
  if (count) {
    count.innerText = cart.length;
  }
});

function buyCar(carName) {
  cart.push(carName);
  localStorage.setItem("cart", JSON.stringify(cart));

  let count = document.getElementById("cartCount");
  if (count) {
    count.innerText = cart.length;
  }

  alert(carName + " added to cart!");
}


// SEARCH FUNCTION
document.addEventListener("DOMContentLoaded", () => {
  let search = document.getElementById("searchBox");

  if (search) {
    search.addEventListener("input", function () {
      let value = this.value.toLowerCase();
      let cards = document.querySelectorAll(".car-card");

      cards.forEach(card => {
        let name = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = name.includes(value) ? "block" : "none";
      });
    });
  }
});