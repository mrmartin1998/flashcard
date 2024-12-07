export const calculateStudyStreak = (sessions) => {
  if (!sessions.length) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Sort sessions by date, newest first
  const sortedSessions = sessions
    .map(session => ({
      ...session,
      date: new Date(session.date)
    }))
    .sort((a, b) => b.date - a.date);

  let streak = 0;
  let currentDate = today;

  // Check each day, starting from today
  while (true) {
    const sessionsOnDate = sortedSessions.find(session => {
      const sessionDate = new Date(session.date);
      return sessionDate.toDateString() === currentDate.toDateString();
    });

    if (!sessionsOnDate) break;
    
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}; 