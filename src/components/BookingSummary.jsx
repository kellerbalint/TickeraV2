import Modal from "./Modal";

function BookingSummary({ selectedFilm, selectedTime, day, adultCount, studentCount, seniorCount, selectedSeats, totalPrice, handleBookingConfirm }) {
    if (!selectedFilm || !selectedTime) return null;
    
    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-bold mb-2">Foglalás összesítő</h2>
  
        <p><strong>Film:</strong> {selectedFilm.title}</p>
        <p><strong>Nap:</strong> {day}</p>
        <p><strong>Időpont:</strong> {selectedTime}</p>
  
        <h3 className="mt-3 font-semibold">Jegyek:</h3>
        <ul className="list-disc ml-6">
          {adultCount > 0 && <li>{adultCount}× Felnőtt</li>}
          {studentCount > 0 && <li>{studentCount}× Diák</li>}
          {seniorCount > 0 && <li>{seniorCount}× Nyugdíjas</li>}
        </ul>
  
        <h3 className="mt-3 font-semibold">Helyek:</h3>
        {selectedSeats.length > 0 ? (
          <ul className="list-disc ml-6">
            {selectedSeats.map((s, i) => (
              <li key={i}>Sor {s.row + 1}, Szék {s.seat + 1}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic">Még nincs kiválasztva hely.</p>
        )}
  
        <p className="mt-3 font-bold">Összesen: {totalPrice} Ft</p>

        <button
        onClick={handleBookingConfirm}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
        Foglalás véglegesítése
        </button>
      </div>
    );
  }
  
  export default BookingSummary;
  