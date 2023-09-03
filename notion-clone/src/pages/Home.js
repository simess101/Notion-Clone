import React, { useState } from 'react';
import './Home.css'; // Import your custom CSS for styling

import Header from './Header';
import NoteList from './NoteList';
import Footer from './Footer';

function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim() === '') return;
    setNotes([...notes, newNote]);
    setNewNote('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (form submission)
      addNote();
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="home">
      <Header />
      <div className="note-input">
        <input
          type="text"
          placeholder="Enter a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addNote} className="add-button">
          Add
        </button>
      </div>
      <NoteList notes={notes} onDelete={deleteNote} />
      <Footer />
    </div>
  );
}

export default Home;
