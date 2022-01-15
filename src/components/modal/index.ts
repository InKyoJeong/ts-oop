import Base, { Component } from "../base.js";
import { Composable } from "../page/pageItem.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;
class Modal extends Base<HTMLElement> implements Composable {
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;

  constructor() {
    super(`<dialog class="modal">
            <div class="modal__container">
                <button class="close">&times;</button>
                <div id="modal__body"></div>
                <button class="modal__submit">ADD</button>
            </div>
           </dialog>`);

    this.addEvent();
  }

  private addEvent() {
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.element.querySelector(
      ".modal__submit"
    )! as HTMLButtonElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addContents(contents: Component) {
    const body = this.element.querySelector(".modal__body")! as HTMLDivElement;
    contents.addTo(body);
  }
}

export default Modal;
