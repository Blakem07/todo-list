class TodoItem {
  constructor(title, dueDate, priority, complete = false, project = null) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = complete;
    this.project = project;
  }
}

export default TodoItem;
