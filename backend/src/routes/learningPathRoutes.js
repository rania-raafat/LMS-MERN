import express from "express";

import {
  getLearningPaths,
  getLearningPathById,
  createLearningPath,
  updateLearningPath,
  deleteLearningPath,
} from "../controllers/learningPathController.js";

import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";
import ownerOnly from "../middleware/ownerMiddleware.js";

const router = express.Router();

// Public
router.get("/", getLearningPaths);
router.get("/:id", getLearningPathById);

// Owner only
router.post(
  "/",
  protect,
  ownerOnly,
  upload.single("image"),
  createLearningPath
);

router.put(
  "/:id",
  protect,
  ownerOnly,
  upload.single("image"),
  updateLearningPath
);

router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteLearningPath
);

export default router;