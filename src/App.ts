import PageContainer from "./components/page/pageContainer.js";
import PageItem from "./components/page/pageItem.js";
import Image from "./components/content/image.js";
import Note from "./components/content/note.js";
import Todo from "./components/content/todo.js";

class App {
  constructor($target: HTMLElement) {
    const pageContainer = new PageContainer(PageItem);
    pageContainer.addItem(new Todo());
    pageContainer.addItem(new Note());
    pageContainer.addItem(new Image());
    pageContainer.addTo($target);
  }
}

export default App;
