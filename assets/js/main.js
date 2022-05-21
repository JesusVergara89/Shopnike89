//navbar btn menu
const navbarBtn = document.getElementById('navbarBtn')
const navbarNav = document.querySelector('.navbar__nav')

navbarBtn.addEventListener('click', function (e) {
  console.log(navbarNav)
  navbarNav.classList.toggle('active')
})

// Arreglo de Productos
const products = [
  {
    id: 1,
    name: 'Nike confort',
    price: 450,
    image: '/assets/img/zapato1.jpg',
    description: 'Perfect 4 work, amazing 4 walk, strong 4 run... And always the best city style! just 4 U!'
  },
  {
    id: 2,
    name: 'Nike casual',
    price: 320,
    image: '/assets/img/zapato2.jfif',
    description: 'If u want to look amazing and relax, be cool always, at work, at park, chilly moments ever! just 4 U!'
  },
  {
    id: 3,
    name: 'Nike urban',
    price: 650,
    image: '/assets/img/zapato3.jfif',
    description: 'the best version of your human being... control all the step and be different and secure always, the world is in ur way! just 4 U!'
  },    
  {
    id: 4,
    name: 'Nike Xpacial',
    price: 1000,
    image: '/assets/img/zapato4.jfif',
    description: 'Do u want to the the center of the universe? So, there is only way to do that, and nothing else! just 4 U!'
  }
]

const wrapperProducts = document.getElementById('wrapper-products');

let productsHTML = '';

for (let product of products) {
  productsHTML += `
  <div class="wrapper__product">
  <div class="wrapper__product-img"><img src="${product.image}" alt="${product.name}" class="wrapper__product-img-item"></div>
  <div class="wrapper__product-content">
  <h3 class="wrapper__product-title">${product.name}</h3>
  <p class="wrapper__product-text">${product.description}</p>
  <div class="wrapper__product-btn"><span class="wrapper__product-btn-text">$ ${product.price}</span>
  <button class="wrapper__product-btn-item" data-id="${product.id}">
  <i class='bx bx-shopping-bag'></i>
  <span class="wrapper__product-btn-text">Add to Cart</span>
  </button>
  </div>
  </div>
  </div>
  `
}
wrapperProducts.insertAdjacentHTML('beforeend', productsHTML)

let cart = [];
function find(id) {
  for (let product of products) {
    if (product.id === id) {
      return product
    }
  }
}

function addToCart(id) {
  const product = find(id)
  cart.push(product)
}

wrapperProducts.addEventListener('click', function (e) {
  if (e.target.closest('.wrapper__product-btn-item')) {
    const id = e.target.closest('.wrapper__product-btn-item').dataset.id
    addToCart(+id)
    renderCart()
  }
})

const wrapperCart = document.getElementById('wrapper-cart')

function renderCart() {
  let cartHTML = ''

  for (let product of cart) {
    cartHTML += `
    <div class="cart__item">
    <div class="cart__item-img">
    <img src="${product?.image}" alt="${product.name}" class="cart__item-img-item">
    </div>
    <div class="cart__item-content">
    <h3 class="cart__item-title">${product.name}</h3>
    <p class="cart__item-text">
    ${product.description}
    </p>
    <div class="cart__item-btn">
    <span class="cart__item-btn-text">$ ${product.price}</span>
    <button class="cart__item-btn-item" data-id="${product.id}">
    <i class='bx bx-x'></i>
    </button>
    </div>
    </div>
    </div>
    `
  }
  const cartTotal = document.getElementById('cart-total')

  wrapperCart.innerHTML = cartHTML.length > 0 ? cartHTML : '<p>There is not products</p>'
  cartTotal.innerHTML = `$ ${sumTotal()}`
}

renderCart()

function sumTotal() {
  let sum = 0;
  for (let product of cart) {
    sum += product.price
  }
  return sum;
}

function removeFromCart(id) {
  let newArr = [];
  for (let product of cart) {
    if (product.id !== id) {
      newArr.push(product);
    }
  }
  cart = newArr
}

wrapperCart.addEventListener('click', function (e) {
  if (e.target.closest('.cart__item-btn-item')) {
    const id = e.target.closest('.cart__item-btn-item').dataset.id
    removeFromCart(+id);
    renderCart()
  }
})

const checkOut=document.getElementById('checkout')

checkOut.addEventListener('click',function(e){
  if(e.target.closest('.wrapper__sidebar-cart-btn-link')){
    alert('Thanks 4 your shop')
    cart=[]
    renderCart()
  }
})

