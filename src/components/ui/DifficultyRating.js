'use client';

const DifficultyRating = ({ onRate }) => {
  const ratings = [
    { value: 5, label: 'Perfect', color: 'btn-success' },
    { value: 4, label: 'Good', color: 'btn-info' },
    { value: 3, label: 'Okay', color: 'btn-warning' },
    { value: 2, label: 'Hard', color: 'btn-error' },
    { value: 1, label: 'Again', color: 'btn-error' },
    { value: 0, label: 'Blackout', color: 'btn-error' }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {ratings.map(({ value, label, color }) => (
        <button
          key={value}
          className={`btn ${color}`}
          onClick={() => onRate(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default DifficultyRating; 