const ratingProduct = (rating) => {
  rating = Number.parseFloat((Math.random() * 5).toFixed(1));
  return rating;
};

const getCameraProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId === null) {
    window.location.replace("../../index.html");
  }
  response = await fetch(`http://localhost:3000/api/cameras/${productId}`);

  return response.json();
};

const showCameraProduct = async (camera) => {
  camera = await camera;

  document.title += ` ${camera.name}`;

  const cameraProduct = document.querySelector("#product");

  cameraProduct.innerHTML = `
    <div class="product__box">
      <img class="product__box__img" src="../../images/img_without_background/${camera._id}.png" alt="">
    </div>
    <div class="product__sheet">
      <div class="product__sheet__name-id">
        <select class="product__sheet__name-id__lenses" name="sort" id="product__sheet__name-id__lenses">
          
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
          <p class="product__sheet__info__price-rating__subtitle">${ratingProduct()}</p>
        </div>
      </div>
      <div class="product__sheet__shopping">
        <button class="product__sheet__shopping__add-cart" onclick="addToCart()">
          <p class="product__sheet__shopping__add-cart__text">Ajouter au panier</p>
          <i class="product__sheet__shopping__add-cart__icon fas fa-shopping-cart"></i>
        </button>
        <button class="product__sheet__shopping__buy" id="buy" onclick="buy(addToCart())">
          <p class="product__sheet__shopping__buy__text">Acheter</p>
        </button>
      </div>
    </div>
    `;
    let cameraLens = document.querySelector("#product__sheet__name-id__lenses");

    for (lense of camera.lenses) {
      cameraLens.innerHTML += 
      `
          <option>${lense}</option>
      `
    }
};

(async () => {
  await showCameraProduct(await getCameraProduct());
})();

const addToCart = async () => {
  const camera = await getCameraProduct();
  let product;

  if (JSON.parse(localStorage.getItem(`${camera._id}`)) === null) {
    product = {
      img: camera.imageUrl,
      name: camera.name,
      id: camera._id,
      price: camera.price / 100,
      quantity: 1,
    };
  } else {
    product = JSON.parse(localStorage.getItem(`${camera._id}`));
    if (product.quantity < 99) {
      product.quantity += 1;
    }
  }

  localStorage.setItem(`${camera._id}`, JSON.stringify(product));
};

const buy = () => {
  window.location.replace("./cart.html");
};
