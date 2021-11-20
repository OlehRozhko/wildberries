"use strict";
const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");

  const getData = () => {
    fetch("/db/db.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data));
      });
  };

  links.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      getData();
      let data = JSON.parse(localStorage.getItem("data"));
      console.log("data: ", data);
    });
  });
};

getGoods();
