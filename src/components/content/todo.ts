import Base from "../base.js";

class Todo extends Base<HTMLElement> {
  title: string;
  todo: string;

  constructor(title: string, todo: string) {
    super(`<section class="todo">
            <h2 class="todo"></h2>
            <input type="checkbox" class="todo__checkbox" />
           </section>`);

    this.title = title;
    this.todo = todo;
    this.addTitle();
    this.addTodo();
  }

  private addTitle() {
    const todoTitle = this.element.querySelector(
      ".todo"
    )! as HTMLHeadingElement;
    todoTitle.textContent = this.title;
  }

  private addTodo() {
    const todoInput = this.element.querySelector(
      ".todo__checkbox"
    )! as HTMLInputElement;
    todoInput.insertAdjacentText("afterend", this.todo);
  }
}

export default Todo;
