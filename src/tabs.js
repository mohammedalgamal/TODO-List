/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import { isThisWeek, parseISO } from "date-fns";
import { showNavBar } from "./phone";
import plusIcon from "./Images/icons8-plus-100.png";
// eslint-disable-next-line import/no-cycle
import makeFormType, { toggleShowingForm } from "./form";
// eslint-disable-next-line import/no-cycle
import { restoreLocal } from "./Storage";
import { makeCards } from "./main";


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
        makeFormType("task", "Add new task");
        toggleShowingForm("show");
    });
};

export function showAllTasks() {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "";
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    nameDiv.innerHTML = "All tasks";
    title.appendChild(nameDiv);
    addTaskDiv();

    // Main logic
    const allProjects = restoreLocal();
    const allTasks = [];

    for (let i = 0; i < allProjects.length; i++) {
        const projectTasks = allProjects[i].getTasks();
        allTasks.push(...projectTasks);
    };

    makeCards(allTasks);
};

function showTodayTasks() {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "";
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    nameDiv.innerHTML = "Toady's tasks";
    title.appendChild(nameDiv);

    // Main logic
    const allProjects = restoreLocal();
    const todayTasks = [];
    const todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

    for (let i = 0; i < allProjects.length; i++) {
        const projectTasks = allProjects[i].getTasks();
        for (let j = 0; j < projectTasks.length; j++) {
            if (projectTasks[j].date === todayDate) {
                todayTasks.push(projectTasks[j]);
            }
        };
    };
    makeCards(todayTasks);
};

function showWeekTasks() {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "";
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    nameDiv.innerHTML = "This week's tasks";
    title.appendChild(nameDiv);

    // Main logic
    const allProjects = restoreLocal();
    const weekTasks = [];

    for (let i = 0; i < allProjects.length; i++) {
        const projectTasks = allProjects[i].getTasks();
        for (let j = 0; j < projectTasks.length; j++) {
            if (isThisWeek(parseISO(projectTasks[j].date))) {
                weekTasks.push(projectTasks[j]);
            }
        };
    };
    makeCards(weekTasks);
};

export function showProjectTasks(project) {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "";
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    nameDiv.innerHTML = project.innerText;
    title.appendChild(nameDiv);
    addTaskDiv();

    // Main logic
    const allProjects = restoreLocal();
    let currentProjectTasks;
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].name === project.innerText) {
            currentProjectTasks = allProjects[i].getTasks();
            break;
        };
    };
    makeCards(currentProjectTasks);
};

export function toggleActive(currentActive) {
    const allButtons = document.querySelectorAll(".project,.allTasks,.today,.week");
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
            if (!allTabs[i].classList.contains("active")) {
                toggleActive(allTabs[i]);

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
            };

            if (media >= 0) {
                showNavBar();
            }
        });
    };

};

export function reloadCurrentActive() {
    const currentActive = document.querySelector(".navBar .active");

    if (currentActive.classList.contains("allTasks")) {
        showAllTasks();
    }
    else if (currentActive.classList.contains("today")) {
        showTodayTasks();
    }
    else if (currentActive.classList.contains("week")) {
        showWeekTasks();
    }
    else {
        showProjectTasks(currentActive);
    };
};