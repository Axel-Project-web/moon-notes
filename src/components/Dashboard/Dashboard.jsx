import React, { useEffect, useRef, useState } from 'react';

//react-router-dom
import { useActionData, useNavigate } from 'react-router-dom';

//styles
import './Dashboard.css';

//icon
import user_icon from './assets/account.svg';
import CreateNote from '../Note/Note';

//my-components
import Message from '../Message/Message';

async function handleRequest({ request }) {
  let userToFind = Object.fromEntries(await request.formData());
  try {
    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify(userToFind),
    });
    if (res.ok) {
      let data = await res.json();
      localStorage.setItem('session', JSON.stringify(data));
      return data;
    } else {
      return null;
    }
  } catch (error) {}
}

const Dashboard = () => {
  const [session, setSession] = useState(
    useActionData() || JSON.parse(localStorage.getItem('session'))
  );
  const [message, setMessage] = useState({ isOpen: false });

  const navigate = useNavigate();

  useEffect(() => {
    if (!session) navigate('/');
  });

  const $btnSave = useRef();

  function createNote() {
    const list = [...session.list];
    list.push('');
    setSession({
      ...session,
      list,
    });
  }

  function saveChange() {
    localStorage.setItem('session', JSON.stringify(session));

    const config = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(session),
    };

    fetch('http://localhost:8080/update', config).then(res => {
      const classList = $btnSave.current.classList;
      if (res.ok) {
        classList.add('save');
        setTimeout(() => classList.remove('save'), 1500);
      } else {
        classList.replace('save', 'not-save');
      }
    });
  }

  function deleteNote(index) {
    const list = [...session.list];
    setSession({
      ...session,
      list: list.filter((content, i) => i !== index),
    });
  }

  function editNote(index, content) {
    const list = [...session.list];
    list.splice(index, 1, content);
    setSession({
      ...session,
      list,
    });
  }

  function clearDashboard() {
    setSession({
      ...session,
      list: [],
    });
  }

  function switchWindow() {
    setMessage({
      isOpen: !message.isOpen,
    });
  }

  function logout() {
    localStorage.removeItem('session');
    navigate('/');
  }

  return (
    <>
      <Message
        isOpen={message.isOpen}
        clearDashboard={clearDashboard}
        switchWindow={switchWindow}
      />
      <div className='wrapper-dashboard'>
        <h1 className='title-dashboard'>My notes</h1>
        <header className='header-session'>
          <div className='current-session'>
            <img src={user_icon} alt='icon user' className='icon-user' />
            <div className='description-session'>
              <span className='current-email'>{session.email}</span>
              <span className='notification'>session active</span>
            </div>
          </div>
          <div className='keyboard-session'>
            <button className='btn-add' onClick={createNote}></button>
            <button className='btn-save' onClick={saveChange} ref={$btnSave}>
              {' '}
            </button>
            <button className='btn-clear-all' onClick={switchWindow}></button>
            <button className='btn-logout' onClick={logout}></button>
          </div>
        </header>
        <div className='dashboard'>
          {session.list.length > 0 ? (
            <CreateNote
              list={session.list}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          ) : (
            <h1 className='empty-list-msg'>Create a note</h1>
          )}
        </div>
      </div>
    </>
  );
};

export { handleRequest };
export default Dashboard;
