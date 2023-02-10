/* eslint-disable import/no-cycle */
import { Project } from "./projects";
import { reloadCurrentActive } from "./tabs";

const JSONToProject = (project) => new Project(project.name, project.tasksList);

export const saveLocal = (passedProjects) => {
    localStorage.setItem("projectsList", JSON.stringify(passedProjects));
    reloadCurrentActive();
};

export const restoreLocal = () => {
    let returnProjects;
    const projectsList = JSON.parse(localStorage.getItem("projectsList"));
    if (projectsList) {
        returnProjects = projectsList.map((project) => JSONToProject(project));
    } else {
        returnProjects = [new Project("Default", [])];
    };
    return returnProjects;
};