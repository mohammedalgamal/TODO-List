/* eslint-disable import/no-cycle */
/* eslint-disable no-plusplus */
import { format, parseISO } from "date-fns";
import makeFormType, { toggleShowingForm } from "./form";
import { restoreLocal, saveLocal } from "./Storage";

function deleteCards() {
  const deleteButtons = document.querySelectorAll(".myCard .remove");
  const storage = restoreLocal();

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      const name = deleteButtons[i].dataset.task;
      const { project } = deleteButtons[i].dataset;

      for (let j = 0; j < storage.length; j++) {
        if (storage[j].name === project) {
          // eslint-disable-next-line array-callback-return, consistent-return
          storage[j].tasksList = storage[j].tasksList.filter((task) => {
            if (task.name !== name) {
              return task;
            }
          });
          break;
        }
      }
      saveLocal(storage);
    });
  }
}

function editCard() {
  const editButtons = document.querySelectorAll(".myCard .edit");
  const storage = restoreLocal();

  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", () => {
      const name = editButtons[i].dataset.task;
      const { project } = editButtons[i].dataset;

      for (let j = 0; j < storage.length; j++) {
        if (storage[j].name === project) {
          const taskList = storage[j].tasksList;
          for (let k = 0; k < taskList.length; k++) {
            if (taskList[k].name === name) {
              const taskName = name;
              const taskDate = taskList[k].date;
              const taskProject = taskList[k].project;
              const taskPriority = taskList[k].priority;

              makeFormType("task", `Edit task ${taskName} (${taskProject})`);
              document.querySelector("#name").value = taskName;
              document.querySelector("#date").value = taskDate;
              document.querySelector(".btn.Normal").classList.remove("active");
              document
                .querySelector(`.btn.${taskPriority}`)
                .classList.add("active");
              toggleShowingForm("show");
            }
          }
          break;
        }
      }
      saveLocal(storage);
    });
  }
}

export default function makeMainSection() {
  const main = document.createElement("div");
  main.classList.add("main");
  document.body.appendChild(main);
}

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
}

export function makeCards(tasksList) {
  const main = document.querySelector(".contentLower");
  main.innerHTML = "";

  for (let i = 0; i < tasksList.length; i++) {
    main.innerHTML += `    
            <div class="myCard ${tasksList[i].priority}">
                <div class="titleDiv">
                    ${tasksList[i].name} (${tasksList[i].project})
                </div>

                <div class="dueDateDiv">
                    Due Date: ${format(
                      parseISO(tasksList[i].date),
                      "dd/MM/yyyy"
                    )}
                </div>
                <div class="myBtns">
                    <div class="editBtn myBtn">
                        <button 
                        class="edit" 
                        data-project = "${tasksList[i].project}"
                        data-task = "${tasksList[i].name}">Edit</button>
                    </div>
                    <div class="removeBtn myBtn">
                        <button class="remove" 
                        data-project = "${tasksList[i].project}"
                        data-task = "${tasksList[i].name}">Remove</button>
                    </div>
                </div>
        </div>
        `;
  }
  deleteCards();
  editCard();
}
