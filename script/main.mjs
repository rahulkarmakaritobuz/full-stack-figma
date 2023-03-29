// const fs = require("fs");

// NAVbar

const menuBar = document.getElementById("menuBar");
const menuButton = document.getElementById("menuButton");
const back = document.getElementById("back");

menuButton.addEventListener("click", (e) => {
  menuBar.classList.toggle("slide-back");
  menuBar.classList.toggle("ul-slider-animation");
  menuBar.classList.toggle("menu-hide");
});

back.addEventListener("click", (e) => {
  menuBar.classList.toggle("ul-slider-animation");
  menuBar.classList.toggle("slide-back");

  setTimeout(() => {
    menuBar.classList.toggle("menu-hide");
  }, 490);
});

const lang = document.querySelector("#lang");
const langList = document.querySelectorAll(".dropdown-content a");

for (let i = 0; i < langList.length; i++) {
  langList[i].setAttribute("onclick", "select(this)");
}

function select(element) {
  let selectData = element.textContent;
  console.log(selectData);
  console.log(lang);
  lang.innerText = selectData;
}

// Form card

const checkInDate = document.getElementById("checkInDate");
const checkOutDate = document.getElementById("checkOutDate");
const adults = document.getElementById("adults");
const children = document.getElementById("children");

// const createFile = (value) => {
//   fs.writeFile("formDB.txt", value, (err) => {
//     if (err) throw err;
//   });
//   console.log("File create successfully!");
// };

let formDB = [];

const checkButton = () => {
  formDB.push({
    "check-in-date": checkInDate.value,
    "check-out-date": checkOutDate.value,
    adults: adults.value,
    children: children.value,
  });
  // createFile(formDB);
};
