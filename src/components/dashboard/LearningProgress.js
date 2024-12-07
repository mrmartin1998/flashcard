import { getCardStatus } from '@/lib/utils/cardStatus';

const LearningProgress = ({ cards }) => {
  // Calculate learning status distribution
  const statusCounts = cards.reduce((acc, card) => {
    const status = getCardStatus(card);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Calculate percentages for progress bars
  const total = cards.length;
  const getPercentage = (count) => Math.round((count || 0) / total * 100);

  const statusColors = {
    New: 'bg-info',
    Learning: 'bg-warning',
    Reviewing: 'bg-primary',
    Mastered: 'bg-success'
  };

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Learning Progress</h2>
        
        <div className="space-y-4">
          {Object.entries(statusColors).map(([status, colorClass]) => (
            <div key={status}>
              <div className="flex justify-between mb-1">
                <span>{status}</span>
                <span>{statusCounts[status] || 0} cards</span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${colorClass}`}
                  style={{ width: `${getPercentage(statusCounts[status])}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Overall Progress</h3>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Mastery Rate</div>
              <div className="stat-value text-success">
                {getPercentage(statusCounts['Mastered'])}%
              </div>
              <div className="stat-desc">
                {statusCounts['Mastered'] || 0} cards mastered
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningProgress; 