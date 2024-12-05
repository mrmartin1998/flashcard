'use client';

import { useState, useEffect } from 'react';
import { getItems, updateItem, STORAGE_KEYS } from '@/lib/storage/localStorage';
import Flashcard from './Flashcard';

const ReviewSession = ({ category, onComplete }) => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    const allCards = getItems(STORAGE_KEYS.FLASHCARDS);
    const categoryCards = allCards.filter(card => card.category === category);
    setCards(categoryCards);
  }, [category]);

  const handleNext = (wasCorrect) => {
    setResults(prev => ({
      correct: prev.correct + (wasCorrect ? 1 : 0),
      incorrect: prev.incorrect + (wasCorrect ? 0 : 1)
    }));

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      handleSessionComplete();
    }
  };

  const handleSessionComplete = () => {
    alert(`Session Complete!\nCorrect: ${results.correct}\nIncorrect: ${results.incorrect}`);
    onComplete?.();
  };

  if (cards.length === 0) {
    return <div>No cards found in this category.</div>;
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <p className="text-lg">
          Card {currentIndex + 1} of {cards.length}
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <span className="text-success">Correct: {results.correct}</span>
          <span className="text-error">Incorrect: {results.incorrect}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Flashcard
          {...currentCard}
          isReviewMode={true}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
        />

        {isFlipped && (
          <div className="flex gap-4">
            <button 
              className="btn btn-error"
              onClick={() => handleNext(false)}
            >
              Incorrect
            </button>
            <button 
              className="btn btn-success"
              onClick={() => handleNext(true)}
            >
              Correct
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSession; 