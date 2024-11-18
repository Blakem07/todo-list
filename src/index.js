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
window.todoList.addItem("Study for exam");
window.todoList.updateProject("Study for exam", "Study");
window.todoList.addItem("Walk the dog");
window.todoList.updateProject("Walk the dog", "Personal");
window.todoList.addItem("Clean bedroom");
window.todoList.updateProject("Clean bedroom", "Personal");
window.todoList.addItem("Learn webpack");
window.todoList.updateComplete("Learn webpack");
window.todoList.updateProject("Learn webpack", "Study");
window.todoList.addItem("Learn react");
window.todoList.updateProject("Learn react", "Study");
window.todoList.addItem("Finish report", "01/01/2099");
window.todoList.updateProject("Finish report", "Work");
window.todoList.updateComplete("Finish report");
window.todoList.addItem("Client meeting", "07/06/2099");
window.todoList.updateProject("Client meeting", "Work");

const ui = new UI(window.todoList);

// ---------- FIX LIST ----------
/*
1. Use event delegation for projects
2. Create a way to delete Projects
3. Ensure todoCards dont distort when projects are added
*/
