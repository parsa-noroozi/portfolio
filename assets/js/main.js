const navContainer = document.querySelector(".nav-container");

let lastScrollY = window.scrollY;
let isAnchorNavigation = false;

document.querySelectorAll(
    '.nav-links a[href^="#"], .mobile-navigation a[href^="#"], .brand'
).forEach((link) => {

    link.addEventListener("click", () => {

        isAnchorNavigation = true;

        navContainer.classList.remove("nav-hidden");

    });

});

window.addEventListener("scrollend", () => {

    if (isAnchorNavigation) {

        isAnchorNavigation = false;
        lastScrollY = window.scrollY;
        navContainer.classList.remove("nav-hidden");

    }

});

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
        navContainer.classList.add("scrolled");
    } else {
        navContainer.classList.remove("scrolled");
    }

    const scrollDifference = currentScrollY - lastScrollY;

if (!isAnchorNavigation) {

    if (scrollDifference > 40 && currentScrollY > 120) {

        navContainer.classList.add("nav-hidden");
        lastScrollY = currentScrollY;

    } else if (scrollDifference < -40) {

        navContainer.classList.remove("nav-hidden");
        lastScrollY = currentScrollY;

    }

}

});

const menuButton = document.querySelector(".menu-button");

const mobileNavigation = document.querySelector(".mobile-navigation");

const mobileNavigationLinks = mobileNavigation.querySelectorAll("a");

const brand = document.querySelector(".brand");

menuButton.addEventListener("click", () => {

    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu"
    );

    mobileNavigation.classList.toggle("is-open", !isOpen);

});

brand.addEventListener("click", () => {

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.setAttribute("aria-label", "Open navigation menu");

    mobileNavigation.classList.remove("is-open");

});

mobileNavigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute("aria-label", "Open navigation menu");

        mobileNavigation.classList.remove("is-open");

    });

});

const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

function resetMobileMenu() {

    if (!mobileBreakpoint.matches) {

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute("aria-label", "Open navigation menu");

        mobileNavigation.classList.remove("is-open");

    }

}

mobileBreakpoint.addEventListener("change", resetMobileMenu);