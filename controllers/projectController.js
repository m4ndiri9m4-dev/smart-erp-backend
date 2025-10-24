// controllers/projectController.js

export const createProject = async (req, res) => {
  try {
    // Your logic to create a project
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    // Your logic to fetch projects
    const projects = []; // replace with DB call
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
