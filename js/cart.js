"use strict";
const cart = function () {
  const cartBtn = document.querySelector(".button-cart"),
    modal = document.getElementById("modal-cart"),
    closeBtnModal = document.querySelector(".modal-close");

  cartBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  closeBtnModal.addEventListener("click", () => {
    modal.style.display = "";
  });
};
cart();
