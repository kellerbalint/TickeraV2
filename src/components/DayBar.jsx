function DayBar({ onDayClick, selectedDay }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="flex space-x-2">
      {days.map((day, idx) => (
        <button
          key={day}
          onClick={() => onDayClick(idx + 1)}
          className={`px-4 py-2 rounded ${selectedDay === day ? 'bg-blue-700' : 'bg-blue-500'} text-white hover:bg-blue-700`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}

export default DayBar;