import React, { useState } from 'react';
import './NoteApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim() === '') return;
    setNotes([...notes, { text: newNote, completed: false }]);
    setNewNote('');
  };

  const toggleCompleted = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].completed = !updatedNotes[index].completed;
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="note-app">
      <h1>Notion Clone</h1>
      <div className="note-input">
        <input
          type="text"
          placeholder="Enter a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addNote();
            }
          }}
        />
        <button onClick={addNote}>Add</button>
      </div>
      <ul className="note-list">
      {notes.map((note, index) => (
  <li key={index} className={`note ${note.completed ? 'completed' : ''}`}>
    <div className="note-content">
      <div className="checkbox" onClick={() => toggleCompleted(index)}>
        {note.completed ? (
          <FontAwesomeIcon icon={faCheckSquare} />
        ) : (
          <FontAwesomeIcon icon={faSquare} />
        )}
      </div>
      <span className="note-text">{note.text}</span>
    </div>
    {note.completed && (
      <div className="delete" onClick={() => deleteNote(index)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    )}
  </li>
))}
      </ul>
    </div>
  );
}

export default NoteApp;
