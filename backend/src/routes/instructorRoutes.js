import express from "express";

import {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from "../controllers/instructorController.js";

import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";
import ownerOnly from "../middleware/ownerMiddleware.js";

const router = express.Router();

// Public
router.get("/", getInstructors);
router.get("/:id", getInstructorById);

// Owner only
router.post(
  "/",
  protect,
  ownerOnly,
  upload.single("image"),
  createInstructor
);

router.put(
  "/:id",
  protect,
  ownerOnly,
  upload.single("image"),
  updateInstructor
);

router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteInstructor
);

export default router;