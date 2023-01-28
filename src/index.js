import "bootstrap/dist/css/bootstrap.css";
import "./Styles/style.css";
import logo from "./Images/icons8-todo-list-100.png";
import makeFooter from "./footer";
import makeHeader from "./header";

const icon = document.createElement("link");
icon.rel = "icon";
icon.href = logo;

document.getElementsByTagName("head")[0].appendChild(icon);

makeHeader();
makeFooter();