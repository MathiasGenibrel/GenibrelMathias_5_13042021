const submitInfo = async () => {
  const contact = {
    firstName: document.querySelector("#firstname").value.toLowerCase(),
    lastName: document.querySelector("#name").value.toLowerCase(),
    address: document.querySelector("#adress").value.toLowerCase(),
    city: document.querySelector("#city").value.toLowerCase(),
    email: document.querySelector("#email").value.toLowerCase(),
  };
  const productCart = JSON.parse(localStorage.getItem("cart"));
  const products = [];
  for (element of productCart) {
    products.push(element.id);
  }

  return orderIdMemomry(await postAPI(contact, products));
};

const postAPI = async (contact, products) => {
  const response = await fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  });

  console.log(response);
  return response.json();
};

const orderIdMemomry = (resApi) => {

  console.log("YES PAPA")
  localStorage.setItem("contact", JSON.stringify(resApi.contact));
  localStorage.setItem("orderId", JSON.stringify(resApi.orderId));
};