import logo from "./Images/icons8-todo-list-100.png";
import menu from "./Images/icons8-menu-rounded-100.png";

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

  const showMore = document.createElement("div");
  showMore.className = "showMore";
  showMore.classList.add("hideLandscape");

  const showMoreImg = document.createElement("img");
  showMoreImg.src = menu;
  showMoreImg.alt = "Menu Icon";
  showMoreImg.className = "menuIcon";

  showMore.appendChild(showMoreImg);
  header.appendChild(headerImg);
  header.appendChild(headerText);
  header.appendChild(showMore);
  document.body.appendChild(header);
}
