import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import HomePage from './pages/HomePage';
import ProductFormPage from './pages/ProductFormPage';
import LoginPage from './pages/LoginPage'; // Import mới
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <Navbar /> {/* Hiển thị Navbar ở mọi trang */}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<ProductFormPage />} />
        <Route path="/edit/:id" element={<ProductFormPage />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} /> 
      </Routes>
    </>
  );
}

export default App;