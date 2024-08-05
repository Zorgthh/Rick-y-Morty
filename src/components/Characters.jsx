import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Characters.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="characters-container">
      {characters.map(character => (
        <div className="character-card" key={character.id}>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>Species: {character.species}</p>
          <p>Status: {character.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Characters;
