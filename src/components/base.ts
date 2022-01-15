export interface Component {
  addTo(parent: HTMLElement): void;
  removeFrom(parent: HTMLElement): void;
}

class Base<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlTemplate: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlTemplate;
    this.element = template.content.firstElementChild! as T;
  }

  addTo(parent: HTMLElement) {
    parent.append(this.element);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error("Parent mismatch");
    }
    parent.removeChild(this.element);
  }
}

export default Base;
