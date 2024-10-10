import TodoItem from "./TodoItem.js";

class TodoList {
  constructor() {
    this.items = [];
  }

  addItem(title, description, dueDate, priority) {
    // Adds a new todo using the TodoItem class
    let newTodoItem = new TodoItem(title, description, dueDate, priority);
    this.items.push(newTodoItem);
  }

  readItems() {
    // Reads all the todos held within this.items
    for (let item in this.items) {
      console.log(this.items[item]);
    }
  }

  readItem(title) {
    // Retrieves a TodoItem by its title
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
    todo.Priority = change;
  }
}

export default TodoList;
