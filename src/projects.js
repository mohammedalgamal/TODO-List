import { makeProjects } from "./navbar";
import { restoreLocal, saveLocal } from "./Storage";

export default function addNewProject(projectObject) {
    const projects = restoreLocal();
    projects.push(projectObject);
    saveLocal(projects);
    makeProjects();
};




