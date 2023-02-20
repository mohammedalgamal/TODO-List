/* eslint-disable no-plusplus */
import todayIcon from "./Images/icons8-calendar-1-100.png";
import weekIcon from "./Images/icons8-calendar-7-100.png";
import allTasksIcon from "./Images/icons8-tasklist-100.png";
import oneProjectIcon from "./Images/icons8-check-64.png";
import plusIcon from "./Images/icons8-plus-100.png";
import closeIcon from "./Images/icons8-close-100.png";
// eslint-disable-next-line import/no-cycle
import { restoreLocal, saveLocal } from "./Storage";
import callShowingFunc, {
  reloadCurrentActive,
  showAllTasks,
  toggleActive,
} from "./tabs";

function makeElement(
  text,
  className,
  img,
  imgClass,
  data = "",
  remove = false
) {
  const element = document.createElement("div");
  element.classList += className;
  element.classList.add("item");
  element.dataset.name = data;

  if (img) {
    const elementImg = document.createElement("img");
    elementImg.src = img;
    elementImg.alt = "img";
    elementImg.classList.add(imgClass);

    element.appendChild(elementImg);
  }

  element.innerHTML += text;

  if (remove && text !== "Default") {
    element.innerHTML += `
        <div class="removeProject">
            <img class="removeProjectImg" data-project = "${text}" src=${closeIcon} alt="remove btn">
        </div>
        `;
  }

  return element;
}

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

function removeProject() {
  const deleteBtns = document.querySelectorAll(".removeProject");
  const storage = restoreLocal();

  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", (e) => {
      e.stopPropagation();
      const currentActive = document.querySelector(".navBar .active");
      const isTasks =
        currentActive.parentElement.classList.contains("tasksLower");
      const activeProjectName = currentActive.dataset.name;
      const element = deleteBtns[i].parentElement;
      const condition = currentActive === element;
      const projectName = e.target.dataset.project;
      for (let j = 0; j < storage.length; j++) {
        if (storage[j].name === projectName) {
          storage.splice(j, 1);
          if (!isTasks && condition) {
            saveLocal(storage, false);
          } else {
            saveLocal(storage);
          }
          // eslint-disable-next-line no-use-before-define
          makeProjects();
          callShowingFunc();
          if (!isTasks) {
            if (!condition) {
              const newActive = document.querySelector(
                `[data-name="${activeProjectName}"]`
              );
              toggleActive(newActive);
              reloadCurrentActive();
            } else {
              const allTasks = document.querySelector(".tasksLower .allTasks");
              toggleActive(allTasks);
              showAllTasks();
            }
          }
          break;
        }
      }
    });
  }
}

export function makeProjects() {
  const projectsDiv = document.querySelector(".projectsDivUpper");
  projectsDiv.innerHTML = "";
  const projectsStorage = restoreLocal();

  for (let i = 0; i < projectsStorage.length; i++) {
    const className = projectsStorage[i].name;
    projectsDiv.appendChild(
      makeElement(
        projectsStorage[i].name,
        "project",
        oneProjectIcon,
        "oneProjectsIcon",
        className,
        true
      )
    );
  }

  removeProject();
}

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
  tasksDivList[2].appendChild(
    makeElement("All tasks", "allTasks", allTasksIcon, "allTasksIcon")
  );
  tasksDivList[2].appendChild(
    makeElement("Today", "today", todayIcon, "todayIcon")
  );
  tasksDivList[2].appendChild(
    makeElement("This week", "week", weekIcon, "weekIcon")
  );

  projectsDivList[1].appendChild(makeElement("Projects", "projectsLabel"));
  projectsDivLower.appendChild(
    makeElement("Add project", "addProject", plusIcon, "plusIcon")
  );
  projectsDivList[2].appendChild(projectsDivUpper);
  projectsDivList[2].appendChild(projectsDivLower);

  navBar.appendChild(tasksDiv);
  navBar.appendChild(projectsDiv);
  main.appendChild(navBar);
}
