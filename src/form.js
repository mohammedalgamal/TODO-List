import Project from "./projectClass";
import addNewProject from "./projects";

export default function makeFormType(type) {
    const form = document.querySelector(".dataForm");
    form.innerHTML = "";

    const title = document.createElement("div");
    title.className = "title";

    form.appendChild(title);

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.classList = "btn btn-primary submit-btn";
    submitBtn.innerHTML = "Submit";

    if (type === "project") {
        title.innerHTML = "Add new project";
        form.classList.add("projectForm");

        const nameFormGroup = document.createElement("div");
        nameFormGroup.classList.add("form-group");

        const projectName = document.createElement("input");
        projectName.type = "text";
        projectName.classList = "form-control";
        projectName.placeholder = "Project name";
        projectName.name = "name";
        projectName.id = "name";
        projectName.required = true;
        projectName.autofocus = true;

        nameFormGroup.appendChild(projectName);

        form.appendChild(nameFormGroup);
    };

    form.appendChild(submitBtn);
};

export function getFormData() {
    const form = document.querySelector(".dataForm");

    if (form.classList.contains("projectForm")) {
        const name = document.querySelector("#name").value;

        addNewProject(new Project(name));
    };
};

export function toggleShowingForm(state) {
    const form = document.querySelector(".dataForm");
    const formDiv = document.querySelector(".form");
    const formBg = document.querySelector(".bgForm");
    const nameInput = document.querySelector("#name");

    if (state === "show") {
        formDiv.classList.add("visible");
        formBg.classList.add("visible");
        nameInput.focus();
    }
    else {
        formDiv.classList.remove("visible");
        formBg.classList.remove("visible");
        form.innerHTML = "";
    };
};

export function makeFormHTML() {
    const backGround = document.createElement("div");
    backGround.classList.add("bgForm");

    backGround.addEventListener("click", () => {
        toggleShowingForm("hide");
    });

    const formDiv = document.createElement("div");
    const form = document.createElement("form");
    form.onsubmit = (e) => {
        e.preventDefault();
        getFormData();
        toggleShowingForm("hide");
    };
    form.classList.add("dataForm");
    formDiv.classList.add("shadow-lg");
    formDiv.classList.add("form");

    formDiv.appendChild(form);
    document.body.appendChild(formDiv);
    document.body.appendChild(backGround);
};

