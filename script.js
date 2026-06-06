fetch("https://car-website-dhn5.onrender.com/cars")
  .then(res => res.json())
  .then(cars => {

    let container = document.getElementById("carContainer");

    if (!container) return;

    container.innerHTML = "";

    cars.forEach(car => {

      let div = document.createElement("div");
      div.className = "car-card";

      div.innerHTML = `
        <h3>${car.name}</h3>
        <img src="${car.image}" alt="${car.name}">
        <p>Price: £${car.price}</p>

        <button onclick="buyCar('${car.name}', ${car.price})">
          Buy Now
        </button>
      `;

      container.appendChild(div);

    });

  })
  .catch(err => console.log("Error loading cars:", err));


// CART SYSTEM
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {

  let count = document.getElementById("cartCount");

  if (count) {
    count.innerText = cart.length;
  }

});


// Add car to cart
function buyCar(carName, price) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: carName,
    price: price
  });

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

        card.style.display =
          name.includes(value) ? "block" : "none";

      });

    });

  }

});