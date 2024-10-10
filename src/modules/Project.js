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
    if (this.myProjects.length == 0) {
      throw new Error("You have not created any projects");
    }

    console.log(this.myProjects);
  }

  readProject(name) {
    // Returns an individual project based on the name passed as an argument
    for (let project in this.myProjects) {
      console.log(project);
      if (this.myProjects[project] == name) {
        return this.myProjects[project];
      }
    }
    throw new Error("Item not found");
  }
}

export default Project;
