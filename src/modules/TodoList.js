import TodoItem from "./TodoItem.js";

class TodoList {
  constructor() {
    this.items = [];
  }

  addItem(title, description, dueDate, priority) {
    let newTodoItem = new TodoItem(title, description, dueDate, priority);
    this.items.push(newTodoItem);
  }
}

export default TodoList;
