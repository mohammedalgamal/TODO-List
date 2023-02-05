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