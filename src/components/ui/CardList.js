'use client';

import { useEffect, useState, useMemo } from 'react';
import { getItems, STORAGE_KEYS } from '@/lib/storage/localStorage';
import Flashcard from './Flashcard';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    const loadCards = () => {
      const storedCards = getItems(STORAGE_KEYS.FLASHCARDS) || [];
      const validCards = storedCards.filter(card => card.front && card.back);
      setCards(validCards);
      
      const uniqueCategories = ['all', ...new Set(validCards
        .map(card => card.category)
        .filter(Boolean)
      )];
      setCategories(uniqueCategories);
    };

    loadCards();
  }, []);

  const filteredCards = useMemo(() => {
    if (selectedCategory === 'all') {
      return [...cards].sort((a, b) => a.createdAt - b.createdAt); // Sort by creation date
    }
    return cards
      .filter(card => card.category === selectedCategory)
      .sort((a, b) => a.createdAt - b.createdAt);
  }, [cards, selectedCategory]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Flashcards</h2>
        <div className="flex justify-end flex-1">
          {cards.length > 0 && (
            <select 
              className="select select-bordered w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' 
                    ? 'All Categories'
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg">No flashcards found. Create your first card!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative">
          {filteredCards.map(card => (
            <div className="w-full" key={card.id} style={{ perspective: '1000px' }}>
              <Flashcard 
                front={card.front}
                back={card.back}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;