import React from 'react';

//styles
import './Message.css';

const Message = ({ clearDashboard, isOpen, switchWindow }) => {
  return (
    <div className={`msg-dashboard ${isOpen ? 'msgOpen' : 'msgClose'}`}>
      <div>
        <h1>Advertencia</h1>
        <h2>¿Deseas eliminar todas las notas?</h2>
      </div>
      <div className='keyboard-window'>
        <button className='btn-not-delete' onClick={switchWindow}>
          close
        </button>
        <button
          className='btn-delete-all'
          onClick={e => {
            clearDashboard();
            switchWindow(e);
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Message;
