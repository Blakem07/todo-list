class TodoItem {
  constructor(title, description, dueDate, priority, none) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    this.project;
  }
}

export default TodoItem;
