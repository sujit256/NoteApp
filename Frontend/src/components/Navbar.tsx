import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full shadow-sm">
     
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
         
          <span className="text-xl font-bold tracking-tight text-gray-900">NoteApp</span>
        </Link>
        <Link
          to="/create"
        >
             <button className='text-gray-100'>

          + New Note
             </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;