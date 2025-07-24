import "./components/ArrowButton.js";
import { Header } from "./components/Header.js";
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
    templates.set(id, template);
  } else {
    console.warn(`Template with id ${id} not found in ${url}`);
  }
}

function renderPage() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const headerTpl = templates.get("header-template");
  const homeTpl = templates.get("home-template");
  const footerTpl = templates.get("footer-template");

  const header = Header(headerTpl); // ✅ use the component function
  const home = Home(homeTpl);
  const footer = footerTpl?.content.cloneNode(true);

  if (header) app.appendChild(header);
  if (home) app.appendChild(home);
  if (footer) app.appendChild(footer);
}

async function start() {
  await Promise.all([
    loadTemplate("/templates/header.html", "header-template"),
    loadTemplate("/templates/home.html", "home-template"),
    loadTemplate("/templates/footer.html", "footer-template"),
  ]);

  renderPage();
}

start();
