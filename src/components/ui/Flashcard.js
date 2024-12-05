'use client';

import { useState } from 'react';

const Flashcard = ({ id, front, back, category, onDelete, onEdit }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ front, back, category: category || '' });

  const handleFlip = () => {
    if (!isEditing) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete?.(id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editData.front.trim() || !editData.back.trim()) {
      alert('Both front and back are required!');
      return;
    }
    onEdit?.(id, editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="card w-72 h-48 bg-base-200 shadow-xl">
        <form onSubmit={handleSave} className="card-body p-4">
          <input
            type="text"
            value={editData.front}
            onChange={(e) => setEditData({...editData, front: e.target.value})}
            className="input input-bordered input-sm mb-2"
            placeholder="Front"
            required
          />
          <input
            type="text"
            value={editData.back}
            onChange={(e) => setEditData({...editData, back: e.target.value})}
            className="input input-bordered input-sm mb-2"
            placeholder="Back"
            required
          />
          <input
            type="text"
            value={editData.category}
            onChange={(e) => setEditData({...editData, category: e.target.value})}
            className="input input-bordered input-sm mb-2"
            placeholder="Category (optional)"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsEditing(false)} className="btn btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div onClick={handleFlip} className="card w-72 h-48 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative group">
      <div className={`card-body items-center text-center transform transition-all duration-500 ${isFlipped ? 'scale-y-0' : 'scale-y-100'}`}>
        <h2 className="card-title text-base">{front}</h2>
      </div>
      
      <div className={`card-body items-center text-center absolute inset-0 transform transition-all duration-500 ${isFlipped ? 'scale-y-100' : 'scale-y-0'}`}>
        <p className="text-base">{back}</p>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button onClick={handleEdit} className="btn btn-xs btn-ghost mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <button onClick={handleDelete} className="btn btn-xs btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Flashcard;