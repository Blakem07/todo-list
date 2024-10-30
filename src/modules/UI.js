import todoList from "./Project";

class UI {
  constructor() {
    this.allButton = document.querySelector("#all-button");
    this.todayButton = document.querySelector("#today-button");
    this.weekButton = document.querySelector("#week-button");
    this.createProjectButton = document.querySelector("#project-button");
    this.projectPopup = document.querySelector(".project-popup");
    this.projectCardList = document.querySelector(".project-todos");
    this.addTaskBtn = document.querySelector("#add-todo-button");
    this.taskPopup = document.querySelector(".task-popup");
    this.textForm = document.querySelectorAll(".text-form");
    this.formDeleteBtns = document.querySelectorAll(
      ".delete-button.form-button"
    );
    this.cardList = document.querySelector("#card-list");
    this.cardCheckboxes = document.querySelectorAll(".todo-card-checkbox");

    this.init();
  }

  // Initializes the page
  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    // -- ALL BTN --
    this.allButton.addEventListener("click", () => {
      this.clearAllTodos();
      this.showAllTodos();
    });

    // -- TODAY BTN --
    this.todayButton.addEventListener("click", () => {
      this.clearAllTodos();
      this.showTodayTodos();
    });

    // -- WEEK BTN --
    this.weekButton.addEventListener("click", () => {
      this.clearAllTodos();
      this.showWeekTodos();
    });

    // -- CREATE PROJECT BTN --
    this.createProjectButton.addEventListener("click", () => {
      this.toggleButton(this.createProjectButton);
      this.togglePopup(this.projectPopup, true);
    });

    // Opens the add task popup
    this.addTaskBtn.addEventListener("click", () => {
      this.toggleButton(this.addTaskBtn);
      this.togglePopup(this.taskPopup, true);
    });

    // -- TEXT INPUT FORM (PROJECTS/TODOS) --
    this.textForm.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh

        const formData = new FormData(form);
        const formValue = formData.get("task") || formData.get("project");

        if (form.id === "task-form") {
          this.handleTodoSubmission(formValue);
        } else if (form.id === "project-form") {
          this.handleProjectSubmission(formValue);
        }

        // Clear the input field
        form.reset(); // Reset the current form
      });
    });

    // -- ALL FORM DElETE BUTTONS --
    this.formDeleteBtns.forEach((button) => {
      button.addEventListener("click", () => {
        const textForm = button.closest(".text-form");
        textForm.reset();
        if (textForm.id == "task-form") {
          this.togglePopup(this.taskPopup);
          this.toggleButton(this.addTaskBtn, true);
        } else {
          this.togglePopup(this.projectPopup);
          this.toggleButton(this.createProjectButton, true);
        }
      });
    });
    // Todo card checkbox functionality
    this.addTodoCardEventListeners();
  }

  addTodoCardEventListeners() {
    // This method adds functionality to all the todo cards
    // Must be called if a new card is created

    // Card Checkboxes

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

    // Date input

    const dateInput = document.querySelectorAll(".todo-card-date");

    dateInput.forEach((date) => {
      date.addEventListener("change", (event) => {
        const todoCard = date.closest(".todo-card");
        const title = todoCard.querySelector(".todo-card-title").textContent;
        const todoItem = todoList.readItem(title);

        if (todoItem) {
          const dateString = date.value;
          const dateObj = new Date(dateString);
          todoItem.dueDate = dateObj; // Dates stored within todo objects as Date Objects not strings
        }
      });
    });
  }

  // -- FORM HANDLING --

  // Function to handle Todo submission
  handleTodoSubmission(value) {
    todoList.addItem(value);
    console.log("Todo added:", value);
    this.showAllTodos();

    this.togglePopup(this.taskPopup);
    this.toggleButton(this.addTaskBtn, true);
  }

  // Function to handle Project submission
  handleProjectSubmission(value) {
    todoList.projectManager.createProject(value);
    console.log("Project added:", value);
    this.showAllProjects();

    this.togglePopup(this.projectPopup);
    this.toggleButton(this.createProjectButton, true);
  }

  // -- SHOW/HIDING POPUPS --

  togglePopup(popup, show) {
    popup.style.display = show ? "block" : "none";
  }

  toggleButton(button, show) {
    button.style.display = show ? "block" : "none";
  }

  // -- CREATING PROJECT CARDS --

  createProjectCard(project) {
    // Project being an item from the my projects array
    // Called by showAllProjects() to display in the left side of the page
    const card = document.createElement("button");
    card.className = "project-card";
    card.textContent = project;

    // Event listner to show the projects
    card.addEventListener("click", () => {
      this.clearAllTodos();
      this.showProjectTodos();
    });

    this.projectCardList.appendChild(card);
  }

  // -- CREATING TODO CARDS --

  createTodoCard(todoItem) {
    // The card
    const card = document.createElement("div");
    card.className = "todo-card";

    // The title
    const cardTitle = document.createElement("p");
    cardTitle.className = "todo-card-title";
    cardTitle.textContent = todoItem.title;

    // The date
    const dateInput = document.createElement("input");
    dateInput.className = "todo-card-date";
    dateInput.type = "date";
    dateInput.value = todoItem.dueDate;

    // The checkbox
    const checkbox = document.createElement("input");
    checkbox.className = "todo-card-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todoItem.complete; // Checkbox will load checked if true

    //  List element
    const listEle = document.createElement("li");

    // Appending
    card.appendChild(cardTitle);
    card.appendChild(dateInput);
    card.appendChild(checkbox);
    listEle.appendChild(card);
    this.cardList.appendChild(listEle);

    // Event listeners
    this.addTodoCardEventListeners();
  }

  // -- SHOWING/HIDING TODOS --

  showAllTodos() {
    this.clearAllTodos();
    let allTodos = todoList.readItems();
    allTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  showTodayTodos() {
    this.clearAllTodos;
    let todayTodos = todoList.sortByToday();
    todayTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  showWeekTodos() {
    let weekTodos = todoList.sortByWeek();
    weekTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  clearAllTodos() {
    this.cardList.innerHTML = "";
  }

  // -- SHOWING/HIDING PROJECTS --

  showAllProjects() {
    this.clearAllProjects();
    let allProjects = todoList.projectManager.readProjects();
    allProjects.forEach((project) => this.createProjectCard(project));
  }

  clearAllProjects() {
    this.projectCardList.innerHTML = "";
  }

  showProjectTodos() {
    this.clearAllTodos();
    let projectTodos = "Code me";
    console.log(projectTodos);
  }
}

const ui = new UI();

export default todoList;
