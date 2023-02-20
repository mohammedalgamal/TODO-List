/* eslint-disable no-unused-vars */
// All icons are by https://icons8.com/

import "bootstrap/dist/css/bootstrap.css";
import "./Styles/style.css";
import logo from "./Images/icons8-todo-list-100.png";
import makeHeader from "./header";
import makeMainSection, { makeContentSection } from "./main";
import makeNavBar, { makeProjects } from "./navbar";
import makeFooter from "./footer";
import makeFormType, { makeFormHTML, toggleShowingForm } from "./form";
import callShowingFunc, { showAllTasks } from "./tabs";
import addMenuBtn from "./phone";

// Change website icon
const icon = document.createElement("link");
icon.rel = "icon";
icon.href = logo;
document.getElementsByTagName("head")[0].appendChild(icon);

// Make main DOM sections of the website
makeHeader();
makeMainSection();
makeNavBar();
makeContentSection();
makeProjects();
makeFooter();
makeFormHTML();
const addProjectBtn = document.querySelector(".addProject");

addProjectBtn.addEventListener("click", () => {
  makeFormType("project");
  toggleShowingForm("show");
});

// Make tabbed browsing functionality
document.querySelector(".allTasks").classList.add("active");
showAllTasks();
callShowingFunc();

// Add menu button when using phone screen
addMenuBtn();
