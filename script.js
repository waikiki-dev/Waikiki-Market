/* =====================================================
   PRODUCT DATABASE
===================================================== */

const products = [

  {
    id:1,
    name:"Premium Wireless Headphones",
    category:"audio",
    price:999,
    oldPrice:1499,
    rating:4.9,
    discount:30,
    image:
    "https://images.squarespace-cdn.com/content/v1/5cfb59c78acf86000127156d/1700996105313-T1RLSA3Z06PBSG559PSP/HEADPHONES-CROPPED-ws.jpg",
    description:
    "Comfortable wireless headphones with clear sound, modern design and reliable battery life."
  },

  {
    id:2,
    name:"Smart Watch Pro",
    category:"gadgets",
    price:1299,
    oldPrice:1799,
    rating:4.8,
    discount:28,
    image:
    "https://www.pngitem.com/pimgs/m/795-7955980_smart-watch-png-transparent-png.png",
    description:
    "Modern smartwatch designed for everyday activities, notifications and lifestyle tracking."
  },

  {
    id:3,
    name:"Portable Mini Fan",
    category:"lifestyle",
    price:399,
    oldPrice:599,
    rating:4.7,
    discount:33,
    image:
    "https://www.thegembeautybar.com/cdn/shop/files/gembb-01.jpg?v=1728447221",
    description:
    "Compact rechargeable fan that is easy to carry at home, work or while travelling."
  },

  {
    id:4,
    name:"Stainless Travel Bottle",
    category:"home",
    price:499,
    oldPrice:699,
    rating:4.8,
    discount:29,
    image:
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    description:
    "Minimal stainless bottle designed for work, travel and everyday hydration."
  },

  {
    id:5,
    name:"Wireless Earbuds",
    category:"audio",
    price:699,
    oldPrice:999,
    rating:4.8,
    discount:30,
    image:
    "https://www.fliptwirls.com/uploads/90009900457025_1_435-1.jpg",
    description:
    "Compact wireless earbuds with a portable charging case and comfortable fit."
  },

  {
    id:6,
    name:"Smart Lifestyle Watch",
    category:"gadgets",
    price:899,
    oldPrice:1299,
    rating:4.6,
    discount:31,
    image:
    "https://file.aiquickdraw.com/imgcompressed/img/compressed_b8500774f2d5b2a56aaa341dad39b6d4.webp",
    description:
    "Stylish smartwatch designed for everyday lifestyle and convenience."
  },

  {
    id:7,
    name:"Travel Mini Fan",
    category:"lifestyle",
    price:349,
    oldPrice:499,
    rating:4.7,
    discount:30,
    image:
    "https://media.adeo.com/mkp/d9503a99d897937b77770a5023d7242a/media.jpg",
    description:
    "Portable cooling fan suitable for travel, work and outdoor activities."
  },

  {
    id:8,
    name:"Premium Thermo Bottle",
    category:"home",
    price:599,
    oldPrice:799,
    rating:4.9,
    discount:25,
    image:
    "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80",
    description:
    "Insulated bottle designed to keep drinks ready for your daily routine."
  }

];


/* =====================================================
   HERO
===================================================== */

const featuredProducts =
  products.slice(0,5);

let heroIndex = 0;
let heroTimer = null;


/* =====================================================
   CART
===================================================== */

let cart =
  JSON.parse(
    localStorage.getItem("waikiki-cart")
  ) || [];


/* =====================================================
   FILTER
===================================================== */

let currentCategory = "all";


/* =====================================================
   PRODUCT DETAILS
===================================================== */

let selectedProduct = null;
let selectedQuantity = 1;


/* =====================================================
   HERO RENDER
===================================================== */

function renderHero(){

  const track =
    document.getElementById(
      "heroTrack"
    );

  const dots =
    document.getElementById(
      "heroDots"
    );


  track.innerHTML =
    featuredProducts
      .map(
        (product,index) => `

        <div class="hero-slide">


          <!-- IMAGE FIRST -->

          <div class="hero-product-visual">

            <div class="hero-product-circle">

              <img
                src="${product.image}"
                alt="${product.name}">

            </div>


            <div class="hero-discount-badge">

              <strong>
                -${product.discount}%
              </strong>

              <span>
                OFF
              </span>

            </div>

          </div>


          <!-- TITLE + BUTTONS BELOW IMAGE -->

          <div class="hero-slide-content">

            <div class="hero-mini-label">
              ✨ FEATURED PRODUCT
            </div>

            <h1>
              ${getHeroTitle(product,index)}
            </h1>


            <div class="hero-slide-actions">

              <button
                class="btn btn-primary"
                onclick="viewProduct(${product.id})">

                View Product →

              </button>


              <button
                class="btn btn-secondary"
                onclick="addToCart(${product.id})">

                🛒 Add to Cart

              </button>

            </div>

          </div>

        </div>

        `
      )
      .join("");


  dots.innerHTML =
    featuredProducts
      .map(
        (product,index) => `

        <button
          class="
            hero-dot
            ${index === 0 ? "active" : ""}
          "
          onclick="goToHero(${index})"
          aria-label="
            Go to featured product
            ${index + 1}
          ">
        </button>

        `
      )
      .join("");


  updateHero();

}


