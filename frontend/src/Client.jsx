import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Client.css'

const Client = () => {
    return (
        <div>
            <div className="top-right-button">
            <Button variant="secondary">Top Right Button</Button>
        </div>
            <div className="search-bar">
        <h1>Welcome client!</h1>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter text..."
            aria-label="Enter text..."
            aria-describedby="basic-addon2"
          />
          <FormControl
            placeholder="Select dates..."
            aria-label="Select dates..."
            aria-describedby="basic-addon2"
          />
          <FormControl
            placeholder="Capacity"
            aria-label="Capacity"
            aria-describedby="basic-addon2"
          />
          <Button variant="primary">Search</Button>
        </InputGroup>
      </div>
        </div>
    );
  };

export default Client;