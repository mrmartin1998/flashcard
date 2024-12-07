const StatisticsOverview = ({ stats }) => {
  const { totalCards, totalReviews, averageAccuracy, studyStreak } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="stat bg-base-200 rounded-lg p-4">
        <div className="stat-title">Total Cards</div>
        <div className="stat-value">{totalCards}</div>
      </div>
      
      <div className="stat bg-base-200 rounded-lg p-4">
        <div className="stat-title">Total Reviews</div>
        <div className="stat-value">{totalReviews}</div>
      </div>
      
      <div className="stat bg-base-200 rounded-lg p-4">
        <div className="stat-title">Average Accuracy</div>
        <div className="stat-value">{averageAccuracy}%</div>
      </div>
      
      <div className="stat bg-base-200 rounded-lg p-4">
        <div className="stat-title">Study Streak</div>
        <div className="stat-value">{studyStreak} days</div>
      </div>
    </div>
  );
};

export default StatisticsOverview; 