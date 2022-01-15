import Base from "../base.js";

class Image extends Base<HTMLElement> {
  constructor() {
    super(`<section class="image">
            <div class="image__holder"><img class="image__thumbnail" /></div>
            <p class="image__title"></p>
           </section>`);
  }
}

export default Image;
