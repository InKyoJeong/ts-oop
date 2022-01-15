import { Component } from "./components/base.js";
import PageContainer from "./components/page/index.js";
import PageItem, { Composable } from "./components/page/pageItem.js";

import Modal from "./components/modal/index.js";
import MediaForm from "./components/modal/mediaForm.js";
import TextForm from "./components/modal/textForm.js";

import Image from "./components/content/image.js";
import Todo from "./components/content/todo.js";

class App {
  private page: Component & Composable;

  constructor($target: HTMLElement) {
    this.page = new PageContainer(PageItem);
    this.page.addTo($target);

    this.addEvent();
  }

  private addEvent() {
    const imageBtn = document.querySelector(
      "#menu-image"
    )! as HTMLButtonElement;
    imageBtn.addEventListener("click", this.openModal);

    const todoBtn = document.querySelector("#menu-todo")! as HTMLButtonElement;
    todoBtn.addEventListener("click", this.openModalTodo);
  }

  private openModal = () => {
    const modal = new Modal();
    const form = new MediaForm();
    modal.addContents(form);
    modal.addTo(document.body);

    modal.setOnSubmitListener(() => {
      this.page.addContents(new Image(form.title, form.url));
      modal.removeFrom(document.body);
    });

    modal.setOnCloseListener(() => {
      modal.removeFrom(document.body);
    });
  };

  private openModalTodo = () => {
    const modal = new Modal();
    const form = new TextForm();
    modal.addContents(form);
    modal.addTo(document.body);

    modal.setOnSubmitListener(() => {
      this.page.addContents(new Todo(form.title, form.body));
      modal.removeFrom(document.body);
    });

    modal.setOnCloseListener(() => {
      modal.removeFrom(document.body);
    });
  };
}

export default App;
