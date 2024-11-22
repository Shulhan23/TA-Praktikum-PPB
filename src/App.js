// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import Favorites from './pages/Favorites';
import About from './pages/About';
import FilmList from "./pages/FilmList"; 
import FilmDetail from "./pages/FilmDetail"; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div>
        {/* Navbar di sisi kiri */}
        <nav className="left-nav">
          <Link to="/">Home</Link>
          <Link to="/characters">Characters</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/films">Films</Link> 
          <Link to="/about">About</Link>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/films" element={<FilmList />} /> 
            <Route path="/films/:filmName" element={<FilmDetail />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
