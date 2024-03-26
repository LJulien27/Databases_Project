import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputGroup, Button, Dropdown, Modal, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Client.css';

function CustomDropdownItem({ children, onClick }) {
    return (
      <Dropdown.Item onClick={onClick}>
        <span>{children}</span>
      </Dropdown.Item>
    );
  }

const Client = () => {
    const [showModal, setShowModal] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    {/* Dropdown variables */}
    const [selectedRating, setSelectedRating] = useState("Rating");
    const [selectedCapacity, setSelectedCapacity] = useState("Capacity");
    const [selectedArea, setSelectedArea] = useState("Area");


    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleCheckInChange = (date) => {
        // Ensure checkInDate is not after checkOutDate
        if (checkOutDate && date >= checkOutDate) {
            alert('Check in date must be before check out date');
            return; // Do not update state
        }
        setCheckInDate(date);
    }

    const handleCheckOutChange = (date) => {
        // Ensure checkOutDate is not before checkInDate
        if (checkInDate && date <= checkInDate) {
            alert('Check out date must be after check in date');
            return; // Do not update state
        }
        setCheckOutDate(date);
    }

    const handleRatingClick = (option) => {
        setSelectedRating(option);
    }

    const handleCapacityClick = (option) => {
        setSelectedCapacity(option);
    }

    const handleAreaClick = (option) => {
        setSelectedArea(option);
    }

    useEffect(() => {
        fetchRentalsFromDatabase();
    }, []);

    const fetchRentalsFromDatabase = async () => {
        try {
          // Make an API call to fetch data from your server
          const response = await fetch('/api/rentals'); // Replace '/api/rentals' with your actual API endpoint
          if (!response.ok) {
            throw new Error('Failed to fetch rentals');
          }
          const data = await response.json();
          setRentals(data); // Update state with fetched data
        } catch (error) {
          console.error('Error fetching rentals:', error);
        }
      };

    const handleSearch = () => {
        // Your search logic goes here
        // For example, you can fetch search results from an API
        // and then open the modal to display the results
        handleShowModal();
    };

    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
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
                            <CustomDropdownItem onClick={() => handleOptionClick('Best Western')} isChecked={selectedOptions.includes('Best Western')}>
                                Best Western
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Hilton')} isChecked={selectedOptions.includes('Hilton')}>
                                Hilton
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Marriott')} isChecked={selectedOptions.includes('Marriott')}>
                                Marriott
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('IHG')} isChecked={selectedOptions.includes('IHG')}>
                                IHG
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Wyndham')} isChecked={selectedOptions.includes('Wyndham')}>
                                Wyndham
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Select all')} isChecked={selectedOptions.includes('Select all')}>
                                Select all
                            </CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">Hotel</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => handleOptionClick('Best Western')} isChecked={selectedOptions.includes('Best Western')}>
                                Hotel 1
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Hilton')} isChecked={selectedOptions.includes('Hilton')}>
                                Hotel 2
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Marriott')} isChecked={selectedOptions.includes('Marriott')}>
                                Hotel 3
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('IHG')} isChecked={selectedOptions.includes('IHG')}>
                                Hotel 4
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Wyndham')} isChecked={selectedOptions.includes('Wyndham')}>
                                Hotel 5
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Best Western')} isChecked={selectedOptions.includes('Best Western')}>
                                Hotel 6
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Hilton')} isChecked={selectedOptions.includes('Hilton')}>
                                Hotel 7
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Marriott')} isChecked={selectedOptions.includes('Marriott')}>
                                Hotel 8
                            </CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleOptionClick('Select all')} isChecked={selectedOptions.includes('Select all')}>
                                Select all
                            </CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <DatePicker
                selected={checkInDate}
                onChange={handleCheckInChange}
                placeholderText="Check In"
            />
            <DatePicker
                selected={checkOutDate}
                onChange={handleCheckOutChange}
                placeholderText="Check Out"
            />
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">{selectedCapacity}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => handleCapacityClick("Capacity: 1 Person")} isChecked={false}>1 Person</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCapacityClick("Capacity: 2 Persons")} isChecked={false}>2 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCapacityClick("Capacity: 3 Persons")} isChecked={false}>3 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCapacityClick("Capacity: 4 Persons")} isChecked={false}>4 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCapacityClick("Capacity: 5 Persons")} isChecked={false}>5 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCapacityClick("Capacity: Any")} isChecked={false}>Any</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">{selectedRating}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => handleRatingClick("Rating: 1 Star")} isChecked={false}>1 Star</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleRatingClick("Rating: 2 Stars")} isChecked={false}>2 Stars</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleRatingClick("Rating: 3 Stars")} isChecked={false}>3 Stars</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleRatingClick("Rating: 4 Stars")} isChecked={false}>4 Stars</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleRatingClick("Rating: 5 Stars")} isChecked={false}>5 Stars</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleRatingClick("Rating: Any")} isChecked={false}>Any</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">{selectedArea}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 200 Square Ft")} isChecked={false}>200 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 300 Square Ft")} isChecked={false}>300 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 400 Square Ft")} isChecked={false}>400 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 500 Square Ft")} isChecked={false}>500 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 1000 Square Ft")} isChecked={false}>1000 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: Any")} isChecked={false}>Any</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">My Rentals</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => {}} isChecked={false}>Rental 1</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {}} isChecked={false}>Rental 2</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {}} isChecked={false}>Rental 3</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {}} isChecked={false}>Rental 4</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {}} isChecked={false}>Rental 5</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="primary">Search</Button>
                </InputGroup>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>My Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display search results here */}
                    {/* You can render dynamic content based on search results */}
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                <strong>Name:</strong> Charles Smith
                            </Card.Text>
                            <Card.Text>
                                <strong>Address:</strong> 2314 Apollo Street
                            </Card.Text>
                            <Card.Text>
                                <strong>NAS:</strong> 332-555-735
                            </Card.Text>
                            <Card.Text>
                                <strong>Register Date:</strong> 08/10/2021
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <h2>Room Results</h2>
        </div>
    );
};

export default Client;
