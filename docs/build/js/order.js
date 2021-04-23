const displayOrder = () => {
  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  contact = JSON.parse(localStorage.getItem("contact"));
  orderId = JSON.parse(localStorage.getItem("orderId"));

  document.querySelector("main").innerHTML = `
  <h3 class="title">Merci de votre commande ${capitalize(contact.firstName)} !</h3>
  <p class="order">Votre numéro de commande : <span class="order__id">${orderId}</span></p>
  <p class="text">Tout ceci arrivera bientôt à ${capitalize(contact.city)} !</p>
  <h3 class="title">À bientôt !</h3>
  `;

  (() => {
    localStorage.clear();
  })();
};

displayOrder();