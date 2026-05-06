import express from "express";

import { addSchool, listSchools } from "../controllers/schoolController.js";

const router = express.Router();

// Add School Route
router.post("/addSchool", addSchool);

// List Schools Route
router.get("/listSchools", listSchools);

export default router;
