'use strict'

// Toggle Function

const elementToggleFunc = function (el) {
    el.classList.toggle('active')
}

// Combine All Element Active Class
const toggleAllElements = function () {
    elementToggleFunc(navbar)
    elementToggleFunc(overlay)
}

const header = document.querySelector('[data-header]')
const navbar = document.querySelector('[data-navbar]')
const navOpenBtn = document.querySelector('[data-nav-open-btn]')
const navCloseBtn = document.querySelector('[data-nav-close-btn]')
const overlay = document.querySelector('[data-overlay]')

const navArr = [overlay, navOpenBtn, navCloseBtn]

navArr.forEach(nav => {
    nav.addEventListener('click',toggleAllElements)
})

window.addEventListener('scroll', function () {
    if (window.scrollY >= 10) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }
})