import { useEffect, useState } from "react";
import CardNote from "../components/CardNote";
import axios from "axios";
import formatData from "../utils/formatDate";
import { toast } from "react-toastify";

const apiURL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/notes`);
        setNotes(response.data.notes || response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
        toast.error("Error cargando las notas");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const confirmDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`${apiURL}/api/notes/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));

      toast.success("Nota eliminada con éxito", {
        position: "bottom-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la nota");
    } finally {
      setDeletingId(null);
      setNoteToDelete(null);
    }
  };

  if (loading) return <span>Cargando..</span>;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))]">
      {notes.map((note) => (
        <CardNote
          key={note._id}
          title={note.title}
          description={note.description}
          id={note._id}
          date={formatData(note.createdAt)}
          deletingId={deletingId}
          onDelete={(id) => setNoteToDelete(id)}
        />
      ))}
      {noteToDelete && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Eliminar nota</h3>
            <p className="py-4">¿Estás seguro que deseas eliminar esta nota?</p>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setNoteToDelete(null)}
              >
                Cancelar
              </button>

              <button
                className="btn btn-error"
                onClick={() => confirmDelete(noteToDelete)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
