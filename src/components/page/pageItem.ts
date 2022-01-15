import Base, { Component } from "../base.js";

export interface Composable {
  addContents(itemContainer: Component): void;
}

export interface ItemContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

type OnCloseListener = () => void;

class PageItem extends Base<HTMLLIElement> implements ItemContainer {
  private closeListener?: OnCloseListener;

  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
           </li>`);

    this.addEvent();
  }

  private addEvent() {
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addContents(itemContents: Component) {
    const itemContainer = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    itemContents.addTo(itemContainer);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

export default PageItem;
