import React from 'react';
import Note from './Note';

interface NoteListProps {
  notes: Array<{ id: number; content: string }>;
  onDeleteNote: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteNote }) => {
  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id} className="note">
          <Note note={note} onDeleteNote={onDeleteNote} />
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
