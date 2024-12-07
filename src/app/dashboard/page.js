'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { getItems, STORAGE_KEYS } from '@/lib/storage/localStorage';
import StatisticsOverview from '@/components/dashboard/StatisticsOverview';
import DueCardsOverview from '@/components/dashboard/DueCardsOverview';
import LearningProgress from '@/components/dashboard/LearningProgress';
import ReviewHistory from '@/components/dashboard/ReviewHistory';
import { calculateStudyStreak } from '@/lib/utils/statistics';
import { getDueCards } from '@/lib/srs/algorithm';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalCards: 0,
    totalReviews: 0,
    averageAccuracy: 0,
    studyStreak: 0
  });

  const [cards, setCards] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadedCards = getItems(STORAGE_KEYS.FLASHCARDS);
    const loadedSessions = getItems(STORAGE_KEYS.STUDY_SESSIONS);
    
    setCards(loadedCards);
    setSessions(loadedSessions);

    // Calculate statistics
    const totalCards = loadedCards.length;
    const totalReviews = loadedSessions.reduce((sum, session) => sum + session.cardsReviewed, 0);
    const totalCorrect = loadedSessions.reduce((sum, session) => sum + session.correctAnswers, 0);
    const averageAccuracy = totalReviews ? Math.round((totalCorrect / totalReviews) * 100) : 0;
    const studyStreak = calculateStudyStreak(loadedSessions);

    setStats({
      totalCards,
      totalReviews,
      averageAccuracy,
      studyStreak
    });
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Learning Dashboard</h1>
        
        <div className="space-y-8">
          <StatisticsOverview stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DueCardsOverview cards={cards} />
            <LearningProgress cards={cards} />
          </div>
          
          <ReviewHistory sessions={sessions} />
        </div>
      </div>
    </Layout>
  );
} 