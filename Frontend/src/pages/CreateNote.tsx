import { toast } from "sonner";
import { useForm } from "../hooks/useForm";
import { useCreateNote } from "../hooks/useNote";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const { formValues, handleChange } = useForm({ title: "", content: "" });
  const createMutation = useCreateNote();
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.title.trim() || !formValues.content.trim()) return;
    createMutation.mutate(formValues , {
       onSuccess: () => {
         toast.success("Note created successfully")
         navigate("/")
       }
    });
  };

  return (
    <div className="w-[100vw] mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Note</h1>

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
          disabled={createMutation.isPending}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {createMutation.isPending ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
