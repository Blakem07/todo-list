import todoList from "./Project";

class UI {
  constructor() {
    this.addTaskBtn = document.querySelector("#add-todo-button");
    this.taskPopup = document.querySelector(".task-popup");
    this.todoForm = document.querySelector(".todo-form");
    this.formDeleteBtn = document.querySelector(".delete-button.form-button");
    this.cardList = document.querySelector("#card-list");
    this.cardCheckboxes = document.querySelectorAll(".todo-card-checkbox");
    this.allButton = document.querySelector("#all-button");

    this.init();
  }

  // Initializes the page
  init() {
    this.addEventListeners();
  }

  addEventListeners() {
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
      this.clearAllTodos();
      this.showAllTodos();
    });

    // Todo card checkbox functionality
    this.addCheckboxEventListeners();
  }

  // NOT INCLUDED IN THE ABOVE AS IT NEEDS TO BE RE-RAN
  addCheckboxEventListeners() {
    const cardCheckboxes = document.querySelectorAll(".todo-card-checkbox");

    cardCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (event) => {
        const todoCard = checkbox.closest(".todo-card");
        const title = todoCard.querySelector(".todo-card-title").textContent;
        const todoItem = todoList.readItem(title);

        if (todoItem) {
          todoItem.complete = checkbox.checked; // Update the complete status based on checkbox
          console.log(
            `Updated todo: ${todoItem.title}, Completed: ${todoItem.complete}`
          );
        }
      });
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

    // The checkbox
    const checkbox = document.createElement("input");
    checkbox.className = "todo-card-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todoItem.complete; // Checkbox will load checked if true

    //  List element
    const listEle = document.createElement("li");

    // Appending
    card.appendChild(cardTitle);
    card.appendChild(checkbox);
    listEle.appendChild(card);
    this.cardList.appendChild(listEle);

    // Event listeners
    this.addCheckboxEventListeners();
  }

  showAllTodos() {
    let allTodos = todoList.readItems();
    allTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  clearAllTodos() {
    this.cardList.innerHTML = "";
  }

  // TODO: show today todos
  // TODO: show this week todos
  // TODO: create project
}

const ui = new UI();

export default todoList;
