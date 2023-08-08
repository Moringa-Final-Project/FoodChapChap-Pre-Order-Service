import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginSignUpContainer from './LoginSignUpContainer';
import Home from './Components/Home';
import Restaurant from './Components/Restaurant/Restaurant';
import Admin from './Components/Admin/Admin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignUpContainer />} />
        <Route path="/customer-landing" element={<Home />} />
        <Route path="/restaurant-landing" element={<Restaurant />} />
        <Route path="/admin-landing" element={<Admin />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
