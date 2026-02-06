import { Router } from "express";

import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/notesController";

const router = Router();

//get all notes
router.get("/", getNotes);

router.get("/:id", getNote);

router.post("/", createNote);

router.patch("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
