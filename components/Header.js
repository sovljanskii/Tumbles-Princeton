import "../components/ArrowButton.js";

export function Header() {
  const tpl = document.getElementById("header-template");
  return tpl.content.cloneNode(true);
}
