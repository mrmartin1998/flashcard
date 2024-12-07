// SuperMemo 2 algorithm implementation
// Reference: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2

const calculateNextReview = (repetitions, easeFactor, interval, quality) => {
  // quality: 0-5 rating of how well the user remembered (0 = complete blackout, 5 = perfect)
  if (quality < 3) {
    // If rating is less than 3, start over
    return {
      interval: 1,
      repetitions: 0,
      easeFactor: Math.max(1.3, easeFactor - 0.2)
    };
  }

  let nextInterval;
  if (repetitions === 0) {
    nextInterval = 1;
  } else if (repetitions === 1) {
    nextInterval = 6;
  } else {
    nextInterval = Math.round(interval * easeFactor);
  }

  // Update ease factor
  const newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  return {
    interval: nextInterval,
    repetitions: repetitions + 1,
    easeFactor: Math.max(1.3, newEaseFactor) // Minimum ease factor is 1.3
  };
};

const getDueCards = (cards) => {
  const now = new Date();
  return cards.filter(card => {
    if (!card.nextReview) return true; // New cards are always due
    return new Date(card.nextReview) <= now;
  });
};

export { calculateNextReview, getDueCards }; 