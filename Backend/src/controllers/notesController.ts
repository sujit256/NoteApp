import { Request, Response } from "express";
import Note from "../models/Note";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import ApiResponse from "../utils/apiResponse";

// Get all notes with search and pagination
export const getNotes = catchAsync(async (req: Request, res: Response) => {
  const filter: any = {};

  // Search by title if query param exists
  if (req.query.title) {
    filter.title = { $regex: req.query.title, $options: "i" }; // case-insensitive search
  }

  // Pagination params
  const page = parseInt(req.query.page as string) || 1; // default page = 1
  const limit = parseInt(req.query.limit as string) || 10; // default limit = 10
  const skip = (page - 1) * limit;

  // Sorting
  const sortBy = (req.query.sort as string) || "-createdAt";

  // Fetch notes with pagination and filter
  const notes = await Note.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  // Total number of matching notes (for pagination)
  const total = await Note.countDocuments(filter);

  // If no notes found
  if (notes.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, {
        notes: [],
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }, "No notes found")
    );
  }

  // Response
  res.status(200).json(
    new ApiResponse(200, {
      notes,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }, "Notes fetched successfully")
  );
});

// Get single note
export const getNote = catchAsync(async (req: Request, res: Response) => {
  const note = await Note.findById(req.params.id);
  if (!note) throw new AppError("Note not found", 404);

  res.status(200).json(new ApiResponse(200, note, "Note fetched successfully"));
});

// Create note
export const createNote = catchAsync(async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const newNote = await Note.create({ title, content });

  res.status(201).json(new ApiResponse(201, newNote, "Note created successfully"));
});

// Update note
export const updateNote = catchAsync(async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title && !content) throw new AppError("At least title or content is required", 400);

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true, runValidators: true }
  );

  if (!updatedNote) throw new AppError("Note not found", 404);

  res.status(200).json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

// Delete note
export const deleteNote = catchAsync(async (req: Request, res: Response) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  if (!deletedNote) throw new AppError("Note not found", 404);

  res.status(204).json(new ApiResponse(204, null, "Note deleted successfully"));
});
