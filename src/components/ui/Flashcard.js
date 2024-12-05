'use client'; // Marks this as a client-side component in Next.js

import { useState } from 'react';

// Flashcard component that displays content on front and back sides
// Props:
// - front: Content to display on the front of the card
// - back: Content to display on the back of the card
const Flashcard = ({ front, back }) => {
  // State to track whether card is flipped or not
  const [isFlipped, setIsFlipped] = useState(false);

  // Handler function to toggle the flipped state when card is clicked
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      onClick={handleFlip}
      // Styling classes for the card container:
      // - Fixed width/height
      // - Background color and shadow effects
      // - Hover and transition animations
      className="card w-96 h-64 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {/* Front of card - scales to 0 height when flipped */}
      <div className={`card-body items-center text-center transform transition-all duration-500 ${isFlipped ? 'scale-y-0' : 'scale-y-100'}`}>
        <h2 className="card-title">{front}</h2>
      </div>
      
      {/* Back of card - absolutely positioned over front, scales to full height when flipped */}
      <div className={`card-body items-center text-center absolute inset-0 transform transition-all duration-500 ${isFlipped ? 'scale-y-100' : 'scale-y-0'}`}>
        <p className="text-lg">{back}</p>
      </div>
    </div>
  );
};

export default Flashcard; 