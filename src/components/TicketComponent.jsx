export default function Ticket({ ticket }) {
    const movieTitle = ticket.screening?.movie?.title || "N/A";
    const weekDay = ticket.screening?.week_day || "N/A";
    const weekNumber = ticket.screening?.week_number || "N/A";
    const startTime = ticket.screening?.start_time || "N/A";

    const seatsText = ticket.seats
        .map(seat => `Sor ${seat.row}, Szék ${seat.seat}`)
        .join("; ");

    const ticketTypesText = ticket.ticket_types
        .map(tt => `${tt.type} x${tt.quantity}`)
        .join(", ");

    const price = ticket.total_price || "0.00";

    return (
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-6 mb-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h3 className="font-bold text-xl mb-3">{movieTitle}</h3>
            <p className="mb-1">Nap: <span className="font-semibold">{weekDay}</span>, Hét: <span className="font-semibold">{weekNumber}</span></p>
            <p className="mb-1">Időpont: <span className="font-semibold">{new Date(startTime).toLocaleString()}</span></p>
            <p className="mb-1">Hely(ek): <span className="font-semibold">{seatsText}</span></p>
            <p className="mb-1">Jegytípus(ok): <span className="font-semibold">{ticketTypesText}</span></p>
            <p className="mt-4 text-lg font-bold">Ár: {price} Ft</p>
        </div>
    );
}
