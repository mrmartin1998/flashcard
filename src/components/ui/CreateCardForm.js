'use client'; // Marks this as a client-side component in Next.js

import { useState } from 'react';
import { addItem, STORAGE_KEYS } from '@/lib/storage/localStorage';

// CreateCardForm component for creating new flashcards
// Props:
// - onCardCreated: Optional callback function that runs after a card is created
const CreateCardForm = ({ onCardCreated }) => {
  // State to store form input values
  const [formData, setFormData] = useState({
    front: '',
    back: '',
    category: ''
  });

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new flashcard object with form data and default values
    const newCard = {
      ...formData,
      id: crypto.randomUUID(), // Generate unique ID
      createdAt: new Date().toISOString(), // Current timestamp
      lastReviewed: null, // No review history yet
      nextReview: null, // No scheduled review yet
      difficulty: 0, // Initial difficulty rating
      reviewCount: 0, // No reviews yet
      status: 'new' // Initial status
    };

    // Save card to localStorage and reset form
    addItem(STORAGE_KEYS.FLASHCARDS, newCard);
    onCardCreated?.(newCard); // Call callback if provided
    setFormData({ front: '', back: '', category: '' }); // Reset form
  };

  // Handler for input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create New Flashcard</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Front side input field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Front (Question)</span>
            </label>
            <textarea 
              name="front"
              value={formData.front}
              onChange={handleChange}
              className="textarea textarea-bordered h-24"
              placeholder="Enter the question..."
              required
            />
          </div>

          {/* Back side input field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Back (Answer)</span>
            </label>
            <textarea 
              name="back"
              value={formData.back}
              onChange={handleChange}
              className="textarea textarea-bordered h-24"
              placeholder="Enter the answer..."
              required
            />
          </div>

          {/* Category input field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input 
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Enter a category..."
            />
          </div>

          {/* Submit button */}
          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary">Create Card</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCardForm;