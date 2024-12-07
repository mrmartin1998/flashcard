'use client';

import { useEffect, useState, useMemo } from 'react';
import { getItems, updateItem, deleteItem, STORAGE_KEYS } from '@/lib/storage/localStorage';
import Flashcard from './Flashcard';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);
  const [isLoading, setIsLoading] = useState(true);

  const loadCards = () => {
    try {
      const storedCards = getItems(STORAGE_KEYS.FLASHCARDS) || [];
      const validCards = storedCards.filter(card => card.front && card.back);
      console.log('Loaded cards:', validCards); // Debug log
      setCards(validCards);
      
      const uniqueCategories = ['all', ...new Set(validCards
        .map(card => card.category)
        .filter(Boolean)
      )];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log('Deleting card with ID:', id); // Debug log
      const remainingCards = deleteItem(STORAGE_KEYS.FLASHCARDS, id);
      console.log('Remaining cards:', remainingCards); // Debug log
      setCards(remainingCards);
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Failed to delete card. Please try again.');
    }
  };

  const handleEdit = (id, updatedData) => {
    try {
      console.log('Updating card:', id, updatedData); // Debug log
      const updatedCards = updateItem(STORAGE_KEYS.FLASHCARDS, id, updatedData);
      setCards(updatedCards);
    } catch (error) {
      console.error('Error updating card:', error);
      alert('Failed to update card. Please try again.');
    }
  };

  const filteredCards = useMemo(() => {
    if (selectedCategory === 'all') {
      return [...cards].sort((a, b) => 
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    }
    return cards
      .filter(card => card.category === selectedCategory)
      .sort((a, b) => 
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
  }, [cards, selectedCategory]);

  if (isLoading) {
    return <div className="text-center py-10">Loading cards...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <select 
          className="select select-bordered w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredCards.length === 0 ? (
        <div className="text-center py-10">No cards found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCards.map(card => (
            <div key={card.id} style={{ perspective: '1000px' }}>
              <Flashcard 
                {...card}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;