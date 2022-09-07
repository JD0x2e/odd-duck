const app = document.getElementById("app");
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", switchTheme);

function getThemeOnLoad() {
  // checking if a theme is set, if not, add dark theme by default
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
  }

  // check what the theme is, add the relevant class
  if (localStorage.getItem("theme") === "dark") {
    app.classList.add("dark");
    themeButton.src = "./images/sun.png";
  } else {
    app.classList.remove("light");
    themeButton.src = "./images/moon.png";
  }
}

function switchTheme() {
  let currentTheme = localStorage.getItem("theme");

  // if dark, change to light and vice versa
  if (currentTheme === "dark") {
    // change the local storage
    localStorage.setItem("theme", "light");

    // change the class on the #app
    app.classList.remove("dark");
    app.classList.add("light");
    themeButton.src = "./images/moon.png";
  } else {
    // change the local storage
    localStorage.setItem("theme", "dark");

    // change the class on #app
    app.classList.remove("light");
    app.classList.add("dark");
    themeButton.src = "./images/sun.png";
  }
}

getThemeOnLoad();
