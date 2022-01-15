import { Component } from "./components/base.js";
import PageContainer from "./components/page/index.js";
import PageItem, { Composable } from "./components/page/pageItem.js";

import Modal from "./components/modal/index.js";
import TextForm, { TextData } from "./components/modal/textForm.js";
import MediaForm, { MediaData } from "./components/modal/mediaForm.js";

import Todo from "./components/content/todo.js";
import Note from "./components/content/note.js";
import Image from "./components/content/image.js";

type FormComponentConstructor<T extends (MediaData | TextData) & Component> = {
  new (): T;
};
class App {
  private page: Component & Composable;

  constructor($target: HTMLElement) {
    this.page = new PageContainer(PageItem);
    this.page.addTo($target);

    this.bindWithModal<MediaForm>(
      "#menu-image",
      MediaForm,
      (input: MediaForm) => new Image(input.title, input.url)
    );

    this.bindWithModal<TextForm>(
      "#menu-memo",
      TextForm,
      (input: TextForm) => new Note(input.title, input.body)
    );

    this.bindWithModal<TextForm>(
      "#menu-todo",
      TextForm,
      (input: TextForm) => new Todo(input.title, input.body)
    );
  }

  private bindWithModal<T extends (MediaData | TextData) & Component>(
    selector: string,
    FormComponent: FormComponentConstructor<T>,
    makeFormFunc: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const modal = new Modal();
      const form = new FormComponent();

      modal.addContents(form);
      modal.addTo(document.body);

      modal.setOnSubmitListener(() => {
        const item = makeFormFunc(form);
        this.page.addContents(item);

        modal.removeFrom(document.body);
      });

      modal.setOnCloseListener(() => {
        modal.removeFrom(document.body);
      });
    });
  }
}

export default App;
