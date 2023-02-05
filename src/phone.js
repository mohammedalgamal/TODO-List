export function showNavBar() {
    const navBar = document.querySelector(".navBar");
    const menuBtn = document.querySelector(".showMore");
    const content = document.querySelector(".content");
    menuBtn.classList.toggle("active");
    navBar.classList.toggle("show");
    navBar.classList.toggle("shadow-lg");
    content.style.backgroundColor = navBar.classList.contains("show") ? "#859280" : "#c9d9c2";
};

export default function addMenuBtn() {
    const menuBtn = document.querySelector(".showMore");
    const content = document.querySelector(".content");
    const media = window.innerHeight - window.innerWidth;

    if (media >= 0) {
        content.style.position = "fixed";
    };

    menuBtn.addEventListener("click", () => {
        showNavBar();
    });
};

