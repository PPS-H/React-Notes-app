import React, { useContext, useEffect, useRef, useState } from "react";
import notesContext from "../context/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const { notes, getAllNotes, updateNote } = useContext(notesContext);
  const [enote, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
  }, []);
  const modalBtn = useRef(null);
  const modalCloseBtn = useRef(null);

  const handleOnChnage = (e) => {
    setNote({ ...enote, [e.target.name]: e.target.value });
  };
  const handleNoteEdit = (currentNote) => {
    modalBtn.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tags,
    });
  };
  const handleNoteUpdate = () => {
    updateNote(enote.id, enote.etitle, enote.edescription, enote.etag);
    modalCloseBtn.current.click();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={modalBtn}
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={enote.etitle}
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
                    id="edescription"
                    name="edescription"
                    rows={5}
                    value={enote.edescription}
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
                    id="etag"
                    name="etag"
                    value={enote.etag}
                    onChange={handleOnChnage}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={modalCloseBtn}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNoteUpdate}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2 className="my-3">Your notes</h2>
        <div className="container">
          {notes.length === 0 && "You have no notes saved previously"}
        </div>
        {notes.map((element) => {
          return (
            <NoteItem
              key={element._id}
              note={element}
              handleNoteEdit={handleNoteEdit}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
