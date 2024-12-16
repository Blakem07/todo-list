import TodoItem from "./TodoItem";
import LocalStorageManager from "./LocalStorageManager";

class TodoList {
  constructor() {
    this.items = [];
    this.projectManager;
    this.loadFromLocalStorage();
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
    this.saveToLocalStorage(); // Save to localStorage after adding a new item
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
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  updateDescription(title) {
    const todo = this.readItem(title);

    const change = prompt(`What would you like to change the description to?:`);
    todo.description = change;
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  updateDueDate(title, date) {
    const todo = this.readItem(title);
    todo.dueDate = date;
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  updatePriority(title) {
    const todo = this.readItem(title);

    const change = prompt(`What would you like to change the priority to?:`);
    todo.priority = change;
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  updateComplete(title) {
    // Toggles the complete property on or off
    const todo = this.readItem(title);

    todo.complete = !todo.complete;
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  updateProject(title, projectName) {
    // Changes the project property
    const todo = this.readItem(title);

    if (this.projectManager.readProject(projectName)) {
      todo.project = projectName;
      this.saveToLocalStorage(); // Save changes to localStorage
    }
  }

  deleteTodo(title) {
    // Removes a single todoItem from this.items based on its index
    const todo = this.readItem(title);
    const index = this.items.indexOf(todo);

    this.items.splice(index, 1);
    this.saveToLocalStorage(); // Save changes to localStorage
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

  // LOCAL STORAGE

  // Save the todo list to localStorage
  saveToLocalStorage() {
    LocalStorageManager.setItem("todoList", this.items);
  }

  // Method to load the todo list from localStorage and initialize the items array
  loadFromLocalStorage() {
    // Retrieve the todo list data from localStorage using LocalStorageManager
    const loadedItems = LocalStorageManager.getItem("todoList");

    // Check if the loaded data exists and is an array
    if (loadedItems && Array.isArray(loadedItems)) {
      // Map through each item in the loaded array and create a new TodoItem instance
      // This step transforms the raw data into instances of the TodoItem class with proper attributes
      // Because after being parsed it looses its original class
      this.items = loadedItems.map(
        (item) =>
          new TodoItem(
            item.title, // Title of the todo item
            item.description, // Description of the todo item
            item.dueDate, // Due date for the todo item
            item.priority // Priority level of the todo item
          )
      );
    }
  }

  // Clear the todo list from localStorage (optional)
  clearStorage() {
    LocalStorageManager.clear();
    this.items = [];
  }
}

export default TodoList;
