import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import type { INote } from "../types/types";

interface UseNotesParams {
  page: number;
  limit: number;
  title?: string;
}

// Get all notes
export const useNotes = ({ page, limit, title }: UseNotesParams) => {
  return useQuery({
    queryKey: ["notes", page, title],
    queryFn: async () => {
      const res = await api.get("/", {
        params: { page, limit, title },
      });

      // Always return data, even if empty
      return res.data.data || {
        notes: [],
        total: 0,
        page,
        limit,
      };
    },
    keepPreviousData: true,
  });
};

// ✅ Fetch single note
export const useNote = (id?: string) => {
  return useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      if (!id) throw new Error("Note ID is required");

      const res = await api.get(`/${id}`);
      const note = res?.data?.note;

      // Throw error if note not found
      if (!note) throw new Error("Note not found");

      return note as INote;
    },
    enabled: !!id,
  });
};

// Create note
export const useCreateNote = () => {
  return useMutation({
    mutationFn: async (newNote: { title: string; content: string }) => {
      const res = await api.post("/", newNote);
      return res?.data;
    },
  });
};

// Update note
export const useUpdateNote = (id?: string) => {
  return useMutation({
    mutationFn: async (updatedNote: { title: string; content: string }) => {
      const res = await api.patch(`/${id}`, updatedNote);
      const note = res?.data?.note;
      if (!note) throw new Error("Failed to update note");
      return note as INote;
    },
  });
};

//Delete note
export const useDeleteNote = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/${id}`);
    },
  });
};
