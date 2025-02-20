import "./styles.css";
import TodoList from "./modules/TodoList.js";
import Project from "./modules/Project.js";
import UI from "./modules/UI.js";

// Instances
window.todoList = new TodoList();
const project = new Project();
window.todoList.linkProjectManager(project); // Linking to todoList as it needs to access projects

// Dummy projects
window.todoList.projectManager.createProject("Personal");
window.todoList.projectManager.createProject("Study");
window.todoList.projectManager.createProject("Work");

// Dummy Todos
window.todoList.loadDummyTodos();

const ui = new UI(window.todoList);
