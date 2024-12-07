const ReviewHistory = ({ sessions }) => {
  // Sort sessions by date, newest first
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Get last 7 days of sessions
  const recentSessions = sortedSessions.slice(0, 7);

  // Calculate total stats with initial values and null checks
  const totalStats = sessions.reduce((acc, session) => {
    acc.totalCards += session.cardsStudied || 0;
    acc.totalCorrect += session.correctAnswers || 0;
    acc.totalIncorrect += session.incorrectAnswers || 0;
    acc.totalTime += session.duration || 0;
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

  // Safe calculation functions
  const calculatePercentage = (correct, total) => {
    if (!total) return '0';
    return Math.round((correct / total) * 100).toString();
  };

  const formatDuration = (duration) => {
    if (!duration) return '0';
    return Math.round(duration / 60).toString();
  };

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Review History</h2>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Time Studied</div>
            <div className="stat-value">
              {formatDuration(totalStats.totalTime)} min
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Cards Reviewed</div>
            <div className="stat-value">{totalStats.totalCards}</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Success Rate</div>
            <div className="stat-value">
              {calculatePercentage(totalStats.totalCorrect, totalStats.totalCards)}%
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
                    <td>{session.cardsStudied || 0}</td>
                    <td className="text-success">
                      {calculatePercentage(session.correctAnswers, session.cardsStudied)}%
                    </td>
                    <td>{formatDuration(session.duration)} min</td>
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