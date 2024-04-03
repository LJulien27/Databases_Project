import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputGroup, Button, Dropdown, Modal, Card, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Client.css';
import './Background.css';

function CustomDropdownItem({ children, onClick, isSelected }) {
    return (
        <Dropdown.Item onClick={onClick} style={{ backgroundColor: isSelected ? 'lightgray' : 'white' }}>
            <span>{children}</span>
        </Dropdown.Item>
    );
}

const Employee = ({loggedIn, signedInAcc}) => {
    const [showMyAccountModal, setShowMyAccountModal] = useState(false);
    const [showChainModal, setShowChainModal] = useState(false);
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    {/* Dropdown variables */}

    const [selectedChains, setSelectedChains] = useState([]);
    const [selectedHotels, setSelectedHotels] = useState([]);

    const [capacitySize, setCapacitySize] = useState(0);
    const [categoryChosen, setCategoryChosen] = useState(0);

    const [hotelIdsBasedOnChains, setHotelIdsBasedOnChains]  = useState([]);
    const [hotelIdsBasedOnCategory, setHotelIdsBasedOnCategory]  = useState([]);

    const [selectedArea, setSelectedArea] = useState("Area");

    const [roomsToShow, setRoomsToShow] = useState([]);

    const [clientsSQL, setClients] = useState([]);
    const [chainsSQL, setChains] = useState([]);
    const [hotelsSQL, setHotels] = useState([]);
    const [roomsSQL, setRooms] = useState([]);
    const [commoditiesSQL, setCommodities] = useState([]);
    const [reservationsSQL, setReservations] = useState([]);
    const [rentalsSQL, setRentals] = useState([]);

    const [clientSin, setClientSin] = useState('');
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

    function deleteReservation(client_sin, id_room) {
        fetch(`http://localhost:3001/reservations/${id_room}/${client_sin}`, {
            method: 'DELETE',
            //body: {sin, id},
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getReservations();
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

    function createRental(client_sin, id_room, s_date, e_date) {
        fetch('http://localhost:3001/rentals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({client_sin, id_room, s_date, e_date}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                //alert(data);
                getRentals();
            });
    }

    const handleReserveToRental = () => {
        let client_sin = parseInt(prompt('What is the clients sin'));
        let id_room = parseInt(prompt('What is the room id'));
        const reservation = reservationsSQL.find(reservation => reservation.client_sin === client_sin && reservation.id_room === id_room);
        createRental(reservation.client_sin, reservation.id_room, reservation.s_date, reservation.e_date);
        deleteReservation(client_sin, id_room);

    }

    const handleCloseMyAccountModal = () => setShowMyAccountModal(false);
    const handleShowMyAccountModal = () => setShowMyAccountModal(true);
    const handleCloseRoomModal = () => setShowRoomModal(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const handleShowRoomModal = (room) => {
        setSelectedRoom(room);
        setShowRoomModal(true);
    }
    //const handleShowRoomModal = () => setShowRoomModal(true);
    const handleCloseChainModal = () => setShowChainModal(false);
    const handleShowChainModal = () => setShowChainModal(true);
    const handleCloseReservationModal = () => setShowReservationModal(false);
    const handleShowReservationModal = () => setShowReservationModal(true);


    //Pay variables
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCCV, setCardCCV] = useState('');
    const [errorCardDetails, setErrorCardDetails] = useState("");
    const handlePayModal = () => {
        // create reservation to be seen by client
        if (checkInDate === null || checkOutDate === null){
            alert('You need to have a checkin date and a checkout date to make a rental');
            return;
        }
        handleCloseRoomModal();
        setShowPaymentModal(true);
    }
    const handleNewRental = () => {
        if (clientsSQL.every(client => client.sin !== parseInt(clientSin))) {
            setErrorCardDetails('This client does not exist');
            return;
        }
        if (nameOnCard === ''){
            setErrorCardDetails('You must enter a name');
            return;
        }
        if (!/^\d{16}$/.test(cardNum)) {
            setErrorCardDetails('Invalid credit card number');
            return;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
            setErrorCardDetails('Invalid expiry date');
            return;
        }
        if (!/^\d{3}$/.test(cardCCV)) {
            setErrorCardDetails('Invalid credit card ccv');
            return;
        }
        createRental(parseInt(clientSin), selectedRoomId, checkInDate.toLocaleDateString('en-CA'), checkOutDate.toLocaleDateString('en-CA'));
        setErrorCardDetails('');
        alert('Congratulations youve rented this room');
        setShowPaymentModal(false);
        
    }

    //NEW RENTAL
    const handleNewRentalModal = () => {
        if (checkInDate === null || checkOutDate === null){
            alert('You need to have a checkin and checkout date');
            return;
        }

        let client_sin = parseInt(prompt('What is the clients sin'));
        const doesClientExist = clientsSQL.some(client => client.sin === client_sin);
        if (!doesClientExist) {
            alert('This client does not exist.');
            return;
        }

        createRental(client_sin, selectedRoom.id, checkInDate.toLocaleDateString('en-CA'), checkOutDate.toLocaleDateString('en-CA'));
        alert("You've successfully rented a room to ", client_sin);
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

    const handleRemoveHotel = () => {
        const categoryAndChain = hotelIdsBasedOnChains.filter((element) => hotelIdsBasedOnCategory.includes(element));
        const filteredSelectedHotels = selectedHotels.filter((hotel) => categoryAndChain.includes(hotel.id));
        setSelectedHotels(filteredSelectedHotels);
    }

    //EDIT THIS
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
 //   if (loggedIn !== 2){
 //       return (
  //          <div>
  //              Return to login page you are not logged in as an Employee
   //         </div>
   //         )
    //    }

    return (
        <div>
            <div className="my-account-button">
                <Button variant="secondary" onClick={handleMyAccountClick}>My Account</Button>
                <Button variant="secondary" onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <Button variant="primary" disabled>
                    Disabled button test
                </Button>
            </div>

            <div className="search-bar">
                <h1>Welcome Employee!</h1>
                {JSON.stringify(hotelIdsBasedOnChains)}
                {JSON.stringify(hotelIdsBasedOnCategory)}
                {JSON.stringify(selectedHotels)}
                <InputGroup className="mb-3">
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">Select chains</Dropdown.Toggle>
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
                        <Dropdown.Toggle variant="secondary">Select hotels</Dropdown.Toggle>
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
                        selected={checkInDate}
                        onChange={(date) => {
                            handleCheckInChange(date);
                            handleSearchClick(capacitySize, date, checkOutDate);
                        }}
                        placeholderText="Check In"
                    />
                    <DatePicker
                        selected={checkOutDate}
                        onChange={(date) => {
                            handleCheckOutChange(date);
                            handleSearchClick(capacitySize, checkInDate, date);
                        }}
                        placeholderText="Check Out"
                    />
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">Select capacity</Dropdown.Toggle>
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
                        <Dropdown.Toggle variant="secondary">Hotel category</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(5); setCategoryChosen(5);}} isSelected={categoryChosen === 5}>5 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(4); setCategoryChosen(4);}} isSelected={categoryChosen === 4}>4 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(3); setCategoryChosen(3);}} isSelected={categoryChosen === 3}>3 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(0); setCategoryChosen(0);}} isSelected={categoryChosen === 0}>Any</CustomDropdownItem>
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
                    <Button variant="secondary" onClick={() => {setCheckInDate(null); setCheckOutDate(null); handleSearchClick(capacitySize, null, null);}} >Reset Dates</Button>
                    <Button variant="primary" onClick={() => {handleSearchClick(capacitySize, checkInDate, checkOutDate);}} >Search</Button>
                </InputGroup>
            </div>

            {JSON.stringify(reservationsSQL)}
            <Button variant="success" onClick={handleReserveToRental}>turn into rental</Button>
            {JSON.stringify(rentalsSQL)}

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
                                <strong>Role:</strong> {signedInAcc.role}
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
            <h2>Room Results</h2>
            <div className="room-grid room-grid-flex">
                {roomsToShow.map(room => 
                    <Card style={{ width: '12rem' }}key={room.id} onClick={() => {handleShowRoomModal(room); setSelectedRoomId(room.id);}} className="room-card">
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

            {/*
            I need to edit this more, similar to what the regular show of rooms looks like but when I click it, I can turn it into a rental
            */}
            <h2>Reserved rooms</h2>
            <div className="room-grid room-grid-flex">
                {roomsSQL.filter(room => reservationsSQL.some(reservation => reservation.id_room === room.id)).map(room => 
                    <Card style={{ width: '12rem' }}key={room.id} onClick={() => handleShowRoomModal(room)} className="room-card">
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

            <Modal show={showRoomModal} onHide={handleCloseRoomModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Room Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRoom && (
                        <div key={selectedRoom.id}>
                            <p>
                                <strong>Hotel:</strong>{' '}
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
                                {selectedRoom.expanding}
                            </p>
                            <p>
                                <strong>Problems:</strong>{' '}
                                {selectedRoom.problems}
                            </p>
                        </div>
                    )}
                    {/*commoditiesSQL.map(commoditie => (
                        <div key={commoditie.id_room}>
                            <p>
                                <strong>Commodities:</strong>{' '}
                                {commoditie.id_room}
                            </p>
                        </div>
                    ))*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRoomModal}>Close</Button>
                    <Button variant="primary" onClick={handlePayModal}>Make rental</Button>
                    <Button variant="primary" onClick={handleNewRentalModal}>Rent</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPaymentModal} onHide={setShowPaymentModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Rental Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Clients SIN</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={clientSin}
                                onChange={e => setClientSin(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name on card</Form.Label>
                            <Form.Control
                                type="text"
                                value={nameOnCard}
                                onChange={e => setNameOnCard(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Card number</Form.Label>
                            <Form.Control
                                type="password"
                                value={cardNum}
                                onChange={e => setCardNum(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Expiry date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChange={e => setCardExpiry(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>CCV</Form.Label>
                            <Form.Control
                                type="text"
                                value={cardCCV}
                                onChange={e => setCardCCV(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {errorCardDetails && <p style={{ color: 'red' }}>{errorCardDetails}</p>}
                    <Button variant="primary" onClick={handleNewRental}>
                        Pay
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Employee;