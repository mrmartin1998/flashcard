export const getCardStatus = (card) => {
  if (!card.reviewCount) return 'New';
  if (card.reviewCount < 3) return 'Learning';
  if (card.reviewCount < 7) return 'Reviewing';
  return 'Mastered';
}; 