import { makeProjects } from "./navbar";
import { restoreLocal, saveLocal } from "./Storage";
import callShowingFunc from "./tabs";

export default function addNewProject(projectObject) {
    const projects = restoreLocal();
    projects.push(projectObject);
    saveLocal(projects);
    makeProjects();
    callShowingFunc();
};




