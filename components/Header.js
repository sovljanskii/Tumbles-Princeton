import "../components/ArrowButton.js";

export function Header(tpl) {
  const fragment = tpl.content.cloneNode(true);
  const header = fragment.querySelector("header");

  const hamburger = header.querySelector(".hamburger");
  const nav = header.querySelector("nav");

  hamburger?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  return header;
}
