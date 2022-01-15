import PageContainer from "./components/page/pageContainer.js";
import PageItem from "./components/page/pageItem.js";
import Image from "./components/content/image.js";
import Note from "./components/content/note.js";
import Todo from "./components/content/todo.js";

class App {
  constructor($target: HTMLElement) {
    const pageContainer = new PageContainer(PageItem);
    pageContainer.addItem(new Todo("투투제목", "투두 바디"));
    pageContainer.addItem(new Note("노트제목", "노트 바디"));
    pageContainer.addItem(
      new Image("사진제목", "https://picsum.photos/300/300")
    );
    pageContainer.addTo($target);
  }
}

export default App;
