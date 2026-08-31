/* ===== Navbar ===== */

const navContainer = document.querySelector(".nav-container");
const menuButton = document.querySelector(".menu-button");
const mobileNavigation = document.querySelector(".mobile-navigation");
const mobileNavigationLinks = mobileNavigation.querySelectorAll("a");
const brand = document.querySelector(".brand");

const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

let lastScrollY = window.scrollY;
let isAnchorNavigation = false;
let anchorNavigationTimeout;


/* ===== Mobile Menu ===== */

function closeMobileMenu({ returnFocus = false } = {}) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    mobileNavigation.classList.remove("is-open");

    if (returnFocus) {
        menuButton.focus();
    }
}


function openMobileMenu() {
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");

    mobileNavigation.classList.add("is-open");

    navContainer.classList.remove("nav-hidden");
}


menuButton.addEventListener("click", () => {
    const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});


brand.addEventListener("click", () => {
    closeMobileMenu();
});


mobileNavigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});


document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

    if (!isOpen) return;

    closeMobileMenu({ returnFocus: true });
});


function resetMobileMenu() {
    if (!mobileBreakpoint.matches) {
        closeMobileMenu();
    }
}


mobileBreakpoint.addEventListener("change", resetMobileMenu);


/* ===== Anchor Navigation ===== */

document.querySelectorAll(
    '.nav-links a[href^="#"], .mobile-navigation a[href^="#"], .brand'
).forEach((link) => {

    link.addEventListener("click", () => {
        isAnchorNavigation = true;

        navContainer.classList.remove("nav-hidden");

        clearTimeout(anchorNavigationTimeout);

        /*
         * Keep the navbar visible while smooth scrolling to
         * an anchor. Using a timeout avoids depending entirely
         * on the scrollend event.
         */
        anchorNavigationTimeout = window.setTimeout(() => {
            isAnchorNavigation = false;
            lastScrollY = window.scrollY;
        }, 1000);
    });

});


window.addEventListener("scrollend", () => {
    if (!isAnchorNavigation) return;

    clearTimeout(anchorNavigationTimeout);

    isAnchorNavigation = false;
    lastScrollY = window.scrollY;

    navContainer.classList.remove("nav-hidden");
});


/* ===== Navbar Scroll Behavior ===== */

window.addEventListener(
    "scroll",
    () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
            navContainer.classList.add("scrolled");
        } else {
            navContainer.classList.remove("scrolled");
        }

        const isMobileMenuOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        /*
         * Never hide the navbar while:
         * - navigating to an anchor
         * - the mobile menu is open
         */
        if (isAnchorNavigation || isMobileMenuOpen) {
            navContainer.classList.remove("nav-hidden");
            lastScrollY = currentScrollY;
            return;
        }

        const scrollDifference =
            currentScrollY - lastScrollY;

        if (
            scrollDifference > 40 &&
            currentScrollY > 120
        ) {
            navContainer.classList.add("nav-hidden");
            lastScrollY = currentScrollY;

        } else if (scrollDifference < -40) {

            navContainer.classList.remove("nav-hidden");
            lastScrollY = currentScrollY;
        }
    },
    { passive: true }
);


/* ===== Scroll Reveal ===== */

const revealElements = document.querySelectorAll(".reveal");

if (!("IntersectionObserver" in window)) {

    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });

} else {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);
            });

        },
        {
            threshold: 0,
            rootMargin: "0px 0px -15% 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}