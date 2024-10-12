import "./styles.css";
import TodoList from "./modules/TodoList.js";
import Project from "./modules/Project.js";

// Creating class instances
window.TodoList = new TodoList();
window.Project = new Project();
window.TodoList.linkProjectManager(window.Project);

//
console.log(window.TodoList);

// Creating Dummy Todos
window.TodoList.addItem("test1");
window.TodoList.addItem("test2");
window.TodoList.addItem("test3");

// Displaying dummy todos in console
window.TodoList.readItems();

// Creating dummy projects
window.Project.createProject("project1");
window.Project.createProject("project2");
window.Project.createProject("project3");

// Displaying dummy projects in console
window.Project.readProjects();

/*MAKE CHANGES TO PROPERTIES HERE*/

// Displaying changes
console.log(window.TodoList.sortByProject("project2"));
