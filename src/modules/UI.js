class UI {
  constructor() {
    this.addTaskBtn = document.querySelector("#add-todo-button");
    this.taskPopup = document.querySelector(".task-popup");

    this.init();
  }

  // Adds event listners
  init() {
    // Opens the add task popup
    this.addTaskBtn.addEventListener("click", () => {
      console.log("hello");
      this.showTaskPopup();
    });
  }

  showTaskPopup() {
    this.taskPopup.style.display = "block";
  }

  // TODO: add todo button
  // TODO: show all todos
  // TODO: show today todos
  // TODO: show this week todos
  // TODO: create project
}

export default UI;
