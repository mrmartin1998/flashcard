import { getDueCards } from '@/lib/srs/algorithm';
import Link from 'next/link';

const DueCardsOverview = ({ cards }) => {
  const dueToday = getDueCards(cards);
  const dueThisWeek = getDueCards(cards, 7); // We'll modify getDueCards to accept days parameter

  const dueByCategory = dueToday.reduce((acc, card) => {
    const category = card.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Due for Review</h2>
        
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Due Today</div>
            <div className="stat-value">{dueToday.length}</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Due This Week</div>
            <div className="stat-value">{dueThisWeek.length}</div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">By Category</h3>
          <div className="space-y-2">
            {Object.entries(dueByCategory).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span>{category}</span>
                <span className="badge badge-primary">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link href="/review">
            <button className="btn btn-primary">Start Review</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DueCardsOverview; 