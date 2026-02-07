import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNote, useUpdateNote } from "../hooks/useNote";
import { useForm } from "../hooks/useForm";
import { toast } from "sonner";

const EditNote = () => {
  const { id } = useParams();
  const { data: note, isLoading, error } = useNote(id);
  const updateMutation = useUpdateNote(id);
  const navigate = useNavigate()


  const { formValues, handleChange, setFormValues } = useForm({
    title: "",
    content: "",
  });

  
  useEffect(() => {
    if (note) {
      setFormValues({ title: note.title, content: note.content });
    }
  }, [note, setFormValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.title.trim() || !formValues.content.trim()) return;
    updateMutation.mutate(formValues , {
       onSuccess:() => {
          toast.success("Note updated successfully")
           navigate("/")
       }
    });
  };

  if (isLoading)
    return (
      <div className="flex w-full min-h-[70vh] items-center justify-center mt-20">
        <div className="text-gray-500 text-lg animate-pulse">Loading note...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex w-full min-h-[70vh] items-center justify-center mt-20">
        <div className="text-red-500 text-lg font-medium">Note not found</div>
      </div>
    );

  return (
    <div className="w-[100vw] bg-gray-50 min-h-[90vh] pt-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Note</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Note title"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Content</label>
            <textarea
              name="content"
              value={formValues.content}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40"
              placeholder="Write your note here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {updateMutation.isPending ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
