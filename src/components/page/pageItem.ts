import Base, { Component } from "../base.js";

export interface Composable {
  addContents(itemContainer: Component): void;
}

export interface ItemContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<ItemContainer>): void;
  muteChildren(state: "mute" | "unmute"): void;
  getBoundingRect(): DOMRect;
}

export type DragState = "start" | "stop" | "leave" | "enter";
type OnCloseListener = () => void;
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

class PageItem extends Base<HTMLLIElement> implements ItemContainer {
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItem>;

  constructor() {
    super(`<li class="page-item" draggable='true'>
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
           </li>`);

    this.addEvents();
  }

  private addEvents() {
    this.addCloseEvent();
    this.addDragStartEvent();
    this.addDragEndEvent();
    this.addDragEnterEvent();
    this.addDragLeaveEvent();
  }

  private addCloseEvent() {
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  private addDragStartEvent() {
    this.element.addEventListener("dragstart", (e: DragEvent) =>
      this.onDragStart(e)
    );
  }

  private addDragEndEvent() {
    this.element.addEventListener("dragend", (e: DragEvent) => {
      this.onDragEnd(e);
    });
  }

  private addDragEnterEvent() {
    this.element.addEventListener("dragenter", (e: DragEvent) =>
      this.onDragEnter(e)
    );
  }

  private addDragLeaveEvent() {
    this.element.addEventListener("dragleave", (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }

  private onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
  }

  private onDragEnd(_: DragEvent) {
    this.notifyDragObservers("stop");
  }

  private onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
  }

  private onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
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

  setOnDragStateListener(listener: OnDragStateListener<PageItem>) {
    this.dragStateListener = listener;
  }

  muteChildren(state: "mute" | "unmute"): void {
    if (state === "mute") {
      this.element.classList.add("mute-children");
    } else {
      this.element.classList.remove("mute-children");
    }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}

export default PageItem;
