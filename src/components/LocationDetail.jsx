import React, { useState } from 'react';
import useFetch from './useFetch';
import './LocationDetail.css';

const getRandomId = () => Math.floor(Math.random() * 126) + 1;

const LocationDetail = () => {
  const [locationId, setLocationId] = useState(getRandomId());
  const [inputValue, setInputValue] = useState(locationId);

  const { data: location, error, loading } = useFetch(`https://rickandmortyapi.com/api/location/${locationId}`);

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleSearch = () => {
    const id = parseInt(inputValue, 10);
    if (id >= 1 && id <= 126) {
      setLocationId(id);
    } else {
      alert('Please enter a valid ID between 1 and 126');
    }
  };

  return (
    <div className="location-detail">
      <div className="search-container">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          min="1"
          max="126"
          placeholder="Enter location ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching location data</p>}
      {location && (
        <div className="location-info">
          <h2>{location.name}</h2>
          <p>Type: {location.type}</p>
          <p>Dimension: {location.dimension}</p>
          <p>Number of Residents: {location.residents.length}</p>
          <div className="residents">
            {location.residents.map((url, index) => (
              <Resident key={index} url={url} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Resident = ({ url }) => {
  const { data: resident, error, loading } = useFetch(url);

  if (loading) return <p>Loading resident...</p>;
  if (error) return <p>Error loading resident data</p>;

  return (
    <div className="resident-card">
      <h3>{resident.name}</h3>
      <img src={resident.image} alt={resident.name} />
      <p>Status: {resident.status}</p>
      <p>Origin: {resident.origin.name}</p>
      <p>Episodes: {resident.episode.length}</p>
    </div>
  );
};

export default LocationDetail;
