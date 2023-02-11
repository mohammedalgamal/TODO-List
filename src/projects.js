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

    addNewTask(name, date, priority, project) {
        this.tasksList.push(new Task(name, date, priority, project));
    };

    getTasks() {
        return this.tasksList;
    };
};

export default function addNewProject(projectObject) {
    const projects = restoreLocal();

    projects.push(projectObject);
    saveLocal(projects);
    makeProjects();
    callShowingFunc();
    const name = projectObject.name.replace(/\s/g, "");
    const newProject = document.querySelector(`.project.${name}`);
    toggleActive(newProject);
    showProjectTasks(newProject);
};




