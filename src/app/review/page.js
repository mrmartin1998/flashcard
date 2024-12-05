'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ReviewSession from '@/components/ui/ReviewSession';
import { getItems, STORAGE_KEYS } from '@/lib/storage/localStorage';

export default function ReviewPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const categories = getItems(STORAGE_KEYS.FLASHCARDS)
    .map(card => card.category)
    .filter(Boolean)
    .filter((value, index, self) => self.indexOf(value) === index);

  const handleStartSession = () => {
    if (!selectedCategory) {
      alert('Please select a category to review');
      return;
    }
    setIsSessionStarted(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {!isSessionStarted ? (
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Review Flashcards</h1>
            <select 
              className="select select-bordered w-full mb-4"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <button 
              className="btn btn-primary w-full"
              onClick={handleStartSession}
            >
              Start Review
            </button>
          </div>
        ) : (
          <ReviewSession 
            category={selectedCategory} 
            onComplete={() => setIsSessionStarted(false)}
          />
        )}
      </div>
    </Layout>
  );
} 