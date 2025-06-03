import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../hooks/authSlice.js';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(`${API_URL}/login`, form);
            if (res.data.status === 'success') {
                dispatch(login({
                    token: res.data.data.token,
                    user: res.data.data.user,
                }));
                navigate('/');
            } else {
                setError('Hibás email vagy jelszó.');
            }
        } catch {
            setError('Sikertelen bejelentkezés. Próbáld újra.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Bejelentkezés</h2>
                {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Bejelentkezem
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
