'use client';

import { useEffect, useState } from 'react';
import { getItems, STORAGE_KEYS } from '@/lib/storage/localStorage';
import Flashcard from './Flashcard';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    const loadCards = () => {
      const storedCards = getItems(STORAGE_KEYS.FLASHCARDS);
      setCards(storedCards);
      
      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(storedCards.map(card => card.category))];
      setCategories(uniqueCategories);
    };

    loadCards();
  }, []);

  const filteredCards = selectedCategory === 'all' 
    ? cards 
    : cards.filter(card => card.category === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Flashcards</h2>
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
        <div className="text-center py-10">
          <p className="text-lg">No flashcards found. Create your first card!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map(card => (
            <Flashcard 
              key={card.id}
              front={card.front}
              back={card.back}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList; 