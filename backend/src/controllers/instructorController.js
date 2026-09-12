import Instructor from "../models/Instructor.js";

// ================= GET ALL =================

export const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: instructors.length,
      data: instructors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch instructors",
      error: error.message,
    });
  }
};

// ================= GET ONE =================

export const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch instructor",
      error: error.message,
    });
  }
};

// ================= CREATE =================

export const createInstructor = async (req, res) => {
  try {
    const {
      name,
      specialty,
      role,
      experience,
      linkedin,
      isPublished,
    } = req.body;

    const imageUrl = req.file?.path;

    if (!name || !specialty || !role || !experience) {
      return res.status(400).json({
        success: false,
        message:
          "Name, specialty, role, and experience are required",
      });
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Instructor image is required",
      });
    }

    const instructor = await Instructor.create({
      name,
      specialty,
      role,
      experience,
      linkedin: linkedin || "",
      imageUrl,
      isPublished:
        isPublished === undefined
          ? true
          : isPublished === "true" || isPublished === true,
    });

    res.status(201).json({
      success: true,
      message: "Instructor created successfully",
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create instructor",
      error: error.message,
    });
  }
};

// ================= UPDATE =================

export const updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    // Only replace image if a new one was uploaded
    if (req.file?.path) {
      updateData.imageUrl = req.file.path;
    }

    // Convert multipart/form-data boolean
    if (updateData.isPublished !== undefined) {
      updateData.isPublished =
        updateData.isPublished === "true" ||
        updateData.isPublished === true;
    }

    const updatedInstructor =
      await Instructor.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Instructor updated successfully",
      data: updatedInstructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update instructor",
      error: error.message,
    });
  }
};

// ================= DELETE =================

export const deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(
      req.params.id
    );

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Instructor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete instructor",
      error: error.message,
    });
  }
};