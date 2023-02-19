export function showNavBar() {
    const navBar = document.querySelector(".navBar");
    const menuBtn = document.querySelector(".showMore");
    menuBtn.classList.toggle("active");
    navBar.classList.toggle("show");
    navBar.classList.toggle("shadow-lg");
};

export default function addMenuBtn() {
    const menuBtn = document.querySelector(".showMore");
    const content = document.querySelector(".content");

    content.addEventListener("click", () => {
        if (menuBtn.classList.contains("active")) {
            showNavBar();
        };
    });

    menuBtn.addEventListener("click", () => {
        showNavBar();
    });

};

