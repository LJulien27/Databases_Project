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

const Client = ({loggedIn}) => {
    const [showModal, setShowModal] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    {/* Dropdown variables */}
    const [selectedRating, setSelectedRating] = useState("Rating");
    const [selectedCapacity, setSelectedCapacity] = useState("Capacity");
    const [selectedArea, setSelectedArea] = useState("Area");
    const [selectedCategory, setSelectedCategory] = useState("Category");

    const [clientsSQL, setClients] = useState([]); // State for clients
    const [chainsSQL, setChains] = useState([]); // State for chains
    const [hotelsSQL, setHotels] = useState([]); // State for chains
    const [roomsSQL, setRooms] = useState([]); // State for chains
    

    // useEffect for fetching clients data when component mounts
    useEffect(() => {
        getClients();
        getChains();
        getHotels();
        getRooms();
    }, []);

    // Functions to fetch data
    function getClients() {
        fetch('http://localhost:3001/clients')
            .then(response => response.json())
            .then(data => {
                // Set clients data to state
                setClients(data);
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
            });
    }

    function getChains() {
        fetch('http://localhost:3001/chains')
            .then(response => response.json())
            .then(data => {
                setChains(data);
            })
            .catch(error => {
                console.error('Error fetching chains:', error);
            });
    }

    function getHotels() {
        fetch('http://localhost:3001/hotels')
            .then(response => response.json())
            .then(data => {
                setHotels(data);
            })
            .catch(error => {
                console.error('Error fetching hotels:', error);
            });
    }

    function getRooms() {
        fetch('http://localhost:3001/rooms')
            .then(response => response.json())
            .then(data => {
                setRooms(data);
            })
            .catch(error => {
                console.error('Error fetching rooms:', error);
            });
    }

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

    const handleCategoryClick = (option) => {
        setSelectedCategory(option);
    }

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

    if (loggedIn !== 1){
        return (
            <div>
                Return to login page you are not logged in as a client
            </div>
            )
        }

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
                        {chainsSQL.map(chain => (
                                <div key={chain.name}>
                                    <CustomDropdownItem onClick={() => handleOptionClick(chain.name)} isChecked={selectedOptions.includes(chain.name)}>
                                    {chain.name}
                                    </CustomDropdownItem>
                                </div>
                            ))}
                            <CustomDropdownItem onClick={() => handleOptionClick('Select all')} isChecked={selectedOptions.includes('Select all')}>
                                Select all
                            </CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">Hotel</Dropdown.Toggle>
                            <Dropdown.Menu>
                            {hotelsSQL.map(hotel => (
                                <div key={hotel.name}>
                                    <CustomDropdownItem onClick={() => handleOptionClick(hotel.name)} isChecked={selectedOptions.includes(hotel.name)}>
                                    {hotel.name}
                                    </CustomDropdownItem>
                                </div>
                            ))}
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
                        <Dropdown.Toggle variant="secondary">{selectedCategory}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => handleCategoryClick("Category: Category 1")} isChecked={false}>Category 1</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCategoryClick("Category: Category 2")} isChecked={false}>Category 2</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCategoryClick("Category: Category 3")} isChecked={false}>Category 3</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCategoryClick("Category: Any")} isChecked={false}>Any</CustomDropdownItem>
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
                    <Card>
                        <Card.Body>
                            {clientsSQL.map(client => (
                                <div key={client.id}>
                                    <Card.Text>
                                        <strong>Name:</strong> {client.f_name}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Address:</strong> {client.address}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>NAS:</strong> {client.sin}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Register Date:</strong> {client.r_date}
                                    </Card.Text>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <h2>Room Results</h2>
            {roomsSQL.map(room => (
            <div key={room.id}>
                <p>
                <strong>Room ID:</strong> {room.id}
                </p>
            </div>
            ))}
        </div>
    );
};

export default Client;