import "./styles.css";
import todoList from "./modules/UI.js";

// Making global so I can fun functions in the console
window.todoList = todoList;

// Creating Dummy Todos
todoList.addItem("test1");
todoList.addItem("test2");
todoList.addItem("test3");

// Displaying dummy todos in console
todoList.readItems();

// Creating dummy projects
todoList.projectManager.createProject("project1");
todoList.projectManager.createProject("project2");
todoList.projectManager.createProject("project3");

// Displaying dummy projects in console
todoList.projectManager.readProjects();

/*MAKE CHANGES TO PROPERTIES HERE*/
// console.log(window.UI.addTaskBtn);

// Displaying changes
//console.log(window.TodoList.sortByProject("project2"));
