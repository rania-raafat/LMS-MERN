import Project from "../models/Project.js";

// ================= GET ALL =================

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

// ================= GET ONE =================

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    });
  }
};

// ================= CREATE =================

export const createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      technologies,
      type,
      order,
      isPublished,
    } = req.body;

    const imageUrl = req.file?.path;

    if (!title || !category || !description || !type) {
      return res.status(400).json({
        success: false,
        message: "Title, category, description, and type are required",
      });
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Project image is required",
      });
    }

    let parsedTechnologies = technologies || [];

    if (typeof technologies === "string") {
      try {
        parsedTechnologies = JSON.parse(technologies);
      } catch {
        parsedTechnologies = technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean);
      }
    }

    const project = await Project.create({
      title,
      category,
      description,
      technologies: parsedTechnologies,
      type,
      imageUrl,
      order: order || 0,
      isPublished:
        isPublished === undefined ? true : isPublished,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// ================= UPDATE =================

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file?.path) {
      updateData.imageUrl = req.file.path;
    }

    if (typeof updateData.technologies === "string") {
      try {
        updateData.technologies = JSON.parse(
          updateData.technologies
        );
      } catch {
        updateData.technologies = updateData.technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean);
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

// ================= DELETE =================

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};