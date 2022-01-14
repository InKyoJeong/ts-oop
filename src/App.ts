import Image from "./components/content/image.js";
import Note from "./components/content/note.js";
import Todo from "./components/content/todo.js";

class App {
  constructor($target: HTMLElement) {
    const todo = new Todo();
    todo.addTo($target);
    const note = new Note();
    note.addTo($target);
    const image = new Image();
    image.addTo($target);
  }
}

export default App;
