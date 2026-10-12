// @ts-nocheck

// ---------- Data ----------
const products = [
  { id: 1, name: "Classic Outfit", desc: "Comfortable and Stylish Outfit", price: 20, oldPrice: 28, badge: "New", image: "Fileone.jpg", category: "outfits" },
  { id: 2, name: "Nice Outfit", desc: "Nice and Comfortable Outfit", price: 50, oldPrice: null, badge: "", image: "Filetwo.jpg", category: "outfits" },
  { id: 3, name: "Cute Outfit", desc: "Cute and Stylish Outfit", price: 60, oldPrice: 80, badge: "Sale", image: "Filethree.jpg", category: "outfits" },
  { id: 4, name: "Bold Outfit", desc: "Nice and Stylish Outfit", price: 70, oldPrice: null, badge: "New", image: "Filefour.jpg", category: "outfits" },
  { id: 5, name: "LV Monogram Loafers", desc: "Luxury monogram leather loafers with gold-tone hardware", price: 120, oldPrice: 150, badge: "Sale", image: "Filefive.jpg", category: "shoes" },
  { id: 6, name: "Black & White Loafers", desc: "Two-tone classic loafers with chunky sole", price: 85, oldPrice: null, badge: "New", image: "Filesix.jpg", category: "shoes" },
  { id: 7, name: "Fendi Patent Chunky Loafers", desc: "Glossy patent finish with bold chunky sole", price: 140, oldPrice: 180, badge: "Sale", image: "Fileseven.jpg", category: "shoes" },
  { id: 8, name: "Zara Tassel Loafers", desc: "Elegant tassel detail with white front panel", price: 75, oldPrice: null, badge: "New", image: "Fileeight.jpg", category: "shoes" },
  { id: 9, name: "Nike Air Force 1 Black", desc: "Iconic all-black Air Force 1 sneakers", price: 95, oldPrice: 130, badge: "Sale", image: "Filenine.jpg", category: "shoes" },
  { id: 10, name: "AF1 Black White Stripe", desc: "All-black AF1 with signature white stripe", price: 90, oldPrice: null, badge: "New", image: "Fileten.jpg", category: "shoes" },
  { id: 11, name: "Urban Chunky Boots", desc: "Rugged high-top boots with thick lug sole", price: 110, oldPrice: 140, badge: "Sale", image: "Fileeleven.jpg", category: "shoes" },
  { id: 12, name: "Grey Zip-Up Hoodie Set", desc: "Comfortable grey hoodie and matching sweatpants", price: 85, oldPrice: 110, badge: "Sale", image: "Cloth1.jpg", category: "clothing" },
{ id: 13, name: "Black Zip-Up Hoodie Set", desc: "Classic all-black hoodie and sweatpants combo", price: 85, oldPrice: null, badge: "New", image: "Cloth2.jpg", category: "clothing" },
{ id: 14, name: "Grey & Black Sweatshirt Set", desc: "Modern colorblock sweatshirt with matching pants", price: 75, oldPrice: 95, badge: "Sale", image: "Cloth3.jpg", category: "clothing" },
{ id: 15, name: "Black Graphic Hoodie Set", desc: "Bold graphic print hoodie with black joggers", price: 70, oldPrice: null, badge: "New", image: "Cloth4.jpg", category: "clothing" },
{ id: 16, name: "Black Dragon Hoodie Set", desc: "Embroidered dragon hoodie with matching pants", price: 95, oldPrice: 120, badge: "Sale", image: "Cloth5.jpg", category: "clothing" },
{ id: 17, name: "White Dragon Button-Up Set", desc: "Short-sleeve patterned shirt with matching shorts", price: 65, oldPrice: null, badge: "New", image: "Cloth6.jpg", category: "clothing" },
{ id: 18, name: "White & Red Tracksuit Set", desc: "Sporty tracksuit with vest, pants, and sneakers", price: 110, oldPrice: 140, badge: "Sale", image: "Cloth7.jpg", category: "clothing" },
{ id: 19, name: "Floral Gradient Sweater", desc: "Cozy knit sweater with floral gradient design", price: 55, oldPrice: null, badge: "New", image: "Cloth8.jpg", category: "clothing" },
{ id: 20, name: "CAN'T Graphic Tee & Jeans", desc: "Oversized graphic tee with light wash jeans", price: 60, oldPrice: 75, badge: "Sale", image: "Cloth9.jpg", category: "clothing" },
{ id: 21, name: "BOSTON Graphic Tee & Jeans", desc: "Beige graphic tee with dark wash wide-leg jeans", price: 60, oldPrice: null, badge: "New", image: "Cloth10.jpg", category: "clothing" },
{ id: 22, name: "Navy & Grey Graphic Set", desc: "V-neck patterned tee with black track pants", price: 50, oldPrice: 65, badge: "Sale", image: "Cloth11.jpg", category: "clothing" },
{ id: 23, name: "Black Button-Up Set", desc: "Short-sleeve button-up with matching trousers", price: 80, oldPrice: null, badge: "New", image: "Cloth12.jpg", category: "clothing" }
  // 👇 Add new clothes below with category: "clothing"
];

