import Project from "./projectClass";

const JSONToProject = (project) => new Project(project.name);

export const saveLocal = (passedProjects) => {
    localStorage.setItem("projectsList", JSON.stringify(passedProjects));
};

export const restoreLocal = () => {
    let returnProjects;
    const projectsList = JSON.parse(localStorage.getItem("projectsList"));
    if (projectsList) {
        returnProjects = projectsList.map((project) => JSONToProject(project));
    } else {
        returnProjects = [];
    };
    return returnProjects;
};