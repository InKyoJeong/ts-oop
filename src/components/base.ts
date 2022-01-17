export interface Component {
  addTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  attach(component: Component, position?: InsertPosition): void;
}

class Base<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlTemplate: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlTemplate;
    this.element = template.content.firstElementChild! as T;
  }

  addTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error("Parent mismatch");
    }
    parent.removeChild(this.element);
  }

  attach(component: Component, position?: InsertPosition): void {
    component.addTo(this.element, position);
  }
}

export default Base;
