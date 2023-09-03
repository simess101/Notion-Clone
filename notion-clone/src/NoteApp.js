import React, { useState } from 'react';
import './NoteApp.css'; // Import the CSS file

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
            <input
              type="checkbox"
              checked={note.completed}
              onChange={() => toggleCompleted(index)}
              className="checkbox"
            />
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteApp;
