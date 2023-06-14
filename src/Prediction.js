import React, { useState, useEffect } from 'react';
import './Prediction.css';
import raceImage from './ORBRaceImg.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Button = ({ f1Info }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleCloseClick = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: 'rgba(11, 95, 222, 0.7)', // Set the background color to blue
          borderRadius: '100%', // Make the button completely circular
          width: '2rem', // Set a fixed width for the button
          height: '2rem', // Set a fixed height for the button
          border: 'none',
          color: '#fff', // Set the text color to white
          fontWeight: 'bold',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'opacity 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleButtonClick}
      >
        {/* Display the '?' symbol in the middle */}
        <span style={{ fontSize: '20px' }}>?</span>
      </button>

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '80vw',
              height: '60vh',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              overflow: 'auto',
              position: 'relative',
            }}
          >
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '10px 15px 10px 15px',
                backgroundColor: '#FFEB00',
                borderRadius: '5px',
                borderWidth: 0.5,
                borderColor: 'black',
                color: '#000',
                cursor: 'pointer',
              }}
              onClick={handleCloseClick}
            >
              X
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
              <h1 style={{ margin: 0 }}>How to use F1 predictor?</h1>
              <p className="mainFont" style={{ color: 'black', marginBottom: '15px', whiteSpace: 'pre-line' }}>
                {f1Info[0]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const F1Predictor = ({ width }) => {
  const years = [2021, 2022];
  const grandPrixes = [
    "Bahrain International Circuit",
    "Autodromo Enzo e Dino Ferrari",
    "Autódromo Internacional do Algarve",
    "Circuit de Barcelona-Catalunya",
    "Circuit de Monaco",
    "Baku City Circuit",
    "Circuit Paul Ricard",
    "Red Bull Ring",
    "Silverstone Circuit",
    "Hungaroring",
    "Circuit de Spa-Francorchamps",
    "Circuit Park Zandvoort",
    "Autodromo Nazionale di Monza",
    "Sochi Autodrom",
    "Marina Bay Street Circuit",
    "Suzuka Circuit",
    "Circuit of the Americas",
    "Autódromo Hermanos Rodríguez",
    "Autódromo Internacional Nelson Piquet",
    "Jeddah Street Circuit",
    "Yas Marina Circuit"
  ];
  const climates = ['Sunny', 'Rainy', 'Cloudy'];

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGrandPrix, setSelectedGrandPrix] = useState('');
  const [selectedClimate, setSelectedClimate] = useState('');
  const [raceResults, setRaceResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleGrandPrixChange = (event) => {
    setSelectedGrandPrix(event.target.value);
  };

  const handleClimateChange = (event) => {
    setSelectedClimate(event.target.value);
  };

  const handlePrediction = () => {
    setLoading(true)
    console.log('Performing prediction...');
    console.log('Selected Year:', selectedYear);
    console.log('Selected Grand Prix:', selectedGrandPrix);
    console.log('Selected Climate:', selectedClimate);

    axios.get(`http://140.84.165.105:8443/predict`, {
      params: {
        circuit: selectedGrandPrix,
        year: selectedYear,
        weather: selectedClimate
      }
    })
      .then(response => {
        console.log('Success:', response.data);
        setRaceResults(JSON.parse(response.data).sort((a, b) => a.Position - b.Position));
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false)
      });
  };

  return (
    <div
      style={{
        backgroundColor: '#ffe5e5',
        padding: '20px',
        color: 'black',
        width: `${width - (width * 10) / 100}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', textAlign: 'start', width: '80%' }}>
        <label style={{ marginBottom: 10, color: 'rgb(255, 0, 0)', fontSize: '1.3rem' }} htmlFor="year">
          Year:
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          style={{
            width: '100%',
            backgroundcolor: 'black',
            color: 'black',
            padding: '10px',
            borderRadius: '5px',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            borderColor: 'rgb(255, 0, 0)',
          }}
        >
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', textAlign: 'start', width: '80%' }}>
        <label style={{ marginBottom: 10, color: 'rgb(255, 0, 0)', fontSize: '1.3rem' }} htmlFor="grandPrix">
          Grand Prix:
        </label>
        <select
          id="grandPrix"
          value={selectedGrandPrix}
          onChange={handleGrandPrixChange}
          style={{
            width: '100%',
            backgroundcolor: 'black',
            color: 'black',
            padding: '10px',
            borderRadius: '5px',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            borderColor: 'rgb(255, 0, 0)',
          }}
        >
          <option value="">Select a Grand Prix</option>
          {grandPrixes.map((gp) => (
            <option key={gp} value={gp}>
              {gp}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', textAlign: 'start', width: '80%' }}>
        <label style={{ marginBottom: 10, color: 'rgb(255, 0, 0)', fontSize: '1.3rem' }} htmlFor="climate">
          Climate:
        </label>
        <select
          id="climate"
          value={selectedClimate}
          onChange={handleClimateChange}
          style={{
            width: '100%',
            backgroundcolor: 'black',
            color: 'black',
            padding: '10px',
            borderRadius: '5px',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            borderColor: 'rgb(255, 0, 0)',
          }}
        >
          <option value="">Select a climate</option>
          {climates.map((climate) => (
            <option key={climate} value={climate}>
              {climate}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handlePrediction}
        style={{
          backgroundColor: '#FFEB00',
          color: 'black',
          border: 'none',
          padding: '10px 20px',
          fontSize: '1.5rem',
          borderRadius: '5px',
        }}
        disabled={loading} // Disable the button while loading
      >
        {loading ? 'Loading...' : 'Predict'}
      </button>

      {raceResults.length > 0 && (
        <div style={{ width: '80%', marginTop: '20px', overflowY: 'auto' }}>
          <table
            style={{
              margin: '0 auto',
              width: '100%',
              textAlign: 'center',
              borderCollapse: 'collapse',
            }}
          >
            <thead style={{ backgroundColor: 'rgb(2255, 77, 85)' }}>
              <tr>
                <th style={{ color: 'white', fontSize: '0.9rem', padding: '10px', border: '1px solid black' }}>Pos</th>
                <th style={{ color: 'white', fontSize: '0.9rem', padding: '10px', border: '1px solid black' }}>Driver</th>
                <th style={{ color: 'white', fontSize: '0.9rem', padding: '10px', border: '1px solid black' }}>Constructor</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {raceResults.map((result, index) => (
                <tr key={result.Position+result.Driver+result.Contsturctor}>
                  <td
                    style={{
                      fontSize: '0.8rem',
                      padding: '10px',
                      border: '1px solid black',
                      backgroundColor: index === 0 ? '#FDFCDC' : '#FDFCDC',
                      color: 'black',
                    }}
                  >
                    {result.Position}
                  </td>
                  <td
                    style={{
                      fontSize: '0.8rem',
                      padding: '10px',
                      border: '1px solid black',
                      backgroundColor: index === 0 ? '#FED9B7' : '#FED9B7',
                      color: 'black',
                    }}
                  >
                    {result.Driver}
                  </td>
                  <td
                    style={{
                      fontSize: '0.8rem',
                      padding: '10px',
                      border: '1px solid black',
                      backgroundColor: index === 0 ? '#FED9B7' : '#FED9B7',
                      color: 'black',
                    }}
                  >
                    {result.Constructor}
                  </td> {/* New column */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


function Prediction() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const CWindowWidth = window.innerWidth;
      const CWindowHeight = window.innerHeight
      setWindowHeight(CWindowHeight);
      setWindowWidth(CWindowWidth)
    };

    // Initial calculation on component mount
    handleResize();

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const f1Info = [
    `Welcome to the F1 Web Predictor Race tutorial! In this web application, you can predict the race positions of drivers based on your selected inputs. The system utilizes a powerful machine learning model trained on historical F1 race data to provide accurate predictions.\n\nTo get started, you'll find three dropdown fields on the screen: 'Year', 'Grand Prix', and 'Climate'. The 'Year' dropdown allows you to select the desired racing year, ranging from the earliest available season to the most recent. The 'Grand Prix' dropdown provides a list of available races for the selected year. Choose the specific Grand Prix you want to make a prediction for.\n\nNext, the 'Climate' dropdown allows you to specify the weather conditions for the selected race. This information is crucial, as weather often plays a significant role in race outcomes. Select the appropriate climate option based on the race conditions you want to simulate.\n\nOnce you have made your selections in the dropdown fields, it's time to make your prediction! Simply click the 'Predict' button, and the machine learning model will analyze your inputs to forecast the race positions of the drivers participating in the selected Grand Prix.\n\nEnjoy the excitement of predicting F1 race positions using this machine learning-driven web application. Feel free to experiment with different inputs and explore how various factors can impact race outcomes. Happy predicting!"`,
  ];

  return (
    <div className='prediction'>
      <img src={raceImage} alt="F1 Race" style={{ height: `${((windowHeight * 40) / 100)}px`, width: `${windowWidth - ((windowWidth * 10) / 100)}px`, objectFit: 'cover', marginTop: '8vh' }} />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '2vh' }}>
        <h1 style={{ color: 'rgb(255, 0, 0)', textAlign: 'center', margin: 0, marginRight: 15 }}>F1 Races Predictor</h1>
        <Button f1Info={f1Info} />
      </div>
      <F1Predictor width={windowWidth} />
      <Link
        className="prediction-button"
        style={{
          position: 'fixed',
          top: '3vh',
          right: '5vw',
          backgroundColor: 'rgba(255, 0, 0, 1)',
          borderRadius: '5px',
          padding: '5px 20px 5px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFEB00',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        to={'/'}
      >
        Home
      </Link>
    </div>
  )
}

export default Prediction
