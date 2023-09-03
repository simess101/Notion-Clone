// NoteList.js
import React from 'react';
import './NoteList.css'; // Import the CSS file

function NoteList({ notes, onDelete }) {
  return (
    <div className="note-list">
      {notes.map((note, index) => (
        <div key={index} className="note">
          <span>{note}</span>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;