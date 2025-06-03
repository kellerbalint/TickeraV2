function SelectedFilm({ film, day, onSelectTime, week }) {
  if (!film) {
    return (
      <div className="text-gray-400 text-center mt-20">
        <p className="text-lg">Nincs kiválasztva film</p>
        <p className="text-sm">Kattints egy kártyára a listából</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-white">{film.title}</h2>
      <img
        src={film.image_path}
        alt={film.title}
        className="w-full h-auto object-contain mb-2"
      />
      <p className="text-sm text-gray-700 dark:text-gray-300">{film.description}</p>
      <p className="text-xs text-gray-200 mt-1">
        Genre: {film.genre} | Duration: {film.duration} perc
      </p>
      <div className="text-white">Időpontok:</div>
      <ul>
        {film.screenings.filter(s => s.week_number === week).map((screening) => {
          if (screening.week_day === day) {
            const totalSeats = screening.room.rows * screening.room.seatsPerRow;
            const bookedSeats = screening.bookings.length;
            const availableSeats = totalSeats - bookedSeats;

            const isDisabled = availableSeats === 0;

            return (
              <li key={screening.id}>
                <button
                  className={`${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                    } text-white px-4 py-2 rounded mt-2 w-full`}
                  disabled={isDisabled}
                  onClick={() => onSelectTime(screening.start_time)}
                >
                  {screening.start_time} - {availableSeats} szabad hely
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

export default SelectedFilm;