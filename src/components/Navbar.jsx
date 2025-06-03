import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../hooks/authSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
                tIKera
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-sm">Bejelentkezve: {user.name}</span>
                        <Link to="/">Moziműsor</Link>
                        <Link to="/profile">Foglalásaim</Link>

                        {user.role === 'admin' && (
                            <>
                                <Link to="/add-movie">Film hozzáadása</Link>
                                <Link to="/add-screening">Vetítés hozzáadása</Link>
                            </>
                        )}

                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                            Kijelentkezés
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/">Moziműsor</Link>
                        <Link to="/login">Bejelentkezés</Link>
                        <Link to="/register">Regisztráció</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
