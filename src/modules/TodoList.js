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
    return "Item not found";
  }

  updateItem(title, property) {
    // Edits a specifc todo based on the property passed as an argument
    const change = prompt(`What would you like to change the ${property} to?:`);
    const todo = this.readItem(title);

    // Bracket notation to dynamically access property name
    todo[property] = change;
  }
}

export default TodoList;
