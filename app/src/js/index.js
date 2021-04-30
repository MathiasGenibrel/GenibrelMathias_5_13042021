import { ratingScore } from "./ratingScore.js";
import { numberObjectCart } from "./numberObjectCart.js";

if (JSON.parse(localStorage.getItem("cart")) == null) localStorage.setItem("cart", JSON.stringify([]));

numberObjectCart();

const getCameraProduct = async () => {
  const response = await fetch(`http://localhost:3000/api/cameras`);

  return response.json();
};

const showCameraProduct = async (cameras) => {
  cameras.forEach(async (camera) => {
    camera = await camera;

    const cameraProductsList = document.querySelector("#camera__item");

    cameraProductsList.innerHTML += `
        <a class="camera__item__product" href="../src/pages/product.html?id=${camera._id}">
          <img class="camera__item__product__img" src="${camera.imageUrl}" alt="Appareil photo id:${camera._id}">
          <h4 class="camera__item__product__title">${camera.name}</h4>
          <p class="camera__item__product__price">${camera.price / 100 + " €"}</p>
          <span class="camera__item__product__rating">
            ${ratingScore()}
            <i class="camera__item__product__star fas fa-star"></i>
          </span>
        </a>
      `;
  });
};

(async () => {
  await showCameraProduct(await getCameraProduct());
})();