// ---------- Load saved data ----------
let cart = JSON.parse(localStorage.getItem("shopnow_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("shopnow_wishlist")) || [];

// ---------- Page elements ----------
const productList = document.querySelector("#product-list");
const clothingSliderList = document.querySelector("#clothing-slider-list");
const clothingList = document.querySelector("#clothing-list");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartCountText = document.querySelector("#cart-count");
const wishCount = document.querySelector("#wish-count");

const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#menu");
const overlay = document.querySelector("#overlay");
const closeMenu = document.querySelector("#close-menu");
const resetSearchBtn = document.querySelector("#reset-search");

// ---------- Helpers ----------
function showToastMessage(text) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

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

if (hamburger) hamburger.addEventListener("click", openMenu);
if (closeMenu) closeMenu.addEventListener("click", closeTheMenu);
if (overlay) overlay.addEventListener("click", closeTheMenu);
document.querySelectorAll("#menu a").forEach((link) => {
  link.addEventListener("click", closeTheMenu);
});

// ---------- Build one product card ----------
function buildCardHTML(p) {
  let priceHTML = "$" + p.price;
  if (p.oldPrice) {
    const save = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
    priceHTML += ` <s>$${p.oldPrice}</s> <span class="save">Save ${save}%</span>`;
  }

  const tag = p.badge
    ? `<span class="tag ${p.badge === "Sale" ? "sale" : ""}">${p.badge}</span>`
    : "";

  const liked = wishlist.includes(p.id);

  return `
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
}

// ---------- Render: shoes slider (Today's Deals) ----------
function renderProducts(list) {
  if (!productList) return;
  productList.innerHTML = "";

  if (list.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach((p) => {
    productList.innerHTML += buildCardHTML(p);
  });
}

// ---------- Render: clothing slider ----------
function renderClothingSlider() {
  if (!clothingSliderList) return;
  const items = products.filter((p) => p.category === "clothing");
  clothingSliderList.innerHTML = "";

  if (items.length === 0) {
    clothingSliderList.innerHTML = "<p>No new clothing yet.</p>";
    return;
  }

  items.forEach((p) => {
    clothingSliderList.innerHTML += buildCardHTML(p);
  });
}

// ---------- Render: vertical outfits grid ----------
function renderOutfits() {
  if (!clothingList) return;
  const items = products.filter((p) => p.category === "outfits");
  clothingList.innerHTML = "";

  if (items.length === 0) {
    clothingList.innerHTML = "<p>No outfits available.</p>";
    return;
  }

  items.forEach((p) => {
    clothingList.innerHTML += buildCardHTML(p);
  });
}

// ---------- Cart logic ----------
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
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
  if (!cartItems) return;
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

  if (cartTotal) cartTotal.textContent = "Total: $" + total;
  if (cartCountText) cartCountText.textContent = itemCount;
}

// ---------- Shared click handler ----------
function handleProductClick(e) {
  const addBtn = e.target.closest(".add-btn");
  const buyBtn = e.target.closest(".buy-btn");
  const wishBtn = e.target.closest(".wish-btn");
  const viewBtn = e.target.closest(".view-btn");

  if (addBtn) {
    addToCart(Number(addBtn.dataset.id));
  }

  if (buyBtn) {
    addToCart(Number(buyBtn.dataset.id));
    const cartSection = document.querySelector("#cart");
    if (cartSection) cartSection.scrollIntoView();
  }

  if (viewBtn) {
    openModal(Number(viewBtn.dataset.id));
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
    if (wishCount) wishCount.textContent = wishlist.length;
    saveWishlist();
  }
}

if (productList) productList.addEventListener("click", handleProductClick);
if (clothingSliderList) clothingSliderList.addEventListener("click", handleProductClick);
if (clothingList) clothingList.addEventListener("click", handleProductClick);

// ---------- Slider arrows ----------
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
if (prevBtn && productList) {
  prevBtn.addEventListener("click", () => {
    productList.scrollBy({ left: -300, behavior: "smooth" });
  });
}
if (nextBtn && productList) {
  nextBtn.addEventListener("click", () => {
    productList.scrollBy({ left: 300, behavior: "smooth" });
  });
}

const prevClothing = document.querySelector("#prev-clothing");
const nextClothing = document.querySelector("#next-clothing");
if (prevClothing && clothingSliderList) {
  prevClothing.addEventListener("click", () => {
    clothingSliderList.scrollBy({ left: -300, behavior: "smooth" });
  });
}
if (nextClothing && clothingSliderList) {
  nextClothing.addEventListener("click", () => {
    clothingSliderList.scrollBy({ left: 300, behavior: "smooth" });
  });
}

// ---------- Search ----------
const searchForm = document.querySelector("#search-form");
if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.querySelector("#search-input").value.toLowerCase();
    const found = products.filter((p) =>
      (p.name + " " + p.desc).toLowerCase().includes(text)
    );
    renderProducts(found);
    if (resetSearchBtn) resetSearchBtn.style.display = "block";
    const shop = document.querySelector("#shop");
    if (shop) shop.scrollIntoView();
  });
}

if (resetSearchBtn) {
  resetSearchBtn.addEventListener("click", () => {
    document.querySelector("#search-input").value = "";
    renderProducts(products.filter((p) => p.category === "shoes"));
    resetSearchBtn.style.display = "none";
    const shop = document.querySelector("#shop");
    if (shop) shop.scrollIntoView();
  });
}

// ---------- Cart remove ----------
if (cartItems) {
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
}

// ---------- Clear cart ----------
const clearCartBtn = document.querySelector("#clear-cart");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });
}

// ---------- Discount form ----------
const discountForm = document.querySelector("#discount-form");
if (discountForm) {
  discountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#discount-msg").textContent =
      "Thanks! Your discount is on the way.";
    e.target.reset();
  });
}

// ---------- Demo popup ----------
const cities = ["Lagos", "Abuja", "Ibadan", "Enugu", "Port Harcourt"];

function showToast() {
  const toast = document.querySelector("#toast");
  if (!toast) return;
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

// ---------- Product Modal ----------
let modalProduct = null;
let modalQty = 1;

const modal = document.querySelector("#product-modal");
const modalImage = document.querySelector("#modal-image");
const modalName = document.querySelector("#modal-name");
const modalDesc = document.querySelector("#modal-desc");
const modalPrice = document.querySelector("#modal-price");
const qtyValue = document.querySelector("#qty-value");

function openModal(id) {
  if (!modal) return;
  const p = products.find((x) => x.id === id);
  if (!p) return;

  modalProduct = p;
  modalQty = 1;
  qtyValue.textContent = 1;

  modalImage.src = p.image;
  modalImage.alt = p.name;
  modalName.textContent = p.name;
  modalDesc.textContent = p.desc;

  let priceHTML = "$" + p.price;
  if (p.oldPrice) {
    const save = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
    priceHTML += ` <s>$${p.oldPrice}</s> <span class="save">Save ${save}%</span>`;
  }
  modalPrice.innerHTML = priceHTML;

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  document.body.style.overflow = "";
  modalProduct = null;
}

const modalCloseBtn = document.querySelector("#modal-close");
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

const qtyMinus = document.querySelector("#qty-minus");
const qtyPlus = document.querySelector("#qty-plus");

if (qtyMinus) {
  qtyMinus.addEventListener("click", () => {
    if (modalQty > 1) {
      modalQty -= 1;
      qtyValue.textContent = modalQty;
    }
  });
}

if (qtyPlus) {
  qtyPlus.addEventListener("click", () => {
    modalQty += 1;
    qtyValue.textContent = modalQty;
  });
}

const modalAdd = document.querySelector("#modal-add");
if (modalAdd) {
  modalAdd.addEventListener("click", () => {
    if (!modalProduct) return;
    for (let i = 0; i < modalQty; i++) {
      addToCart(modalProduct.id);
    }
    const qty = modalQty;
    closeModal();
    showToastMessage("✅ Added " + qty + " to cart");
  });
}

const modalBuy = document.querySelector("#modal-buy");
if (modalBuy) {
  modalBuy.addEventListener("click", () => {
    if (!modalProduct) return;
    for (let i = 0; i < modalQty; i++) {
      addToCart(modalProduct.id);
    }
    closeModal();
    const cartSection = document.querySelector("#cart");
    if (cartSection) cartSection.scrollIntoView({ behavior: "smooth" });
  });
}

// ---------- Login state ----------
function updateLoginUI() {
  const user = JSON.parse(localStorage.getItem("shopnow_user"));
  const loginLink = document.querySelector("#menu-login-link");
  const userInfo = document.querySelector("#menu-user-info");
  const userName = document.querySelector("#menu-user-name");
  const logoutBtn = document.querySelector("#logout-btn");
  const avatar = document.querySelector("#menu-avatar");

  if (!loginLink) return;

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

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("shopnow_user");
        updateLoginUI();
        showToastMessage("👋 You have been logged out");
      });
    }
  } else {
    loginLink.style.display = "inline-block";
    userInfo.style.display = "none";
    avatar.textContent = "";
    avatar.style.background = "#ccc";
  }
}

// ---------- Start ----------
renderProducts(products.filter((p) => p.category === "shoes"));
renderClothingSlider();
renderOutfits();
renderCart();
if (wishCount) wishCount.textContent = wishlist.length;
updateLoginUI();