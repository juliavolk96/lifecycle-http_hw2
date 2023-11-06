import React, { useState, useEffect } from 'react';
import './App.css';
import NoteList from './components/NoteList';

const App: React.FC = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const fetchNotes = () => {
    fetch('http://localhost:7070/notes')
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Ошибка при загрузке заметок:', error));
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      fetch('http://localhost:7070/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          content: newNote,
        }),
      })
        .then(() => {
          fetchNotes();
        })
        .catch((error) => console.error('Ошибка при добавлении заметки:', error));

      setNewNote('');
    }
  };

  const handleDeleteNote = (id: number) => {
    fetch(`http://localhost:7070/notes/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchNotes();
      })
      .catch((error) => console.error('Ошибка при удалении заметки:', error));
  };

  const handleRefresh = () => {
    fetchNotes();
  };

  return (
    <div className="container">
      <h1>
        Notes
        <img
          src="/img/update.png"
          alt="Обновить"
          onClick={handleRefresh}
          style={{ marginLeft: '10px', cursor: 'pointer' }}
          className="update-btn"
        />
      </h1>
      <div className='add-input'>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Введите новую заметку"
          className="add-note"
        />
        <button
          onClick={handleAddNote}
          style={{ cursor: 'pointer' }}
          className="add-btn"
        >
          <img src="/img/send.png" alt="Добавить" />
        </button>
       </div>
      <NoteList notes={notes} onDeleteNote={handleDeleteNote} />
    </div>
  );
};

export default App;