/* =====================================================
   HERO TITLES
===================================================== */

function getHeroTitle(product,index){

  const titles = [

    `
    Premium Sound.
    <span>Better Every Day.</span>
    `,

    `
    Smarter Time.
    <span>Better Living.</span>
    `,

    `
    Stay Cool.
    <span>Anywhere.</span>
    `,

    `
    Hydrate Better.
    <span>Travel Smarter.</span>
    `,

    `
    Wireless Freedom.
    <span>Everywhere.</span>
    `

  ];

  return (
    titles[index]
    ||
    `
    Smart Products.
    <span>Better Living.</span>
    `
  );

}


/* =====================================================
   UPDATE HERO
===================================================== */

function updateHero(){

  const track =
    document.getElementById(
      "heroTrack"
    );

  const dots =
    document.querySelectorAll(
      ".hero-dot"
    );


  track.style.transform =
    `translateX(-${heroIndex * 100}%)`;


  dots.forEach(
    (dot,index) => {

      dot.classList.toggle(
        "active",
        index === heroIndex
      );

    }
  );

}


/* =====================================================
   NEXT HERO
===================================================== */

function nextHero(){

  heroIndex++;

  if(
    heroIndex >=
    featuredProducts.length
  ){

    heroIndex = 0;

  }

  updateHero();

  restartHeroTimer();

}


/* =====================================================
   PREVIOUS HERO
===================================================== */

function previousHero(){

  heroIndex--;

  if(heroIndex < 0){

    heroIndex =
      featuredProducts.length - 1;

  }

  updateHero();

  restartHeroTimer();

}


/* =====================================================
   GO TO HERO
===================================================== */

function goToHero(index){

  heroIndex = index;

  updateHero();

  restartHeroTimer();

}


/* =====================================================
   HERO TIMER
===================================================== */

function startHeroTimer(){

  clearInterval(heroTimer);

  heroTimer =
    setInterval(
      () => {

        heroIndex++;

        if(
          heroIndex >=
          featuredProducts.length
        ){

          heroIndex = 0;

        }

        updateHero();

      },
      4500
    );

}


function restartHeroTimer(){

  startHeroTimer();

}


/* =====================================================
   HERO BUTTONS
===================================================== */

document
  .getElementById("heroNext")
  .addEventListener(
    "click",
    nextHero
  );


document
  .getElementById("heroPrev")
  .addEventListener(
    "click",
    previousHero
  );


/* =====================================================
   HERO HOVER
===================================================== */

document
  .getElementById("heroSlider")
  .addEventListener(
    "mouseenter",
    () => clearInterval(heroTimer)
  );


document
  .getElementById("heroSlider")
  .addEventListener(
    "mouseleave",
    startHeroTimer
  );


/* =====================================================
   PRODUCTS
===================================================== */

