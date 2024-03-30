import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputGroup, Button, Dropdown, Modal, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Client.css';
import './Background.css';
import { Typography, Rating } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

function CustomDropdownItem({ children, onClick }) {
    return (
        <Dropdown.Item onClick={onClick}>
            <span>{children}</span>
        </Dropdown.Item>
    );
}

const Client = ({loggedIn, signedInAcc}) => {
    const [showMyAccountModal, setShowMyAccountModal] = useState(false);
    const [showChainModal, setShowChainModal] = useState(false);
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [showRoomResults, setShowRoomResults] = useState(false);

    {/* Dropdown variables */}
    const [selectedChain, setSelectedChain] = useState("Chain");
    const [selectedHotel, setSelectedHotel] = useState("Hotel");
    const [selectedRating, setSelectedRating] = useState("Rating");
    const [selectedCapacity, setSelectedCapacity] = useState("Capacity");
    const [selectedArea, setSelectedArea] = useState("Area");
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [selectedReservation, setSelectedReservation] = useState("Reservation");

    const [clientsSQL, setClients] = useState([]);
    const [chainsSQL, setChains] = useState([]);
    const [hotelsSQL, setHotels] = useState([]);
    const [roomsSQL, setRooms] = useState([]);
    const [commoditiesSQL, setCommodities] = useState([]);
    const [reservationsSQL, setReservations] = useState([]);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const body = document.body;
        if (darkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }, [darkMode]);
    

    // useEffect for fetching clients data when component mounts
    useEffect(() => {
        getClients();
        getChains();
        getHotels();
        getRooms();
        getCommodities();
        getReservations();
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

    function getCommodities() {
        fetch('http://localhost:3001/commodities')
            .then(response => response.json())
            .then(data => {
                setCommodities(data);
            })
            .catch(error => {
                console.error('Error fetching commodities:', error);
            });
    }

    function getReservations() {
        fetch('http://localhost:3001/reservations')
            .then(response => response.json())
            .then(data => {
                setReservations(data);
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    }

    const handleSearchButtonClick = () => {
        // Check if all required criteria are selected
        if (
            selectedChain === "Chain" ||
            selectedHotel === "Hotel" ||
            !checkInDate ||
            !checkOutDate ||
            selectedCapacity === "Capacity" ||
            selectedRating === "Rating" ||
            selectedCategory === "Category" ||
            selectedArea === "Area"
        ) {
            // Alert if any required criteria is not selected
            alert("Please enter all required criteria.");
            return;
        }
    
        // Set showRoomResults to true if all criteria are selected
        setShowRoomResults(true);
    };

    const handleCloseMyAccountModal = () => setShowMyAccountModal(false);
    const handleShowMyAccountModal = () => setShowMyAccountModal(true);
    const handleCloseRoomModal = () => setShowRoomModal(false);
    const handleShowRoomModal = () => setShowRoomModal(true);
    const handleCloseChainModal = () => setShowChainModal(false);
    const handleShowChainModal = () => setShowChainModal(true);
    const handleCloseReservationModal = () => setShowReservationModal(false);
    const handleShowReservationModal = () => setShowReservationModal(true);

    const handleReserveModal = () => {
        // create reservation to be seen by client
        alert("Success! Your room has been reserved.");
        handleCloseRoomModal();
    }

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

    const handleChainClick = (option) => {
        setSelectedChain("Chain: " + option);
    }

    const handleHotelClick = (option) => {
        setSelectedHotel("Hotel: " + option);
    }

    const handleCapacityClick = (option) => {
        setSelectedCapacity(option);
    }

    const handleRatingClick = (option) => {
        setSelectedRating(option);
    }

    const handleCategoryClick = (option) => {
        setSelectedCategory(option);
    }

    const handleAreaClick = (option) => {
        setSelectedArea(option);
    }

    const handleReservationClick = (option) => {
        setSelectedReservation(option);
    }

    const handleMyAccountClick = () => {
        handleShowMyAccountModal();
    };

    const alertFunction = () => {
        alert("alert test");
    };

    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

 //   if (loggedIn !== 1){
 //       return (
  //          <div>
  //              Return to login page you are not logged in as a client
   //         </div>
   //         )
    //    }

    return (
        <div>
            <div className="my-account-button">
                <Button variant="secondary" onClick={handleShowChainModal}>My Account</Button>
                <Button variant="secondary" onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <Button variant="primary" disabled>
                    Disabled button test
                </Button>
            </div>
            <div className="search-bar">
                <h1>Welcome client!</h1>
                <InputGroup className="mb-3">
                <Dropdown as={InputGroup.Append}>
                    <Dropdown.Toggle variant="secondary">{selectedChain}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {chainsSQL.map(chain => (
                            <div key={chain.name}>
                                <CustomDropdownItem onClick={() => handleChainClick(chain.name)} isChecked={selectedChain.includes(chain.name)}>
                                    {chain.name}
                                </CustomDropdownItem>
                            </div>
                        ))}
                        <CustomDropdownItem isChecked={selectedChain.includes('Select all')}>
                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleChainClick('Select all')}>
                                <span style={{ marginRight: '10px' }}>Select all</span>
                                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); handleHelloButtonClick() }}>
                                    Hello
                                </button>
                            </div>
                        </CustomDropdownItem>
                    </Dropdown.Menu>
                </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">{selectedHotel}</Dropdown.Toggle>
                            <Dropdown.Menu>
                            {hotelsSQL.map(hotel => (
                                <div key={hotel.name}>
                                    <CustomDropdownItem onClick={() => handleHotelClick(hotel.name)} isChecked={selectedHotel.includes(hotel.name)}>
                                    {hotel.name}
                                    </CustomDropdownItem>
                                </div>
                            ))}
                            <CustomDropdownItem onClick={() => handleHotelClick('Select all')} isChecked={selectedHotel.includes('Select all')}>
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
                        <Dropdown.Toggle variant="secondary">{selectedReservation}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => handleReservationClick("Reservation: Reservation 1")} isChecked={false}>Reservation 1</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleReservationClick("Reservation: Reservation 2")} isChecked={false}>Reservation 2</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleReservationClick("Reservation: Reservation 3")} isChecked={false}>Reservation 3</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleReservationClick("Reservation: Reservation 4")} isChecked={false}>Reservation 4</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleReservationClick("Reservation: Reservation 5")} isChecked={false}>Reservation 5</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="primary" onClick={() => handleSearchButtonClick(true)}>Search</Button>
                </InputGroup>
            </div>
            <Modal show={showMyAccountModal} onHide={handleCloseMyAccountModal}>
                <Modal.Header closeButton>
                    <Modal.Title>My Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                <strong>Name:</strong> {signedInAcc.f_name + ' ' + signedInAcc.l_name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Address:</strong> {signedInAcc.address}
                            </Card.Text>
                            <Card.Text>
                                <strong>NAS:</strong> {signedInAcc.sin}
                            </Card.Text>
                            <Card.Text>
                                <strong>Register Date:</strong> {signedInAcc.r_date}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMyAccountModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showChainModal} onHide={handleCloseChainModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Chain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Typography component="legend">Rating</Typography>
                                <Rating name="read-only" value={4} readOnly />
                            {chainsSQL.map(chain => (
                                <div key={chain.name}>
                                    <Card.Text>
                                        <strong>Name:</strong> {chain.name}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Address:</strong> {chain.addres}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Nomber of hotels:</strong> {chain.num_hotels}
                                    </Card.Text>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseChainModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            {showRoomResults && selectedChain !== "Chain" && selectedHotel !== "Hotel" && checkInDate && checkOutDate && selectedCapacity !== "Capacity" && selectedRating !== "Rating" && selectedCategory !== "Category" && selectedArea !== "Area" && (
                <div>
                    <h2>Room Results</h2>
                    <div className="room-grid room-grid-flex">
                {roomsSQL.map(room => (
                    <Card style={{ width: '12rem' }}key={room.id} onClick={handleShowRoomModal} className="room-card">
                        <Card.Img
                            className="room-image"
                            variant="top"
                            src="/src/images/hotelRoom.png"
                            alt="Room Image"
                        />
                        <Card.Body>
                            <Card.Title>{room.id}</Card.Title>
                            <Card.Text>
                                <strong>Price:</strong> ${room.prix}/Night
                            </Card.Text>
                            <Card.Text>
                                <strong>Capacity:</strong> {room.capacity} Persons
                            </Card.Text>
                            {/* Add more information as needed */}
                        </Card.Body>
                        {/* Additional buttons or actions */}
                        {/* <Button variant="primary">View Details</Button> */}
                    </Card>
                ))}
                </div>
            </div>
            )}
            <Modal show={showRoomModal} onHide={handleCloseRoomModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Room Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {roomsSQL.map(room => (
                <div key={room.id}>
                    <p>
                        <strong>Room ID:</strong>{' '}
                        {room.id}
                    </p>
                    <p>
                        <strong>Price:</strong>{' '}
                        {"$" + room.prix + "/Night"}
                    </p>
                    <p>
                        <strong>Capacity:</strong>{' '}
                        {room.capacity + " Persons"}
                    </p>
                    <p>
                        <strong>View:</strong>{' '}
                        {room.view}
                    </p>
                    <p>
                        <strong>Extent:</strong>{' '}
                        {room.expanding}
                    </p>
                    <p>
                        <strong>Problems:</strong>{' '}
                        {room.problems}
                    </p>
                </div>
            ))}
            {commoditiesSQL.map(commoditie => (
                <div key={commoditie.id_room}>
                    <p>
                        <strong>Commodities:</strong>{' '}
                        {commoditie.id_room}
                    </p>
                </div>
            ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRoomModal}>Close</Button>
                    <Button variant="primary" onClick={handleReserveModal}>Reserve</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Client;