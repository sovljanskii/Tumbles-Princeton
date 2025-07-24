export class VideoLightbox extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const thumbnail = this.getAttribute("thumbnail") || "";
    const video = this.getAttribute("video") || "";

    shadow.innerHTML = `
      <style>
        .wrapper {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        img {
          max-width: 100%;
          border-radius: 1rem;
        }
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-size: 2rem;
          color: #1f2937;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        .lightbox {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .lightbox.active {
          display: flex;
        }
        .popup {
          position: relative;
          width: 90%;
          max-width: 800px;
        }
        iframe {
          width: 100%;
          height: 450px;
          border-radius: 1rem;
        }
        .close-button {
          position: absolute;
          top: -40px;
          right: 0;
          font-size: 1.5rem;
          background: transparent;
          color: white;
          border: none;
          cursor: pointer;
        }
      </style>

      <div class="wrapper">
        <img src="${thumbnail}" alt="Video thumbnail" />
        <button class="play-button">▶</button>
      </div>

      <div class="lightbox">
        <div class="popup">
          <button class="close-button">✖</button>
          <iframe src="${video}?autoplay=1" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    `;

    const wrapper = shadow.querySelector(".wrapper");
    const lightbox = shadow.querySelector(".lightbox");
    const close = shadow.querySelector(".close-button");
    const iframe = shadow.querySelector("iframe");

    wrapper.addEventListener("click", () => {
      lightbox.classList.add("active");
    });

    close.addEventListener("click", () => {
      lightbox.classList.remove("active");
      iframe.src = iframe.src; // reset playback
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        iframe.src = iframe.src;
      }
    });
  }
}

customElements.define("video-lightbox", VideoLightbox);
