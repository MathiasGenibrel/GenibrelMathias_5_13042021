import { ratingScore } from "./ratingScore.js";
import { numberObjectCart } from "./numberObjectCart.js";

numberObjectCart();

let QUANTITY_SELECTED = 1;

const getCameraProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId === null) {
    window.location.replace("../../index.html");
  }
  const response = await fetch(`http://localhost:3000/api/cameras/${productId}`);

  return response.json();
};

const showCameraProduct = async (camera) => {
  camera = await camera;

  document.title += " " + camera.name;

  const cameraProduct = document.querySelector("#product");

  cameraProduct.innerHTML = `
    <div class="product__box">
      <img class="product__box__img" src="../../../images/img_without_background/${camera._id}.png" alt="">
    </div>
    <div class="product__sheet">
      <div class="product__sheet__name-id">
        <select class="product__sheet__name-id__lenses" name="sort" id="product__sheet__name-id__lenses">
          ${camera.lenses.map((lense) => `<option>${lense}</option>`)}
        </select>
        <h1 class="product__sheet__name-id__title">${camera.name}</h1>
        <p class="product__sheet__name-id__subtitle">ID : ${camera._id}</p>
      </div>
      <p class="product__sheet__desc">${camera.description}</p>
      <div class="product__sheet__info">
        <div class="product__sheet__info__price-rating">
          <i class="product__sheet__info__price-rating__icon fas fa-euro-sign"></i>
          <h2 class="product__sheet__info__price-rating__title">Prix</h2>
          <p class="product__sheet__info__price-rating__subtitle">${(camera.price / 100).toFixed(2)}</p>
        </div>
        <div class="product__sheet__info__price-rating">
          <i class="product__sheet__info__price-rating__icon fas fa-star"></i>
          <h2 class="product__sheet__info__price-rating__title">Notes</h2>
          <p class="product__sheet__info__price-rating__subtitle">${ratingScore()}</p>
        </div>
      </div>
      <div class="product__sheet__shopping">
        <div class="product__sheet__shopping__quantity" id="product__sheet__shopping__quantity">

        </div>
        <button class="product__sheet__shopping__buy" id="buy">
          <p class="product__sheet__shopping__buy__text">Acheter</p>
        </button>
        <button class="product__sheet__shopping__add-cart" id="add-to-cart">
          <p class="product__sheet__shopping__add-cart__text">Ajouter au panier</p>
          <i class="product__sheet__shopping__add-cart__icon fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
    `;
  document.querySelector("#add-to-cart").addEventListener("click", addToCart);
  document.querySelector("#buy").addEventListener("click", buy);
  displayQuantityInput();
};

const displayQuantityInput = () => {
  document.querySelector("#product__sheet__shopping__quantity").innerHTML = `
    <button class="product__sheet__shopping__quantity__input-btn product__sheet__shopping__quantity__input-less"
    id="product__sheet__shopping__quantity__input-less">-</button>

    <input class="product__sheet__shopping__quantity__input" id="product__sheet__shopping__quantity__input"
    type="number" value="${QUANTITY_SELECTED}">
    
    <button class="product__sheet__shopping__quantity__input-btn product__sheet__shopping__quantity__input-more"
    id="product__sheet__shopping__quantity__input-more">+</button>
  `;
  document
    .querySelector("#product__sheet__shopping__quantity__input-less")
    .addEventListener("click", deductProductQuantity);
  document
    .querySelector("#product__sheet__shopping__quantity__input-more")
    .addEventListener("click", addProductQuantity);
  document.querySelector("#product__sheet__shopping__quantity__input").addEventListener("change", quantityInput);
};

const addProductQuantity = () => {
  QUANTITY_SELECTED++;
  if (QUANTITY_SELECTED > 99) return (QUANTITY_SELECTED = 99);
  document.querySelector("#product__sheet__shopping__quantity__input").value = QUANTITY_SELECTED;
  return QUANTITY_SELECTED;
};

const deductProductQuantity = () => {
  QUANTITY_SELECTED--;
  if (QUANTITY_SELECTED < 1) return (QUANTITY_SELECTED = 1);
  document.querySelector("#product__sheet__shopping__quantity__input").value = QUANTITY_SELECTED;
  return QUANTITY_SELECTED;
};

const quantityInput = () => {
  let quantityInputValue = Number.parseInt(document.querySelector("#product__sheet__shopping__quantity__input").value);
  QUANTITY_SELECTED = quantityInputValue ? quantityInputValue : 1;
  if (QUANTITY_SELECTED > 99) QUANTITY_SELECTED = 99;
  if (QUANTITY_SELECTED < 1) QUANTITY_SELECTED = 1;
  document.querySelector("#product__sheet__shopping__quantity__input").value = QUANTITY_SELECTED;
};

const addToCart = async () => {
  const camera = await getCameraProduct();

  const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
  const isFoundProduct = cart.find((element) => element.id == camera._id);
  if (cart.indexOf(isFoundProduct) != -1) cart.splice(cart.indexOf(isFoundProduct), 1);

  let quantityVerifyMax = isFoundProduct ? (isFoundProduct.quantity += QUANTITY_SELECTED) : QUANTITY_SELECTED;
  if (quantityVerifyMax > 99) quantityVerifyMax = 99;

  cart.push({
    img: camera.imageUrl,
    name: camera.name,
    id: camera._id,
    price: camera.price / 100,
    quantity: quantityVerifyMax,
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  numberObjectCart();
};

const buy = async () => {
  await addToCart();
  window.location.replace("./cart.html");
};

(async () => {
  await showCameraProduct(await getCameraProduct());
})();
