import { useState } from 'react';

function SeatSelector({ selectedScreening, totalTickets, selectedSeats, setSelectedSeats }) {
  const initialRoom = [];

  for (let i = 0; i < selectedScreening.room.rows; i++) {
    initialRoom[i] = [];
    for (let j = 0; j < selectedScreening.room.seatsPerRow; j++) {
      initialRoom[i][j] = 1; // 1 = szabad, 0 = foglalt
    }
  }

  selectedScreening.bookings.forEach(({ row, seat }) => {
    initialRoom[row - 1][seat - 1] = 0;
  });


  const toggleSeat = (row, seat) => {
    const isSelected = selectedSeats.some(s => s.row === row && s.seat === seat);
    const isBooked = initialRoom[row][seat] === 0;

    if (isBooked) return; // Ne engedje a foglalt helyek kijelölését

    if (isSelected) {
      // Levesszük
      setSelectedSeats(selectedSeats.filter(s => !(s.row === row && s.seat === seat)));
    } else {
      if (selectedSeats.length < totalTickets) {
        setSelectedSeats([...selectedSeats, { row, seat }]);
      } else {
        alert("Nem választhatsz ki több helyet, mint ahány jegyet vásároltál!");
      }
    }
  };

  return (
    <div className="space-y-1 p-4">
      <h2 className="text-lg font-semibold">Válaszd ki a helyeket:</h2>
      {initialRoom.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-1 items-center">
          <span className="w-4">{rowIndex + 1}</span>
          {row.map((seat, seatIndex) => {
            const isSelected = selectedSeats.some(s => s.row === rowIndex && s.seat === seatIndex);
            const isBooked = seat === 0;

            return (
              <button
                key={seatIndex}
                disabled={isBooked}
                onClick={() => toggleSeat(rowIndex, seatIndex)}
                className={`w-6 h-6 rounded text-xs font-bold ${
                  isBooked
                    ? 'bg-red-500 cursor-not-allowed'
                    : isSelected
                    ? 'bg-blue-400'
                    : 'bg-green-400 hover:bg-green-500'
                }`}
              >
                {seatIndex + 1}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SeatSelector;
