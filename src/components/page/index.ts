import Base, { Component } from "../base.js";
import { Composable, DragState, ItemContainer } from "./pageItem.js";

type ItemContainerConstructor = {
  new (): ItemContainer;
};

class PageContainer extends Base<HTMLUListElement> implements Composable {
  private children = new Set<ItemContainer>();
  private dragTarget?: ItemContainer;
  private dropTarget?: ItemContainer;

  constructor(private itemConstructor: ItemContainerConstructor) {
    super(`<ul class="page"></ul>`);

    this.addEvents();
  }

  private addEvents() {
    this.addDragOverEvent();
    this.addDropEvent();
  }

  private addDragOverEvent() {
    this.element.addEventListener("dragover", (e: DragEvent) => {
      this.onDragOver(e);
    });
  }

  private addDropEvent() {
    this.element.addEventListener("drop", (e: DragEvent) => {
      this.onDrop(e);
    });
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = e.clientY;
      const srcElement = this.dragTarget.getBoundingRect();
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(
        this.dragTarget,
        dropY < srcElement.y ? "beforebegin" : "afterend"
      );
    }
  }

  addContents(component: Component) {
    const item = new this.itemConstructor();
    item.addContents(component);
    item.addTo(this.element);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });

    this.children.add(item);

    item.setOnDragStateListener((target: ItemContainer, state: DragState) => {
      switch (state) {
        case "start":
          this.dragTarget = target;
          this.updateItem("mute");
          break;
        case "enter":
          this.dropTarget = target;
          break;
        case "leave":
          this.dropTarget = undefined;
          break;
        case "stop":
          this.dragTarget = undefined;
          this.updateItem("unmute");
          break;
        default:
          throw new Error(`state error: ${state}`);
      }
    });
  }

  private updateItem(state: "mute" | "unmute") {
    this.children.forEach((item: ItemContainer) => {
      item.muteChildren(state);
    });
  }
}

export default PageContainer;
