import React, { useState } from 'react';

//style
import './Note.css';
// icons
import icon_update from './assets/edit.svg';
import icon_done from './assets/done.svg';

function Note({ content, index, deleteNote, editNote }) {
  const [note, setNote] = useState({ readOnly: true });

  function handleSubmit(e) {
    e.preventDefault();
  }

  function updateNote() {
    setNote({ readOnly: !note.readOnly });
  }

  function handleChange({ target }) {
    editNote(index, target.value);
  }

  return (
    <form className='note' onSubmit={handleSubmit}>
      <input
        readOnly={note.readOnly}
        className='content-note'
        type='text'
        placeholder='Write a new note! :D'
        value={content}
        onChange={handleChange}
      />
      {note.readOnly ? (
        <button
          onClick={updateNote}
          className='btn-update-note'
          style={{
            backgroundImage: `url(${icon_update})`,
          }}
        ></button>
      ) : (
        <button
          onClick={updateNote}
          className='btn-update-note'
          style={{
            backgroundImage: `url(${icon_done})`,
          }}
        ></button>
      )}
      <button
        className='btn-delete-note'
        onClick={() => {
          deleteNote(index);
        }}
      ></button>
    </form>
  );
}

const CreateNote = ({ list, deleteNote, editNote }) => {
  return (
    <div className='wrapper-note'>
      {list.map((item, index) => (
        <Note
          key={index}
          content={item}
          index={index}
          editNote={editNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
};

export default CreateNote;
