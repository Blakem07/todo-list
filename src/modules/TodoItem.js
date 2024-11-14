class TodoItem {
  constructor(title, dueDate, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    this.project = null;
  }
}

export default TodoItem;
