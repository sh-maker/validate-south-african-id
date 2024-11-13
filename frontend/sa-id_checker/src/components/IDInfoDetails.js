import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './IDInfoDetails.css'; 

const IDInfoDetails = () => {
  const { id_number } = useParams(); 
  const [idInfo, setIdInfo] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch(`http://localhost:8000/api/id-info/${id_number}/`) //GET API calling
      .then((response) => response.json())
      .then((data) => {
        setIdInfo(data.id_info);
        setHolidays(data.holidays);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching ID info:', error);
        setLoading(false); 
      });
  }, [id_number]);

  return (
    <div className="details-container">
      <h2>ID Number: {id_number}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="details-info">
          {idInfo && (
            <div className="id-info">
              <p><strong>Birth Date:</strong> {idInfo.birth_date}</p>
              <p><strong>Gender:</strong> {idInfo.gender}</p>
              <p><strong>Citizenship:</strong> {idInfo.citizenship ? 'Yes' : 'No'}</p>
              <p><strong>Search Count:</strong> {idInfo.search_count}</p>
            </div>
          )}
          {holidays.length > 0 ? (
            <div className="holidays-info">
              <h3>Holiday Details:</h3>
              <ul>
                {holidays.map((holiday, index) => (
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

export default IDInfoDetails;
