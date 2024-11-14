import "./styles.css";
import TodoList from "./modules/TodoList.js";
import Project from "./modules/Project.js";
import UI from "./modules/UI.js";

// Instances
window.todoList = new TodoList();
const project = new Project();
window.todoList.linkProjectManager(project); // Linking to todoList as it needs to access projects
const ui = new UI(window.todoList);

// ---------- FIX LIST ----------
/*
1. Create a way to delete todoCards
2. Create a way to delete Projects
3. Ensure todoCards dont distort when projects are added
4. Have a placeholder value which informs user they can add a project
*/

// Add event listener to the delete button
