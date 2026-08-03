const navContainer = document.querySelector(".nav-container");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navContainer.classList.add("scrolled");

    } else {

        navContainer.classList.remove("scrolled");

    }

});