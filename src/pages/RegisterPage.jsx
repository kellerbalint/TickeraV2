import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from "../hooks/authSlice.js";
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:8000/api/register', form);
            if (res.data.status === "success") {
                dispatch(login({
                    token: res.data.data.token,
                    user: res.data.data.user,
                }));
                navigate('/')
            } else {
                setError("Invalid credentials");
            }
        } catch {
            setError('Registration failed. Please check your input.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Regisztráció</h2>
                {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Név"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Jelszó"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Jelszó megerősítése"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Regisztrálok
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
