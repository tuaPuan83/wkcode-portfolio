"use strict";

// ==========================================================
// 1. ELEMENT SELECTION
// ==========================================================

// Toggle Mobile Navigation Elements
const header = document.querySelector("[data-header]");
const navbar = document.querySelector("[data-navbar]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const navbarLink = document.querySelectorAll(".navbar__link");

// Section Elements for Smooth Scrolling
const sectionHero = document.querySelector("#section-hero");
const sectionOffering = document.querySelector("#section-offering");
const sectionServices = document.querySelector("#section-services");
const sectionSocial = document.querySelector("#section-social"); // Contact section

// Navigation Buttons
const homeBtn = document.querySelector("#hero-btn");
const offeringBtn = document.querySelector("#offering-btn");
const servicesBtn = document.querySelector("#services-btn");
const socialBtn = document.querySelector("#social-btn");

// Portfolio Tab Elements
const portfolioBtns = document.querySelectorAll(".portfolio__btn");
const portfolioBtnsWrapper = document.querySelector(".portfolio__btn__wrapper");
const protfolioContent = document.querySelectorAll(".portfolio__content");

const heroContent = document.querySelector(".hero__content");

// ==========================================================
// 2. MOBILE NAVIGATION TOGGLE
// ==========================================================

// Toggle Function
const elementToggleFunc = function (el) {
  el.classList.toggle("active");
};

// Combine All Element Active Class
const toggleAllElements = function () {
  elementToggleFunc(navbar);
  elementToggleFunc(overlay);
};

const navArr = [overlay, navOpenBtn, navCloseBtn];

navArr.forEach((nav) => {
  nav.addEventListener("click", toggleAllElements);
});

// ==========================================================
// 3. SMOOTH SCROLLING
// ==========================================================

// Smooth scroll implementation
homeBtn.addEventListener("click", function (e) {
  sectionHero.scrollIntoView({ behavior: "smooth" });
});

offeringBtn.addEventListener("click", function (e) {
  sectionOffering.scrollIntoView({ behavior: "smooth" });
});

servicesBtn.addEventListener("click", function (e) {
  sectionServices.scrollIntoView({ behavior: "smooth" });
});

socialBtn.addEventListener("click", function (e) {
  sectionSocial.scrollIntoView({ behavior: "smooth" });
});

// ==========================================================
// 4. HEADER INTERSECTION OBSERVER
// ==========================================================

// NOTE: Original scroll listener is replaced by Intersection Observer for better performance.
// window.addEventListener("scroll", function () {
//   if (window.scrollY >= 10) {
//     header.classList.add("active");
//   } else {
//     header.classList.remove("active");
//   }
// });

// Intersection Observer Callback function
const obsCallback = function (entries, observer) {
  const [entry] = entries;

  // When Hero section is NOT intersecting (user has scrolled past it)
  if (!entry.isIntersecting) {
    header.classList.add("active");
  }
  // When Hero section IS intersecting (user is viewing the Hero section)
  else {
    header.classList.remove("active");
  }
};

// Get the height of the header dynamically
const navHeight = header.getBoundingClientRect().height;
console.log(navHeight);

const obsOptions = {
  root: null, // Observe against the entire viewport
  threshold: 0.5, // Fire when 0% of target is visible
  // Fire the observer when the bottom of the Hero section hits the bottom of the Header
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
// Start observing the Hero section
observer.observe(sectionHero);

// ==========================================================
// 5. PORTFOLIO TABS COMPONENT (EVENT DELEGATION)
// ==========================================================

portfolioBtnsWrapper.addEventListener("click", function (e) {
  // Use closest() to ensure we select the main button element, not its child <span>
  const clicked = e.target.closest(".portfolio__btn");

  // Guard clause: ignore clicks that are not on a button
  if (!clicked) return;

  // 1. Deactivate all buttons
  portfolioBtns.forEach((b) => b.classList.remove("portfolio__btn-active"));

  // 2. Activate the clicked button
  clicked.classList.add("portfolio__btn-active");

  // 3. Deactivate all content areas (Hide old content)
  protfolioContent.forEach((c) => c.classList.remove("active"));

  // 4. Activate the new content area
  // We use the data-tab attribute (e.g., '1', '2', '3') to select the matching content
  document
    .querySelector(`.portfolio-${clicked.dataset.tab}`)
    .classList.add("active");
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    if (heroContent) {
      heroContent.classList.add("loaded");
    }
  }, 50);
});

// ==========================================================
// 6. REVEAL IMAGE
// ==========================================================
const allSection = document.querySelectorAll(".container");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("element__hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("element__hidden");
});
