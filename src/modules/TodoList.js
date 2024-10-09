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
      console.log(this.items[item].title);
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

  updateItem(TodoItemObj, property) {
    // Edits a specifc todo based on the property passed as an argument
    let change = prompt(`What would you like to change the ${property} to?:`);
    TodoItem.property = change;
  }
}

export default TodoList;
