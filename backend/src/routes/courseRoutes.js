import express from "express";

import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";
import ownerOnly from "../middleware/ownerMiddleware.js";

const router = express.Router();

// Public
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Owner only
router.post(
  "/",
  protect,
  ownerOnly,
  upload.single("image"),
  createCourse
);

router.put(
  "/:id",
  protect,
  ownerOnly,
  upload.single("image"),
  updateCourse
);

router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteCourse
);

export default router;