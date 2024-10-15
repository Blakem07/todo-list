import TodoItem from "./TodoItem.js";

class TodoList {
  constructor() {
    this.items = [];
    this.projectManager;
  }

  linkProjectManager(project) {
    this.projectManager = project;

    if (this.projectManager == undefined) {
      throw new Error("The project manager has not been linked properly");
    }
  }

  addItem(title, description, dueDate, priority) {
    // Adds a new todo using the TodoItem class
    let newTodoItem = new TodoItem(title, description, dueDate, priority);
    this.items.push(newTodoItem);
  }

  readItems() {
    // Reads all the todos held within this.items
    for (let item in this.items) {
      // console.log(this.items[item]);
    }
    return this.items;
  }

  readItem(title) {
    // Retrieves a TodoItem object by its title
    for (let item in this.items) {
      if (this.items[item].title == title) {
        return this.items[item];
      }
    }
    throw new Error("Item not found");
  }
  /*
  updateItem(title, property) {
    // Updates a specifc property on the todo item
    const todo = this.readItem(title);

    if (!(property in todo)) {
      throw Error("The property you are looking to change does not exist");
    } else {
      const change = prompt(
        `What would you like to change the ${property} to?:`
      );
      todo[property] = change;
    }
  }
*/
  updateTitle(title) {
    const todo = this.readItem(title);

    const change = prompt(`What would you like to change the title to?:`);
    todo.title = change;
  }

  updateDescription(title) {
    const todo = this.readItem(title);

    const change = prompt(`What would you like to change the description to?:`);
    todo.description = change;
  }

  updateDueDate(title) {
    const todo = this.readItem(title);

    const change = prompt(`What would you like to change the due date to?:`);
    todo.dueDate = change;
  }

  updatePriority(title) {
    const todo = this.readItem(title);

    const change = prompt(`What would you like to change the priority to?:`);
    todo.priority = change;
  }

  updateComplete(title) {
    // Toggles the complete property on or off
    const todo = this.readItem(title);

    todo.complete = !todo.complete;
  }

  updateProject(title) {
    // Changes the project property
    const todo = this.readItem(title);
    const change = prompt(
      `What project would you like to assign this todo to?:`
    );

    if (this.projectManager.readProject(change)) {
      todo.project = change;
    }
  }

  deleteTodo(title) {
    // Removes a single todoItem from this.items based on its index
    const todo = this.readItem(title);
    const index = this.items.indexOf(todo);

    this.items.splice(index, 1);
  }

  // Sorting
  sortByToday() {
    // Returns an array of todos which are due today
    const today = new Date();
    // Reset the time to 00:00:00 to compare only dates
    today.setHours(0, 0, 0, 0);

    return this.items.filter((item) => {
      const dueDate = new Date(item.dueDate);
      // Reset the time to 00:00:00 for the due date as well
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });
  }

  sortByWeek() {
    const today = new Date();
    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);

    // Set the start of the week to the last Monday (or today if it's Monday)
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust so Monday is the start
    startOfWeek.setDate(today.getDate() - daysToSubtract);
    startOfWeek.setHours(0, 0, 0, 0);

    // Set the end of the week to the next Sunday
    endOfWeek.setDate(today.getDate() + (7 - dayOfWeek)); // Adjust for Sunday
    endOfWeek.setHours(23, 59, 59, 999);

    return this.items.filter((item) => {
      const dueDate = new Date(item.dueDate);
      return dueDate >= startOfWeek && dueDate <= endOfWeek;
    });
  }

  sortByProject(name) {
    // Returns an array with TodoItems belonging to a particular project
    if (this.projectManager.readProject(name)) {
      const itemsByProject = this.items.filter((item) => item.project == name);
      return itemsByProject;
    }
  }
}

const todoList = new TodoList();

export default todoList;
