import { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "../components/TicketComponent";
import { useSelector } from "react-redux";

export default function ProfilePage() {
    const token = useSelector(state => state.auth.token);
    const [allBookings, setAllBookings] = useState([]);
    const [visibleBookings, setVisibleBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(50);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllBookings(res.data.data); // egész tömb
                setVisibleBookings(res.data.data.slice(0, visibleCount));
                setLoading(false);
            } catch (err) {
                console.error("Hiba a foglalások betöltésekor:", err);
            }
        };

        fetchBookings();
    }, []);

    const loadMore = () => {
        const newCount = visibleCount + 50;
        setVisibleCount(newCount);
        setVisibleBookings(allBookings.slice(0, newCount));
    };

    if (loading) return <p className="p-4">Betöltés...</p>;

    if (!allBookings.length) {
        return <p className="p-4">Nincsenek jegyeid.</p>;
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Jegyeim</h2>

            {visibleBookings.map(ticket => (
                <Ticket key={ticket.id} ticket={ticket} />
            ))}

            {visibleBookings.length < allBookings.length && (
                <div className="text-center mt-4">
                    <button
                        onClick={loadMore}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        További jegyek betöltése...
                    </button>
                </div>
            )}
        </div>
    );
}
