import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Login from './Login';
import Client from './Client';
import Employee from './Employee';
import NoPage from './NoPage';

function App() {
  const [hotels, setHotels] = useState(false);

  function getHotel() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setHotels(data);
      });
  }

  function createHotel() {
    let name = prompt('Enter hotel name');
    let address = prompt('Enter hotel address');
    fetch('http://localhost:3001/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, address}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getHotel();
      });
  }

  function deleteHotel() {
    let id = prompt('Enter hotel id');
    fetch(`http://localhost:3001/hotels/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getHotel();
      });
  }

  function updateHotel() {
    let id = prompt('Enter hotel id');
    let name = prompt('Enter new hotel name');
    let address = prompt('Enter new hotel address');
    fetch(`http://localhost:3001/hotels/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, address}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getHotel();
      });
  }

  useEffect(() => {
    getHotel();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Client" element={<Client />}/>
        <Route path="/Employee" element={<Employee />}/>
        <Route path="*" element={<NoPage />}/>
      </Routes>
    </Router>
    /*
    <div>
      {hotels ? hotels : 'There is no hotel data available'}
      <br />
      <button onClick={createHotel}>Add hotel</button>
      <br />
      <button onClick={deleteHotel}>Delete hotel</button>
      <br />
      <button onClick={updateHotel}>Update hotel</button>
    </div>
    */
  );
}
export default App;