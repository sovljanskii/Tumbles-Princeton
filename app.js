import "./components/ArrowButton.js";
import { Home } from "./pages/Home.js";
import "./components/VideoLightBox.js";

const templates = new Map();

async function loadTemplate(url, id) {
  if (templates.has(id)) return;

  const res = await fetch(url);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html.trim();

  const template = wrapper.querySelector("template");
  if (template) {
    document.body.appendChild(template); // ✅ Inject it into DOM so Home() can find it
    templates.set(id, template);
  } else {
    console.warn(`Template with id ${id} not found in ${url}`);
  }
}

function renderPage() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const header = templates.get("header-template")?.content.cloneNode(true);
  const home = Home(); // now safe ✅
  const footer = templates.get("footer-template")?.content.cloneNode(true);

  if (header) app.appendChild(header);
  if (home) app.appendChild(home);
  if (footer) app.appendChild(footer);
}

async function start() {
  await Promise.all([
    loadTemplate("/templates/header.html", "header-template"),
    loadTemplate("/templates/home.html", "home-template"), // ✅ ensures it's in DOM before Home()
    loadTemplate("/templates/footer.html", "footer-template"),
  ]);

  renderPage();
}

start();
