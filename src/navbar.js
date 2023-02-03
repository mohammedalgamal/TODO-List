import todayIcon from "./Images/icons8-calendar-1-100.png";
import weekIcon from "./Images/icons8-calendar-7-100.png";
import allTasksIcon from "./Images/icons8-tasklist-100.png";
import oneProjectIcon from "./Images/icons8-check-64.png";
import plusIcon from "./Images/icons8-plus-100.png";
import { restoreLocal } from "./Storage";

function makeElement(text, className, img, imgClass) {
    const element = document.createElement("div");
    element.classList.add(className);
    element.classList.add("item");

    if (img) {
        const elementImg = document.createElement("img");
        elementImg.src = img;
        elementImg.alt = "img";
        elementImg.classList.add(imgClass);

        element.appendChild(elementImg);
    };

    element.innerHTML += text;

    return element;
};

function makeDiv(className) {
    const div = document.createElement("div");
    div.classList.add(className);

    const upperDiv = document.createElement("div");
    upperDiv.classList.add(`${className}Upper`);

    const lowerDiv = document.createElement("div");
    lowerDiv.classList.add(`${className}Lower`);

    div.appendChild(upperDiv);
    div.appendChild(lowerDiv);

    return [div, upperDiv, lowerDiv];
};

export function makeProjects() {
    const projectsDiv = document.querySelector(".projectsDivUpper");
    projectsDiv.innerHTML = "";
    const projectsStorage = restoreLocal();

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < projectsStorage.length; i++) {
        projectsDiv.appendChild(makeElement(projectsStorage[i].name, "project", oneProjectIcon, "oneProjectsIcon"));
    };
};

export default function makeNavBar() {
    const main = document.querySelector(".main");
    const navBar = document.createElement("div");
    navBar.classList.add("navBar");

    const tasksDivList = makeDiv("tasks");
    const projectsDivList = makeDiv("projects");

    const tasksDiv = tasksDivList[0];
    const projectsDiv = projectsDivList[0];

    const projectsDivUpper = document.createElement("div");
    projectsDivUpper.classList.add("projectsDivUpper");
    const projectsDivLower = document.createElement("div");
    projectsDivLower.classList.add("projectsDivLower");

    tasksDivList[1].appendChild(makeElement("Tasks", "tasksLabel"));
    tasksDivList[2].appendChild(makeElement("All tasks", "allTasks", allTasksIcon, "allTasksIcon"));
    tasksDivList[2].appendChild(makeElement("Today", "today", todayIcon, "todayIcon"));
    tasksDivList[2].appendChild(makeElement("This week", "week", weekIcon, "weekIcon"));

    projectsDivList[1].appendChild(makeElement("Projects", "projectsLabel"));
    projectsDivLower.appendChild(makeElement("Add project", "addProject", plusIcon, "plusIcon"));
    projectsDivList[2].appendChild(projectsDivUpper);
    projectsDivList[2].appendChild(projectsDivLower);


    navBar.appendChild(tasksDiv);
    navBar.appendChild(projectsDiv);
    main.appendChild(navBar);
};

