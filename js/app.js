// global variables

let productContainer = document.getElementById("img-container");
let resultButton = document.getElementById("results-btn");
let image1 = document.getElementById("img1");
let image2 = document.getElementById("img2");
let image3 = document.getElementById("img3");
let usedProducts = [];
let clicks = 0;
let maxClicksAllowed = 25;

// functional logic

function OddDuck(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
  OddDuck.allDucksArray.push(this);
}

OddDuck.allDucksArray = [];

// function to obtain a random product from the duck array
function getRandomNumber() {
  return Math.floor(Math.random() * OddDuck.allDucksArray.length);
}

// run this code each time the constructor constructs
function renderProducts() {
  product1 = getRandomNumber();
  product2 = getRandomNumber();
  product3 = getRandomNumber();

  // Logic to check that product 1, 2 and 3 aren't in my array

  while (
    product1 === product2 ||
    product1 === product3 ||
    product2 === product3
  ) {
    product1 = getRandomNumber();
    product2 = getRandomNumber();
    product3 = getRandomNumber();
  }

  // set the image attributes of our 3 images
  image1.src = OddDuck.allDucksArray[product1].src;
  image2.src = OddDuck.allDucksArray[product2].src;
  image3.src = OddDuck.allDucksArray[product3].src;
  image1.alt = OddDuck.allDucksArray[product1].name;
  image2.alt = OddDuck.allDucksArray[product2].name;
  image3.alt = OddDuck.allDucksArray[product3].name;

  // increase views every time a product gets rendered
  OddDuck.allDucksArray[product1].views++;
  OddDuck.allDucksArray[product2].views++;
  OddDuck.allDucksArray[product3].views++;

  // usedProducts = [];
  // usedProducts.push(product1, product2, product3);
}

// this function is the event listener of the section with 3 images inside
function handleImageClick(event) {
  // if we click on the section and NOT the images
  if (event.target === productContainer) {
    alert("Please only click on one of the images!");
  } else {
    // in this 'else', we've clicked on an image, so let's do it!
    clicks++; // keep track of our image clicks
    let clickedProduct = event.target.alt; // get the alt tag of the thing we clicked

    // loop through an amount of times equal to the number of products
    for (let i = 0; i < OddDuck.allDucksArray.length; i++) {
      // check if the product we clicked on's name matches the current looping product
      if (clickedProduct === OddDuck.allDucksArray[i].name) {
        OddDuck.allDucksArray[i].clicks++;
        break;
      }
    }
    // if we've reached our target number of clicks, remove event listener
    if (clicks === maxClicksAllowed) {
      alert(
        "You have reached the maximum votes, please click the button to view results!"
      );
      productContainer.removeEventListener("click", handleImageClick);

      // style the button accordingly
      resultButton.addEventListener("click", renderChart);
      resultButton.className = "clicks-allowed";
      productContainer.className = "no-voting";
    } else {
      renderProducts();
    }
  }
}

// function renderResults() {
//   let ul = document.getElementById("results-list");
//   for (let i = 0; i < OddDuck.allDucksArray.length; i++) {
//     let li = document.createElement("li");
//     li.textContent = `${OddDuck.allDucksArray[i].name} had ${OddDuck.allDucksArray[i].views} view(s) and was clicked ${OddDuck.allDucksArray[i].clicks} time(s).`;
//     ul.appendChild(li);
//   }
//   resultButton.removeEventListener("click", renderResults);
// }

function renderChart() {
  let duckName = [];
  let duckViews = [];
  let duckLikes = [];

  for (let i = 0; i < OddDuck.allDucksArray.length; i++) {
    duckName.push(OddDuck.allDucksArray[i].name);
    duckViews.push(OddDuck.allDucksArray[i].views);
    duckLikes.push(OddDuck.allDucksArray[i].clicks);
  }

  const data = {
    labels: duckName,
    datasets: [
      {
        label: "Likes",
        backgroundColor: ["cadetblue"],
        borderColor: ["black"],
        borderWidth: 1,
        data: duckLikes,
      },
      {
        label: "Views",
        backgroundColor: ["green"],
        borderColor: ["black"],
        borderWidth: 1,
        data: duckViews,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          ticks: { color: "black", beginAtZero: true },
        },
        x: {
          ticks: { color: "black", beginAtZero: true },
        },
      },
      borderColor: "black",
    },
  };

  let canvasChart = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(canvasChart, config);

  document.querySelector(".chart-container").classList.add("show");
}

// executable code
new OddDuck("Bag", "./images/bag.jpeg");
new OddDuck("Banana", "./images/banana.jpeg");
new OddDuck("Bathroom", "./images/bathroom.jpeg");
new OddDuck("Boots", "./images/boots.jpeg");
new OddDuck("Breakfast", "./images/breakfast.jpeg");
new OddDuck("Bubblegum", "./images/bubblegum.jpeg");
new OddDuck("Chair", "./images/chair.jpeg");
new OddDuck("Cthulhu", "./images/cthulhu.jpeg");
new OddDuck("Dog Duck", "./images/dog-duck.jpeg");
new OddDuck("Dragon", "./images/dragon.jpeg");
new OddDuck("Pen", "./images/pen.jpeg");
new OddDuck("Pet Sweep", "./images/pet-sweep.jpeg");
new OddDuck("Scissors", "./images/scissors.jpeg");
new OddDuck("Shark", "./images/shark.jpeg");
new OddDuck("Sweep", "./images/sweep.jpeg");
new OddDuck("Tauntaun", "./images/tauntaun.jpeg");
new OddDuck("Unicorn", "./images/unicorn.jpeg");
new OddDuck("Water Can", "./images/water-can.jpeg");
new OddDuck("Wing Glass", "./images/wine-glass.jpeg");

renderProducts();

productContainer.addEventListener("click", handleImageClick);
