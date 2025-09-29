/**
 * UI class manages the display and interaction with the Todo application interface.
 * It handles rendering todos, projects, event listeners, and user interactions.
 */
class UI {
  /**
   * Creates an instance of the UI class.
   * @param {TodoList} todoList - The TodoList instance to manage todos.
   */
  constructor(todoList) {
    this.todoList = todoList;
    this.allButton = document.querySelector("#all-button");
    this.todayButton = document.querySelector("#today-button");
    this.weekButton = document.querySelector("#week-button");
    this.createProjectButton = document.querySelector("#project-button");
    this.projectPopup = document.querySelector(".project-popup");
    this.projectsContainer = document.querySelector(".projects-container");
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

  /**
   * Initializes the UI by setting up event listeners and displaying initial data.
   */
  init() {
    this.addEventListeners();
    this.addProjectCardEventListeners();
    this.addTodoCardEventListeners();
    this.showAllTodos();
    this.showAllProjects();
  }

  /**
   * Adds all necessary event listeners for UI interactions.
   */
  addEventListeners() {
    this.allButton.addEventListener("click", () => {
      this.clearAllTodos();
      this.showAllTodos();
    });

    this.todayButton.addEventListener("click", () => {
      this.clearAllTodos();
      this.showTodayTodos();
    });

    this.weekButton.addEventListener("click", () => {
      this.clearAllTodos();
      this.showWeekTodos();
    });

    this.createProjectButton.addEventListener("click", () => {
      this.toggleButton(this.createProjectButton);
      this.togglePopup(this.projectPopup, true);
    });

    this.addTaskBtn.addEventListener("click", () => {
      this.toggleButton(this.addTaskBtn);
      this.togglePopup(this.taskPopup, true);
    });

    this.textForm.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const formValue = formData.get("task") || formData.get("project");

        if (form.id === "task-form") {
          this.handleTodoSubmission(formValue);
        } else if (form.id === "project-form") {
          this.handleProjectSubmission(formValue);
          this.populateAllTodoProjectDropdown();
        }

        form.reset();
      });
    });

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
  }

  /**
   * Adds event listeners to project card elements.
   */
  addProjectCardEventListeners() {
    this.projectsContainer.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains("project-card")) {
        const projectCard = target.closest(".project-card");
        this.showProjectTodos(projectCard.textContent);
      }
    });
  }

  /**
   * Adds event listeners to todo card elements.
   */
  addTodoCardEventListeners() {
    this.cardList.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains("todo-card-checkbox")) {
        const todoCard = target.closest(".todo-card");
        const title = todoCard.querySelector(".todo-card-title").textContent;
        const todoItem = this.todoList.readItem(title);

        if (todoItem) {
          this.todoList.updateComplete(title, target.value);
        }
      }

      if (target.classList.contains("todo-card-date")) {
        const todoCard = target.closest(".todo-card");
        const dateInput = todoCard.querySelector(".todo-card-date-input");
        this.togglePopup(target);
        this.toggleButton(dateInput, true);
      }

      if (target.classList.contains("todo-card-project")) {
        const todoCard = target.closest(".todo-card");
        const dropdown = todoCard.querySelector(".todo-card-project-select");
        this.togglePopup(target);
        this.toggleButton(dropdown, true);
      }

      if (target.classList.contains("todo-card-delete-button")) {
        const todoCard = target.closest(".todo-card");
        const parent = todoCard.parentElement;
        const title = todoCard.querySelector(".todo-card-title").textContent;
        this.todoList.deleteTodo(title);
        todoCard.remove();
        parent.remove();
      }
    });

    this.cardList.addEventListener("focusout", (event) => {
      const target = event.target;
      if (target.classList.contains("todo-card-date-input")) {
        const todoCard = target.closest(".todo-card");
        const title = todoCard.querySelector(".todo-card-title").textContent;
        const todoItem = this.todoList.readItem(title);
        const dateName = todoCard.querySelector(".todo-card-date");

        if (todoItem) {
          const dateString = target.value;
          const dateObj = new Date(dateString);
          todoItem.dueDate = dateObj;

          if (dateString.length == 10) {
            this.toggleButton(target);
            this.updateTextContent(".todo-card-date", "dueDate", todoCard);
            this.togglePopup(dateName, true);

            this.todoList.updateDueDate(title, target.value);
          }
        }
      }
    });

    this.cardList.addEventListener("change", (event) => {
      const target = event.target;
      if (target.classList.contains("todo-card-project-select")) {
        const todoCard = target.closest(".todo-card");
        const title = todoCard.querySelector(".todo-card-title").textContent;
        const todoItem = this.todoList.readItem(title);
        const project = todoCard.querySelector(".todo-card-project");

        if (todoItem && target.value != "") {
          todoItem.project = target.value;
          this.toggleButton(target);
          this.updateTextContent(".todo-card-project", "project", todoCard);
          this.togglePopup(project, true);

          this.todoList.updateProject(title, target.value);
        }
      }
    });
  }

  /**
   * Handles todo form submission by adding a new todo item to the list.
   * @param {string} value - The value of the submitted todo task.
   */
  handleTodoSubmission(value) {
    this.todoList.addItem(value);
    console.log("Todo added:", value);
    const todoItem = todoList.readItem(value);
    this.createTodoCard(todoItem);
    this.togglePopup(this.taskPopup);
    this.toggleButton(this.addTaskBtn, true);
  }

  /**
   * Handles project form submission by adding a new project to the list.
   * @param {string} value - The value of the submitted project name.
   */
  handleProjectSubmission(value) {
    this.todoList.projectManager.createProject(value);
    console.log("Project added:", value);
    this.showAllProjects();

    this.togglePopup(this.projectPopup);
    this.toggleButton(this.createProjectButton, true);
  }

  /**
   * Toggles the visibility of a popup.
   * @param {HTMLElement} popup - The popup element to toggle.
   * @param {boolean} show - Whether to show (true) or hide (false) the popup.
   */
  togglePopup(popup, show) {
    popup.style.display = show ? "block" : "none";
  }

  /**
   * Toggles the visibility of a button.
   * @param {HTMLElement} button - The button element to toggle.
   * @param {boolean} show - Whether to show (true) or hide (false) the button.
   */
  toggleButton(button, show) {
    button.style.display = show ? "block" : "none";
  }

  /**
   * Creates a project card element and appends it to the projects container.
   * @param {string} project - The project name to display.
   */
  createProjectCard(project) {
    const card = document.createElement("button");
    card.className = "project-card";
    card.textContent = project;

    this.projectsContainer.appendChild(card);
  }

  /**
   * Creates a todo card element and appends it to the todo list.
   * @param {TodoItem} todoItem - The TodoItem object to display.
   */
  createTodoCard(todoItem) {
    const card = document.createElement("div");
    card.className = "todo-card";

    const checkbox = document.createElement("input");
    checkbox.className = "todo-card-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todoItem.complete;

    const cardTitle = document.createElement("p");
    cardTitle.className = "todo-card-title";
    cardTitle.textContent = todoItem.title;

    const cardProject = document.createElement("p");
    cardProject.className = "todo-card-project todo-card-input";
    cardProject.textContent = todoItem.project || "Project...";

    const projectDropdown = document.createElement("select");
    projectDropdown.className = "todo-card-project-select";

    const date = document.createElement("p");
    date.className = "todo-card-date todo-card-input";
    date.textContent = todoItem.dueDate
      ? this.formatDate(todoItem.dueDate)
      : "Date...";

    const dateInput = document.createElement("input");
    dateInput.className = "todo-card-date-input";
    dateInput.type = "date";
    dateInput.value = todoItem.dueDate;

    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.className = "todo-card-delete-button todo-card-input";

    const listEle = document.createElement("li");

    card.appendChild(checkbox);
    card.appendChild(cardTitle);
    card.appendChild(cardProject);
    card.appendChild(projectDropdown);
    card.appendChild(date);
    card.appendChild(dateInput);
    card.appendChild(deleteTodoButton);
    listEle.appendChild(card);
    this.cardList.appendChild(listEle);

    this.populateTodoProjectDropdown(card);
    if (todoItem.project) {
      projectDropdown.value = todoItem.project;
    }
  }

  /**
   * Shows all todo items.
   */
  showAllTodos() {
    this.clearAllTodos();
    let allTodos = this.todoList.readItems();
    allTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  /**
   * Shows todos due today.
   */
  showTodayTodos() {
    this.clearAllTodos();
    let todayTodos = this.todoList.sortByToday();
    todayTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  /**
   * Updates the text content of a specific element within a todo card.
   * @param {string} elementSelector - The CSS selector for the element to update.
   * @param {string} property - The property of the todo item to display (e.g., "dueDate").
   * @param {HTMLElement} todoCard - The todo card element to update.
   */
  updateTextContent(elementSelector, property, todoCard) {
    const element = todoCard.querySelector(elementSelector);
    const title = todoCard.querySelector(".todo-card-title").textContent;
    const todoItem = this.todoList.readItem(title);

    if (property === "dueDate" && todoItem[property]) {
      element.textContent = this.formatDate(todoItem[property]);
    } else {
      element.textContent = todoItem[property];
    }
  }

  /**
   * Formats a date to a string for display.
   * @param {Date} date - The date object to format.
   * @returns {string} The formatted date string.
   */
  formatDate(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  /**
   * Populates a todo card's project dropdown with available projects.
   * @param {HTMLElement} todoCard - The todo card element to populate.
   */
  populateTodoProjectDropdown(todoCard) {
    const projectDropdown = todoCard.querySelector(".todo-card-project-select");
    const allProjects = this.todoList.projectManager.readProjects();
    projectDropdown.innerHTML = "";

    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "-- Please select a project --";
    projectDropdown.appendChild(emptyOption);

    allProjects.forEach((project) => {
      const newOption = document.createElement("option");
      newOption.textContent = project;
      newOption.value = project;

      projectDropdown.appendChild(newOption);
    });
  }

  /**
   * Populates all todo cards' project dropdowns with available projects.
   */
  populateAllTodoProjectDropdown() {
    const todoCards = document.querySelectorAll(".todo-card");
    todoCards.forEach((card) => this.populateTodoProjectDropdown(card));
  }

  /**
   * Shows todos for the current week.
   */
  showWeekTodos() {
    let weekTodos = this.todoList.sortByWeek();
    weekTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  /**
   * Clears all todo cards from the list.
   */
  clearAllTodos() {
    this.cardList.innerHTML = "";
  }

  /**
   * Shows all projects in the UI.
   */
  showAllProjects() {
    this.clearAllProjects();
    let allProjects = this.todoList.projectManager.readProjects();
    allProjects.forEach((project) => this.createProjectCard(project));
  }

  /**
   * Clears all project cards from the list.
   */
  clearAllProjects() {
    this.projectsContainer.innerHTML = "";
  }

  /**
   * Shows todos for a specific project.
   * @param {string} projectName - The name of the project.
   */
  showProjectTodos(projectName) {
    this.clearAllTodos();
    let projectTodos = this.todoList.sortByProject(projectName);
    projectTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }
}

export default UI;
