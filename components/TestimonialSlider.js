export class TestimonialSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const testimonials = JSON.parse(this.getAttribute("data") || "[]");
    this.testimonials = testimonials;
    this.current = 0;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          padding: 4rem 1rem;
          text-align: center;
          font-family: "Rubik", sans-serif;
          position: relative;
          width: 100%;
        }

        .title {
          font-size: 2rem;
          font-weight: 800;
          max-width: 800px;
          margin: 0 auto 2rem;
        }

        .content {
          position: relative;
          margin: 0 auto;
          padding: 2rem 2rem;
          transition: min-height 0.3s ease, min-width 0.4s ease;
        }

        .quote-icon {
          position: absolute;
          font-size: 3.75rem;
          line-height: 1;
          color: #222;
          pointer-events: none;
        }

        .left {
          top: 0;
          left: -1.5rem;
        }

        .right {
          bottom: 0;
          right: -1.5rem;
        }

        .quote {
          font-style: italic;
          max-width: 700px;
          margin: 0 auto 2rem;
          font-size: 1.35rem;
          line-height: 1.7;
          color: #333;
        }

        .author {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .author img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-name {
          font-weight: 600;
          font-size: 1rem;
        }

        .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          width: 100%;
          justify-content: space-between;
          pointer-events: none;
        }

        .nav button {
          background: #00c336;
          border: none;
          color: white;
          font-size: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: all;
          transition: background 0.3s;
        }

        .nav button:hover {
          background: #00992c;
        }

        @media (max-width: 900px) {
          .nav {
            position: static;
            transform: none;
            margin-top: 2rem;
            justify-content: center;
            gap: 2rem;
          }

          .content {
            padding: 2rem 1rem;
            min-width: auto !important;
          }

          .quote-icon.left {
            left: 0;
          }

          .quote-icon.right {
            right: 0;
          }
        }
          #prev{
            transform: rotate(180deg);
          }
      </style>

      <div class="content" id="content">
        <div class="quote-icon left">“</div>
        <div class="quote" id="quote"></div>
        <div class="quote-icon right">”</div>

        <div class="author">
          <img id="author-img" />
          <span class="author-name" id="author-name"></span>
        </div>
      </div>

      <div class="nav">
        <button id="prev"><img src="/assets/global/right-arrow.svg" alt="Previous" /></button>
        <button id="next"><img src="/assets/global/right-arrow.svg" alt="Next" /></button>
      </div>
    `;

    this.render();

    this.shadowRoot.getElementById("prev").addEventListener("click", () => {
      this.current =
        (this.current - 1 + testimonials.length) % testimonials.length;
      this.render();
    });

    this.shadowRoot.getElementById("next").addEventListener("click", () => {
      this.current = (this.current + 1) % testimonials.length;
      this.render();
    });

    // Delay for initial height/width calc
    setTimeout(() => {
      this.updateMaxHeight();
      this.updateMaxWidth();
    }, 0);
  }

  render() {
    const t = this.testimonials[this.current];
    this.shadowRoot.getElementById("quote").textContent = t.text;
    this.shadowRoot.getElementById("author-name").textContent = t.name;
    this.shadowRoot.getElementById("author-img").src = t.image;
    this.shadowRoot.getElementById("author-img").alt = t.name;

    this.updateMaxHeight();
    this.updateMaxWidth();
  }

  updateMaxHeight() {
    const quote = this.shadowRoot.getElementById("quote");

    const currentText = this.testimonials[this.current].text;
    quote.style.minHeight = "auto";

    let maxHeight = 0;

    for (const t of this.testimonials) {
      quote.textContent = t.text;
      const height = quote.offsetHeight;
      if (height > maxHeight) maxHeight = height;
    }

    quote.textContent = currentText;
    quote.style.minHeight = `${maxHeight}px`;
  }

  updateMaxWidth() {
    const content = this.shadowRoot.getElementById("content");
    const quote = this.shadowRoot.getElementById("quote");

    const currentText = this.testimonials[this.current].text;

    let maxWidth = 0;

    for (const t of this.testimonials) {
      quote.textContent = t.text;
      const width = quote.offsetWidth;
      if (width > maxWidth) maxWidth = width;
    }

    quote.textContent = currentText;
    content.style.minWidth = `${maxWidth + 100}px`; // Add buffer
  }
}

customElements.define("testimonial-slider", TestimonialSlider);
