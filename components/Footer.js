export function Footer() {
  const tpl = document.getElementById("footer-template");
  return tpl.content.cloneNode(true);
}
