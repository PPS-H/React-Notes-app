import React, { useState, useContext } from "react";
import notesContext from "../context/noteContext";

const AddNote = () => {
  const { addNote } = useContext(notesContext);
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [tag, setTag] = useState("");
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag).then(() => {
      setNote({ title: "", description: "", tag: "" });
    });
  };

  const handleOnChnage = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <form>
      <h2 className="my-5">Add a note</h2>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={note.title}
          onChange={handleOnChnage}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows={5}
          value={note.description}
          onChange={handleOnChnage}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          value={note.tag}
          onChange={handleOnChnage}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleAddNote}>
        Add a note
      </button>
    </form>
  );
};

export default AddNote;
