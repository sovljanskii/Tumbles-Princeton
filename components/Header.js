import "../components/ArrowButton.js";

export function Header(tpl) {
  const fragment = tpl.content.cloneNode(true);
  const header = fragment.querySelector("header");

  const hamburger = header.querySelector(".hamburger");
  const nav = header.querySelector("nav");
  const topWrapper = header.querySelector(".top-wrapper");

  hamburger?.addEventListener("click", () => {
    nav.classList.toggle("open");
    topWrapper.classList.toggle("nav-open");
    hamburger.classList.toggle("open"); // Toggle hamburger animation
  });

  return header;
}
