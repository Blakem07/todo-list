import TodoItem from "./TodoItem";
import LocalStorageManager from "./LocalStorageManager";

/**
 * A class for managing a list of to-do items.
 * Allows adding, reading, updating, deleting, and sorting to-do items.
 * Also integrates with localStorage for persistence and allows linking to a project manager.
 *
 * @class TodoList
 */
class TodoList {
  /**
   * Creates an instance of the TodoList class.
   * Initializes an empty array of to-do items and attempts to load existing items from localStorage.
   *
   * @constructor
   */
  constructor() {
    this.items = [];
    this.projectManager = null;

    this.loadFromLocalStorage(); // Load to-do list from localStorage
  }

  /**
   * Links a project manager to the TodoList.
   *
   * @param {Project} project - The project manager to link.
   * @throws {Error} If the project manager is not linked correctly.
   * @returns {void}
   */
  linkProjectManager(project) {
    this.projectManager = project;

    if (this.projectManager === undefined) {
      throw new Error("The project manager has not been linked properly");
    }
  }

  /**
   * Adds a new to-do item to the list.
   *
   * @param {string} title - The title of the to-do item.
   * @param {string} description - The description of the to-do item.
   * @param {string|Date} dueDate - The due date of the to-do item.
   * @param {string} priority - The priority level of the to-do item (e.g., 'low', 'medium', 'high').
   * @returns {void}
   */
  addItem(title, description, dueDate, priority) {
    const newTodoItem = new TodoItem(title, description, dueDate, priority);
    this.items.push(newTodoItem);
    this.saveToLocalStorage(); // Save to localStorage after adding
  }

  /**
   * Retrieves all the to-do items.
   *
   * @returns {TodoItem[]} The array of all to-do items.
   */
  readItems() {
    return this.items;
  }

  /**
   * Retrieves a to-do item by its title.
   *
   * @param {string} title - The title of the to-do item to retrieve.
   * @returns {TodoItem} The to-do item that matches the title.
   * @throws {Error} If the to-do item is not found.
   */
  readItem(title) {
    for (let item of this.items) {
      if (item.title === title) {
        return item;
      }
    }
    throw new Error("Item not found");
  }

  /**
   * Updates the title of a to-do item.
   *
   * @param {string} title - The current title of the to-do item to update.
   * @returns {void}
   */
  updateTitle(title) {
    const todo = this.readItem(title);
    const change = prompt("What would you like to change the title to?:");
    todo.title = change;
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  /**
   * Updates the description of a to-do item.
   *
   * @param {string} title - The title of the to-do item to update.
   * @returns {void}
   */
  updateDescription(title) {
    const todo = this.readItem(title);
    const change = prompt("What would you like to change the description to?:");
    todo.description = change;
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  /**
   * Updates the due date of a to-do item.
   *
   * @param {string} title - The title of the to-do item to update.
   * @param {string|Date} date - The new due date for the to-do item.
   * @returns {void}
   */
  updateDueDate(title, date) {
    const todo = this.readItem(title);
    todo.dueDate = date;
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  /**
   * Updates the priority of a to-do item.
   *
   * @param {string} title - The title of the to-do item to update.
   * @returns {void}
   */
  updatePriority(title) {
    const todo = this.readItem(title);
    const change = prompt("What would you like to change the priority to?:");
    todo.priority = change;
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  /**
   * Toggles the completion status of a to-do item.
   *
   * @param {string} title - The title of the to-do item to update.
   * @returns {void}
   */
  updateComplete(title) {
    const todo = this.readItem(title);
    todo.complete = !todo.complete;
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  /**
   * Changes the project associated with a to-do item.
   *
   * @param {string} title - The title of the to-do item to update.
   * @param {string} projectName - The new project name to assign to the to-do item.
   * @returns {void}
   * @throws {Error} If the specified project does not exist.
   */
  updateProject(title, projectName) {
    const todo = this.readItem(title);

    if (this.projectManager.readProject(projectName)) {
      todo.project = projectName;
      this.saveToLocalStorage(); // Save changes to localStorage
    } else {
      throw new Error("Project not found");
    }
  }

  /**
   * Deletes a to-do item by its title.
   *
   * @param {string} title - The title of the to-do item to delete.
   * @returns {void}
   */
  deleteTodo(title) {
    const todo = this.readItem(title);
    const index = this.items.indexOf(todo);
    this.items.splice(index, 1);
    this.saveToLocalStorage(); // Save changes to localStorage
  }

  /**
   * Sorts and returns the to-do items due today.
   *
   * @returns {TodoItem[]} The list of to-do items due today.
   */
  sortByToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.items.filter((item) => {
      const dueDate = new Date(item.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });
  }

  /**
   * Sorts and returns the to-do items due within the current week.
   *
   * @returns {TodoItem[]} The list of to-do items due this week.
   */
  sortByWeek() {
    const today = new Date();
    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);

    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - daysToSubtract);
    startOfWeek.setHours(0, 0, 0, 0);

    endOfWeek.setDate(today.getDate() + (7 - dayOfWeek));
    endOfWeek.setHours(23, 59, 59, 999);

    return this.items.filter((item) => {
      const dueDate = new Date(item.dueDate);
      return dueDate >= startOfWeek && dueDate <= endOfWeek;
    });
  }

  /**
   * Sorts and returns to-do items associated with a specific project.
   *
   * @param {string} name - The name of the project to filter by.
   * @returns {TodoItem[]} The list of to-do items associated with the specified project.
   */
  sortByProject(name) {
    if (this.projectManager.readProject(name)) {
      return this.items.filter((item) => item.project === name);
    }
    throw new Error("Project not found");
  }

  /**
   * Saves the current list of to-do items to localStorage.
   *
   * @returns {void}
   */
  saveToLocalStorage() {
    LocalStorageManager.setItem("todoList", this.items);
  }

  /**
   * Loads the to-do list from localStorage and reinitializes the items array.
   *
   * @returns {void}
   */
  loadFromLocalStorage() {
    const loadedItems = LocalStorageManager.getItem("todoList");

    if (loadedItems && Array.isArray(loadedItems)) {
      this.items = loadedItems.map(
        (item) =>
          new TodoItem(
            item.title,
            item.dueDate,
            item.priority,
            item.complete,
            item.project
          )
      );
    }
  }

  /**
   * Loads dummy to-do items if no items exist in the list.
   *
   * @returns {boolean} Returns `true` if dummy data was loaded, `false` if the list already contains items.
   */
  loadDummyTodos() {
    if (this.items.length === 0) {
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

      return true;
    } else {
      return false;
    }
  }

  /**
   * Clears the to-do list from localStorage and resets the items array.
   *
   * @returns {void}
   */
  clearStorage() {
    LocalStorageManager.clear();
    this.items = [];
  }
}

export default TodoList;
