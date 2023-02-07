/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-cycle
import addNewProject, { Project } from "./projects";
import { restoreLocal, saveLocal } from "./Storage";

function togglePriority() {
    const buttons = document.querySelectorAll(".priority .btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove("active");
            };
            buttons[i].classList.add("active");
        });
    }
}

export default function makeFormType(type, label = "") {
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
        form.classList.remove("taskForm");

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
    }
    else {
        title.innerHTML = label;
        form.classList.add("taskForm");
        form.classList.remove("projectForm");

        const nameFormGroup = document.createElement("div");
        nameFormGroup.classList.add("form-group");

        const taskName = document.createElement("input");
        taskName.type = "text";
        taskName.classList = "form-control";
        taskName.placeholder = "Task name";
        taskName.name = "name";
        taskName.id = "name";
        taskName.required = true;
        taskName.autofocus = true;

        const taskDetails = document.createElement("textarea");
        taskDetails.classList = "form-control";
        taskDetails.placeholder = "Task Details (Optional)";
        taskDetails.name = "Details";
        taskDetails.id = "Details";

        const value = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

        nameFormGroup.appendChild(taskName);
        nameFormGroup.appendChild(taskDetails);
        nameFormGroup.innerHTML +=
            `
        <div class="date">
            Due date:
            <input type="date" class="form-control" name="Date" id="date" value=${value}>
        </div>
        `;
        nameFormGroup.innerHTML +=
            `
        <div class="priority">
            Priority:
            <button class="btn btn-outline-success" type="button">Low</button>
            <button class="btn btn-outline-warning active" type="button">Normal</button>
            <button class="btn btn-outline-danger" type="button">High</button>
        </div>`;

        form.appendChild(nameFormGroup);
        togglePriority();
    };

    form.appendChild(submitBtn);
};

export function getFormData() {
    const form = document.querySelector(".dataForm");

    if (form.classList.contains("projectForm")) {
        const name = document.querySelector("#name").value;

        addNewProject(new Project(name));
    }
    else {
        const name = document.querySelector("#name").value;
        const details = document.querySelector("#Details").value;
        const date = document.querySelector("#date").value;
        const priority = document.querySelector(".priority .active").innerHTML;
        let project = document.querySelector(".contentUpper .nameDiv").innerHTML;
        if (project === "All tasks") {
            project = "Default";
        };

        const storage = restoreLocal();

        for (let i = 0; i <= storage.length; i++) {
            if (storage[i].name === project) {
                storage[i].addNewTask(name, date, priority, project, details);
                saveLocal(storage);
                break;
            };
        };

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

