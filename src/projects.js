/* eslint-disable import/no-cycle */
import { makeProjects } from "./navbar";
import { restoreLocal, saveLocal } from "./Storage";
import callShowingFunc, { showProjectTasks, toggleActive } from "./tabs";
import Task from "./tasks";

export class Project {
    constructor(name, tasksList = []) {
        this.name = name;
        this.tasksList = tasksList;
    };

    addNewTask(name, date, priority, project, details = "") {
        this.tasksList.push(new Task(name, date, priority, project, details));
    };
};

export default function addNewProject(projectObject) {
    const projects = restoreLocal();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].name === projectObject.name) {
            const currentActive = document.querySelector(".navBar .active").classList[0];
            makeProjects();
            callShowingFunc();
            document.querySelector(`.${currentActive}`).classList.add("active");
            return;
        };
    };
    projects.push(projectObject);
    saveLocal(projects);
    makeProjects();
    callShowingFunc();
    const name = projectObject.name.replace(/\s/g, "");
    const newProject = document.querySelector(`.project.${name}`);
    toggleActive(newProject);
    showProjectTasks(newProject);
};




