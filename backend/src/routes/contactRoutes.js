import express from "express";

import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", createContact);

router.get("/contacts", getContacts);

export default router;