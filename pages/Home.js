export function Home() {
  const tpl = document.getElementById("home-template");
  const clone = tpl.content.cloneNode(true);

  const lightbox = clone.querySelector("#video-lightbox");
  const thumbnail = clone.querySelector("#video-thumbnail");
  const close = clone.querySelector("#close-lightbox");

  if (thumbnail && lightbox && close) {
    thumbnail.addEventListener("click", () => {
      lightbox.classList.add("active");
    });

    close.addEventListener("click", () => {
      lightbox.classList.remove("active");
      const iframe = lightbox.querySelector("iframe");
      iframe.src = iframe.src; // reset video
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        const iframe = lightbox.querySelector("iframe");
        iframe.src = iframe.src;
      }
    });
  } else {
    console.warn("🔍 Missing one or more lightbox elements.");
  }

  return clone;
}
