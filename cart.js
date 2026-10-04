let total = 0;
let cartCount = 0;

const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartCountText = document.querySelector("#cart-count");

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

const cartButtons = document.querySelectorAll(".product-card button");

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.parentElement;
    const name = card.querySelector("h3").textContent;
    const price = Number(card.querySelectorAll("p")[1].textContent.replace("$", ""));

    const li = document.createElement("li");
    li.textContent = name + " - $" + price;
    cartItems.appendChild(li);

    total += price;
    cartCount++;

    cartCountText.textContent = "Cart (" + cartCount + ")";
    cartTotal.textContent = "Total: $" + total;
  });
});

const clearButton = document.querySelector("#clear-cart");

clearButton.addEventListener("click", () => {
  cartItems.innerHTML = "";
  total = 0;
  cartCount = 0;
  cartTotal.textContent = "Total: $0";
  cartCountText.textContent = "Cart (0)";
});
