import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Pokemons from './components/Pokemons';
import ShinyPokemons from './components/ShinyPokemons';
import { AuthProvider } from './components/auth/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <AuthProvider>
        <Router>
          <nav style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            padding: '20px',
            backgroundColor: darkMode ? "#333" : "#eee",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <Link to="/login" style={navLinkStyle(darkMode)}>Connexion</Link>
            <Link to="/register" style={navLinkStyle(darkMode)}>Inscription</Link>
            <Link to="/profile" style={navLinkStyle(darkMode)}>Profil</Link>
            <Link to="/pokemons" style={navLinkStyle(darkMode)}>Pokémons</Link>
            <Link to="/shinypokemons" style={navLinkStyle(darkMode)}>Pokémon Shinys</Link>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: darkMode ? "#fff" : "#333",
                color: darkMode ? "#333" : "#fff",
                fontWeight: "bold"
              }}
            >
              {darkMode ? "☀️ Clair" : "🌙 Sombre"}
            </button>
          </nav>

          <Routes>
            {/* Redirection par défaut */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Authentification */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Route privée : Pokémons */}
            <Route path="/pokemons" element={
              <PrivateRoute>
                <Pokemons />
              </PrivateRoute>
            } />

            {/* Route privée : Shinys */}
            <Route path="/shinypokemons" element={
              <PrivateRoute>
                <ShinyPokemons />
              </PrivateRoute>
            } />

            {/* Route privée : Profil */}
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

const navLinkStyle = (darkMode) => ({
  textDecoration: 'none',
  color: darkMode ? "#fff" : "#333",
  fontWeight: "bold",
  fontSize: "16px"
});

export default App;