function renderProducts(){

  const container =
    document.getElementById(
      "products"
    );


  const search =
    document
      .getElementById(
        "searchInput"
      )
      .value
      .toLowerCase();


  const filtered =
    products.filter(
      product => {

        const categoryMatch =
          currentCategory === "all"
          ||
          product.category ===
          currentCategory;


        const searchMatch =
          product.name
            .toLowerCase()
            .includes(search);


        return (
          categoryMatch &&
          searchMatch
        );

      }
    );


  if(filtered.length === 0){

    container.innerHTML = `

      <div class="no-results">

        <h3>
          No products found 😔
        </h3>

        <p>
          Try another search or category.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML =
    filtered
      .map(
        product => `

        <div class="product-card">

          <div class="product-image">

            <div class="discount">
              -${product.discount}%
            </div>


            <button
              class="favorite"
              onclick="favoriteProduct(this)">

              ♡

            </button>


            <img
              src="${product.image}"
              alt="${product.name}">

          </div>


          <div class="product-info">

            <h3>
              ${product.name}
            </h3>


            <div class="product-actions">

              <button
                class="view-product"
                onclick="
                  viewProduct(${product.id})
                ">

                View Product

              </button>


              <button
                class="add-cart"
                onclick="
                  addToCart(${product.id})
                ">

                🛒 Add

              </button>

            </div>

          </div>

        </div>

        `
      )
      .join("");

}


/* =====================================================
   VIEW PRODUCT
===================================================== */

function viewProduct(id){

  selectedProduct =
    products.find(
      product =>
        product.id === id
    );


  if(!selectedProduct)
    return;


  selectedQuantity = 1;

  renderProductDetails();


  document
    .getElementById(
      "productModal"
    )
    .classList.add("show");

}


/* =====================================================
   PRODUCT DETAILS
===================================================== */

function renderProductDetails(){

  const product =
    selectedProduct;


  document
    .getElementById(
      "productDetails"
    )
    .innerHTML = `

    <div class="product-detail">


      <div class="product-detail-image">

        <img
          src="${product.image}"
          alt="${product.name}">

      </div>


      <div class="product-detail-info">

        <div class="product-detail-category">
          ${product.category}
        </div>


        <div class="product-detail-discount">
          -${product.discount}% OFF
        </div>


        <h2>
          ${product.name}
        </h2>


        <div class="product-detail-rating">
          ⭐⭐⭐⭐⭐
          ${product.rating}
          · 128 reviews
        </div>


        <p class="product-detail-description">
          ${product.description}
        </p>


        <div class="product-detail-price">
          ₱${product.price.toLocaleString()}
        </div>


        <div class="product-detail-old-price">
          ₱${product.oldPrice.toLocaleString()}
        </div>


        <div class="product-quantity">

          <strong>
            Quantity:
          </strong>


          <button
            onclick="
              changeProductQuantity(-1)
            ">
            −
          </button>


          <span id="productQuantity">
            1
          </span>


          <button
            onclick="
              changeProductQuantity(1)
            ">
            +
          </button>

        </div>


        <button
          class="product-buy"
          onclick="
            addSelectedProductToCart()
          ">

          🛒 Add to Cart

        </button>

      </div>

    </div>

  `;

}


/* =====================================================
   PRODUCT QUANTITY
===================================================== */

function changeProductQuantity(amount){

  selectedQuantity += amount;


  if(selectedQuantity < 1){

    selectedQuantity = 1;

  }


  const quantityElement =
    document.getElementById(
      "productQuantity"
    );


  if(quantityElement){

    quantityElement.textContent =
      selectedQuantity;

  }

}


/* =====================================================
   ADD SELECTED PRODUCT
===================================================== */

function addSelectedProductToCart(){

  if(!selectedProduct)
    return;


  const existing =
    cart.find(
      item =>
        item.id ===
        selectedProduct.id
    );


  if(existing){

    existing.quantity +=
      selectedQuantity;

  }else{

    cart.push({

      id:
        selectedProduct.id,

      quantity:
        selectedQuantity

    });

  }


  saveCart();


  const productName =
    selectedProduct.name;


  closeProduct();


  showToast(
    productName +
    " added to cart 🛒"
  );

}


/* =====================================================
   CLOSE PRODUCT
===================================================== */

function closeProduct(){

  document
    .getElementById(
      "productModal"
    )
    .classList.remove("show");

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id){

  const product =
    products.find(
      p => p.id === id
    );


  if(!product)
    return;


  const existing =
    cart.find(
      item =>
        item.id === id
    );


  if(existing){

    existing.quantity++;

  }else{

    cart.push({

      id:id,
      quantity:1

    });

  }


  saveCart();


  showToast(
    product.name +
    " added to cart 🛒"
  );

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart(){

  localStorage.setItem(
    "waikiki-cart",
    JSON.stringify(cart)
  );


  renderCart();

  updateCartCount();

}


/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount(){

  const count =
    cart.reduce(
      (sum,item) =>
        sum + item.quantity,
      0
    );


  document
    .getElementById(
      "cartCount"
    )
    .textContent = count;

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart(){

  const container =
    document.getElementById(
      "cartItems"
    );


  if(cart.length === 0){

    container.innerHTML = `

      <div class="empty-cart">

        <div style="font-size:45px">
          🛒
        </div>

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add some products to get started.
        </p>

      </div>

    `;


    document
      .getElementById(
        "cartTotal"
      )
      .textContent =
      "₱0";


    return;

  }


  let total = 0;


  container.innerHTML =
    cart.map(
      item => {

        const product =
          products.find(
            p =>
              p.id ===
              item.id
          );


        if(!product)
          return "";


        const subtotal =
          product.price *
          item.quantity;


        total += subtotal;


        return `

          <div class="cart-item">

            <div class="cart-item-image">

              <img
                src="${product.image}"
                alt="${product.name}">

            </div>


            <div>

              <h4>
                ${product.name}
              </h4>


              <div class="cart-item-price">
                ₱${subtotal.toLocaleString()}
              </div>


              <div class="quantity">

                <button
                  onclick="
                    changeQuantity(
                      ${product.id},
                      -1
                    )
                  ">
                  −
                </button>


                <span>
                  ${item.quantity}
                </span>


                <button
                  onclick="
                    changeQuantity(
                      ${product.id},
                      1
                    )
                  ">
                  +
                </button>


                <button
                  class="remove"
                  onclick="
                    removeFromCart(
                      ${product.id}
                    )
                  ">

                  Remove

                </button>

              </div>

            </div>

          </div>

        `;

      }
    )
    .join("");


  document
    .getElementById(
      "cartTotal"
    )
    .textContent =
      "₱" +
      total.toLocaleString();

}


/* =====================================================
   CART QUANTITY
===================================================== */

function changeQuantity(id,amount){

  const item =
    cart.find(
      i => i.id === id
    );


  if(!item)
    return;


  item.quantity += amount;


  if(item.quantity <= 0){

    cart =
      cart.filter(
        i => i.id !== id
      );

  }


  saveCart();

}


/* =====================================================
   REMOVE
===================================================== */

function removeFromCart(id){

  cart =
    cart.filter(
      item =>
        item.id !== id
    );


  saveCart();


  showToast(
    "Product removed"
  );

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart(){

  renderCart();


  document
    .getElementById(
      "cartOverlay"
    )
    .classList.add("show");

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart(){

  document
    .getElementById(
      "cartOverlay"
    )
    .classList.remove("show");

}


/* =====================================================
   CHECKOUT
===================================================== */

function startCheckout(){

  if(cart.length === 0){

    showToast(
      "Your cart is empty"
    );

    return;

  }


  closeCart();

  renderCheckout();


  document
    .getElementById(
      "checkoutOverlay"
    )
    .classList.add("show");

}


/* =====================================================
   CLOSE CHECKOUT
===================================================== */

function closeCheckout(){

  document
    .getElementById(
      "checkoutOverlay"
    )
    .classList.remove("show");

}


/* =====================================================
   CHECKOUT RENDER
===================================================== */

function renderCheckout(){

  const container =
    document.getElementById(
      "checkoutItems"
    );


  let subtotal = 0;


  container.innerHTML =
    cart.map(
      item => {

        const product =
          products.find(
            p =>
              p.id === item.id
          );


        if(!product)
          return "";


        const total =
          product.price *
          item.quantity;


        subtotal += total;


        return `

          <div class="summary-item">

            <span>
              ${product.name}
              × ${item.quantity}
            </span>

            <strong>
              ₱${total.toLocaleString()}
            </strong>

          </div>

        `;

      }
    )
    .join("");


  document
    .getElementById(
      "checkoutSubtotal"
    )
    .textContent =
      "₱" +
      subtotal.toLocaleString();


  updateCheckoutTotal();

}


/* =====================================================
   CHECKOUT TOTAL
===================================================== */

function updateCheckoutTotal(){

  let subtotal = 0;


  cart.forEach(
    item => {

      const product =
        products.find(
          p =>
            p.id === item.id
        );


      if(product){

        subtotal +=
          product.price *
          item.quantity;

      }

    }
  );


  const shipping =
    Number(
      document
        .getElementById(
          "shippingMethod"
        )
        .value
    );


  document
    .getElementById(
      "checkoutShipping"
    )
    .textContent =

      shipping === 0
      ?
      "FREE"
      :
      "₱" +
      shipping.toLocaleString();


  document
    .getElementById(
      "checkoutTotal"
    )
    .textContent =
      "₱" +
      (
        subtotal +
        shipping
      ).toLocaleString();

}


/* =====================================================
   PLACE ORDER
===================================================== */

function placeOrder(){

  const name =
    document
      .getElementById(
        "customerName"
      )
      .value
      .trim();


  const email =
    document
      .getElementById(
        "customerEmail"
      )
      .value
      .trim();


  const phone =
    document
      .getElementById(
        "customerPhone"
      )
      .value
      .trim();


  const address =
    document
      .getElementById(
        "customerAddress"
      )
      .value
      .trim();


  const city =
    document
      .getElementById(
        "customerCity"
      )
      .value
      .trim();


  const province =
    document
      .getElementById(
        "customerProvince"
      )
      .value
      .trim();


  if(
    !name ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !province
  ){

    showToast(
      "Please complete your information"
    );

    return;

  }


  const orderNumber =
    "WM" +
    Date.now()
      .toString()
      .slice(-6);


  const paymentMethod =
    document
      .getElementById(
        "paymentMethod"
      )
      .value;


  document
    .getElementById(
      "checkoutContent"
    )
    .innerHTML = `

      <div class="success-box">

        <div class="success-icon">
          ✅
        </div>


        <h2>
          Order Confirmed!
        </h2>


        <p>
          Thank you,
          <strong>
            ${escapeHtml(name)}
          </strong>!
        </p>


        <p>
          Your demo order number is:
          <br>

          <strong>
            #${orderNumber}
          </strong>

        </p>


        <p>
          Payment:
          ${escapeHtml(paymentMethod)}
        </p>


        <button
          class="place-order"
          onclick="finishOrder()">

          Continue Shopping

        </button>

      </div>

    `;

}


/* =====================================================
   FINISH ORDER
===================================================== */

function finishOrder(){

  cart = [];

  saveCart();

  closeCheckout();

  location.reload();

}


/* =====================================================
   FAVORITE
===================================================== */

function favoriteProduct(button){

  if(
    button.textContent.trim()
    ===
    "♡"
  ){

    button.textContent =
      "♥";


    showToast(
      "Added to favorites ❤️"
    );

  }else{

    button.textContent =
      "♡";

  }

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message){

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  setTimeout(
    () => {

      toast.classList.remove(
        "show"
      );

    },
    2000
  );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(value){

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


/* =====================================================
   SEARCH
===================================================== */

document
  .getElementById(
    "searchInput"
  )
  .addEventListener(
    "input",
    renderProducts
  );


/* =====================================================
   CATEGORY
===================================================== */

document
  .querySelectorAll(
    ".category"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        function(){

          document
            .querySelectorAll(
              ".category"
            )
            .forEach(
              b =>
                b.classList.remove(
                  "active"
                )
            );


          this.classList.add(
            "active"
          );


          currentCategory =
            this.dataset.category;


          renderProducts();

        }
      );

    }
  );


/* =====================================================
   THEME
===================================================== */

const themeBtn =
  document.getElementById(
    "themeBtn"
  );


if(
  localStorage.getItem(
    "waikiki-theme"
  )
  ===
  "dark"
){

  document.body.classList.add(
    "dark"
  );

  themeBtn.textContent =
    "☀️";

}


themeBtn.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark"
    );


    const dark =
      document.body.classList.contains(
        "dark"
      );


    themeBtn.textContent =
      dark
      ?
      "☀️"
      :
      "🌙";


    localStorage.setItem(
      "waikiki-theme",
      dark
      ?
      "dark"
      :
      "light"
    );

  }
);


/* =====================================================
   CART BUTTON
===================================================== */

document
  .getElementById(
    "cartBtn"
  )
  .addEventListener(
    "click",
    openCart
  );


/* =====================================================
   CART OVERLAY
===================================================== */

document
  .getElementById(
    "cartOverlay"
  )
  .addEventListener(
    "click",
    function(event){

      if(
        event.target === this
      ){

        closeCart();

      }

    }
  );


/* =====================================================
   PRODUCT MODAL OVERLAY
===================================================== */

document
  .getElementById(
    "productModal"
  )
  .addEventListener(
    "click",
    function(event){

      if(
        event.target === this
      ){

        closeProduct();

      }

    }
  );


/* =====================================================
   CHECKOUT OVERLAY
===================================================== */

document
  .getElementById(
    "checkoutOverlay"
  )
  .addEventListener(
    "click",
    function(event){

      if(
        event.target === this
      ){

        closeCheckout();

      }

    }
  );


/* =====================================================
   SHIPPING
===================================================== */

document
  .getElementById(
    "shippingMethod"
  )
  .addEventListener(
    "change",
    updateCheckoutTotal
  );


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if(event.key !== "Escape")
      return;

    closeProduct();

    closeCart();

    closeCheckout();

  }
);


/* =====================================================
   INITIALIZE
===================================================== */

renderHero();

renderProducts();

renderCart();

updateCartCount();

startHeroTimer();
