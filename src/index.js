import "./styles.css";
import TodoList from "./modules/TodoList.js";

// window. for use in the console for testing
window.TodoList = new TodoList();

window.TodoList.addItem("test1", "ababbaba");
window.TodoList.addItem("test2");
window.TodoList.addItem("test3");

window.TodoList.readItems();

window.TodoList.updateItem("test1", "description");

window.TodoList.readItems();
