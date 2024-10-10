import "./styles.css";
import TodoList from "./modules/TodoList.js";
import Project from "./modules/Project.js";

// Creating class instances
window.TodoList = new TodoList();
window.Project = new Project();
window.TodoList.linkProjectManager(window.Project);

//
console.log(window.TodoList);

//

window.TodoList.addItem("test1", "ababbaba");
window.TodoList.addItem("test2");
window.TodoList.addItem("test3");

window.TodoList.readItems();

window.Project = new Project();

window.Project.createProject("project1");
window.Project.createProject("project2");
window.Project.createProject("project3");

window.Project.readProjects();

// window.TodoList.updateProject("test1");
