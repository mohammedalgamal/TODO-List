// All icons are by https://icons8.com/

import "bootstrap/dist/css/bootstrap.css";
import "./Styles/style.css";
import logo from "./Images/icons8-todo-list-100.png";
import makeHeader from "./header";
import makeMainSection from "./main";
import makeNavBar, { makeProjects } from "./navbar";
import makeFooter from "./footer";
import makeFormType, { makeFormHTML, toggleShowingForm } from "./form";

// Change website icon
const icon = document.createElement("link");
icon.rel = "icon";
icon.href = logo;
document.getElementsByTagName("head")[0].appendChild(icon);

// Make main DOM sections of the website
makeHeader();
makeMainSection();
makeNavBar();
makeProjects();
makeFooter();
makeFormHTML();
const addProjectBtn = document.querySelector(".addProject");

addProjectBtn.addEventListener("click", () => {
    makeFormType("project");
    toggleShowingForm("show");
});


// Add menu button when using phone screen
const navBar = document.querySelector(".navBar");
const menuBtn = document.querySelector(".showMore");
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navBar.classList.toggle("hide");
});