import express from "express";

import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";

import protect from "../middleware/authMiddleware.js";
import ownerOnly from "../middleware/ownerMiddleware.js";

const router = express.Router();

// Public
router.post("/", createContact);

// Owner only
router.get(
  "/",
  protect,
  ownerOnly,
  getContacts
);

export default router;