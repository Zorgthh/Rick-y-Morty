import React, { useState } from 'react';
import axios from 'axios';
import './CharacterSearch.css';

const CharacterSearch = () => {
  const [id, setId] = useState('');
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => {
        setCharacter(response.data);
        setError('');
      })
      .catch(error => {
        setCharacter(null);
        setError('Character not found');
      });
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter character ID"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      {character && (
        <div className="character-card">
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>Species: {character.species}</p>
          <p>Status: {character.status}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
