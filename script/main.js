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

// Fetching data through api

const getData = (apiId) => {
  let result = fetch(apiId).then((res) => {
    return res.json();
  });
  return result;
};

// Header

const headerTitle = document.querySelector(".header-title-name");
const header = document.querySelector(".header");

getData("http://localhost:8080/header").then((res) => {
  header.style.backgroundImage = `url(${res[0].image})`;
  headerTitle.textContent = res[0].title;
});

// Welcome section

const welcomeTitle = document.querySelector(".welcome-title");
const welcomeDetails = document.querySelector(".welcome-details");
const welcomeManager = document.querySelector(".welcome-manager");
const poster1 = document.querySelector(".poster-image1");
const poster2 = document.querySelector(".poster-image2");
const poster3 = document.querySelector(".poster-image3");

getData("http://localhost:8080/welcome-data").then((res) => {
  console.log(res[0].image.img1);
  welcomeTitle.textContent = res[0].title;
  welcomeDetails.textContent = res[0].details;
  welcomeManager.textContent = res[0].manager;
  poster1.src = res[0].image.img1;
  poster2.src = res[0].image.img2;
  poster3.src = res[0].image.img3;
});

// Activity data

const activityHeading = document.querySelectorAll(".activity-heading");
const activityTitle = document.querySelectorAll(".activity-title");
const activityDetails = document.querySelectorAll(".activity-details");
const activityImage = document.querySelectorAll(".activity-image");

getData("http://localhost:8080/activity-data").then((res) => {
  for (i = 0; i < activityHeading.length; i++) {
    console.log(activityImage);
    activityHeading[i].textContent = res[i].heading;
    activityTitle[i].textContent = res[i].title;
    activityDetails[i].textContent = res[i].details;
    activityImage[i].src = res[i].images;
  }
});
// Update Card data

const serviceCards = document.querySelectorAll(".service-card");
const cardImage = document.querySelectorAll(".service-image");
const cardName = document.querySelectorAll(".service-name");
const cardTitle = document.querySelectorAll(".service-title");
const cardDetails = document.querySelectorAll(".service-details");
const serviceImage = document.querySelectorAll(".service-image");

getData("http://localhost:8080/card-data").then((res) => {
  for (i = 0; i < serviceCards.length; i++) {
    cardImage[i].src = res[i].image;
    cardName[i].textContent = res[i].name;
    cardTitle[i].textContent = res[i].title;
    cardDetails[i].textContent = res[i].details;
    serviceImage[i].src = res[i].image;
  }
});

// Say Hello

const discover = document.querySelector(".discover");
const discoverTitle = document.querySelector(".discover-title");
const discoverDetails = document.querySelector(".discover-details");

getData("http://localhost:8080/say-hello").then((res) => {
  console.log(discoverTitle);
  discover.style.backgroundImage = `url(${res[0].image})`;
  discoverTitle.textContent = "Say hello to a whole new you";
  discoverDetails.textContent =
    "We use the best ingredients to make special and really tasty dishes.Choose what you want to eat every day. You order at the moment.";
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
    insertCarouselData(res, slideCount, "rooms-slider-back");
    slideCount++;
    flag = true;
  });
  prevButton.addEventListener("click", (e) => {
    if (flag === true && slideCount !== 0) slideCount -= 2;
    if (slideCount < 0) {
      slideCount = res.length - 1;
    }
    insertCarouselData(res, slideCount, "ul-slider-animation");
    slideCount--;
    flag = false;
  });
});

// Suscribe data

const suscribePoster1 = document.querySelector(".suscribe-poster-item1");
const suscribePoster2 = document.querySelector(".suscribe-poster-item2");
const suscribePoster3 = document.querySelector(".suscribe-poster-item3");
const suscribeHeading = document.querySelector(".suscribe-heading");
const suscribeTitle = document.querySelector(".suscribe-title");
const suscribeDetails = document.querySelector(".suscribe-details");

getData("http://localhost:8080/suscribe").then((res) => {
  suscribePoster1.src = res[0].image.poster1;
  suscribePoster2.src = res[0].image.poster2;
  suscribePoster3.src = res[0].image.poster3;
  suscribeHeading.textContent = res[0].heading;
  suscribeTitle.textContent = res[0].title;
  suscribeDetails.textContent = res[0].details;
});
