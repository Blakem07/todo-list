/**
 * A class for managing a list of projects.
 * Provides methods to create, read, and delete projects from an internal array.
 *
 * @class Project
 */
class Project {
  /**
   * Creates an instance of the Project class.
   * Initializes an empty array for storing projects.
   *
   * @constructor
   */
  constructor() {
    /**
     * @type {Array<string>}
     * @private
     */
    this.myProjects = [];
  }

  /**
   * Creates a new project and stores it in the `myProjects` array.
   *
   * @param {string} name - The name of the project to create.
   * @returns {void}
   * @throws {Error} If the project name is empty or invalid.
   */
  createProject(name) {
    if (!name || typeof name !== "string") {
      throw new Error("Invalid project name");
    }

    const newProject = name;
    this.myProjects.push(newProject);
  }

  /**
   * Retrieves the list of all projects stored in the `myProjects` array.
   *
   * @returns {Array<string>} The list of project names.
   */
  readProjects() {
    return this.myProjects;
  }

  /**
   * Retrieves an individual project by its name.
   * If the project is not found, an error is thrown.
   *
   * @param {string} name - The name of the project to retrieve.
   * @returns {string} The name of the project.
   * @throws {Error} If the project with the given name does not exist.
   */
  readProject(name) {
    for (let project of this.myProjects) {
      if (project === name) {
        return project;
      }
    }
    throw new Error("Project not found");
  }

  /**
   * Deletes a project by its name from the `myProjects` array.
   * If the project is not found, an error is thrown.
   *
   * @param {string} name - The name of the project to delete.
   * @returns {void}
   * @throws {Error} If the project to delete does not exist.
   */
  deleteProject(name) {
    const projectToDelete = this.readProject(name);
    const index = this.myProjects.indexOf(projectToDelete);

    if (index !== -1) {
      this.myProjects.splice(index, 1);
    } else {
      throw new Error("Project not found");
    }
  }
}

export default Project;
