import todoList from "./Project";

class UI {
  constructor() {
    this.addTaskBtn = document.querySelector("#add-todo-button");
    this.taskPopup = document.querySelector(".task-popup");
    this.todoForm = document.querySelector(".todo-form");
    this.formDeleteBtn = document.querySelector(".delete-button.form-button");
    this.cardList = document.querySelector("#card-list");
    this.allButton = document.querySelector("#all-button");

    this.init();
  }

  // Adds event listeners
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

      // Addding to TodoList.items
      todoList.addItem(todoValue);
      console.log("Todo added:", todoValue);

      // Clear the input field
      this.todoForm.reset();

      this.hideTaskPopup();
      this.showAddTaskBtn();
    });

    // Closes the todo create form without submitting
    this.formDeleteBtn.addEventListener("click", () => {
      this.todoForm.reset();
      this.hideTaskPopup();
      this.showAddTaskBtn();
    });

    // Enables the all button to load all todos
    this.allButton.addEventListener("click", () => {
      this.showAllTodos();
      console.log(ui.content);
    });
  }

  showAddTaskBtn() {
    this.addTaskBtn.style.display = "block";
  }

  // Hides the addTaskBtn when the popup appears
  hideAddTaskBtn() {
    this.addTaskBtn.style.display = "none";
  }

  // Allows the user to interact with the form to create todos
  showTaskPopup() {
    this.taskPopup.style.display = "block";
  }

  hideTaskPopup() {
    this.taskPopup.style.display = "none";
  }

  createTodoCard(todoItem) {
    // The card
    const card = document.createElement("div");
    card.className = "todo-card";

    // The title
    const cardTitle = document.createElement("p");
    cardTitle.className = "todo-card-title";
    cardTitle.textContent = todoItem.title;

    //  List element
    const listEle = document.createElement("li");

    // Appending
    card.appendChild(cardTitle);
    listEle.appendChild(card);
    this.cardList.appendChild(listEle);
  }

  // TODO: show all todos

  showAllTodos() {
    let allTodos = todoList.readItems();
    allTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  // TODO: show today todos
  // TODO: show this week todos
  // TODO: create project
}

const ui = new UI();

export default todoList;
