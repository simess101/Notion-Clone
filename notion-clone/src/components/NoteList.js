import React from 'react';
import Note from './Note';

function NoteList({ notes, onDelete }) {
  return (
    <div className="note-list">
      {notes.map((note, index) => (
        <Note key={index} text={note} onDelete={() => onDelete(index)} />
      ))}
    </div>
  );
}

export default NoteList;
