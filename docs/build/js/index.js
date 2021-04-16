const ratingProduct = (rating) => {
  rating = Number.parseFloat((Math.random() * 5).toFixed(1));
  return rating;
};

const getCameraProduct = async () => {
  const response = await fetch(`http://localhost:3000/api/cameras`);

  return response.json();
};

const showCameraProduct = async (cameras) => {
  cameras.forEach(async (camera) => {
    camera = await camera;

    const cameraProductsList = document.querySelector("#camera__item");

    cameraProductsList.innerHTML += `
        <a class="camera__item__product" id="camera__item__product" href="./docs/src/product.html?id=${camera._id}">
          <img class="camera__item__product__img" src="${camera.imageUrl}" alt="Appareil photo id:${camera._id}">
          <h4 class="camera__item__product__title">${camera.name}</h4>
          <p class="camera__item__product__price">${camera.price / 100 + " €"}</p>
          <span class="camera__item__product__rating">
            ${ratingProduct()}
            <i class="camera__item__product__star fas fa-star"></i>
          </span>
        </a>
      `;
  });
};

(async () => {
  await showCameraProduct(await getCameraProduct());
})();