// This schema defines the data structure for the flashcard application
const flashcardSchema = {
  // Flashcard model - represents an individual flashcard
  flashcard: {
    id: "string",         // Unique identifier for the flashcard
    front: "string",      // The question or prompt shown on the front of the card
    back: "string",       // The answer or content shown on the back of the card
    category: "string",   // Reference to the category this card belongs to
    createdAt: "timestamp", // When the card was created
    lastReviewed: "timestamp", // Last time this card was reviewed
    nextReview: "timestamp",  // When this card should be reviewed next (for spaced repetition)
    difficulty: "number",  // User-rated difficulty from 1-5, helps determine review frequency
    reviewCount: "number", // How many times this card has been reviewed
    status: "string"      // Card learning status: new, learning, reviewing, or mastered
  },

  // Category model - for organizing flashcards into topics/subjects
  category: {
    id: "string",         // Unique identifier for the category
    name: "string",       // Display name of the category
    description: "string", // Optional description of what this category contains
    createdAt: "timestamp" // When this category was created
  },

  // StudySession model - tracks individual study sessions for analytics
  studySession: {
    id: "string",         // Unique identifier for the study session
    date: "timestamp",    // When this study session occurred
    cardsStudied: "number", // Total number of cards reviewed in this session
    correctAnswers: "number", // How many cards were answered correctly
    incorrectAnswers: "number", // How many cards were answered incorrectly
    duration: "number"    // Length of study session in seconds
  }
};

// Export the schema for use in other parts of the application
export default flashcardSchema; 