import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Home from './pages/Home'; 
import TryOn from './pages/TryOn';
import Wardrobe from './pages/Wardrobe'; 
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect empty path to login */}
        <Route path="/" element={<Navigate to="/login" />} /> 
        
        {/* Our main pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        /* App Routes */
        <Route path="/home" element={<Home />} />
        <Route path="/tryon" element={<TryOn />} />
        <Route path="/wardrobe" element={<Wardrobe />} />

        {/* 404 Fallback */}
        <Route path="*" element={<div className="h-screen flex items-center justify-center text-white">Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;