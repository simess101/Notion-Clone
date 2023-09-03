import React from 'react';

function Note({ text, onDelete }) {
  return (
    <div className="note">
      <p>{text}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Note;
