class TodoItem {
  /**
   * Creates an instance of the TodoItem class.
   *
   * @constructor
   * @param {string} title - The title or description of the to-do item.
   * @param {string|Date} dueDate - The due date of the to-do item. Can be a string or a Date object.
   * @param {string} priority - The priority level of the to-do item (e.g., 'low', 'medium', 'high').
   * @param {boolean} [complete=false] - The completion status of the to-do item (default is false).
   * @param {string|null} [project=null] - The optional project name associated with this to-do item (default is null).
   */
  constructor(title, dueDate, priority, complete = false, project = null) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = complete;
    this.project = project;
  }
}

export default TodoItem;
