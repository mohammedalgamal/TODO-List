export default function makeMainSection() {
    const main = document.createElement("div");
    main.classList.add("main");
    document.body.appendChild(main);
};

export function makeContentSection() {
    const content = document.createElement("div");
    content.classList.add("content");

    const main = document.querySelector(".main");
    main.appendChild(content);
};