class UI {
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

  // Initializes the page
  init() {
    this.addEventListeners();
    this.addProjectCardEventListeners();
    this.addTodoCardEventListeners();
    this.showAllTodos();
    this.showAllProjects();
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
          this.populateAllTodoProjectDropdown();
        }

        // Clear the input field
        form.reset(); // Reset the current form
      });
    });

    // -- ALL FORM DELETE BUTTONS --
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

  addProjectCardEventListeners() {
    this.projectsContainer.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains("project-card")) {
        const projectCard = target.closest(".project-card");
        this.showProjectTodos(projectCard.textContent);
      }
    });
  }

  addTodoCardEventListeners() {
    // Called on page load by init()
    // Attach event listener to the parent container (delegation)
    this.cardList.addEventListener("click", (event) => {
      const target = event.target;

      // Handle checkbox click
      if (target.classList.contains("todo-card-checkbox")) {
        const todoCard = target.closest(".todo-card");
        const title = todoCard.querySelector(".todo-card-title").textContent;
        const todoItem = this.todoList.readItem(title);

        if (todoItem) {
          this.todoList.updateComplete(title, target.value);
        }
      }

      // Handle date name click
      if (target.classList.contains("todo-card-date")) {
        const todoCard = target.closest(".todo-card");
        const dateInput = todoCard.querySelector(".todo-card-date-input");
        this.togglePopup(target);
        this.toggleButton(dateInput, true);
      }

      // Handle project name click
      if (target.classList.contains("todo-card-project")) {
        const todoCard = target.closest(".todo-card");
        const dropdown = todoCard.querySelector(".todo-card-project-select");
        this.togglePopup(target);
        this.toggleButton(dropdown, true);
      }

      // Handle delete button click
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
          todoItem.dueDate = dateObj; // Dates stored within todo objects as Date Objects not strings

          // Toggle verification
          if (dateString.length == 10) {
            // Check for valid date format
            this.toggleButton(target);
            this.updateTextContent(".todo-card-date", "dueDate", todoCard);
            this.togglePopup(dateName, true);

            this.todoList.updateDueDate(title, target.value);
          }
        }
      }
    });

    // Handle project dropdown change event
    this.cardList.addEventListener("change", (event) => {
      const target = event.target;
      if (target.classList.contains("todo-card-project-select")) {
        const todoCard = target.closest(".todo-card");
        const title = todoCard.querySelector(".todo-card-title").textContent;
        const todoItem = this.todoList.readItem(title);
        const project = todoCard.querySelector(".todo-card-project");

        if (todoItem && target.value != "") {
          // Avoid default empty value
          todoItem.project = target.value;
          this.toggleButton(target); // Toggles the dropdown
          this.updateTextContent(".todo-card-project", "project", todoCard);
          this.togglePopup(project, true); // Shows the selected project

          this.todoList.updateProject(title, target.value); // updates TodoItem obj
        }
      }
    });
  }

  // -- FORM HANDLING --

  // Function to handle Todo submission
  handleTodoSubmission(value) {
    this.todoList.addItem(value);
    console.log("Todo added:", value);
    const todoItem = todoList.readItem(value);
    this.createTodoCard(todoItem); // Adds the newly created to without re-rendering entire array
    this.togglePopup(this.taskPopup);
    this.toggleButton(this.addTaskBtn, true);
  }

  // Function to handle Project submission
  handleProjectSubmission(value) {
    this.todoList.projectManager.createProject(value);
    console.log("Project added:", value);
    this.showAllProjects();

    this.togglePopup(this.projectPopup);
    this.toggleButton(this.createProjectButton, true);
  }

  // -- SHOW/HIDING POPUPS --

  togglePopup(popup, show) {
    // Arg: show true or false
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

    this.projectsContainer.appendChild(card);
  }

  // -- CREATING TODO CARDS --

  createTodoCard(todoItem) {
    // The card
    const card = document.createElement("div");
    card.className = "todo-card";

    // The checkbox
    const checkbox = document.createElement("input");
    checkbox.className = "todo-card-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todoItem.complete; // Checkbox will load checked if true

    // The title
    const cardTitle = document.createElement("p");
    cardTitle.className = "todo-card-title";
    cardTitle.textContent = todoItem.title;

    // The project name
    const cardProject = document.createElement("p");
    cardProject.className = "todo-card-project todo-card-input";
    if (todoItem.project != null) {
      cardProject.textContent = todoItem.project;
    } else {
      cardProject.textContent = "Project...";
    }

    // The projects dropdown
    const projectDropdown = document.createElement("select");
    projectDropdown.className = "todo-card-project-select";

    // The date
    const date = document.createElement("p");
    date.className = "todo-card-date todo-card-input";
    if (todoItem.dueDate) {
      date.textContent = this.formatDate(todoItem.dueDate);
    } else {
      date.textContent = "Date...";
    }

    // The date input
    const dateInput = document.createElement("input");
    dateInput.className = "todo-card-date-input";
    dateInput.type = "date";
    dateInput.value = todoItem.dueDate;

    // Delete card button
    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.className = "todo-card-delete-button todo-card-input";

    //  List element - todoCards are appended to a list
    const listEle = document.createElement("li");

    // Appending
    card.appendChild(checkbox);
    card.appendChild(cardTitle);
    card.appendChild(cardProject);
    card.appendChild(projectDropdown);
    card.appendChild(date);
    card.appendChild(dateInput);
    card.appendChild(deleteTodoButton);
    listEle.appendChild(card);
    this.cardList.appendChild(listEle);

    // Sets default value after select has been rendered
    this.populateTodoProjectDropdown(card);
    if (todoItem.project) {
      projectDropdown.value = todoItem.project;
    }
  }

  // -- SHOWING/HIDING TODOS --

  showAllTodos() {
    this.clearAllTodos();
    let allTodos = this.todoList.readItems();
    allTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  showTodayTodos() {
    this.clearAllTodos();
    let todayTodos = this.todoList.sortByToday();
    todayTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  // -- UPDATING TODO CARD TEXT CONTENT --

  updateTextContent(elementSelector, property, todoCard) {
    // Arg Example: (".todo-card-date", "dueDate", todoCard)
    const element = todoCard.querySelector(elementSelector);
    const title = todoCard.querySelector(".todo-card-title").textContent;
    const todoItem = this.todoList.readItem(title);

    // Checks if date --> date needs formating before being displayed
    if (property === "dueDate" && todoItem[property]) {
      // If it's a date, format it before updating
      element.textContent = this.formatDate(todoItem[property]);
    } else {
      // If it's not a date, update the text content normally
      element.textContent = todoItem[property];
    }
  }

  // -- FORMATTING DATE FOR DISPLAYING --

  formatDate(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  // -- POPULATING TODO DROPDOWN --

  populateTodoProjectDropdown(todoCard) {
    // Arg: HTML element card NOT the todoItem object
    const projectDropdown = todoCard.querySelector(".todo-card-project-select");
    const allProjects = this.todoList.projectManager.readProjects();
    projectDropdown.innerHTML = ""; // Clears existing to prevent duplicates

    // Placeholder dropdown element
    const emptyOption = document.createElement("option");
    emptyOption.value = ""; // Empty value
    emptyOption.textContent = "-- Please select a project --";
    projectDropdown.appendChild(emptyOption);

    // Populates dropdown with existing projects
    allProjects.forEach((project) => {
      const newOption = document.createElement("option");
      newOption.textContent = project;
      newOption.value = project;

      projectDropdown.appendChild(newOption);
    });

    // Selects the default project based on the todoItem.project
    // projectDropdown.value = todoItem.project;
  }

  populateAllTodoProjectDropdown() {
    const todoCards = document.querySelectorAll(".todo-card");
    todoCards.forEach((card) => this.populateTodoProjectDropdown(card));
  }

  showWeekTodos() {
    let weekTodos = this.todoList.sortByWeek();
    weekTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }

  clearAllTodos() {
    this.cardList.innerHTML = "";
  }

  // -- SHOWING/HIDING PROJECTS --

  showAllProjects() {
    this.clearAllProjects();
    let allProjects = this.todoList.projectManager.readProjects();
    allProjects.forEach((project) => this.createProjectCard(project));
  }

  clearAllProjects() {
    this.projectsContainer.innerHTML = "";
  }

  showProjectTodos(projectName) {
    this.clearAllTodos();
    let projectTodos = this.todoList.sortByProject(projectName);
    projectTodos.forEach((todoItem) => this.createTodoCard(todoItem));
  }
}

export default UI;
