import Base, { Component } from "../base.js";
import { Composable, DragState, ItemContainer } from "./pageItem.js";

type ItemContainerConstructor = {
  new (): ItemContainer;
};

class PageContainer extends Base<HTMLUListElement> implements Composable {
  constructor(private itemConstructor: ItemContainerConstructor) {
    super(`<ul class="page"></ul>`);

    this.addDragOverEvent();
    this.addDropEvent();
  }

  private addDragOverEvent() {
    this.element.addEventListener("dragover", (e: DragEvent) => {
      this.dragOver(e);
    });
  }

  private addDropEvent() {
    this.element.addEventListener("drop", (e: DragEvent) => {
      this.drop(e);
    });
  }

  dragOver(e: DragEvent) {
    e.preventDefault();
  }

  drop(e: DragEvent) {
    e.preventDefault();
  }

  addContents(component: Component) {
    const item = new this.itemConstructor();
    item.addContents(component);
    item.addTo(this.element);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });

    item.setOnDragStateListener((target: ItemContainer, state: DragState) => {
      console.log(target, state);
    });
  }
}

export default PageContainer;
