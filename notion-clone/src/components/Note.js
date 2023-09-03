import React, { useState } from 'react';
import './Note.css'; // Import the CSS file

function Note({ text, onDelete }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`note ${isChecked ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
        className="checkbox"
      />
      <p>{text}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Note;
