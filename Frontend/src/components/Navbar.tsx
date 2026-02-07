import { Link, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get("title") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      if (value) {
        prev.set("title", value);
      } else {
        prev.delete("title");
      }
      prev.set("page", "1"); // reset to page 1 on search
      return prev;
    });
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 w-full shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center gap-4">
        {/* App Title */}
        <div className="text-xl font-bold text-gray-900">NoteApp</div>

        {/* Search Input */}
        <Input
          placeholder="Search notes..."
          value={title}
          onChange={handleSearch}
          className="max-w-sm"
        />

         <Link to="/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            + New Note
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


       