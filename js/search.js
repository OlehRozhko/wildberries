"use strict";
const search = function () {
  const input = document.querySelector(".search-block > input"),
    inputBtn = document.querySelector(".search-block > button");

  inputBtn.addEventListener("click", () => {
    input.value.length > 0 ? console.log(input.value) : console.log("null");
    input.value = "";
  });
};
search();
