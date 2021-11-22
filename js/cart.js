"use strict";
const cart = function () {
  const cartBtn = document.querySelector(".button-cart"),
    modal = document.getElementById("modal-cart"),
    closeBtnModal = document.querySelector(".modal-close"),
    goodsContainer = document.querySelector(".long-goods-list"),
    cartTable = document.querySelector(".cart-table__goods"),
    modalForm = document.querySelector(".modal-form"),
    modalFormName = modalForm[0],
    modalFormPhone = modalForm[1],
    cartTableTotal = document.querySelector(".card-table__total");

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.filter((good) => {
      return good.id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.map((good) => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--;
        }
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((good) => good.id === id);
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.some((good) => good.id === clickedGood.id)) {
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = "";
    cartTableTotal.textContent = "";
    let totalAmount = 0;
    goods.forEach((good) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${good.name}</td>
						<td>${good.price}$</td>
						<td><button class="cart-btn-minus"">-</button></td>
						<td>${good.count}</td>
						<td><button class="cart-btn-plus"">+</button></td>
						<td>${+good.price * +good.count}$</td>
						<td><button class="cart-btn-delete"">x</button></td>
            `;
      cartTable.append(tr);
      let totalGood = +good.price * +good.count;
      totalAmount += totalGood;
      cartTableTotal.textContent = totalAmount + "$";

      tr.addEventListener("click", (event) => {
        if (event.target.classList.contains("cart-btn-minus")) {
          minusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-plus")) {
          plusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-delete")) {
          deleteCartItem(good.id);
        }
      });
    });
  };
  const sendForm = () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cart,
        name: modalFormName.value,
        phone: modalFormPhone.value,
      }),
    }).then(() => {
      modalFormName.value = "";
      modalFormPhone.value = "";
      modal.style.display = "";
      localStorage.removeItem("cart");
    });
  };

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendForm();
  });

  cartBtn.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    renderCartGoods(cartArray);
    modal.style.display = "flex";
    modalFormName.value = "";
    modalFormPhone.value = "";
  });

  closeBtnModal.addEventListener("click", () => {
    modal.style.display = "";
  });

  modal.addEventListener("click", (event) => {
    if (
      !event.target.closest(".modal") &&
      event.target.classList.contains("overlay")
    ) {
      modal.style.display = "";
    }
  });

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-cart")) {
        const buttonToCart = event.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;

        addToCart(goodId);
      }
    });
  }
};
cart();
