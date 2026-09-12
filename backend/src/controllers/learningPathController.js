import LearningPath from "../models/LearningPath.js";

// ================= GET ALL =================

export const getLearningPaths = async (req, res) => {
  try {
    const learningPaths = await LearningPath.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: learningPaths.length,
      data: learningPaths,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch learning paths",
      error: error.message,
    });
  }
};

// ================= GET ONE =================

export const getLearningPathById = async (req, res) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found",
      });
    }

    res.status(200).json({
      success: true,
      data: learningPath,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch learning path",
      error: error.message,
    });
  }
};

// ================= CREATE =================

export const createLearningPath = async (req, res) => {
  try {
    const {
      title,
      level,
      description,
      skills,
      coursesCount,
      order,
      isPublished,
    } = req.body;

    const imageUrl = req.file?.path || "";

    if (!title || !level || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, level, and description are required",
      });
    }

    const learningPath = await LearningPath.create({
      title,
      level,
      description,
      skills: Array.isArray(skills) ? skills : [],
      coursesCount: coursesCount || 0,
      imageUrl,
      order: order || 0,
      isPublished:
        isPublished === undefined ? true : isPublished,
    });

    res.status(201).json({
      success: true,
      message: "Learning path created successfully",
      data: learningPath,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create learning path",
      error: error.message,
    });
  }
};

// ================= UPDATE =================

export const updateLearningPath = async (req, res) => {
  try {
    const learningPath = await LearningPath.findById(
      req.params.id
    );

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file?.path) {
      updateData.imageUrl = req.file.path;
    }

    if (typeof updateData.skills === "string") {
      try {
        updateData.skills = JSON.parse(updateData.skills);
      } catch {
        updateData.skills = updateData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
      }
    }

    const updatedLearningPath =
      await LearningPath.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Learning path updated successfully",
      data: updatedLearningPath,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update learning path",
      error: error.message,
    });
  }
};

// ================= DELETE =================

export const deleteLearningPath = async (req, res) => {
  try {
    const learningPath =
      await LearningPath.findByIdAndDelete(req.params.id);

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Learning path deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete learning path",
      error: error.message,
    });
  }
};