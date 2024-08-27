import logo from './logo.svg';
import './App.css';
import Login from './views/Login';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Register from './views/Register';
import PrivateRoute from './auth/PrivateAuth';


function App() {
 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} /> */}
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      </Routes>
    </Router>
  );
}

export default App;
