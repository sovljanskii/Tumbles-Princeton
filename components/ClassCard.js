export class ClassCard extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute("title") || "Title";
    const text = this.getAttribute("text") || "Description goes here.";
    const link = this.getAttribute("link") || "/";
    const linkText = this.getAttribute("link-text") || "Learn more";
    const image = this.getAttribute("image") || "";

    this.innerHTML = `
      <div class="class-card">
        <div class="content">
          <div class="class-text">
            <h3 class="h3">${title}</h3>
            <p>${text}</p>
          </div>
          <btn-arrow class="primary" href="${link}">${linkText}</btn-arrow>
        </div>
        <img class="right-image" src="${image}" alt="${title}" />
      </div>
    `;
  }
}

customElements.define("class-card", ClassCard);
