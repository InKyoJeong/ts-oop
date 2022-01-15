import Base from "../base.js";

class Note extends Base<HTMLElement> {
  constructor() {
    super(`<section class="note">
            <h2 class="note__title">노트제목</h2>
            <p class="note__body">노트내용</p>
        </section>`);
  }
}

export default Note;
