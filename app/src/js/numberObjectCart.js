export const numberObjectCart = () => {
  const productCart = JSON.parse(localStorage.getItem("cart"));
  const numberObjectCartDisplay = document.querySelector("#number__object__cart");
  let globalQuantity = 0;

  for (let element of productCart) globalQuantity += element.quantity;

  if (globalQuantity > 99) return (numberObjectCartDisplay.innerHTML = '<span class="header__user__icon__number">99+</span>');
  if (globalQuantity === 0) return (numberObjectCartDisplay.innerHTML = "");

  numberObjectCartDisplay.innerHTML = `
    <span class="header__user__icon__number">${globalQuantity}</span>
  `;
};
