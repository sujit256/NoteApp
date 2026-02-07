import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import type { INote } from "../constants/types";

// get all notes
export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await api.get("/");
      return res.data.data.notes as INote[];
    },
  });
};


// Fetch single note
export const useNote = (id?: string) => {
  const result = useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await api.get(`/${id}`);
      return res.data.note as INote;
    },
    enabled: !!id,
  });

  return result;
};


// Create note
export const useCreateNote = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (newNote: { title: string; content: string }) => {
      const res = await api.post("/", newNote);
      return res.data; // usually backend returns the created note
    },
    onSuccess: () => {
      navigate("/"); // Redirect to home after success
    },
  });
};


// Update note
export const useUpdateNote = (id?: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (updatedNote: { title: string; content: string }) => {
      const res = await api.patch(`/${id}`, updatedNote);
      return res.data.note as INote;
    },
    onSuccess: () => navigate("/"),
  });
};

// Delete note
export const useDeleteNote = (id?: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await api.delete(`/${id}`);
    },
    onSuccess: () => navigate("/"),
  });
};
