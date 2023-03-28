// const fs = require("fs");
const carousel = document.getElementById("myCarousel");

let currentIndex = 0;
let imageDatabase;
const showImage = (index) => {
  console.log("calling showImage...");
  let image = document.createElement("img");
  image.src = imageDatabase[index]["path"];
  // div.appendChild(image);
  carousel.appendChild(image);
  const carouselImage = document.querySelector("#myCarousel img");
  console.log(carouselImage);
  carousel.style.transform = "translateX(-" + index * 100 + "%)";
  console.log("calling showImage()");
};

const previousImage = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imageDatabase.length - 1;
  }
  showImage(currentIndex);
  console.log("PreviousImage : ", currentIndex);
};

const nextImage = () => {
  currentIndex++;
  if (currentIndex >= imageDatabase.length) {
    currentIndex = 0;
  }
  showImage(currentIndex);
  console.log("NextImage : ", currentIndex);
};

const api = "http://localhost:8000/images";

const getImages = async () => {
  const res = await fetch(api).then((res) => {
    console.log("Result : ", res);
    return res.json();
  });
  return res;
};
getImages().then((result) => {
  imageDatabase = result;
  console.log("Database : ", imageDatabase);
  // for (let x in result) {
  //   if (result[x]["type"] === "file") {
  //     console.log(result[x]["path"]);

  //     // let div = document.createElement("div");
  //     let image = document.createElement("img");
  //     image.src = result[x]["path"];
  //     // div.appendChild(image);
  //     carousel.appendChild(image);
  //   }
  // }

  document.getElementById("previous").addEventListener("click", previousImage);
  document.getElementById("next").addEventListener("click", nextImage);
});
