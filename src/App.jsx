import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import ProfilPage from './pages/ProfilePage';
import AddMoviePage from './pages/addMoviePage';
import AddScreeningPage from './pages/addScreeningPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilPage />} />
          <Route path="add-movie" element={<AddMoviePage />} />
          <Route path="add-screening" element={<AddScreeningPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;