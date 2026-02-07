import NoteCard from "../components/NoteCard";
import { useNotes } from "../hooks/useNote";

const Home = () => {
  const { data: notes, isLoading, error } = useNotes();

  if (isLoading)
    return (
      <div className="flex w-full min-h-[70vh] items-center justify-center">
        <div className="text-gray-400 text-lg animate-pulse">Loading notes...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex w-full min-h-[70vh] items-center justify-center">
        <div className="text-red-500 text-lg font-medium">
          Error loading notes. Please try again.
        </div>
      </div>
    );

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 bg-gray-50 min-h-[90vh]">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900">Your Notes</h1>
        <p className="text-gray-500 mt-1">
          All your thoughts, ideas, and reminders in one place.
        </p>
      </div>

      {/* Empty State */}
      {notes?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
          <p className="text-lg font-medium">No notes found</p>
          <p className="text-sm mt-1">Click “Add Note” to create your first note.</p>
        </div>
      ) : (
        /* Notes Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes?.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
