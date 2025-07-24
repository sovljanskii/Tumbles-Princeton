export class ArrowButton extends HTMLElement {
  constructor() {
    super();

    const href = this.getAttribute("href") || "#";
    const text = this.textContent || "Click me";
    const extraClasses = this.getAttribute("class") || "";

    this.innerHTML = `
      <a class="button ${extraClasses}" href="${href}">
        <span class="text">${text}</span>
        <img class="arrow" src="/assets/global/right-arrow.svg" alt="Arrow icon" />
      </a>
    `;
  }
}

customElements.define("btn-arrow", ArrowButton);
