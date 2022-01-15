import Base from "../base.js";

class Todo extends Base<HTMLElement> {
  constructor() {
    super(`<section class="todo">
            <h2 class="todo">투두 라수트</h2>
            <input type="checkbox" class="todo__checkbox" />
           </section>`);
  }
}

export default Todo;
