// @ts-nocheck

// ---------- Data ----------
const products = [
  { id: 1, name: "Classic Outfit", desc: "Comfortable and Stylish Outfit", price: 20, oldPrice: 28, badge: "New", image: "Fileone.jpg" },
  { id: 2, name: "Nice Outfit", desc: "Nice and Comfortable Outfit", price: 50, oldPrice: null, badge: "", image: "Filetwo.jpg" },
  { id: 3, name: "Cute Outfit", desc: "Cute and Stylish Outfit", price: 60, oldPrice: 80, badge: "Sale", image: "Filethree.jpg" },
  { id: 4, name: "Bold Outfit", desc: "Nice and Stylish Outfit", price: 70, oldPrice: null, badge: "New", image: "Filefour.jpg" },
  { id: 5, name: "LV Monogram Loafers", desc: "Luxury monogram leather loafers with gold-tone hardware", price: 120, oldPrice: 150, badge: "Sale", image: "Filefive.jpg" },
  { id: 6, name: "Black & White Loafers", desc: "Two-tone classic loafers with chunky sole", price: 85, oldPrice: null, badge: "New", image: "Filesix.jpg" },
  { id: 7, name: "Fendi Patent Chunky Loafers", desc: "Glossy patent finish with bold chunky sole", price: 140, oldPrice: 180, badge: "Sale", image: "Fileseven.jpg" },
  { id: 8, name: "Zara Tassel Loafers", desc: "Elegant tassel detail with white front panel", price: 75, oldPrice: null, badge: "New", image: "Fileeight.jpg" },
  { id: 9, name: "Nike Air Force 1 Black", desc: "Iconic all-black Air Force 1 sneakers", price: 95, oldPrice: 130, badge: "Sale", image: "Filenine.jpg" },
  { id: 10, name: "AF1 Black White Stripe", desc: "All-black AF1 with signature white stripe", price: 90, oldPrice: null, badge: "New", image: "Fileten.jpg" },
  { id: 11, name: "Urban Chunky Boots", desc: "Rugged high-top boots with thick lug sole", price: 110, oldPrice: 140, badge: "Sale", image: "Fileeleven.jpg" }
];

// ---------- Load saved data ----------
let cart = JSON.parse(localStorage.getItem("shopnow_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("shopnow_wishlist")) || [];

// ---------- Page elements ----------
const productList = document.querySelector("#product-list");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartCountText = document.querySelector("#cart-count");
const wishCount = document.querySelector("#wish-count");

const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#menu");
const overlay = document.querySelector("#overlay");
const closeMenu = document.querySelector("#close-menu");
const resetSearchBtn = document.querySelector("#reset-search");

// ---------- Save functions ----------
function saveCart() {
  localStorage.setItem("shopnow_cart", JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem("shopnow_wishlist", JSON.stringify(wishlist));
}

// ---------- Menu ----------
function openMenu() {
  nav.classList.add("active");
  overlay.classList.add("show");
}

function closeTheMenu() {
  nav.classList.remove("active");
  overlay.classList.remove("show");
}

hamburger.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeTheMenu);
overlay.addEventListener("click", closeTheMenu);
document.querySelectorAll("#menu a").forEach((link) => {
  link.addEventListener("click", closeTheMenu);
});

// ---------- Render products ----------
function renderProducts(list) {
  productList.innerHTML = "";

  if (list.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach((p) => {
    let priceHTML = "$" + p.price;
    if (p.oldPrice) {
      const save = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
      priceHTML += ` <s>$${p.oldPrice}</s> <span class="save">Save ${save}%</span>`;
    }

    const tag = p.badge
      ? `<span class="tag ${p.badge === "Sale" ? "sale" : ""}">${p.badge}</span>`
      : "";

    const liked = wishlist.includes(p.id);

    productList.innerHTML += `
      <div class="product-card">
        ${tag}
        <div class="img-wrap"><img src="${p.image}" alt="${p.name}"></div>
        <h3>${p.name}</h3>
        <p class="rating">(0)</p>
        <p class="price">${priceHTML}</p>
        <p class="stock">In Stock</p>
        <div class="card-actions">
          <button class="icon-btn wish-btn ${liked ? "liked" : ""}" data-id="${p.id}">${liked ? "♥" : "♡"}</button>
          <button class="icon-btn view-btn" data-id="${p.id}">👁</button>
        </div>
        <div class="buy-row">
          <button class="add-btn" data-id="${p.id}">Add to cart</button>
          <button class="buy-btn" data-id="${p.id}">Buy Now</button>
        </div>
      </div>`;
  });
}

// ---------- Cart logic ----------
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  saveCart();
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty.</li>";
  }

  cart.forEach((item, index) => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;
    itemCount += item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} × ${item.qty} — $${lineTotal}</span>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = "Total: $" + total;
  cartCountText.textContent = itemCount;
}

// ---------- Product clicks ----------
productList.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-btn");
  const buyBtn = e.target.closest(".buy-btn");
  const wishBtn = e.target.closest(".wish-btn");
  const viewBtn = e.target.closest(".view-btn");

  if (addBtn) {
    addToCart(Number(addBtn.dataset.id));
  }

  if (buyBtn) {
    addToCart(Number(buyBtn.dataset.id));
    document.querySelector("#cart").scrollIntoView();
  }

  if (viewBtn) {
    const p = products.find((x) => x.id === Number(viewBtn.dataset.id));
    alert(p.name + ": " + p.desc);
  }

  if (wishBtn) {
    const id = Number(wishBtn.dataset.id);
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((x) => x !== id);
    } else {
      wishlist.push(id);
    }
    wishBtn.classList.toggle("liked");
    wishBtn.textContent = wishlist.includes(id) ? "♥" : "♡";
    wishCount.textContent = wishlist.length;
    saveWishlist();
  }
});

