const PRODUCT_CART = Object.keys(localStorage);

const totalQuantity = () => {
  let globalQuantity = 0;

  for (element of PRODUCT_CART) {
    let product = JSON.parse(localStorage.getItem(element));

    globalQuantity += product.quantity;
  }
  return globalQuantity;
};

const totalPrice = () => {
  let globalPrice = 0;

  for (element of PRODUCT_CART) {
    let product = JSON.parse(localStorage.getItem(element));

    globalPrice += product.price * product.quantity;
  }
  return globalPrice.toString().replace(/(\d)(?=(\d{3})+\b)/g,'$1 ');
};

const addPluriel = () => {
  if (totalQuantity() > 1) {
    return "s";
  } else {
    return "";
  }
};

const displayProduct = () => {
  const cart = document.querySelector("#cart");

  cart.innerHTML += `
    <p class="cart__price" id="cart__price">Sous-total (${totalQuantity()} article${addPluriel()}) :
      <span class="cart__price__total" id="cart__price__total">${totalPrice() + " €"}</span>
    </p>
    <button class="cart__btn">Passer la commande</button>
    
    <div class="cart__product" id="cart__product">
      
    </div>
  `;

  const cartProduct = document.querySelector("#cart__product");

  for (element of PRODUCT_CART) {
    let product = JSON.parse(localStorage.getItem(element));

    cartProduct.innerHTML += `
      <div class="cart__product" id="cart__product__${product.id}">
        <div class="cart__product__card">
          <div class="cart__product__card__info">
            <img class="cart__product__card__info__img" src="${product.img}" alt="">
            <div class="cart__product__card__info__text">
              <p class="cart__product__card__info__text__name">${product.name}</p>
              <p class="cart__product__card__info__text__price">${product.price + " €"}</p>
            </div>
          </div>
          <div class="cart__product__card__quantity">
            <div class="cart__product__card__quantity__input">
              <button class="cart__product__card__quantity__input__btn cart__product__card__quantity__input__btn--less"
              onclick="deductProductQuantity('${product.id}')">-</button>
              <input class="cart__product__card__quantity__input__text" id="product__quantity__${
                product.id
              }" onchange="quantityInput('${product.id}')" type="number" value="${product.quantity}">
              <button class="cart__product__card__quantity__input__btn cart__product__card__quantity__input__btn--more"
              onclick="addProductQuantity('${product.id}')">+</button>
            </div>
            <button class="cart__product__card__quantity__delete" onclick="removeProduct('${
              product.id
            }')">Supprimer</button>
          </div>
        </div>
      </div>
    `;
  }
};

displayProduct();

const removeProduct = (idProduct) => {
  localStorage.removeItem(idProduct);

  let productCardDisplay = document.querySelector("#cart__product__" + idProduct);
  productCardDisplay.remove();
  window.location.reload();
};

const addProductQuantity = (idProduct) => {
  product = JSON.parse(localStorage.getItem(idProduct));
  product.quantity += 1;
  if (product.quantity > 99) {
    product.quantity = 99;
  }
  localStorage.setItem(idProduct, JSON.stringify(product));
  displayQuantityInput(idProduct);
};

const deductProductQuantity = (idProduct) => {
  product = JSON.parse(localStorage.getItem(idProduct));
  product.quantity -= 1;
  if (product.quantity < 1) {
    product.quantity = 1;
  }
  localStorage.setItem(idProduct, JSON.stringify(product));
  displayQuantityInput(idProduct);
};

const quantityInput = (idProduct) => {
  productStorage = JSON.parse(localStorage.getItem(idProduct));

  productSelect = document.querySelector(`#product__quantity__${idProduct}`);
  if (Number(productSelect.value) > 99) {
    productSelect.value = 99
  } else if (Number(productSelect.value) < 1) {
    productSelect.value = 1
  }
  productStorage.quantity = Number(productSelect.value);

  localStorage.setItem(idProduct, JSON.stringify(productStorage));
  displayQuantityGlobal();
};
const displayQuantityInput = (idProduct) => {
  productStorage = JSON.parse(localStorage.getItem(idProduct));
  productSelect = document.querySelector(`#product__quantity__${idProduct}`);
  productSelect.value = productStorage.quantity;
  displayQuantityGlobal();
};
const displayQuantityGlobal = () => {
  document.querySelector("#cart__price").innerHTML = 
  `
  <p class="cart__price" id="cart__price">Sous-total (${totalQuantity()} article${addPluriel()}) :
    <span class="cart__price__total" id="cart__price__total">${totalPrice() + " €"}</span>
  </p>
  `;
}