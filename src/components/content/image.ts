import Base from "../base.js";

class Image extends Base<HTMLElement> {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    super(`<section class="image">
            <div class="image__holder"><img class="image__thumbnail" /></div>
            <h2 class="image__title"></h2>
           </section>`);

    this.title = title;
    this.url = url;
    this.addTitle();
    this.addURL();
  }

  private addTitle() {
    const imageTitle = this.element.querySelector(
      ".image__title"
    )! as HTMLHeadingElement;
    imageTitle.textContent = this.title;
  }

  private addURL() {
    const imageElement = this.element.querySelector(
      ".image__thumbnail"
    )! as HTMLImageElement;
    imageElement.src = this.url;
    imageElement.alt = this.title;
  }
}

export default Image;
