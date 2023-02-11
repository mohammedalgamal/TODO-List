/* eslint-disable no-plusplus */
import { format, parseISO } from "date-fns";
// eslint-disable-next-line import/no-cycle
import { restoreLocal, saveLocal } from "./Storage";

function deleteCards() {
    const deleteButtons = document.querySelectorAll(".myCard .remove");
    const storage = restoreLocal();

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", () => {
            const name = deleteButtons[i].classList[1];
            const project = deleteButtons[i].classList[2];

            for (let j = 0; j < storage.length; j++) {
                if (storage[j].name === project) {
                    // eslint-disable-next-line array-callback-return, consistent-return
                    storage[j].tasksList = storage[j].tasksList.filter((task) => {
                        if (task.name !== name) {
                            return task;
                        };
                    });
                    break;
                };
            };
            saveLocal(storage);
        });
    }
};

export default function makeMainSection() {
    const main = document.createElement("div");
    main.classList.add("main");
    document.body.appendChild(main);
};

export function makeContentSection() {
    const content = document.createElement("div");
    content.classList.add("content");

    const contentUpper = document.createElement("div");
    contentUpper.classList.add("contentUpper");

    const contentLower = document.createElement("div");
    contentLower.classList.add("contentLower");

    content.appendChild(contentUpper);
    content.appendChild(contentLower);

    const main = document.querySelector(".main");
    main.appendChild(content);
};

export function makeCards(tasksList) {
    const main = document.querySelector(".contentLower");
    main.innerHTML = "";

    for (let i = 0; i < tasksList.length; i++) {
        main.innerHTML +=
            `    
            <div class="myCard ${tasksList[i].priority}">
                <div class="titleDiv">
                    ${tasksList[i].name} (${tasksList[i].project})
                </div>

                <div class="dueDateDiv">
                    Due Date: ${format(parseISO(tasksList[i].date), "dd/MM/yyyy")}
                </div>

                <div class="editBtn myBtn">
                    <button class="edit ${tasksList[i].name} ${tasksList[i].project}">Edit</button>
                </div>
                <div class="removeBtn myBtn">
                    <button class="remove ${tasksList[i].name} ${tasksList[i].project}">Remove</button>
                </div>
        </div>
        `;
    };
    deleteCards();
};