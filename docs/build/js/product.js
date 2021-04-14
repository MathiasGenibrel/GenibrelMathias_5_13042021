//Retrieving information from the url after "?"

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

//Global variable

const cameraProduct = document.getElementById("product");
let camera;

console.log(productId)

if (productId === null) {
  window.location.replace("../../index.html");
}

const getCameraProduct = async () => {
  camera = await fetch(
    "http://localhost:3000/api/cameras/" + productId
  ).then((res) => res.json());
  console.log(camera)
};

const ratingProduct = (rating => {
  rating = Number.parseFloat((Math.random() * 5).toFixed(1));
  return rating;
})

const showCameraProduct = async () => {
  await getCameraProduct();

  document.title = camera.name;

  cameraProduct.innerHTML = 
    `
    <div class="product__box">
      <img class="product__box__img" src="../../images/img_without_background/${camera._id}.png" alt="">
    </div>
    <div class="product__sheet">
      <div class="product__sheet__name-id">
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
        <a class="product__sheet__shopping__add-cart" href="">
          <p class="product__sheet__shopping__add-cart__text">Ajouter au panier</p>
          <i class="product__sheet__shopping__add-cart__icon fas fa-shopping-cart"></i>
        </a>
        <a class="product__sheet__shopping__buy" href="">
          <p class="product__sheet__shopping__buy__text">Buy</p>
        </a>
      </div>
    </div>
    `
}
showCameraProduct();