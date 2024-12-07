'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { getItems, STORAGE_KEYS } from '@/lib/storage/localStorage';
import StatisticsOverview from '@/components/dashboard/StatisticsOverview';
import { calculateStudyStreak } from '@/lib/utils/statistics';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalCards: 0,
    totalReviews: 0,
    averageAccuracy: 0,
    studyStreak: 0
  });

  useEffect(() => {
    const cards = getItems(STORAGE_KEYS.FLASHCARDS);
    const sessions = getItems(STORAGE_KEYS.STUDY_SESSIONS);
    
    // Calculate statistics
    const totalCards = cards.length;
    const totalReviews = sessions.reduce((sum, session) => sum + session.cardsReviewed, 0);
    const totalCorrect = sessions.reduce((sum, session) => sum + session.correctAnswers, 0);
    const averageAccuracy = totalReviews ? Math.round((totalCorrect / totalReviews) * 100) : 0;
    const studyStreak = calculateStudyStreak(sessions);

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
        <StatisticsOverview stats={stats} />
      </div>
    </Layout>
  );
} 