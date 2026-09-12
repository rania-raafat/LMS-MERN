import express from "express";

import {
  createContact,
  getContacts,
  deleteContact,
} from "../controllers/contactController.js";

import protect from "../middleware/authMiddleware.js";
import ownerOnly from "../middleware/ownerMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  createContact,
);

router.get(
  "/",
  protect,
  ownerOnly,
  getContacts,
);

router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteContact,
);

export default router;