class Project {
  constructor() {
    this.myProjects = [];
  }

  createProject() {
    // Makes a new project and stores it in the myProjects property array
    const newProject = prompt("What would you like to call your new project?:");
    this.myProjects.push(newProject);
  }

  readProjects() {
    // Reads the myProjects property which is an array
    if (this.myProjects.length == 0) {
      throw new Error("You have not created any projects");
    }

    console.log(this.myProjects);
  }
}

export default Project;
