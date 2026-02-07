import { Link } from "react-router-dom";
import type { INote } from "../types/types";

interface NoteCardProps {
  note: INote;
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Link to={`/notes/${note._id}`}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 flex flex-col justify-between h-60">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
            {note.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-4">
            {note.content} {/* Will automatically truncate after 4 lines */}
          </p>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
