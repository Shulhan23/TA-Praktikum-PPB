// src/pages/Favorites.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Favorites.module.css'; // Import CSS module

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favoritesList);
  }, []);

  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(fav => fav._id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return <p className={styles.noFavorites}>No favorites yet. Add some characters to your favorites!</p>;
  }

  return (
    <div className={styles.favoritesContainer}>
      <h1>Your Favorites</h1>
      <ul>
        {favorites.map((character) => (
          <li key={character._id} className={styles.favoriteItem}>
            <img src={character.imageUrl} alt={character.name} />
            <h3>{character.name}</h3>
            <Link to={`/character/${character._id}`} className={styles.linkBack}>
              View Details
            </Link>
            <button
              className={styles.favoritesButton}
              onClick={() => handleRemoveFromFavorites(character._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Link to="/characters" className={styles.linkBack}>Back to Character List</Link>
    </div>
  );
};

export default Favorites;
