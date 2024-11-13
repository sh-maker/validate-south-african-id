import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IDInfoList from './components/IDInfoList';
import IDInfoDetails from './components/IDInfoDetails';
import IDInfoForm from './components/IDInfoForm';
import './App.css';

const App = () => {
  const handlePostSubmit = (idNumber) => {
    fetch('http://localhost:8000/api/id-info/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_number: idNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id_info) {
          alert('ID Info Submitted Successfully');
        } else {
          alert('Error: ' + (data.error || 'Unknown error'));
        }
      })
      .catch((err) => {
        alert('Failed to submit ID number');
        console.error(err);
      });
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Form to submit new ID */}
          <Route path="/" element={<IDInfoForm onSubmit={handlePostSubmit} />} />
          {/* List of ID Numbers */}
          <Route path="/list" element={<IDInfoList />} />
          {/* Specific ID Number Details */}
          <Route path="/id-info/:id_number" element={<IDInfoDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
