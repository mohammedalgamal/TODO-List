/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */

export function showAllTasks() {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "All tasks";
};

function showTodayTasks() {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "Toady's tasks";
};

function showWeekTasks() {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = "This week's tasks";
};

function showProjectTasks(project) {
    const title = document.querySelector(".contentUpper");
    title.innerHTML = project.innerText;
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
        });
    };
};