import logo from "./Images/icons8-todo-list-100.png";

export default function makeHeader() {
    const header = document.createElement("div");
    header.className = "header";
    header.classList.add("shadow");

    const headerText = document.createElement("div");
    headerText.className = "text";
    headerText.innerHTML = "TODO List";

    const headerImg = document.createElement("img");
    headerImg.src = logo;
    headerImg.alt = "TODO-List Logo";

    header.appendChild(headerImg);
    header.appendChild(headerText);
    document.body.appendChild(header);
};