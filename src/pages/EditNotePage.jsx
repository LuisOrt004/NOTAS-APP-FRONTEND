import { NoteForm } from "../components/NoteForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditNotePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notes/${id}`
        );

        setNote(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  console.log(note);

  const handleEdit = async (note) => {
    try {
      await axios
        .put(`${import.meta.env.VITE_API_URL}/api/notes/${id}`,note)
        .then((res) => {
          console.log(res.status);
          if (res.status !== 200) {
            throw new Error(`Error al actualizar la nota con el id ${id}`);
          }

          toast.success("!Nota actualizada con éxito", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
          navigate("/");
        });
    } catch (error) {
      console.error(error);
    }
  };

  
  if (loading) return <p>Cargando nota...</p>;
  if (!note) return <p>No se encontró la nota</p>;

  return (
    <div>
      <NoteForm
        onSubmit={handleEdit}
        initialDate={{
          title: note.title,
          description: note.description,
        }}
      ></NoteForm>
    </div>
  )
}

export default EditNotePage