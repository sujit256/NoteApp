import {z} from "zod";

// validation for creating note

export const createNoteSchema = z.object({
     body:z.object({
         title:z.string().min(1 , "Title is required"),
         content:z.string().min(1 , "content is required")  
     })
})

// Validation for updating a note
export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});