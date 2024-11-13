import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './IDInfoList.css'; 

const IDInfoList = () => {
  const [idList, setIdList] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch('http://localhost:8000/api/list-info/') // LIST API calling
      .then((response) => response.json())
      .then((data) => {
        setIdList(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching ID list:', error);
        setLoading(false); 
      });
  }, []);

  return (
    <div className="list-container">
      <h2>List of ID Numbers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="id-list">
          {idList.map((item) => (
            <li key={item.id} className="id-item">
              <Link to={`/id-info/${item.id_number}`}>{item.id_number}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IDInfoList;
