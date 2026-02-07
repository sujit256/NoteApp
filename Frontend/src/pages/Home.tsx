import { useSearchParams } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../hooks/useNote";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "../components/ui/pagination";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const title = searchParams.get("title") || "";

  const { data, isLoading, error } = useNotes({ page, limit, title });

  if (isLoading)
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        Loading notes...
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-red-500">
        Failed to load notes
      </div>
    );

  const { notes, total, totalPages } = data!;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage), limit: String(limit), title });
  };

  return (
    <section className="px-6 py-8 bg-gray-50 min-h-[90vh]">
      <h1 className="text-3xl font-bold mb-6">Your Notes</h1>

      {notes.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No notes found</div>
      ) : (
        <>
          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    onClick={() => handlePageChange(page - 1)}
                  />
                </PaginationItem>

                {/* Numbered Pages */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === page}
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    onClick={() => handlePageChange(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
