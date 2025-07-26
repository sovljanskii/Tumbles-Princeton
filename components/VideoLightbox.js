export class VideoLightbox extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const thumbnail = this.getAttribute("thumbnail") || "";
    const videoUrl = this.getAttribute("video") || "";
    const altText = this.getAttribute("alt") || "Video thumbnail";

    if (!thumbnail || !videoUrl) {
      console.warn("<video-lightbox> missing 'thumbnail' or 'video' attribute");
      shadow.innerHTML = `<p style="color:red;">Video component misconfigured</p>`;
      return;
    }

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
          display: block;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border: none;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .play-button svg {
          width: 72px;
          height: 72px;
          transition: transform 0.3s ease;
        }

        .wrapper:hover .play-button svg {
          transform: scale(1.2);
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
          max-width: 1200px;
          aspect-ratio: 16 / 9;
        }

        iframe {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          border: none;
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

        @media (max-width: 500px) {
          .popup {
            width: 95%;
          }

          .close-button {
            top: -30px;
            right: -10px;
            font-size: 1.25rem;
          }
            img{
              height:220px;
              object-fit:cover;
            }

        }
      </style>

      <div class="wrapper" tabindex="0" role="button" aria-label="Play video">
        <img src="${thumbnail}" alt="${altText}" />
          <button class="play-button" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#00C336" width="32" height="32" aria-hidden="true">
              <polygon points="40,30 70,50 40,70" />
            </svg>
          </button>
      </div>

      <div class="lightbox" tabindex="-1">
        <div class="popup">
          <button class="close-button" aria-label="Close video">✖</button>
          <iframe title="Video player" allowfullscreen></iframe>
        </div>
      </div>
    `;

    const wrapper = shadow.querySelector(".wrapper");
    const lightbox = shadow.querySelector(".lightbox");
    const close = shadow.querySelector(".close-button");
    const iframe = shadow.querySelector("iframe");

    const openLightbox = () => {
      iframe.src = `${videoUrl}?autoplay=1`;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
      lightbox.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      iframe.src = "";
      document.body.style.overflow = "";
    };

    wrapper.addEventListener("click", openLightbox);
    wrapper.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openLightbox();
    });

    close.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    shadow.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });

    lightbox.addEventListener("transitionend", () => {
      lightbox.focus();
    });
  }
}

customElements.define("video-lightbox", VideoLightbox);
