import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacters } from '../api/disneyApi';
import styles from '../styles/FilmDetail.module.css'; // Tambahkan file CSS untuk styling

const FilmDetail = () => {
  const { filmName } = useParams();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharactersInFilm = async () => {
      try {
        const allCharacters = await fetchCharacters();
        const filteredCharacters = allCharacters.filter((character) =>
          character.films.includes(decodeURIComponent(filmName))
        );
        setCharacters(filteredCharacters);
      } catch (err) {
        setError('Failed to load characters for this film');
      } finally {
        setLoading(false);
      }
    };

    getCharactersInFilm();
  }, [filmName]);

  if (loading) {
    return <p>Loading characters...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.filmDetailContainer}>
      <h1>Characters in {decodeURIComponent(filmName)}</h1>
      <ul className={styles.characterList}>
        {characters.map((character) => (
          <li key={character._id}>
            <Link to={`/character/${character._id}`}>
              <img src={character.imageUrl} alt={character.name} />
              <p>{character.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/films">Back to Film List</Link>
    </div>
  );
};

export default FilmDetail;
