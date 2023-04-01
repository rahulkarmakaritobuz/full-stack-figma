// Form card

const checkInDate = document.getElementById("checkInDate");
const checkOutDate = document.getElementById("checkOutDate");
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const check = document.getElementById("check");

let formDB = [];

const emailId = document.getElementById("emailId");
const joinUs = document.getElementById("join");

const join = () => {
  fetch("http://localhost:8080/join-us", {
    method: "POST",
    headers: {
      "content-Type": "application/json; charset=UTF-8",
    },
    body: `id=${Date.now()},&emailID=${emailId.value}`,
  }).then((res) => {
    console.log("Email request completed! ", res);
  });
};

const checkButton = async () => {
  await fetch("http://localhost:8080/search-room", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: `id=${Date.now()}&checkInDate=${checkInDate.value}&checkOutDate=${
      checkOutDate.value
    }&noOfAdults=${adults.value}&noOfchildren=${children.value}`,
  }).then((res) => {
    console.log("Request complete! response:", res);
    check.classList.add("check-button-submit");
    check.textContent = "✓";
  }, 5000);
};

// Update Card data

const serviceCards = document.querySelectorAll(".service-card");
const cardImage = document.querySelectorAll(".service-image");
const cardName = document.querySelectorAll(".service-name");
const cardTitle = document.querySelectorAll(".service-title");
const cardDetails = document.querySelectorAll(".service-details");
const serviceImage = document.querySelectorAll(".service-image");

const getData = (apiId) => {
  let result = fetch(apiId).then((res) => {
    return res.json();
  });
  return result;
};
getData("http://localhost:8080/card-data").then((res) => {
  for (i = 0; i < serviceCards.length; i++) {
    cardImage[i].src = res[i].image;
    cardName[i].textContent = res[i].name;
    cardTitle[i].textContent = res[i].title;
    cardDetails[i].textContent = res[i].details;
    serviceImage[i].src = res[i].image;
  }
});

// Carousel

const nextButtom = document.getElementById("next");
const prevButton = document.getElementById("prev");
const roomType = document.querySelector(".room-type");
const price = document.querySelector(".price");
const roomTitle = document.querySelector(".room-title");
const bed = document.querySelector(".bed");
const capacity = document.querySelector(".capacity");
const roomSize = document.querySelector(".room-size");
const view = document.querySelector(".view");
const roomImage = document.querySelector(".slider-item");

let slideCount = 0;
let flag = true;

const insertCarouselData = (res, count, toogleClass) => {
  roomType.textContent = res[count].roomType;
  price.textContent = res[count].price;
  roomTitle.textContent = res[count].roomTitle;
  bed.textContent = res[count].bed;
  capacity.textContent = res[count].capacity;
  roomSize.textContent = res[count].roomSize;
  view.textContent = res[count].view;
  roomImage.src = res[count].picture;
  roomImage.classList.add(toogleClass);
  setTimeout(() => {
    roomImage.classList.remove(toogleClass);
  }, 1000);
};

getData("http://localhost:8080/room-data").then((res) => {
  console.log(res.length);
  if (slideCount === 0) {
    insertCarouselData(res, slideCount);
    slideCount++;
  }
  nextButtom.addEventListener("click", (e) => {
    if (flag === false) slideCount += 2;
    if (slideCount > res.length - 1) {
      slideCount = 0;
    }
    insertCarouselData(res, slideCount, "ul-slider-animation");
    slideCount++;
    flag = true;
  });
  prevButton.addEventListener("click", (e) => {
    if (flag === true && slideCount !== 0) slideCount -= 2;
    if (slideCount < 0) {
      slideCount = res.length - 1;
    }
    insertCarouselData(res, slideCount, "rooms-slider-back");
    slideCount--;
    flag = false;
  });
});
