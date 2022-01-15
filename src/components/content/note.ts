import Base from "../base.js";

class Note extends Base<HTMLElement> {
  title: string;
  body: string;

  constructor(title: string, body: string) {
    super(`<section class="note">
            <h2 class="note__title"></h2>
            <p class="note__body"></p>
           </section>`);

    this.title = title;
    this.body = body;
    this.addTitle();
    this.addBody();
  }

  addTitle() {
    const noteTitle = this.element.querySelector(
      ".note__title"
    )! as HTMLHeadingElement;
    noteTitle.textContent = this.title;
  }

  addBody() {
    const noteBody = this.element.querySelector(
      ".note__body"
    )! as HTMLParagraphElement;
    noteBody.textContent = this.body;
  }
}

export default Note;
