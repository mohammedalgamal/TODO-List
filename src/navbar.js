import tasksIcon from "./Images/icons8-todo-list-64.png";
import todayIcon from "./Images/icons8-calendar-1-100.png";
import weekIcon from "./Images/icons8-calendar-7-100.png";
import allTasksIcon from "./Images/icons8-tasklist-100.png";
import projectsIcon from "./Images/icons8-group-of-projects-100.png";
import oneProjectIcon from "./Images/icons8-check-64.png";
import plusIcon from "./Images/icons8-plus-100.png";

function makeElement(text, className, img, imgClass) {
    const element = document.createElement("dive");
    element.classList.add(className);
    element.classList.add("item");

    const elementImg = document.createElement("img");
    elementImg.src = img;
    elementImg.alt = "img";
    elementImg.classList.add(imgClass);

    element.appendChild(elementImg);
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
}

export default function makeNavBar() {
    const main = document.querySelector(".main");
    const navBar = document.createElement("div");
    navBar.classList.add("navBar");

    const tasksDivList = makeDiv("tasks");
    const projectsDivList = makeDiv("projects");

    const tasksDiv = tasksDivList[0];
    const projectsDiv = projectsDivList[0];

    tasksDivList[1].appendChild(makeElement("Tasks", "tasksLabel", tasksIcon, "tasksIcon"));
    tasksDivList[2].appendChild(makeElement("Today", "today", todayIcon, "todayIcon"));
    tasksDivList[2].appendChild(makeElement("This week", "week", weekIcon, "weekIcon"));
    tasksDivList[2].appendChild(makeElement("All tasks", "allTasks", allTasksIcon, "allTasksIcon"));

    projectsDivList[1].appendChild(makeElement("Projects", "projectsLabel", projectsIcon, "projectsIcon"));
    projectsDivList[2].appendChild(makeElement("Test", "project", oneProjectIcon, "oneProjectsIcon"));
    projectsDivList[2].appendChild(makeElement("Add project", "addProject", plusIcon, "plusIcon"));

    navBar.appendChild(tasksDiv);
    navBar.appendChild(projectsDiv);
    main.appendChild(navBar);
};

