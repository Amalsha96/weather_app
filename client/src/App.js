import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CardComponent = ({ card }) => {
  return (
    <div className="card">
      <h3>{card.district}</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{card.condition}</p>
        {card.condition === 'Rainy' && <img src='https://cdn.icon-icons.com/icons2/1903/PNG/512/iconfinder-weather-weather-forecast-heavy-rain-cloud-climate-3859135_121235.png' alt="Rainy" className="weather-image" />}
        {card.condition === 'Sunny' && <img src="https://icons.iconarchive.com/icons/dtafalonso/win-10x/512/Weather-icon.png" alt="Sunny" className="weather-image" />}
        {card.condition === 'Cloudy' && <img src="https://cdn-icons-png.freepik.com/512/1163/1163634.png" alt="Cloudy" className="weather-image" />}
      </div>
      <p1>Temperature: {card.temp}</p1>
      <p1>Humidity: {card.humidity}, Air Pressure: {card.pressure}</p1>
    </div>
  );
};

const CardRow = ({ cards }) => {
  return (
    <div className="card-row">
      {cards.map((card, index) => (
        <CardComponent key={index} card={card} />
      ))}
    </div>
  );
};

const CardList = ({ cards }) => {
  const rows = [];
  for (let i = 0; i < cards.length; i += 4) {
    rows.push(cards.slice(i, i + 4));
  }
  return (
    <div className="card-list">
      {rows.map((row, index) => (
        <CardRow key={index} cards={row} />
      ))}
    </div>
  );
};

const App = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        console.log('Fetching');
        try {
          const response = await axios.get('http://localhost:8081/api/data');
          console.log('Fetching');
          setCards(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Initial data fetch
      fetchData();
  
      // Fetch data every 2 seconds
      const intervalId = setInterval(fetchData, 2000);
  
      // Clean up function to clear the interval when component unmounts
      return () => clearInterval(intervalId);
    }, []); 
      

  return (
    <div align='center'>
      <h1>Weather.LK</h1>
      <CardList cards={cards} />
    </div>
  );
};

export default App;
