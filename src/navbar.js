export default function makeNavBar() {
    const main = document.querySelector(".main");
    const navBar = document.createElement("div");
    navBar.classList.add("navBar");

    main.appendChild(navBar);
}