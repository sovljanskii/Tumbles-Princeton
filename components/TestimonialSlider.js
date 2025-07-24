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
          width:100%;
        }

        .title {
          font-size: 2rem;
          font-weight: 800;
          max-width: 800px;
          margin: 0 auto 2rem;
        }

        .quote-icon {
          font-size: 3.75rem;
          line-height: 0;
          color: #222;
        }
          .left{
            text-align: left;
          }
          .right{
            text-align: right;
          }

        .quote {
          font-style: italic;
          max-width: 700px;
          margin: 1rem auto 2rem;
          font-size: 1.125rem;
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
        .content{
          max-width:1000px;
          margin: 0 auto;
          }
          @media (max-width: 900px) {
            .nav {
                position: static;
                transform: none;
                margin-top: 2rem;
                justify-content: center;
                gap: 2rem;
            }
            }

      </style>
    <div class="content">
      <div class="quote-icon left">“</div>
      <div class="quote" id="quote"></div>
      <div class="quote-icon right">”</div>

      <div class="author">
        <img id="author-img" />
        <span class="author-name" id="author-name"></span>
      </div>
    </div>
    <div class="nav">
        <button id="prev">&lt;</button>
        <button id="next">&gt;</button>
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
  }

  render() {
    const t = this.testimonials[this.current];
    this.shadowRoot.getElementById("quote").textContent = t.text;
    this.shadowRoot.getElementById("author-name").textContent = t.name;
    this.shadowRoot.getElementById("author-img").src = t.image;
    this.shadowRoot.getElementById("author-img").alt = t.name;
  }
}

customElements.define("testimonial-slider", TestimonialSlider);
