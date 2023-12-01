import React, { useContext } from "react";
import notesContext from "../context/noteContext";

const NoteItem = (props) => {
  const { note } = props;
  const {deleteNote}=useContext(notesContext)
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="w-75">
              <h5 className="card-title">{note.title}</h5>
            </div>
            <div>
              <i className="fa fa-edit mx-2" onClick={()=>{props.handleNoteEdit(note)}}></i>
              <i className="fa fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
