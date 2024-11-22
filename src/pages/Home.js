import React from 'react';
import styles from '../styles/Home.module.css'; // Import file CSS

const Home = () => {
  return (
    <div className={styles['home-container']}>
      <h1 className={styles['home-title']}>Welcome to Disney Wonderland</h1>
      <p className={styles['home-subtitle']}>
        Discover your favorite Disney characters, movies, and TV shows.
        Start exploring the magical world of Disney now!
      </p>

      <div className={styles['home-buttons']}>
        <a href="/characters" className={styles['home-button']}>
          Explore Characters
        </a>
        <a href="/about" className={styles['home-button']}>
          About This App
        </a>
      </div>
    </div>
  );
};

export default Home;
