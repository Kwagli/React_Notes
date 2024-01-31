import { useParams } from "react-router-dom";

import "./Note.css";
import { useEffect, useState } from "react";
import Loader from "./Loader/Loader";

function Note({ onSaveSuccess }) {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  async function fetchNote() {
    const response = await fetch(`http://localhost:4000/notes/${id}`);
    const data = await response.json();
    setNote(data);
  }

  async function saveNote() {
    await fetch(`http://localhost:4000/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    });
    setIsSaved(true);
    onSaveSuccess();
  }

  useEffect(() => {
    fetchNote();
  }, [id]);

  if (!note) {
    return <Loader/>;
  }

  return (
    <form
      className="Form"
      onSubmit={(event) => {
        event.preventDefault();
        saveNote();
      }}
    >
      <input
        className="Note-editable Note-title"
        type="text"
        value={note.title}
        onChange={(event) => {
          setNote({ ...note, title: event.target.value });
        }}
      />
      <textarea
        className="Note-editable Note-content"
        value={note.content}
        onChange={(event) => {
          setIsSaved(false);
          setNote({ ...note, content: event.target.value });
        }}
      />
      <div className="Note-actions">
        <button className="Button">Enregistrer</button>
        {isSaved && <div>Enregistré</div>}
      </div>
    </form>
  );
}

export default Note;
