class Project {
  constructor() {
    this.myProjects = [];
  }

  createProject(name) {
    // Makes a new project and stores it in the myProjects property array
    const newProject = name;
    this.myProjects.push(newProject);
  }

  readProjects() {
    // Reads the myProjects property which is an array
    return this.myProjects;
  }

  readProject(name) {
    // Returns an individual project based on the name passed as an argument
    for (let project in this.myProjects) {
      if (this.myProjects[project] == name) {
        return this.myProjects[project];
      }
    }
    throw new Error("Project not found");
  }

  deleteProject(name) {
    const projectToDelete = this.readProject(name);
    const index = this.myProjects.indexOf(projectToDelete);

    this.myProjects.splice(index, 1);
  }
}

export default Project;
