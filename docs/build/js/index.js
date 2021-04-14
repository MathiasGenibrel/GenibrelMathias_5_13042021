//Global variable
const cameraProductsList = document.getElementById("camera__item"); //used for write in html

let cameras;

//Function for get info of api

const getCameraProduct = async () => {
  cameras = await fetch(
    "http://localhost:3000/api/cameras"
  ).then((res) => res.json());
};

//Function for make random in range of 0 to 5 for simulate rating score (temp)

const ratingProduct = (rating => {
  rating = Number.parseFloat((Math.random() * 5).toFixed(1));
  return rating;
})

//Function get info of getCameraProduct for write in html

const showCameraProduct = async () => {
  await getCameraProduct();

  //Map of promise results

  cameras.map(camera => {
    cameraProductsList.innerHTML += 
      `
        <a class="camera__item__product" id="camera__item__product" href="./docs/src/product.html?id=${camera._id}">
          <img class="camera__item__product__img" src="${camera.imageUrl}" alt="Appareil photo id:${camera._id}">
          <h4 class="camera__item__product__title">${camera.name}</h4>
          <p class="camera__item__product__price">${camera.price / 100 + " €"}</p>
          <span class="camera__item__product__rating">
            ${ratingProduct()}
            <i class="camera__item__product__star fas fa-star"></i>
          </span>
        </a>
      `
  })
}

//Call showCameraProduct

showCameraProduct()