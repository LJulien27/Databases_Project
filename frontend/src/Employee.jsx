import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputGroup, Button, Dropdown, Modal, Card, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Client.css';
import './Background.css';

function CustomDropdownItem({ children, onClick }) {
    return (
        <Dropdown.Item onClick={onClick}>
            <span>{children}</span>
        </Dropdown.Item>
    );
}

const Employee = ({loggedIn, signedInAcc}) => {
    const [showMyAccountModal, setShowMyAccountModal] = useState(false);
    const [showChainModal, setShowChainModal] = useState(false);
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    {/* Dropdown variables */}

    const [selectedChains, setSelectedChains] = useState([]);
    const [selectedHotels, setSelectedHotels] = useState([]);

    //selectedCapacity might get erased
    const [selectedCapacity, setSelectedCapacity] = useState([]);
    const [capacitySize, setCapacitySize] = useState(0);

    const [hotelIdsBasedOnChains, setHotelIdsBasedOnChains]  = useState([]);
    const [hotelIdsBasedOnCategory, setHotelIdsBasedOnCategory]  = useState([]);

    const [selectedArea, setSelectedArea] = useState("Area");
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

    const [clientsSQL, setClients] = useState([]);
    const [chainsSQL, setChains] = useState([]);
    const [hotelsSQL, setHotels] = useState([]);
    const [roomsSQL, setRooms] = useState([]);
    const [commoditiesSQL, setCommodities] = useState([]);
    const [reservationsSQL, setReservations] = useState([]);
    const [rentalsSQL, setRentals] = useState([]);


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
                setSelectedCapacity(data.map(room => room.id));
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

    const handleReserveModal = () => {
        // create reservation to be seen by client
        alert("Success! Your room has been reserved.");
        handleCloseRoomModal();
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

    //EDIT THIS
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
    const handleCapacityClick = (option) => {
        let selectedHotelIds = selectedHotels.map(hotel => hotel.id);
        if (option === 0){
            setSelectedCapacity(roomsSQL
                .filter(room => selectedHotelIds.includes(room.hotel_id))
                .map(room => room.id)
                );
        }
        else if (option === 1){
            setSelectedCapacity(roomsSQL
                .filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 1)
                .map(room => room.id)
                );
        }
        else if (option === 2){
            setSelectedCapacity(roomsSQL
                .filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 2)
                .map(room => room.id)
                );
        }
        else if (option === 3){
            setSelectedCapacity(roomsSQL
                .filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 3)
                .map(room => room.id)
                );
        }
        else if (option === 4){
            setSelectedCapacity(roomsSQL
                .filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 4)
                .map(room => room.id)
                );
        }
        else if (option === 5){
            setSelectedCapacity(roomsSQL
                .filter(room => selectedHotelIds.includes(room.hotel_id) && room.capacity === 5)
                .map(room => room.id)
                );
        }
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

    //SEARCH BUTTON, VERY IMPORTANT!!!!!!
    const handleSearchRooms = () => {
        const chainAndCategoryIds = hotelIdsBasedOnChains.filter((element) => hotelIdsBasedOnCategory.includes(element));

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
                        onChange={handleCheckInChange}
                        placeholderText="Check In"
                    />
                    <DatePicker
                        selected={checkOutDate}
                        onChange={handleCheckOutChange}
                        placeholderText="Check Out"
                    />
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">Select capacity</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => {setCapacitySize(1);}} isChecked={false}>1 Person</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(2);}} isChecked={false}>2 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(3);}} isChecked={false}>3 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(4);}} isChecked={false}>4 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(5);}} isChecked={false}>5 Persons</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {setCapacitySize(0);}} isChecked={false}>Any</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary">Hotel category</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => handleCategoryClick(5)} isChecked={false}>5 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCategoryClick(4)} isChecked={false}>4 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCategoryClick(3)} isChecked={false}>3 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => handleCategoryClick(0)} isChecked={false}>Any</CustomDropdownItem>
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
                    <Button variant="primary" onClick={() => handleCapacityClick(capacitySize)} >Search</Button>
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
                {roomsSQL.filter(room => selectedCapacity.includes(room.id)).map(room => (
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
                ))}
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
                    <Button variant="primary" onClick={handleReserveModal}>Reserve</Button>
                    <Button variant="primary" onClick={handleNewRentalModal}>Rent</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Employee;