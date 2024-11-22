import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFilms } from '../api/disneyApi';
import styles from '../styles/FilmList.module.css'; // Tambahkan file CSS untuk styling

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFilms = async () => {
      try {
        const films = await fetchFilms();
        setFilms(films);
      } catch (err) {
        setError('Failed to load films');
      } finally {
        setLoading(false);
      }
    };

    getFilms();
  }, []);

  if (loading) {
    return <p>Loading films...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.filmListContainer}>
      <h1>Disney Films</h1>
      <ul className={styles.filmList}>
        {films.map((film, index) => (
          <li key={index}>
            <Link to={`/films/${encodeURIComponent(film)}`}>{film}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmList;