// ---------- Slider arrows ----------
document.querySelector("#prev").addEventListener("click", () => {
  productList.scrollBy({ left: -300, behavior: "smooth" });
});

document.querySelector("#next").addEventListener("click", () => {
  productList.scrollBy({ left: 300, behavior: "smooth" });
});

// ---------- Search ----------
document.querySelector("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.querySelector("#search-input").value.toLowerCase();
  const found = products.filter((p) =>
    (p.name + " " + p.desc).toLowerCase().includes(text)
  );
  renderProducts(found);
  resetSearchBtn.style.display = "block";
  document.querySelector("#shop").scrollIntoView();
});

resetSearchBtn.addEventListener("click", () => {
  document.querySelector("#search-input").value = "";
  renderProducts(products);
  resetSearchBtn.style.display = "none";
  document.querySelector("#shop").scrollIntoView();
});

// ---------- Cart remove ----------
cartItems.addEventListener("click", (e) => {
  const btn = e.target.closest(".remove-btn");
  if (btn) {
    const index = Number(btn.dataset.index);
    if (cart[index].qty > 1) {
      cart[index].qty -= 1;
    } else {
      cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  }
});

// ---------- Clear cart ----------
document.querySelector("#clear-cart").addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});

// ---------- Discount form ----------
document.querySelector("#discount-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector("#discount-msg").textContent =
    "Thanks! Your discount is on the way.";
  e.target.reset();
});

// ---------- Demo popup ----------
const toast = document.querySelector("#toast");
const cities = ["Lagos", "Abuja", "Ibadan", "Enugu", "Port Harcourt"];

function showToast() {
  const p = products[Math.floor(Math.random() * products.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  toast.textContent = "Someone from " + city + " purchased " + p.name;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
}

setTimeout(() => {
  showToast();
  setInterval(showToast, 15000);
}, 5000);

// ---------- Start ----------
renderProducts(products);
renderCart();
wishCount.textContent = wishlist.length;
// ---------- Login state ----------
function updateLoginUI() {
  const user = JSON.parse(localStorage.getItem("shopnow_user"));
  const loginLink = document.querySelector("#menu-login-link");
  const userInfo = document.querySelector("#menu-user-info");
  const userName = document.querySelector("#menu-user-name");
  const logoutBtn = document.querySelector("#logout-btn");
  const avatar = document.querySelector("#menu-avatar");

  if (!loginLink) return; // safety

  if (user) {
    loginLink.style.display = "none";
    userInfo.style.display = "block";
    userName.textContent = "Hi, " + user.name;
    avatar.textContent = user.name.charAt(0).toUpperCase();
    avatar.style.background = "#1a73e8";
    avatar.style.color = "white";
    avatar.style.display = "flex";
    avatar.style.alignItems = "center";
    avatar.style.justifyContent = "center";
    avatar.style.fontWeight = "bold";
    avatar.style.fontSize = "20px";

    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("shopnow_user");
      updateLoginUI();
      showToastMessage("👋 You have been logged out");
    });
  } else {
    loginLink.style.display = "inline-block";
    userInfo.style.display = "none";
    avatar.textContent = "";
    avatar.style.background = "#ccc";
  }
}

function showToastMessage(text) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

updateLoginUI();