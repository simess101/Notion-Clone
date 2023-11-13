import React, { useState } from 'react';
import './NoteApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

function NoteApp() {
  const [newNote, setNewNote] = useState('');
  const [tabs, setTabs] = useState(['All']);
  const [selectedTab, setSelectedTab] = useState('All');
  const [newTab, setNewTab] = useState('');
  const [notes, setNotes] = useState([]);
  const [tabColor, setTabColor] = useState({ All: '#3498db' });

  const addNote = () => {
    if (newNote.trim() === '') return;
    setNotes([...notes, { text: newNote, completed: false, tab: selectedTab }]);
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

  const addTab = () => {
    if (newTab.trim() === '') return;
    setTabs([...tabs, newTab]);
    setTabColor((prevTabColor) => ({
      ...prevTabColor,
      [newTab]: '#3498db', // Set default color for the new tab
    }));
    setNewTab('');
  };

  const deleteTab = (tabName) => {
    if (tabName === 'All') return;
    const updatedTabs = tabs.filter((tab) => tab !== tabName);
    setTabs(updatedTabs);
    setTabColor((prevTabColor) => {
      const { [tabName]: deletedColor, ...rest } = prevTabColor;
      return rest;
    });
    if (selectedTab === tabName) {
      setSelectedTab('All');
    }
  };

  const handleTabColorChange = (tabName, color) => {
    setTabColor((prevTabColor) => ({
      ...prevTabColor,
      [tabName]: color,
    }));
  };

  return (
    <div className="note-app">
      <div className="tabs-column">
        <h1>Tabs</h1>
        <ul className="tabs-list">
          {tabs.map((tabName) => (
            <li key={tabName}>
              <div
                className={`tab ${selectedTab === tabName ? 'active' : ''}`}
                onClick={() => setSelectedTab(tabName)}
                style={{ backgroundColor: tabColor[tabName] }}
              >
                {tabName}
                {tabName !== 'All' && (
                  <span
                    className="delete-tab"
                    onClick={() => deleteTab(tabName)}
                  >
                    &times;
                  </span>
                )}
                <input
                  type="color"
                  value={tabColor[tabName]}
                  onChange={(e) => handleTabColorChange(tabName, e.target.value)}
                  style={{ marginLeft: '10px' }}
                />
              </div>
            </li>
          ))}
          <li>
            <div className="add-tab">
              <input
                type="text"
                placeholder="Add a tab"
                value={newTab}
                onChange={(e) => setNewTab(e.target.value)}
              />
              <button onClick={addTab}>Add</button>
            </div>
          </li>
        </ul>
      </div>
      <div className="notes-column">
        <h1>Notes</h1>
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
          {notes
            .filter((note) => selectedTab === 'All' || note.tab === selectedTab)
            .map((note, index) => (
              <li key={index} className={`note ${note.completed ? 'completed' : ''}`}>
                <div className="checkbox" onClick={() => toggleCompleted(index)}>
                  {note.completed ? (
                    <FontAwesomeIcon icon={faCheckSquare} />
                  ) : (
                    <FontAwesomeIcon icon={faSquare} />
                  )}
                </div>
                <span>{note.text}</span>
                {note.completed && (
                  <div className="delete" onClick={() => deleteNote(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default NoteApp;
