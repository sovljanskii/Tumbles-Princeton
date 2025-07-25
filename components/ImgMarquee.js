export class ImgMarquee extends HTMLElement {
  constructor() {
    super();

    const images = [
      "/assets/home/marquee1.svg",
      "/assets/home/marquee2.svg",
      "/assets/home/marquee3.svg",
      "/assets/home/marquee4.svg",
      "/assets/home/marquee5.svg",
      "/assets/home/marquee6.svg",
      "/assets/home/marquee7.svg",
    ];

    const wrapper = document.createElement("div");
    wrapper.classList.add("marquee-wrapper");

    const createMarquee = () => {
      const marquee = document.createElement("div");
      marquee.classList.add("marquee");
      images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "marquee image";
        marquee.appendChild(img);
      });
      return marquee;
    };

    wrapper.appendChild(createMarquee());
    wrapper.appendChild(createMarquee());

    const style = document.createElement("style");
    style.textContent = `
      .marquee-wrapper {
        overflow: hidden;
        display: flex;
        width: 100%;
        background-color: transparent;
        gap: 2.25rem;
        pointer-events: none;
      }

      .marquee {
        display: flex;
        animation: scroll 20s linear infinite;
        gap: 2.25rem;
      }

      @keyframes scroll {
        from {
          transform: translateX(0%);
        }
        to {
          transform: translateX(-50%);
        }
      }
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

customElements.define("img-marquee", ImgMarquee);
