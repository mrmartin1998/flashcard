const ReviewHistory = ({ sessions }) => {
  // Sort sessions by date, newest first
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Get last 7 days of sessions
  const recentSessions = sortedSessions.slice(0, 7);

  // Calculate total stats
  const totalStats = sessions.reduce((acc, session) => {
    acc.totalCards += session.cardsStudied;
    acc.totalCorrect += session.correctAnswers;
    acc.totalIncorrect += session.incorrectAnswers;
    acc.totalTime += session.duration;
    return acc;
  }, { totalCards: 0, totalCorrect: 0, totalIncorrect: 0, totalTime: 0 });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Review History</h2>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Time Studied</div>
            <div className="stat-value">
              {Math.round(totalStats.totalTime / 60)} min
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Cards Reviewed</div>
            <div className="stat-value">{totalStats.totalCards}</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Success Rate</div>
            <div className="stat-value">
              {Math.round((totalStats.totalCorrect / totalStats.totalCards) * 100) || 0}%
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Recent Sessions</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Cards</th>
                  <th>Correct</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((session) => (
                  <tr key={session.id}>
                    <td>{formatDate(session.date)}</td>
                    <td>{session.cardsStudied}</td>
                    <td className="text-success">
                      {Math.round((session.correctAnswers / session.cardsStudied) * 100)}%
                    </td>
                    <td>{Math.round(session.duration / 60)} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewHistory; 