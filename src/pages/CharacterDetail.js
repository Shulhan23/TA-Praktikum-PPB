// src/pages/CharacterDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/CharacterDetail.module.css';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // State untuk mengecek apakah karakter ada di favorit

  useEffect(() => {
    const getCharacterDetail = async () => {
      try {
        const response = await fetch(`https://api.disneyapi.dev/character/${id}`);
  
        if (!response.ok) {
          throw new Error(`Character not found (status: ${response.status})`);
        }
  
        const data = await response.json();
        setCharacter(data.data);

        // Cek apakah karakter ini sudah ada di favorit
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some((fav) => fav._id === data.data._id));
        
      } catch (err) {
        setError('Character not found or failed to fetch character details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    getCharacterDetail();
  }, [id]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find((fav) => fav._id === character._id)) {
      favorites.push(character);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true); // Update isFavorite menjadi true
      alert(`${character.name} has been added to your favorites!`);
    }
  };

  const handleRemoveFromFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter((fav) => fav._id !== character._id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(false); // Update isFavorite menjadi false
    alert(`${character.name} has been removed from your favorites.`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!character) {
    return <p>Character not found</p>;
  }

  return (
    <div className={styles.characterDetailContainer}>
      <h1>{character.name}</h1>
      <img src={character.imageUrl} alt={character.name} />
      <p><strong>Films:</strong> {character.films.join(', ')}</p>
      <p><strong>TV Shows:</strong> {character.tvShows.join(', ')}</p>
      <p><strong>Video Games:</strong> {character.videoGames.join(', ')}</p>
      <p><strong>Source URL:</strong> <a href={character.sourceUrl} target="_blank" rel="noopener noreferrer">More Info</a></p>

      {/* Tampilkan tombol sesuai dengan status favorit */}
      {isFavorite ? (
        <button className={styles.characterDetailButton} onClick={handleRemoveFromFavorites}>Remove from Favorites</button>
      ) : (
        <button className={styles.characterDetailButton} onClick={handleAddToFavorites}>Add to Favorites</button>
      )}
      
      <br />
      <Link to="/characters">Back to Character List</Link>
    </div>
  );
};

export default CharacterDetail;
