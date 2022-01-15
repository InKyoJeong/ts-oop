import Base, { Component } from "../base.js";
import { Composable, ItemContainer } from "./pageItem.js";

type ItemContainerConstructor = {
  new (): ItemContainer;
};

class PageContainer extends Base<HTMLUListElement> implements Composable {
  constructor(private itemConstructor: ItemContainerConstructor) {
    super(`<ul class="page"></ul>`);
  }

  addContents(component: Component) {
    const item = new this.itemConstructor();
    item.addContents(component);
    item.addTo(this.element);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}

export default PageContainer;
