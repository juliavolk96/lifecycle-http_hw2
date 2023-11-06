import React from 'react';

interface NoteProps {
  note: { id: number, content: string };
  onDeleteNote: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDeleteNote }) => {
  return (
    <div className="note-item">
      <span>{note.content}</span>
      <img
        src="/img/delete.png"
        alt="Удалить"
        className="delete-button"
        onClick={() => onDeleteNote(note.id)}
      />
    </div>
  );
};

export default Note;
