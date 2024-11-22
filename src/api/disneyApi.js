// src/api/disneyApi.js

// Fungsi untuk mengambil karakter
export const fetchCharacters = async () => {
  const localData = localStorage.getItem('characters'); // Cek apakah data ada di local storage
  const cacheExpiry = localStorage.getItem('charactersExpiry'); // Cek kapan cache ini kedaluwarsa
  const now = new Date().getTime();

  if (localData && cacheExpiry && now < cacheExpiry) {
    return JSON.parse(localData); // Jika data ada di local storage dan belum kedaluwarsa, gunakan data tersebut
  }

  try {
    const characters = [];
    let page = 1;
    let moreDataAvailable = true;

    while (moreDataAvailable) {
      const response = await fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=50`);
      const data = await response.json();

      if (!response.ok) throw new Error('Failed to fetch characters');
      characters.push(...data.data);

      moreDataAvailable = !!data.info.nextPage; // Cek apakah ada halaman berikutnya
      page++;
    }

    // mencoba menyimpan data API yang sebelumnya kita ambil, dan disimpan dalam 24 jam
    localStorage.setItem('characters', JSON.stringify(characters));
    localStorage.setItem('charactersExpiry', now + 24 * 60 * 60 * 1000);

    return characters;
  } catch (error) {
    console.error("Failed to fetch data from API:", error);
    throw error;
  }
};

// Fungsi untuk mengambil daftar film
export const fetchFilms = async () => {
  try {
    const characters = await fetchCharacters(); // Ambil semua karakter
    const filmsSet = new Set(); // Gunakan Set untuk menyimpan nama film unik

    characters.forEach((character) => {
      if (character.films) {
        character.films.forEach((film) => filmsSet.add(film));
      }
    });

    return Array.from(filmsSet); // Konversi Set kembali ke array
  } catch (error) {
    console.error("Failed to fetch films:", error);
    throw error;
  }
};
