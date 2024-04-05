import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputGroup, Button, Dropdown, Modal, Card, Form } from 'react-bootstrap';
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

function CustomDropdownItem({ children, onClick, isSelected }) {
    return (
        <Dropdown.Item onClick={onClick} style={{ backgroundColor: isSelected ? 'lightgray' : 'white' }}>
            <span>{children}</span>
        </Dropdown.Item>
    );
}

const Client = ({loggedIn, signedInAcc}) => {
    const [showMyAccountModal, setShowMyAccountModal] = useState(false);
    const [showChainModal, setShowChainModal] = useState(false);
    const [showHotelModal, setShowHotelModal] = useState(false);
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [darkMode, setDarkMode] = useState(false);


    {/* Dropdown variables */}
    const [selectedChains, setSelectedChains] = useState([]);
    const [selectedHotels, setSelectedHotels] = useState([]);
    const [selectedHotelIds, setSelectedHotelIds] = useState([]);

    const [selectedArea, setSelectedArea] = useState("Area");    

    const [clientsSQL, setClients] = useState([]);
    const [chainsSQL, setChains] = useState([]);
    const [hotelsSQL, setHotels] = useState([]);
    const [roomsSQL, setRooms] = useState([]);
    const [commoditiesSQL, setCommodities] = useState([]);
    const [reservationsSQL, setReservations] = useState([]);
    const [rentalsSQL, setRentals] = useState([]);


    const [capacitySize, setCapacitySize] = useState(0);
    const [categoryChosen, setCategoryChosen] = useState(0);

    const [hotelIdsBasedOnChains, setHotelIdsBasedOnChains]  = useState([]);
    const [hotelIdsBasedOnCategory, setHotelIdsBasedOnCategory]  = useState([]);

    const [roomsToShow, setRoomsToShow] = useState([]);

    const [selectedRoomId, setSelectedRoomId] = useState(null);

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
        getRentals();
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
                setSelectedChains(data.map(chain => chain.name));
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
                setSelectedHotelIds(data.map(hotel => hotel.id));
                setHotelIdsBasedOnChains(data.map(hotel => hotel.id));
                setHotelIdsBasedOnCategory(data.map(hotel => hotel.id));
                setSelectedHotels(data);
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
                setRoomsToShow(data);
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

    function createReservation(client_sin, id_room, s_date, e_date) {
        fetch('http://localhost:3001/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({client_sin: client_sin.toString(), id_room: id_room.toString(), s_date, e_date}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                //alert(data);
                getRentals();
            });
    }

    function getRentals() {
        fetch('http://localhost:3001/rentals')
            .then(response => response.json())
            .then(data => {
                setRentals(data);
            })
            .catch(error => {
                console.error('Error fetching rentals:', error);
            });
    }

    const handleCloseMyAccountModal = () => setShowMyAccountModal(false);
    const handleShowMyAccountModal = () => setShowMyAccountModal(true);
    const handleCloseChainModal = () => setShowChainModal(false);
    const handleShowChainModal = () => setShowChainModal(true);
    const handleCloseHotelModal = () => setShowHotelModal(false);
    const handleShowHotelModal = () => setShowHotelModal(true);
    const handleCloseRoomModal = () => setShowRoomModal(false);
    const handleShowRoomModal = (room) => {
        setSelectedRoom(room);
        setShowRoomModal(true);
    }

    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleCloseReservationModal = () => setShowReservationModal(false);
    const handleShowReservationModal = () => setShowReservationModal(true);

    const handleReserveModal = () => {
        // Create reservation using the selected room ID and check-in/check-out dates
        if (checkInDate === null || checkOutDate === null){
            alert('You need a checkin and checkout date to be able to reserve a room');
            return;
        }
        createReservation(signedInAcc.sin, selectedRoom.id, checkInDate.toLocaleDateString('en-CA'), checkOutDate.toLocaleDateString('en-CA'));
        handleCloseRoomModal();
    };

    const handleCheckInChange = (date) => {
        // Ensure checkInDate is not after checkOutDate
        if (checkOutDate && date >= checkOutDate) {
            alert('Check in date must be before check out date');
            return; // Do not update state
        }
        // Set check-in date
        setCheckInDate(date);
    }
    
    const handleCheckOutChange = (date) => {
        // Ensure checkOutDate is not before checkInDate
        if (checkInDate && date <= checkInDate) {
            alert('Check out date must be after check in date');
            return; // Do not update state
        }
        // Set check-out date
        setCheckOutDate(date);
    }

    const handleChainClick = (chainName) => {
        if (chainName === 'Select all') {
            if (selectedChains.length === chainsSQL.length) {
                setSelectedChains([]); // If all chains are selected, deselect all
                setHotelIdsBasedOnChains([]);
                setSelectedHotels([]);
            } else {
                const chainNames = chainsSQL.map(chain => chain.name);
                setSelectedChains(chainNames); // Select all chains
                const hotelIds = hotelsSQL.map(hotel => hotel.id);
                setHotelIdsBasedOnChains(hotelIds);
                //do something for setSelectedHotels
            }
        } else {
            if (selectedChains.includes(chainName)) {
                setSelectedChains(selectedChains.filter(chain => chain !== chainName)); // Deselect the chain
                // Also deselect the hotels of this chain
                const hotelsOfThisChain = hotelsSQL.filter(hotel => hotel.chain_name === chainName);
                setHotelIdsBasedOnChains(hotelIdsBasedOnChains.filter(id => !hotelsOfThisChain.map(hotel => hotel.id).includes(id)));
                const filteredSelectedHotels = selectedHotels.filter(hotel =>
                    !hotelsOfThisChain.map(hotel => hotel.id).includes(hotel.id)
                    );
                setSelectedHotels(filteredSelectedHotels);
            } else {
                setSelectedChains([...selectedChains, chainName]); // Select the chain
                // Also select the hotels of this chain
                const hotelsOfThisChain = hotelsSQL.filter(hotel => hotel.chain_name === chainName);
                setHotelIdsBasedOnChains([...hotelIdsBasedOnChains, ...hotelsOfThisChain.map(hotel => hotel.id)]);
                //setSelectedHotels([...selectedHotels, ...hotelsOfThisChain]);
            }
        }
    };

    const handleHotelClick = (hotelName) => {
        if (hotelName === 'Select all') {
            const categoryAndChain = hotelIdsBasedOnChains.filter((element) => hotelIdsBasedOnCategory.includes(element));
            const categoryAndChainLength = categoryAndChain.length;
            //alert(JSON.stringify(categoryAndChain));
            //alert(JSON.stringify(categoryAndChainLength));
            if (selectedHotels.length === categoryAndChainLength) {
                setSelectedHotels([]); // If all chains are selected, deselect all
            } else {
                const hotelsToSelect = hotelsSQL.filter(hotel => categoryAndChain.includes(hotel.id));
                setSelectedHotels(hotelsToSelect);
            }
        } else {
            const hotel = hotelsSQL.find(hotel => hotel.name === hotelName);
            //alert(JSON.stringify(hotel));
            if (selectedHotels.includes(hotel)) {
                setSelectedHotels(selectedHotels.filter(hotel1 => hotel1.name !== hotelName));
            } else {
                setSelectedHotels([...selectedHotels, hotel]);
            }
        }
    };

    const handleSearchClick = (capacity, s_date, e_date) => {

        //First thing it does it get rooms with chosen capacity
        let selectedHotelIds = selectedHotels.map(hotel => hotel.id);
        let selectedRooms = [];
        if (capacity === 0){
            selectedRooms = roomsSQL.filter(room => selectedHotelIds.includes(room.hotel_id)).map(room => room);
        }
        else if (capacity === 1){
            selectedRooms = roomsSQL.filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 1)
            .map(room => room);
        }
        else if (capacity === 2){
            selectedRooms = roomsSQL.filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 2)
            .map(room => room);
        }
        else if (capacity === 3){
            selectedRooms = roomsSQL.filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 3)
            .map(room => room);
        }
        else if (capacity === 4){
            selectedRooms = roomsSQL.filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 4)
            .map(room => room);
        }
        else if (capacity === 5){
            selectedRooms = roomsSQL.filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 5)
            .map(room => room);
        }

        //Now I remove rooms which dont match with the date
        if (s_date !== null && e_date !== null){
            let resAndRent = reservationsSQL.concat(rentalsSQL);
            // Get the IDs of the rooms that have overlapping reservations
            let overlappingRoomIds = resAndRent.filter(reservation =>
                datesOverlap(s_date.toLocaleDateString('en-CA'), e_date.toLocaleDateString('en-CA'), reservation.s_date, reservation.e_date)
            ).map(reservation => reservation.id_room);

            // Get the rooms that don't have overlapping reservations
            let availableRooms = selectedRooms.filter(room => !overlappingRoomIds.includes(room.id));
            selectedRooms = availableRooms;
        }

        setRoomsToShow(selectedRooms);
    }

    const handleCategoryClick = (option) => {
        const hotelsOfThisCategory = hotelsSQL.filter(hotel => hotel.ratings === option);
        const hotelsToSelect = hotelsSQL.filter(hotel => hotelIdsBasedOnChains.includes(hotel.id));
        //alert(JSON.stringify(hotelsToSelect));
        if (option === 0){
            setHotelIdsBasedOnCategory(hotelsSQL.map(hotel => hotel.id));
            setSelectedHotels(hotelsToSelect);
        }
        else if (option === 3){

            setHotelIdsBasedOnCategory(hotelsSQL
                .filter(hotel => hotel.ratings === 3)
                .map(hotel => hotel.id)
                );
            const intersectionHotels = hotelsToSelect.filter(hotel =>
                hotelsOfThisCategory.map(hotel => hotel.id).includes(hotel.id)
                );
            setSelectedHotels(intersectionHotels);
        }
        else if (option === 4){
            setHotelIdsBasedOnCategory(hotelsSQL
                .filter(hotel => hotel.ratings === 4)
                .map(hotel => hotel.id)
                );
            const intersectionHotels = hotelsToSelect.filter(hotel =>
                hotelsOfThisCategory.map(hotel => hotel.id).includes(hotel.id)
                );
            setSelectedHotels(intersectionHotels);
        }
        else if (option === 5){
            setHotelIdsBasedOnCategory(hotelsSQL
                .filter(hotel => hotel.ratings === 5)
                .map(hotel => hotel.id)
                );
            const intersectionHotels = hotelsToSelect.filter(hotel =>
                hotelsOfThisCategory.map(hotel => hotel.id).includes(hotel.id)
                );
            setSelectedHotels(intersectionHotels);
        }
    }

    const handleAreaClick = (option) => {
        setSelectedArea(option);
    }

    const handleMyAccountClick = () => {
        handleShowMyAccountModal();
    };


    function getIntersectionLength(array1, array2) {
        const intersection = array1.filter(element => array2.includes(element));
        return intersection.length;
    }

    function datesOverlap(s_date1, e_date1, s_date2, e_date2) {
        return (s_date1 >= s_date2 && s_date1 <= e_date2) ||  // start date of first range is within second range
               (e_date1 >= s_date2 && e_date1 <= e_date2) ||  // end date of first range is within second range
               (s_date2 >= s_date1 && s_date2 <= e_date1) ||  // start date of second range is within first range
               (e_date2 >= s_date1 && e_date2 <= e_date1);    // end date of second range is within first range
    }

    function printCommodities(commodities, roomId){
        const commodityNames = [];
        // Find the commodity object with the specified room_id
        const commodity = commodities.find(c => c.id_room === roomId);

        if (commodity) {
            // Iterate over each key in the commodity object
            for (const key in commodity) {
                // Skip the 'id_room' key
                if (key !== 'id_room') {
                    // If the value is true, add the key name to the list
                    if (commodity[key]) {
                        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                        commodityNames.push(capitalizedKey);
                    }
                }
            }

            // Join the commodity names into a comma-separated string
            const result = commodityNames.join(', ');
            return result;
        } else {
            return "This room doesn't have specific commodities.";
        }
    }

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
            <Button variant="secondary" className="search-button" onClick={handleShowChainModal}>View Chains</Button>
            <Button variant="secondary" className="positive-modal-button" onClick={handleShowHotelModal}>View Hotels</Button>
                <Button variant="secondary" className="dropdown-button" onClick={handleMyAccountClick}>My Account</Button>
                {/*  <Button variant="secondary" onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>*/}
            </div>
            <div className="search-bar">
                <h1>Welcome client!</h1>
                <InputGroup className="mb-3">
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary" className="dropdown-button">Select chains</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {chainsSQL.map(chain => (
                                <div key={chain.name}>
                                    <Form.Check 
                                        type="checkbox"
                                        id={chain.name}
                                        label={chain.name}
                                        checked={selectedChains.includes(chain.name)}
                                        onChange={() => handleChainClick(chain.name)}
                                    />
                                </div>
                            ))}
                            <Form.Check 
                                type="checkbox"
                                id="selectAll"
                                label="Select all"
                                checked={selectedChains.length === chainsSQL.length}
                                onChange={() => handleChainClick('Select all')}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary" className="dropdown-button">Select hotels</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {hotelsSQL.filter(hotel => 
                                hotelIdsBasedOnChains.includes(hotel.id) && hotelIdsBasedOnCategory.includes(hotel.id))
                                .map(hotel => (
                                <div key={hotel.name}>
                                    <Form.Check 
                                        type="checkbox"
                                        id={hotel.name}
                                        label={hotel.name}
                                        checked={selectedHotels.includes(hotel)}
                                        onChange={() => handleHotelClick(hotel.name)}
                                    />
                                </div>
                            ))}
                            <Form.Check 
                                type="checkbox"
                                id="selectAll"
                                label="Select all"
                                checked={selectedHotels.length === getIntersectionLength(hotelIdsBasedOnChains, hotelIdsBasedOnCategory)}
                                onChange={() => handleHotelClick('Select all')}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                    <DatePicker
                        variant="secondary"
                        className="dropdown-button"
                        selected={checkInDate}
                        onChange={(date) => {
                            handleCheckInChange(date);
                            handleSearchClick(capacitySize, date, checkOutDate);
                        }}
                        placeholderText="Check In"
                    />
                    <DatePicker
                        variant="secondary"
                        className="dropdown-button"
                        selected={checkOutDate}
                        onChange={(date) => {
                            handleCheckOutChange(date);
                            handleSearchClick(capacitySize, checkInDate, date);
                        }}
                        placeholderText="Check Out"
                    />
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary" className="dropdown-button">Select Capacity</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => {setCapacitySize(1);}} isSelected={capacitySize === 1}>1 Person</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(2);}} isSelected={capacitySize === 2}>2 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(3);}} isSelected={capacitySize === 3}>3 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(4);}} isSelected={capacitySize === 4}>4 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(5);}} isSelected={capacitySize === 5}>5 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(0);}} isSelected={capacitySize === 0}>Any</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary" className="dropdown-button">Hotel Category</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(5); setCategoryChosen(5);}} isSelected={categoryChosen === 5}>5 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(4); setCategoryChosen(4);}} isSelected={categoryChosen === 4}>4 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(3); setCategoryChosen(3);}} isSelected={categoryChosen === 3}>3 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(0); setCategoryChosen(0);}} isSelected={categoryChosen === 0}>Any</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary" className="dropdown-button">Select Area</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 200 Square Ft")} isChecked={false}>200 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 300 Square Ft")} isChecked={false}>300 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 400 Square Ft")} isChecked={false}>400 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 500 Square Ft")} isChecked={false}>500 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: 1000 Square Ft")} isChecked={false}>1000 Square Ft</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleAreaClick("Area: Any")} isChecked={false}>Any</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="secondary" className="negative-modal-button" onClick={() => {setCheckInDate(null); setCheckOutDate(null); handleSearchClick(capacitySize, null, null);}} >Reset Dates</Button>
                    <Button variant="primary" className="search-button" onClick={() => {handleSearchClick(capacitySize, checkInDate, checkOutDate);}} >Search</Button>
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
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseMyAccountModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showChainModal} onHide={handleCloseChainModal}>
                <Modal.Header closeButton>
                    <Modal.Title>View Chains</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
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
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseChainModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showHotelModal} onHide={handleCloseHotelModal}>
                <Modal.Header closeButton>
                    <Modal.Title>View Hotels</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            {hotelsSQL.map(hotel => (
                                <div key={hotel.id}>
                                    <Card.Text>
                                        <h4 style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong>{hotel.name}</strong>
                                            <span style={{ marginLeft: 'auto', marginTop: '3px' }}>
                                                <Rating name="read-only" value={hotel.ratings} readOnly />
                                            </span>
                                        </h4>
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Hotel ID:</strong> {hotel.id}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Address:</strong> {hotel.address}
                                    </Card.Text>
                                    <Card.Text style={{ marginBottom: '30px' }}>
                                        <strong>Associated Chain:</strong> {hotel.chain_name}
                                    </Card.Text>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseHotelModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <div>
                <h2>Room Results</h2>
                <div className="room-container">
                    <div className="room-grid room-grid-flex">
                        {roomsToShow.map(room => 
                            <Card style={{ width: '12.65rem' }}key={room.id} onClick={() => {handleShowRoomModal(room); setSelectedRoomId(room.id);}} className="room-card">
                                <Card.Img
                                    className="room-image"
                                    variant="top"
                                    src="/src/images/hotelRoom.png"
                                    alt="Room Image"
                                />
                                <Card.Body>
                                    <Card.Title>{room.id}</Card.Title>
                                    <Card.Text>
                                        <strong>Price:</strong> ${room.price}/Night
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Capacity:</strong> {room.capacity} Persons
                                    </Card.Text>
                                    {/* Add more information as needed */}
                                </Card.Body>
                                {/* Additional buttons or actions */}
                                {/* <Button variant="primary">View Details</Button> */}
                            </Card>
                        )}
                    </div>
                </div>
            </div>
            
            <h2>My Rentals</h2>
            <Modal show={showRoomModal} onHide={handleCloseRoomModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Room Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRoom && (
                        <div key={selectedRoom.id}>
                            <p>
                                <strong>Hotel ID:</strong>{' '}
                                {(hotelsSQL.find(hotel => hotel.id === selectedRoom.hotel_id)).name}
                            </p>
                            <p>
                                <strong>Room ID:</strong>{' '}
                                {selectedRoom.id}
                            </p>
                            <p>
                                <strong>Price:</strong>{' '}
                                {"$" + selectedRoom.prix + "/Night"}
                            </p>
                            <p>
                                <strong>Capacity:</strong>{' '}
                                {selectedRoom.capacity + " Persons"}
                            </p>
                            <p>
                                <strong>View:</strong>{' '}
                                {selectedRoom.view}
                            </p>
                            <p>
                                <strong>Extent:</strong>{' '}
                                {selectedRoom.expanding ? 'yes' : 'no'}
                            </p>
                            <p>
                                <strong>Problems:</strong>{' '}
                                {selectedRoom.problems}
                            </p>
                            <p>
                                <strong>Commodities:</strong>{' '}
                                {printCommodities(commoditiesSQL, selectedRoom.id)}
                            </p>
                        </div>
                    )}
                    {/*{commoditiesSQL.map(commoditie => (
                        <div key={commoditie.id_room}>
                            <p>
                                <strong>Commodities:</strong>{' '}
                                {commoditie.id_room}
                            </p>
                        </div>
                    ))}*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseRoomModal}>Close</Button>
                    <Button variant="primary" className="positive-modal-button" onClick={handleReserveModal}>Reserve</Button>
                    <Button variant="secondary" className="search-button">View Hotel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Client;