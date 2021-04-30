const PRODUCT_CART = JSON.parse(localStorage.getItem("cart"));

const totalQuantity = () => {
  let globalQuantity = 0;

  for (element of PRODUCT_CART) {
    globalQuantity += element.quantity;
  }
  return globalQuantity;
};

const totalPrice = () => {
  let globalPrice = 0;

  for (element of PRODUCT_CART) {
    globalPrice += element.price * element.quantity;
  }
  return globalPrice.toString().replace(/(\d)(?=(\d{3})+\b)/g, "$1 ");
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
    <button class="cart__btn" onclick=window.location.href="./command.html">Passer la commande</button>
    
    <div class="cart__product" id="cart__product">
      
    </div>
  `;

  const cartProduct = document.querySelector("#cart__product");

  for (element of PRODUCT_CART) {
    cartProduct.innerHTML += `
      <div class="cart__product" id="cart__product__${element.id}">
        <div class="cart__product__card">
          <div class="cart__product__card__info">
            <img class="cart__product__card__info__img" src="${element.img}" alt="">
            <div class="cart__product__card__info__text">
              <p class="cart__product__card__info__text__name">${element.name}</p>
              <p class="cart__product__card__info__text__price">${element.price + " €"}</p>
            </div>
          </div>
          <div class="cart__product__card__quantity">
            <div class="cart__product__card__quantity__input">
              <button class="cart__product__card__quantity__input__btn cart__product__card__quantity__input__btn--less"
              onclick="deductProductQuantity('${element.id}')">-</button>
              <input class="cart__product__card__quantity__input__text" id="product__quantity__${
                element.id
              }" onchange="quantityInput('${element.id}')" type="number" value="${element.quantity}">
              <button class="cart__product__card__quantity__input__btn cart__product__card__quantity__input__btn--more"
              onclick="addProductQuantity('${element.id}')">+</button>
            </div>
            <button class="cart__product__card__quantity__delete" onclick="removeProduct('${
              element.id
            }')">Supprimer</button>
          </div>
        </div>
      </div>
    `;
  }
};

const displayEmptyCart = () => {
  document.querySelector("#cart").innerHTML = `
  <p class="cart__empty">Votre panier est vide !</p>
  `;
};

if (JSON.parse(localStorage.getItem("cart")).length === 0) displayEmptyCart();
if (JSON.parse(localStorage.getItem("cart")).length !== 0) displayProduct();

const removeProduct = (idProduct) => {
  let foundProduct = PRODUCT_CART.find((element) => element.id == idProduct);
  let indexProduct = PRODUCT_CART.indexOf(foundProduct);
  PRODUCT_CART.splice(indexProduct, 1);

  localStorage.setItem("cart", JSON.stringify(PRODUCT_CART));

  let productCardDisplay = document.querySelector("#cart__product__" + idProduct);
  productCardDisplay.remove();

  if (JSON.parse(localStorage.getItem("cart")).length === 0) return displayEmptyCart();
  displayQuantityGlobal();
};

const addProductQuantity = (idProduct) => {
  let foundProduct = PRODUCT_CART.find((element) => element.id == idProduct);

  foundProduct.quantity += 1;
  if (foundProduct.quantity > 99) foundProduct.quantity = 99;

  localStorage.setItem("cart", JSON.stringify(PRODUCT_CART));
  displayQuantityInput(idProduct);
};

const deductProductQuantity = (idProduct) => {
  let foundProduct = PRODUCT_CART.find((element) => element.id == idProduct);

  foundProduct.quantity -= 1;
  if (foundProduct.quantity < 1) foundProduct.quantity = 1;

  localStorage.setItem("cart", JSON.stringify(PRODUCT_CART));
  displayQuantityInput(idProduct);
};

const quantityInput = (idProduct) => {
  let foundProduct = PRODUCT_CART.find((element) => element.id == idProduct);

  productSelect = document.querySelector(`#product__quantity__${idProduct}`);
  if (Number(productSelect.value) > 99) productSelect.value = 99;
  if (Number(productSelect.value) < 1) productSelect.value = 1;

  foundProduct.quantity = Number(productSelect.value);

  localStorage.setItem("cart", JSON.stringify(PRODUCT_CART));
  displayQuantityGlobal();
};
const displayQuantityInput = (idProduct) => {
  let foundProduct = PRODUCT_CART.find((element) => element.id == idProduct);
  productSelect = document.querySelector(`#product__quantity__${idProduct}`);
  productSelect.value = foundProduct.quantity;
  displayQuantityGlobal();
};
const displayQuantityGlobal = () => {
  document.querySelector("#cart__price").innerHTML = `
  <p class="cart__price" id="cart__price">Sous-total (${totalQuantity()} article${addPluriel()}) :
    <span class="cart__price__total" id="cart__price__total">${totalPrice() + " €"}</span>
  </p>
  `;
};
