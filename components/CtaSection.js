export class CtaSection extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <section class="cta-section">
        <div class="container">
            <img
                src="/assets/home/cta-background-image.webp"
                class="background-image"
            />
            <div class="top">
                <p class="h2">
                Ready To<br />
                Get Started?
                </p>
                <img src="/assets/home/smiley5.svg" class="smiley-image" />
            </div>
            <div class="cta-text">
                <img src="/assets/home/smiley5.svg" class="smiley-image2" />
                <p>Want to try us out before taking the leap?</p>
                <btn-arrow class="primary" href="/signup">
                Sign up for a Trial Class
                </btn-arrow>
            </div>
        </div>
    </section>
    `;
  }
}

customElements.define("cta-section", CtaSection);
