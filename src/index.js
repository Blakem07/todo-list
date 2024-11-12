import "./styles.css";
import todoList from "./modules/UI.js";

// Making global so I can fun functions in the console
window.todoList = todoList;

// Creating Dummy Todos
todoList.addItem("test1");
todoList.addItem("test2");
todoList.addItem("test3");

todoList.updateComplete("test3");

// Displaying dummy todos in console
todoList.readItems();

// Creating dummy projects
todoList.projectManager.createProject("project1");
todoList.projectManager.createProject("project2");
todoList.projectManager.createProject("project3");

// Adding todos to a project
todoList.updateProject("test1", "project1");
todoList.updateProject("test2", "project3");

// Adding dates for testing

// Displaying dummy projects in console
todoList.projectManager.readProjects();
