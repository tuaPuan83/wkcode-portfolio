"use strict";

// Toggle Function

const elementToggleFunc = function (el) {
  el.classList.toggle("active");
};

// Combine All Element Active Class
const toggleAllElements = function () {
  elementToggleFunc(navbar);
  elementToggleFunc(overlay);
};

const header = document.querySelector("[data-header]");
const navbar = document.querySelector("[data-navbar]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const sectionHero = document.querySelector("#section-hero");
const sectionOffering = document.querySelector("#section-offering");
const homeBtn = document.querySelector("#hero-btn");
const offeringBtn = document.querySelector("#offering-btn");

const navArr = [overlay, navOpenBtn, navCloseBtn];

navArr.forEach((nav) => {
  nav.addEventListener("click", toggleAllElements);
});

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

homeBtn.addEventListener("click", function (e) {
  const heroCoords = sectionHero.getBoundingClientRect();
  //   console.log(heroCoords);

  //   console.log(e.target.getBoundingClientRect());

  //   console.log("Current Scroll (X/Y)", window.scrollX, window.scrollY);

  //   //   Scroll
  //   window.scrollTo(heroCoords.left, heroCoords.top);
  sectionHero.scrollIntoView({ behavior: "smooth" });
});

offeringBtn.addEventListener("click", function (e) {
  const offeringCoords = sectionOffering.getBoundingClientRect();
  //   console.log(offeringCoords);

  //   console.log(e.target.getBoundingClientRect());

  //   console.log("Current Scroll (X/Y)", window.scrollX, window.scrollY);

  //   Scroll
  //   window.scrollTo(
  //     offeringCoords.left + window.scrollX,
  //     offeringCoords.top + window.scrollY
  //   );
  sectionOffering.scrollIntoView({ behavior: "smooth" });
});
