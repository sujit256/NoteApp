import mongoose, { Schema, Document } from "mongoose";
import { timeStamp } from "node:console";

export interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model<INote>("Note", NoteSchema);

export default Note;
