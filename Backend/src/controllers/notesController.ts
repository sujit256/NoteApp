import { Request, Response } from "express";
import Note, { INote } from "../models/Note";

//Get All Notes
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes: INote[] = await Note.find();
    console.log(notes)

    if(notes.length === 0 ){
         res.status(404).json({ message: "note is empty" });
    }

    res.status(200).json({
      success: true,
      data: {
        notes,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//create note
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const newNote = await Note.create({ title, content });

    res.status(201).json({
      success: true,
      newNote,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//update note

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    // Check if at least one field is provided
    if (!title && !content) {
      return res.status(400).json({
        message: "Both title and content are required",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true } 
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      success: true,
      note: updatedNote, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// delete note

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deleteNote) {
      res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(204).json({
      message: "Note deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
