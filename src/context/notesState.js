import { useContext, useState } from "react";
import NotesContext from "./noteContext";
import alertContext from "./alertContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const { showAlert } = useContext(alertContext);
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    const response = await fetch(host + "/api/notes/getallnotes", {
      method: "GET",
      headers: {
        "auth-token":localStorage.getItem("auth-token")
      },
    });
    let notes = await response.json();
    setNotes(notes);
  };

  const addNote = async (title, description, tag = "General") => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("auth-token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    if (response.ok) {
      showAlert("Note added Succesfully !", "success");
    } else {
      showAlert(json.errors[0].msg, "danger");
    }
    getAllNotes();
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("auth-token")
      },
    });
    const json = await response.json();
    if (response.ok) {
      showAlert("Note deleted Succesfully !", "success");
    } else {
      showAlert("Internal server error occured. Please try again", "danger");
    }
    getAllNotes();
  };
  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("auth-token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    if (response.ok) {
      showAlert("Note updated Succesfully !", "success");
    } else {
      showAlert(json.errors[0].msg, "danger");
    }
    getAllNotes();
  };
  return (
    <NotesContext.Provider
      value={{ notes, setNotes, getAllNotes, addNote, deleteNote, updateNote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};
export default NoteState;
