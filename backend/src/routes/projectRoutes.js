import express from "express";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";
import ownerOnly from "../middleware/ownerMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Owner only
router.post(
  "/",
  protect,
  ownerOnly,
  upload.single("image"),
  createProject
);

router.put(
  "/:id",
  protect,
  ownerOnly,
  upload.single("image"),
  updateProject
);

router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteProject
);

export default router;