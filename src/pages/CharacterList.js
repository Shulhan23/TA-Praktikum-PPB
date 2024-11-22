import React, { useState, useEffect } from 'react';
import { fetchCharacters } from '../api/disneyApi';
import { Link } from 'react-router-dom';
import styles from '../styles/CharacterList.module.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data);
        setFilteredCharacters(data);
      } catch (err) {
        setError('Failed to fetch characters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCharacters();
  }, []);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    setSearchTerm(keyword);

    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(keyword)
    );

    setFilteredCharacters(filtered);
    setCurrentPage(1); // Reset ke halaman pertama setelah pencarian
  };

  // Pagination calculations
  const indexOfLastCharacter = currentPage * itemsPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  const generatePageNumbers = () => {
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePageInput = (e) => {
    const pageNumber = parseInt(e.target.value, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!characters.length) return <p>No characters found</p>;

  return (
    <div className={styles.characterListContainer}>
      <h1>Disney Characters</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a character..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />

      {/* Character List */}
      <ul>
        {currentCharacters.map((character) => (
          <li key={character._id}>
            <Link to={`/character/${character._id}`}>
              <img src={character.imageUrl} alt={character.name} />
              <br />
              {character.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageArrow}
        >
          &lt;
        </button>

        {generatePageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? styles.activePage : ''}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageArrow}
        >
          &gt;
        </button>

        {/* Direct Page Input */}
        <input
          type="number"
          placeholder={`Page (1-${totalPages})`}
          min="1"
          max={totalPages}
          onChange={handlePageInput}
          className={styles.pageInput}
        />
      </div>
    </div>
  );
};

export default CharacterList;
