'use client';

import { useState, useEffect } from 'react';
import { getItems, updateItem, STORAGE_KEYS } from '@/lib/storage/localStorage';
import Flashcard from './Flashcard';
import DifficultyRating from './DifficultyRating';
import { calculateNextReview } from '@/lib/srs/algorithm';

const ReviewSession = ({ category, onComplete }) => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    totalReviewed: 0
  });

  useEffect(() => {
    const allCards = getItems(STORAGE_KEYS.FLASHCARDS);
    const dueCards = allCards.filter(card => {
      if (category && card.category !== category) return false;
      if (!card.nextReview) return true; // New cards are always due
      return new Date(card.nextReview) <= new Date();
    });
    setCards(dueCards);
  }, [category]);

  const handleFlip = () => {
    setIsFlipped(true);
    setShowRating(true);
  };

  const handleRating = (rating) => {
    const currentCard = cards[currentIndex];
    
    // Calculate next review date using spaced repetition algorithm
    const {
      interval,
      repetitions,
      easeFactor
    } = calculateNextReview(
      currentCard.repetitions || 0,
      currentCard.easeFactor || 2.5,
      currentCard.interval || 0,
      rating
    );

    // Update card with new SRS data
    const updatedCard = {
      ...currentCard,
      lastReviewed: new Date().toISOString(),
      nextReview: new Date(Date.now() + interval * 24 * 60 * 60 * 1000).toISOString(),
      repetitions,
      easeFactor,
      interval,
      reviewCount: (currentCard.reviewCount || 0) + 1
    };

    // Update statistics
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (rating >= 3 ? 1 : 0),
      incorrect: prev.incorrect + (rating < 3 ? 1 : 0),
      totalReviewed: prev.totalReviewed + 1
    }));

    // Save updated card
    updateItem(STORAGE_KEYS.FLASHCARDS, currentCard.id, updatedCard);

    // Move to next card or end session
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setShowRating(false);
    } else {
      handleSessionComplete();
    }
  };

  const handleSessionComplete = () => {
    // Save session statistics
    const sessionData = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      cardsReviewed: sessionStats.totalReviewed,
      correctAnswers: sessionStats.correct,
      incorrectAnswers: sessionStats.incorrect,
      category: category || 'all'
    };

    const sessions = getItems(STORAGE_KEYS.STUDY_SESSIONS);
    sessions.push(sessionData);
    localStorage.setItem(STORAGE_KEYS.STUDY_SESSIONS, JSON.stringify(sessions));

    onComplete?.();
  };

  if (cards.length === 0) {
    return <div className="text-center py-10">No cards due for review!</div>;
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <p className="text-lg">Card {currentIndex + 1} of {cards.length}</p>
        <div className="flex justify-center gap-4 mb-4">
          <span className="text-success">Correct: {sessionStats.correct}</span>
          <span className="text-error">Incorrect: {sessionStats.incorrect}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Flashcard
          {...currentCard}
          isReviewMode={true}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />

        {showRating && (
          <DifficultyRating onRate={handleRating} />
        )}
      </div>
    </div>
  );
};

export default ReviewSession; 