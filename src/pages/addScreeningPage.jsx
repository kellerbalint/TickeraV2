import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddScreeningPage() {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({
        movie_id: "",
        room_id: "",
        start_time: "",
        date: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        // Fetch movies and rooms
        const fetchData = async () => {
            try {
                const [moviesRes, roomsRes] = await Promise.all([
                    axios.get(`${API_URL}/movies`),
                    axios.get(`${API_URL}/rooms`)
                ]);
                setMovies(moviesRes.data.data);
                setRooms(roomsRes.data.data);
            } catch (err) {
                console.error("Hiba a filmek vagy termek lekérésekor:", err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/screenings`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.status === "success") {
                setMessage("Vetítés sikeresen hozzáadva.");
                setForm({
                    movie_id: "",
                    room_id: "",
                    start_time: "",
                    date: "",
                });
            } else {
                setMessage("Hiba történt a vetítés mentésekor.");
            }
        } catch (err) {
            console.error("Hiba vetítés létrehozásakor:", err);
            setMessage("Sikertelen mentés.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
            <h2 className="text-xl font-bold mb-4">Vetítés hozzáadása</h2>

            {message && (
                <div className="mb-4 text-sm font-semibold text-white bg-green-600 p-2 rounded">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Film</label>
                    <select
                        name="movie_id"
                        value={form.movie_id}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    >
                        <option value="">-- Válassz filmet --</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Terem</label>
                    <select
                        name="room_id"
                        value={form.room_id}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    >
                        <option value="">-- Válassz termet --</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name || `Terem #${room.id}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Kezdés időpontja</label>
                    <input
                        type="time"
                        name="start_time"
                        value={form.start_time}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Dátum</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Vetítés mentése
                </button>
            </form>
        </div>
    );
}
