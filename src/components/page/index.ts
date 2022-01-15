import Base, { Component } from "../base.js";
import { ItemContainer } from "./pageItem.js";

type ItemContainerConstructor = {
  new (): ItemContainer;
};

class PageContainer extends Base<HTMLUListElement> {
  constructor(private itemConstructor: ItemContainerConstructor) {
    super(`<ul class="page"></ul>`);
  }

  addItem(component: Component) {
    const item = new this.itemConstructor();
    item.addContents(component);
    item.addTo(this.element);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}

export default PageContainer;
