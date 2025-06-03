import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddMoviePage() {
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image_path: "",
        duration: "",
        genre: "",
        release_year: "",
    });

    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/movies`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === "success") {
                setMessage("A film sikeresen hozzáadva!");
                setFormData({
                    title: "",
                    description: "",
                    image_path: "",
                    duration: "",
                    genre: "",
                    release_year: "",
                });
            } else {
                setMessage("Hiba történt: " + response.data.message);
            }
        } catch (err) {
            console.error(err);
            setMessage("Hiba történt a szerverrel való kommunikáció során. (pl. validációs hiba)");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Film hozzáadása</h2>
            {message && (
                <div className="mb-4 text-sm font-semibold text-white bg-green-600 p-2 rounded">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { label: "Cím", name: "title" },
                    { label: "Leírás", name: "description" },
                    { label: "Kép URL", name: "image_path" },
                    { label: "Hossz (perc)", name: "duration", type: "number" },
                    { label: "Műfaj", name: "genre" },
                    { label: "Megjelenés éve", name: "release_year", type: "number" },
                ].map(({ label, name, type = "text" }) => (
                    <div key={name}>
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {label}
                        </label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
                >
                    Mentés
                </button>
            </form>
        </div>
    );
}
