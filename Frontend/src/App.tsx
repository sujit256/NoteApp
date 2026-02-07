import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import NoteDetail from "./pages/NoteDetail";
import EditNote from "./pages/EditNote";


function App() {
  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
     
      <Navbar />

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
