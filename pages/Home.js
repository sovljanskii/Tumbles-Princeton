// Home.js
export function Home(tpl) {
  if (!tpl) {
    console.warn("Home template missing");
    return document.createDocumentFragment(); // safe fallback
  }
  return tpl.content.cloneNode(true);
}
