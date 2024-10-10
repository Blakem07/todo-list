import "./styles.css";
import TodoList from "./modules/TodoList.js";
import Project from "./modules/Project.js";

// window. for use in the console for testing
window.TodoList = new TodoList();

window.TodoList.addItem("test1", "ababbaba");
window.TodoList.addItem("test2");
window.TodoList.addItem("test3");

window.TodoList.readItems();

window.Project = new Project();
window.Project.createProject();
window.Project.readProjects();
