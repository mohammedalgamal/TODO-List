import gitHubImg from "./Images/GitHub-Mark-Light-32px.png";

export default function makeFooter() {
  const footer = document.createElement("div");
  footer.className = "footer";
  footer.classList.add("shadow-lg");

  const footerText = document.createElement("div");
  footerText.className = "text";
  footerText.innerHTML = "Copyright &#169 mohammedalgamal";

  const footerImgLink = document.createElement("a");
  footerImgLink.href = "https://github.com/mohammedalgamal/TODO-List";

  const footerImg = document.createElement("img");
  footerImg.src = gitHubImg;
  footerImg.alt = "GitHub Logo";

  footerImgLink.appendChild(footerImg);
  footerText.appendChild(footerImgLink);
  footer.appendChild(footerText);
  document.body.appendChild(footer);
}
