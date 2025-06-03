function FilmCard({ movie, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      <img
        src={movie.image_path}
        alt={movie.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-3 flex-grow">
        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          {movie.title}
        </h5>
        <p className="text-xs text-gray-600 dark:text-gray-300">{movie.genre}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Duration: {movie.duration} perc</p>
      </div>
    </div>
  );
}


export default FilmCard;
