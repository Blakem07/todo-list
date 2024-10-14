class UI {
  constructor() {
    this.addTaskBtn = document.querySelector("#add-todo-button");
    this.taskPopup = document.querySelector(".task-popup");
    this.todoForm = document.querySelector(".todo-form");

    this.init();
  }

  // Adds event listners
  init() {
    // Opens the add task popup
    this.addTaskBtn.addEventListener("click", () => {
      this.hideAddTaskBtn();
      this.showTaskPopup();
    });

    // Handles the form whereby users create todos
    this.todoForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent page refresh

      const formData = new FormData(this.todoForm);
      const todoValue = formData.get("task");

      // You can now use the taskValue to add to your to-do list
      console.log("Todo added:", todoValue);

      // Clear the input field
      this.todoForm.reset();
    });
  }

  // Hides the addTaskBtn when the popup appears
  hideAddTaskBtn() {
    this.addTaskBtn.style.display = "none";
  }

  // Allows the user to interact with the form to create todos
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
