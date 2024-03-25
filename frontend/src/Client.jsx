import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputGroup, FormControl, Button, Dropdown, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Client.css';

const Client = () => {
    const [showModal, setShowModal] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleSearch = () => {
        // Your search logic goes here
        // For example, you can fetch search results from an API
        // and then open the modal to display the results
        handleShowModal();
    };
    
    return (
        <div>
            <div className="my-account-button">
                <Button variant="secondary" onClick={handleSearch}>My Account</Button>
            </div>
            <div className="search-bar">
                <h1>Welcome client!</h1>
                <InputGroup className="mb-3">
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">Chain</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Best Western</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Hilton</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Marriott</Dropdown.Item>
                            <Dropdown.Item href="#/action-4">IHG</Dropdown.Item>
                            <Dropdown.Item href="#/action-5">Wyndham</Dropdown.Item>
                            <Dropdown.Item href="#/action-5">Select all</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">Hotel</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Best Western</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Hilton</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Marriott</Dropdown.Item>
                            <Dropdown.Item href="#/action-4">IHG</Dropdown.Item>
                            <Dropdown.Item href="#/action-5">Wyndham</Dropdown.Item>
                            <Dropdown.Item href="#/action-5">Select all</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">Room</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Room 1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Room 2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Room 3</Dropdown.Item>
                            <Dropdown.Item href="#/action-4">Room 4</Dropdown.Item>
                            <Dropdown.Item href="#/action-5">Room 5</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <DatePicker
                        selected={checkInDate}
                        onChange={date => setCheckInDate(date)}
                        placeholderText="Check In"
                    />
                    <DatePicker
                        selected={checkOutDate}
                        onChange={date => setCheckOutDate(date)}
                        placeholderText="Check Out"
                    />
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">My Rentals</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Rental 1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Rental 2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Rental 3</Dropdown.Item>
                            <Dropdown.Item href="#/action-4">Rental 4</Dropdown.Item>
                            <Dropdown.Item href="#/action-5">Rental 5</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="primary">Search</Button>
                </InputGroup>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display search results here */}
                    {/* You can render dynamic content based on search results */}
                    <p>Search results will be displayed here.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Client;
