/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import { showNavBar } from "./phone";
import plusIcon from "./Images/icons8-plus-100.png";
// eslint-disable-next-line import/no-cycle
import makeFormType, { toggleShowingForm } from "./form";

function addTaskDiv() {
    const parent = document.querySelector(".contentUpper");

    const element = document.createElement("div");
    element.classList.add("addTask");

    const elementImg = document.createElement("img");
    elementImg.src = plusIcon;
    elementImg.alt = "Plus Icon";
    elementImg.classList.add("plusIcon");

    element.appendChild(elementImg);

    element.innerHTML += "Add task";

    parent.appendChild(element);

    element.addEventListener("click", () => {
        makeFormType("task");
        toggleShowingForm("show");
    });
}

export function showAllTasks() {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "";
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    nameDiv.innerHTML = "All tasks";
    title.appendChild(nameDiv);
    addTaskDiv();
};

function showTodayTasks() {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "";
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    nameDiv.innerHTML = "Toady's tasks";
    title.appendChild(nameDiv);
};

function showWeekTasks() {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "";
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    nameDiv.innerHTML = "This week's tasks";
    title.appendChild(nameDiv);
};

function showProjectTasks(project) {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "";
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    nameDiv.innerHTML = project.innerText;
    title.appendChild(nameDiv);
    addTaskDiv();
};

function toggleActive(currentActive, allButtons) {
    for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] === currentActive) {
            allButtons[i].classList.add("active");
        }
        else {
            allButtons[i].classList.remove("active");
        };
    };
};

export default function callShowingFunc() {
    const allTabs = document.querySelectorAll(".project,.allTasks,.today,.week");
    const media = window.innerHeight - window.innerWidth;

    for (let i = 0; i < allTabs.length; i++) {

        allTabs[i].addEventListener("click", () => {
            toggleActive(allTabs[i], allTabs);

            if (allTabs[i].classList.contains("allTasks")) {
                showAllTasks();
            }
            else if (allTabs[i].classList.contains("today")) {
                showTodayTasks();
            }
            else if (allTabs[i].classList.contains("week")) {
                showWeekTasks();
            }
            else {
                showProjectTasks(allTabs[i]);
            };

            if (media >= 0) {
                showNavBar();
            }
        });
    };

};

/* export function addTaskForm() {
    const addTaskBtn = document.querySelector(".addTask");

} */