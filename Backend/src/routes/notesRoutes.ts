import { Router } from "express";

import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/notesController";
import validateRequest from "../middlewares/validateRequest";
import { createNoteSchema, updateNoteSchema } from "../validations/noteValidation";

const router = Router();

//get all notes
router.get("/", getNotes);

router.get("/:id", getNote);

router.post("/", validateRequest(createNoteSchema) , createNote);

router.patch("/:id", validateRequest(updateNoteSchema) ,updateNote);

router.delete("/:id", deleteNote);

export default router;
