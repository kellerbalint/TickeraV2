import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { token, user } = useSelector((state) => state.user);
    return {
        isLoggedIn: !!token,
        isAdmin: !!token && user.role === 'admin',
        token,
        user,
    };
};