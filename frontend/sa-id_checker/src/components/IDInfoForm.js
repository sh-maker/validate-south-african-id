import React, { useState } from 'react';
import './IDInfoForm.css';

const IDInfoForm = ({ onSubmit }) => {
  const [idNumber, setIdNumber] = useState('');
  const [response, setResponse] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const isDisabled = idNumber.length < 13;

  const handleChange = (event) => {
    setIdNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isDisabled) {
      setLoading(true); 
      // POST API calling
      fetch('http://localhost:8000/api/id-info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_number: idNumber }), 
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from API:', data); 
          setResponse(data); 
          setIdNumber(''); 
          setLoading(false); 
        })
        .catch((err) => {
          console.error('Failed to submit ID number', err);
          alert('Error submitting ID number');
          setLoading(false); 
        });
    } else {
      alert('ID Number must be 13 digits');
    }
  };

  return (
    <div className="form-container">
      <h2>South African ID</h2>
      <form onSubmit={handleSubmit} className="id-form">
        <label htmlFor="idNumber">Enter ID Number:</label>
        <input
          type="text"
          id="idNumber"
          value={idNumber}
          onChange={handleChange}
          maxLength="13"
          placeholder="Enter 13-digit ID number"
        />
        <button type="submit" disabled={isDisabled || loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Display the response data if available */}
      {response && (
        <div className="response-container">
          <h3>ID Information:</h3>
          <p><strong>ID Number:</strong> {response.id_info.id_number}</p>
          <p><strong>Birth Date:</strong> {response.id_info.birth_date}</p>
          <p><strong>Gender:</strong> {response.id_info.gender}</p>
          <p><strong>Citizenship:</strong> {response.id_info.citizenship ? 'Yes' : 'No'}</p>
          <p><strong>Search Count:</strong> {response.id_info.search_count}</p>

          {/* Display holiday information if it exists */}
          {response.holidays.length > 0 ? (
            <div>
              <h4>Holiday Details:</h4>
              <ul>
                {response.holidays.map((holiday, index) => (
                  <li key={index}>{holiday.name} - {holiday.date}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No holidays available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default IDInfoForm;
