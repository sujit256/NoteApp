import { useParams, useNavigate } from "react-router-dom";
import { useDeleteNote, useNote } from "../hooks/useNote";
import { toast } from "sonner";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch single note
  const { data: note, isLoading, error } = useNote(id);
  console.log(note)

  // Delete mutation
  const deleteMutation = useDeleteNote();

  // Handle note deletion
  const handleDelete = () => {
    if (!id) return;

    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Note deleted successfully");
        navigate("/");
      },
      onError: () => {
        toast.error("Failed to delete note. Please try again.");
      },
    });
  };

  // Handle edit navigation
  const handleEdit = () => {
    if (id) navigate(`/edit/${id}`);
  };

  // Loading state
  if (isLoading)
    return (
      <div className="flex w-full min-h-[70vh] items-center justify-center mt-20">
        <div className="text-gray-500 text-lg animate-pulse">Loading note...</div>
      </div>
    );

  // Error or note not found
  if (error || !note)
    return (
      <div className="flex w-full min-h-[70vh] items-center justify-center mt-20">
        <div className="text-red-500 text-lg font-medium">Note not found</div>
      </div>
    );

  return (
    <div className="w-full bg-gray-50 min-h-[90vh] pt-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        {/* Note Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{note.title}</h1>

        {/* Note Content */}
        <div className="text-gray-600 whitespace-pre-wrap mb-8 border-t border-b border-gray-200 py-4">
          {note.content}
        </div>

   
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 gap-2 sm:gap-0">
          <div>
            Created: {new Date(note.createdAt).toLocaleString()}
            {note.updatedAt !== note.createdAt && (
              <> | Updated: {new Date(note.updatedAt).toLocaleString()}</>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              disabled={deleteMutation.isLoading}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
