import React, { useEffect, useState } from "react";
import { Plus, X, Trash2, Pencil } from "lucide-react";
import api from "../../services/api";


const Home = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    task: "",
  });

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");

      setNotes(Array.isArray(res.data) ? res.data : res.data.notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Add or Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingNote) {
        // UPDATE
        await api.patch(`/notes/update/${editingNote._id}`, formData);

        setNotes((prev) =>
          prev.map((note) =>
            note._id === editingNote._id
              ? { ...note, ...formData }
              : note
          )
        );
      } else {
        // CREATE
        const res = await api.post("/notes/add", formData);

        const newNote = res.data.note || res.data;

        setNotes((prev) => [newNote, ...prev]);
      }

      // Reset
      setFormData({
        title: "",
        task: "",
      });

      setEditingNote(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // Delete Note
  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/delete/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Open Edit Modal
  const handleEdit = (note) => {
    setEditingNote(note);
    console.log(editingNote);
    
    setFormData({
      title: note.title,
      task: note.task,
    });

    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          My Notes
        </h1>

        {/* Notes */}
        {notes.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No notes found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition relative"
              >
                {/* Actions */}
                <div className="absolute top-4 right-4 flex items-center gap-3">
                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={20} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Note */}
                <h2 className="text-xl font-semibold text-gray-800 mb-3 pr-16">
                  {note.title}
                </h2>

                <p className="text-gray-600 whitespace-pre-wrap">
                  {note.task}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => {
          setEditingNote(null);

          setFormData({
            title: "",
            task: "",
          });

          setShowModal(true);
        }}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition"
      >
        <Plus size={28} />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-xl">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingNote ? "Update Note" : "Add Note"}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Task */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Task
                </label>

                <textarea
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                  placeholder="Write your task..."
                  rows="5"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
              >
                {editingNote ? "Update Note" : "Save Note"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;