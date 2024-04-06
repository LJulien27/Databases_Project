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
    const [showClientSettingsModal, setShowClientSettingsModal] = useState(false);
    const [showEmployeeSettingsModal, setShowEmployeeSettingsModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showChainSettingsModal, setShowChainSettingsModal] = useState(false);
    const [showHotelSettingsModal, setShowHotelSettingsModal] = useState(false);
    const [showRoomSettingsModal, setShowRoomSettingsModal] = useState(false);
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
    const [employeesSQL, setEmployees] = useState([]);
    const [chainsSQL, setChains] = useState([]);
    const [hotelsSQL, setHotels] = useState([]);
    const [roomsSQL, setRooms] = useState([]);
    const [commoditiesSQL, setCommodities] = useState([]);
    const [reservationsSQL, setReservations] = useState([]);
    const [rentalsSQL, setRentals] = useState([]);

    const [clientSin, setClientSin] = useState('');
    //const [EmployeeSin, setEmployeeSin] = useState('');
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
        getEmployees();
        getChains();
        getHotels();
        getRooms();
        getCommodities();
        getReservations();
        getRentals();
    }, []);

    // Functions to fetch data
    function getEmployees() {
        fetch('http://localhost:3001/employees')
            .then(response => response.json())
            .then(data => {
                // Set clients data to state
                setEmployees(data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }

    function deleteEmployee(sin) {
        
        fetch(`http://localhost:3001/employees/${sin}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getEmployees();
        });
    }

    function createEmployee(f_name, l_name, sin, address, role, hotel_id, password) {
        fetch('http://localhost:3001/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({f_name, l_name, sin, address, role, hotel_id, password}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                getEmployees();
            });
    }

    function updateEmployee(f_name, l_name, sin, address, role, hotel_id, password) {
        fetch(`http://localhost:3001/employees/${sin}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({f_name, l_name, sin, address, role, hotel_id, password}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                getEmployees();
            });
    }

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

    function createClient(f_name, l_name, sin, address, r_date, password) {
        fetch('http://localhost:3001/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({f_name, l_name, sin, address, r_date, password}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                getClients();
            });
    }

    function deleteClient(sin) {
        
        fetch(`http://localhost:3001/clients/${sin}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getClients();
        });
    }

    function updateClient(f_name, l_name, sin, address, r_date, password) {
        fetch(`http://localhost:3001/clients/${sin}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({f_name, l_name, sin, address, r_date, password}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                getClients();
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
    
    function createChain(name, address) {
        fetch('http://localhost:3001/chains', {
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
                getChains();
            });
    }

    function deleteChain(name) {
        fetch(`http://localhost:3001/chains/${name}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getChains();
        });
    }

    function updateChain(oldName, name, address) {
        fetch(`http://localhost:3001/chains/${oldName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({oldName, name, address}),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getChains();
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

    function createHotel(name, address, id, rooms, chain_name, ratings) {
        fetch('http://localhost:3001/hotels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, address, id, rooms, chain_name, ratings}),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getHotels();
        });
    }

    function deleteHotel(id) {
        fetch(`http://localhost:3001/hotels/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getHotels();
        });
    }

    function updateHotel(name, address, rooms, chain_name, ratings, id) {
        fetch(`http://localhost:3001/hotels/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address, rooms, chain_name, ratings, id }),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getHotels();
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

    function createRoom(id, hotel_id, price, capacity, view, problems, expanding) {
        fetch('http://localhost:3001/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, hotel_id, price, capacity, view, problems, expanding}),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getRooms();
        });
    }

    function deleteRoom(id) {
        fetch(`http://localhost:3001/rooms/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getRooms();
        });
    }

    function updateRoom(id, hotel_id, price, capacity, view, problems, expanding) {
        fetch(`http://localhost:3001/rooms/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, hotel_id, price, capacity, view, problems, expanding }),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getRooms();
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

    const handleReserveToRental = (client_sin, id_room) => {
        const reservation = reservationsSQL.find(reservation => reservation.client_sin === client_sin && reservation.id_room === id_room);
        createRental(reservation.client_sin, reservation.id_room, reservation.s_date, reservation.e_date);
        deleteReservation(client_sin, id_room);
    }

    const handleCloseMyAccountModal = () => setShowMyAccountModal(false);
    const handleShowMyAccountModal = () => setShowMyAccountModal(true);
    const handleCloseClientSettingsModal = () => setShowClientSettingsModal(false);
    const handleShowClientSettingsModal = () => setShowClientSettingsModal(true);
    const handleCloseEmployeeSettingsModal = () => setShowEmployeeSettingsModal(false);
    const handleShowEmployeeSettingsModal = () => setShowEmployeeSettingsModal(true);
    const handleCloseSettingsModal = () => setShowSettingsModal(false);
    const handleShowSettingsModal = () => setShowSettingsModal(true);
    const handleCloseChainSettingsModal = () => setShowChainSettingsModal(false);
    const handleShowChainSettingsModal = () => setShowChainSettingsModal(true);
    const handleCloseHotelSettingsModal = () => setShowHotelSettingsModal(false);
    const handleShowHotelSettingsModal = () => setShowHotelSettingsModal(true);
    const handleCloseRoomSettingsModal = () => setShowRoomSettingsModal(false);
    const handleShowRoomSettingsModal = () => setShowRoomSettingsModal(true);
    const handleCloseRoomModal = () => setShowRoomModal(false);
    const [showReserveModal, setShowReserveModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const handleShowRoomModal = (room) => {
        setSelectedRoom(room);
        setShowRoomModal(true);
    }
    const handleShowReserveModal = (room, reserve) => {
        setSelectedRoom(room);
        setSelectedReservation(reserve);
        setShowReserveModal(true);
    }
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

    const handleClientSettingsClick = () => {
        handleShowClientSettingsModal();
    };

    const handleEmployeeSettingsClick = () => {
        handleShowEmployeeSettingsModal();
    };

    const handleSettingsClick = () => {
        handleShowSettingsModal();
    };

    const handleChainSettingsClick = () => {
        handleShowChainSettingsModal();
    };

    const handleHotelSettingsClick = () => {
        handleShowHotelSettingsModal();
    };

    const handleRoomSettingsClick = () => {
        handleShowRoomSettingsModal();
    };

    const handleResetFilter = () => {
        getChains();
        getHotels();
        getRooms();
        getReservations();
        getRentals();
        setCheckInDate(null); 
        setCheckOutDate(null);
        setCapacitySize(0);
        setCategoryChosen(0);
    }

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


    //CLIENTS
    const [showCreateClientModal, setShowCreateClientModal] = useState(false);
    const [clientF_name, setClientF_name] = useState('');
    const [clientL_name, setClientL_name] = useState('');
    const [createClientSin, setCreateClientSin] = useState('');
    const [clientAddress, setClientAddress] = useState('');
    const [clientRegisterDate, setClientRegisterDate] = useState(new Date().toLocaleDateString('en-CA'));
    const [clientPassword, setClientPassword] = useState('');
    const [clientConPassword, setClientConPassword] = useState('');
    const [createClientErrorMsg, setCreateClientErrorMsg] = useState('');
    
    const handleCreateClient = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        // Email regex
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
        // Minimum eight characters, at least one letter and one number
        const sinRegex = /^\d{9}$/; 
        //SIN are 9 numbers

        if (!emailRegex.test(clientAddress)) {
            setCreateClientErrorMsg('Invalid email address');
            return;
        }
        
        if (!sinRegex.test(createClientSin)) {
            setCreateClientErrorMsg('SIN are 9 numbers');
            return;
        }

        if (!passwordRegex.test(clientPassword)) {
            setCreateClientErrorMsg('Password must contain 8 digits containing atleast a letter and a number');
            return;
        }

        if (clientPassword !== clientConPassword){
            setCreateClientErrorMsg('Your passwords dont match');
            return;
        }

        const existingEmail = clientsSQL.find(client => client.address === clientAddress);
        if (existingEmail) {
            setCreateClientErrorMsg('An client with this email already exists');
            return;
        }

        const existingSin = clientsSQL.find(client => client.sin === parseInt(createClientSin));
        if (existingSin) {
            setCreateClientErrorMsg('An client with this SIN already exists');
            return;
        }

        createClient(clientF_name, clientL_name, parseInt(createClientSin), clientAddress, clientRegisterDate, clientPassword);
        handleResetFilter();
        setShowCreateClientModal(false);
        setClientF_name('');
        setClientL_name('');
        setCreateClientSin('');
        setClientAddress('');
        setClientPassword('');
        setClientConPassword('');
    }

    const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
    const [deleteClientSin, setDeleteClientSin] = useState('');
    const [deleteClientErrorMsg, setDeleteClientErrorMsg] = useState('');

    const handleDeleteClient = () => {
        if (!(clientsSQL.some(client => client.sin === parseInt(deleteClientSin)))){
            setDeleteClientErrorMsg('You cannot remove a client that does not exist');
            return;
        }
        deleteClient(parseInt(deleteClientSin));
        handleResetFilter();
        setShowDeleteClientModal(false);
        setDeleteClientErrorMsg('');
        setDeleteClientSin('');
    }

    //UPDATE
    const [showUpdateClientModal, setShowUpdateClientModal] = useState(false);
    const [showUpdateClientInfoModal, setShowUpdateClientInfoModal] = useState(false);
    const [updateClientSin, setUpdateClientSin] = useState('');
    const [updateClientF_name, setUpdateClientF_name] = useState('');
    const [updateClientL_name, setUpdateClientL_name] = useState('');
    const [updateClientAddress, setUpdateClientAddress] = useState('');
    const [updateClientPassword, setUpdateClientPassword] = useState('');
    const [updateClientErrorMsg, setUpdateClientErrorMsg] = useState('');
    const [updateClientInfoErrorMsg, setUpdateClientInfoErrorMsg] = useState('');

    const handleUpdateClientModal = () => {
        if (!(clientsSQL.some(client => client.sin === parseInt(updateClientSin)))){
            setUpdateClientErrorMsg('This client does not exist');
            return;
        }
        setUpdateClientErrorMsg('');
        const client = clientsSQL.find(client => client.sin === parseInt(updateClientSin));
        setUpdateClientF_name(client.f_name);
        setUpdateClientL_name(client.l_name);
        setUpdateClientAddress(client.address);
        setUpdateClientPassword(client.password);
        setShowUpdateClientInfoModal(true);
        setShowUpdateClientModal(false);
    }

    const handleUpdateClient = () => {
        const currentClient = clientsSQL.find(client => client.sin === parseInt(updateClientSin));
        if (!currentClient){
            alert('This is not an existing client');
            return;
        }
        if (clientsSQL.some(client => client.address === updateClientAddress) && !(currentClient.address === updateClientAddress)){
            setUpdateClientInfoErrorMsg('New address must not be an existing address');
            return;
        }
        
        // Call to updateClient function
        updateClient(updateClientF_name, updateClientL_name, parseInt(updateClientSin), updateClientAddress, currentClient.r_date.slice(0,10), updateClientPassword);
        setUpdateClientSin('');
        setUpdateClientF_name('');
        setUpdateClientL_name('');
        setUpdateClientAddress('');
        setUpdateClientPassword('');
        handleResetFilter();
        setUpdateClientInfoErrorMsg('');
        setShowUpdateClientInfoModal(false);
        
    };



    //EMPLOYEES
    // CREATE
    const [showCreateEmployeeModal, setShowCreateEmployeeModal] = useState(false);
    const [employeeF_name, setEmployeeF_name] = useState('');
    const [employeeL_name, setEmployeeL_name] = useState('');
    const [employeeSin, setEmployeeSin] = useState('');
    const [employeeAddress, setEmployeeAddress] = useState('');
    const [employeeRole, setEmployeeRole] = useState('');
    const [employeeHotel_id, setEmployeeHotel_id] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [employeeConPassword, setEmployeeConPassword] = useState('');
    const [createEmployeeErrorMsg, setCreateEmployeeErrorMsg] = useState('');
    
    const handleCreateEmployee = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        // Email regex
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
        // Minimum eight characters, at least one letter and one number
        const sinRegex = /^\d{9}$/; 
        //SIN are 9 numbers

        if (!emailRegex.test(employeeAddress)) {
            setCreateEmployeeErrorMsg('Invalid email address');
            return;
        }
        
        if (!sinRegex.test(employeeSin)) {
            setCreateEmployeeErrorMsg('SIN are 9 numbers');
            return;
        }

        if (!passwordRegex.test(employeePassword)) {
            setCreateEmployeeErrorMsg('Password must contain 8 digits containing atleast a letter and a number');
            return;
        }

        if (employeePassword !== employeeConPassword){
            setCreateEmployeeErrorMsg('Your passwords dont match');
            return;
        }

        const existingEmail = employeesSQL.find(employee => employee.address === employeeAddress);
        if (existingEmail) {
            setCreateEmployeeErrorMsg('An employee with this email already exists');
            return;
        }

        const existingSin = employeesSQL.find(employee => employee.sin === parseInt(employeeSin));
        if (existingSin) {
            setCreateEmployeeErrorMsg('An employee with this SIN already exists');
            return;
        }

        if (employeesSQL.some(employee => employee.sin === parseInt(employeeSin))){
            setCreateEmployeeErrorMsg('This employee already exists');
            return;
        }

        createEmployee(employeeF_name, employeeL_name, parseInt(employeeSin), employeeAddress, employeeRole, parseInt(employeeHotel_id), employeePassword);
        handleResetFilter();
        setShowCreateEmployeeModal(false);
        setEmployeeF_name('');
        setEmployeeL_name('');
        setEmployeeSin('');
        setEmployeeAddress('');
        setEmployeeRole('');
        setEmployeeHotel_id('');
        setEmployeePassword('');
        setEmployeeConPassword('');
    }


    //DELETE
    const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);
    const [deleteEmployeeSin, setDeleteEmployeeSin] = useState('');
    const [deleteEmployeeErrorMsg, setDeleteEmployeeErrorMsg] = useState('');

    const handleDeleteEmployee = () => {
        if (!(employeesSQL.some(employee => employee.sin === parseInt(deleteEmployeeSin)))){
            setDeleteEmployeeErrorMsg('You cannot remove a employee that does not exist');
            //alert(deleteEmployeeSin);
            return;
        }
        deleteEmployee(parseInt(deleteEmployeeSin));
        handleResetFilter();
        setShowDeleteEmployeeModal(false);
        setDeleteEmployeeErrorMsg('');
        setDeleteEmployeeSin('');
    }

    //UPDATE
    const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
    const [showUpdateEmployeeInfoModal, setShowUpdateEmployeeInfoModal] = useState(false);
    const [updateEmployeeSin, setUpdateEmployeeSin] = useState('');
    const [updateEmployeeF_name, setUpdateEmployeeF_name] = useState('');
    const [updateEmployeeL_name, setUpdateEmployeeL_name] = useState('');
    const [updateEmployeeAddress, setUpdateEmployeeAddress] = useState('');
    const [updateEmployeeRole, setUpdateEmployeeRole] = useState('');
    const [updateEmployeeHotel_id, setUpdateEmployeeHotel_id] = useState('');
    const [updateEmployeePassword, setUpdateEmployeePassword] = useState('');
    const [updateEmployeeErrorMsg, setUpdateEmployeeErrorMsg] = useState('');
    const [updateEmployeeInfoErrorMsg, setUpdateEmployeeInfoErrorMsg] = useState('');

    const handleUpdateEmployeeModal = () => {
        if (!(employeesSQL.some(employee => employee.sin === parseInt(updateEmployeeSin)))){
            setUpdateEmployeeErrorMsg('This Employee does not exist');
            return;
        }
        setUpdateEmployeeErrorMsg('');
        const employee = employeesSQL.find(employee => employee.sin === parseInt(updateEmployeeSin));
        setUpdateEmployeeF_name(employee.f_name);
        setUpdateEmployeeL_name(employee.l_name);
        setUpdateEmployeeAddress(employee.address);
        setUpdateEmployeePassword(employee.password);
        setUpdateEmployeeRole(employee.role);
        setUpdateEmployeeHotel_id(employee.hotel_id);
        setShowUpdateEmployeeInfoModal(true);
        setShowUpdateEmployeeModal(false);
    }

    const handleUpdateEmployee = () => {
        const currentEmployee = employeesSQL.find(employee => employee.sin === parseInt(updateEmployeeSin));
        if (employeesSQL.some(employee => employee.address === updateEmployeeAddress) && !(currentEmployee.address === updateEmployeeAddress)){
            setUpdateEmployeeInfoErrorMsg('New address must not be an existing address');
            return;
        }
        if (!(employeesSQL.find(employee => employee.hotel_id === parseInt(updateEmployeeHotel_id)))){
            setUpdateEmployeeInfoErrorMsg('Employees new hotel Id must be an existing hotel');
            return;
        }
        
        // Call to updateEmployee function
        updateEmployee(updateEmployeeF_name, updateEmployeeL_name, parseInt(updateEmployeeSin), updateEmployeeAddress, updateEmployeeRole, updateEmployeeHotel_id, updateEmployeePassword);
        setUpdateEmployeeSin('');
        setUpdateEmployeeF_name('');
        setUpdateEmployeeL_name('');
        setUpdateEmployeeAddress('');
        setUpdateEmployeeRole('');
        setUpdateEmployeeHotel_id('');
        setUpdateEmployeePassword('');
        handleResetFilter();
        setUpdateEmployeeInfoErrorMsg('');
        setShowUpdateEmployeeInfoModal(false);

    };

    //SETTINGS MODALS AND FUNCTIONS
    //CHAINS
    const [showCreateChainModal, setShowCreateChainModal] = useState(false);
    const [showUpdateChainModal, setShowUpdateChainModal] = useState(false);
    const [showUpdateChainInfoModal, setShowUpdateChainInfoModal] = useState(false);
    const [showDeleteChainModal, setShowDeleteChainModal] = useState(false);
    const [chainName, setChainName] = useState('');
    const [chainAddress, setChainAddress] = useState('');
    const [createChainErrorMsg, setCreateChainErrorMsg] = useState('');
    const handleCreateChain = () => {
        if (chainsSQL.some(chain => chain.name === chainName)){
            setCreateChainErrorMsg('This chain already exists');
            return;
        }
        if (chainsSQL.some(chain => chain.address === chainAddress)){
            setCreateChainErrorMsg('This address already exists');
            return;
        }
        createChain(chainName, chainAddress);
        handleResetFilter();
        setShowCreateChainModal(false);
        setChainName('');
        setChainAddress('');
    }

    const [deleteChainName, setDeleteChainName] = useState('');
    const [deleteChainErrorMsg, setDeleteChainErrorMsg] = useState('');

    const handleDeleteChain = () => {
        if (!(chainsSQL.some(chain => chain.name === deleteChainName))){
            setDeleteChainErrorMsg('You cannot remove a chain that doesnt exist');
            return;
        }
        deleteChain(deleteChainName);
        handleResetFilter();
        setShowDeleteChainModal(false);
        setDeleteChainErrorMsg('');
        setDeleteChainName('');
    }

    const [updateChainName, setUpdateChainName] = useState('');
    const [updateChainName2, setUpdateChainName2] = useState('');
    const [updateChainAddress, setUpdateChainAddress] = useState('');
    const [updateChainErrorMsg, setUpdateChainErrorMsg] = useState('');
    const [updateChainInfoErrorMsg, setUpdateChainInfoErrorMsg] = useState('');

    const handleUpdateChainModal = () => {
        if (!(chainsSQL.some(chain => chain.name === updateChainName))){
            setUpdateChainErrorMsg('This chain does not exist');
            return;
        }
        setUpdateChainErrorMsg('');
        const chain = chainsSQL.find(chain => chain.name === updateChainName);
        setUpdateChainAddress(chain.address);
        setShowUpdateChainInfoModal(true);
        setShowUpdateChainModal(false);
        setUpdateChainName2(updateChainName);
    }
    const handleUpdateChain = () => {
        const currentChain = chainsSQL.find(chain => chain.name === updateChainName);
        setUpdateChainName('');
        if (!currentChain){
            alert('This is not an existing chain');
            return;
        }
        if (chainsSQL.some(chain => chain.name === updateChainName2) && !(currentChain.name === updateChainName2)){
            setUpdateChainInfoErrorMsg('Must rename to a chain name not in list of chains');
            return;
        }
        if (chainsSQL.some(chain => chain.address === updateChainAddress) && !(currentChain.address === updateChainAddress)){
            setUpdateChainInfoErrorMsg('Must address to an address not in list of addresses');
            return;
        }
        updateChain(currentChain.name, updateChainName2, updateChainAddress);
        setUpdateChainAddress('');
        setUpdateChainName2('');
        handleResetFilter();
        setUpdateChainInfoErrorMsg('');
        setShowUpdateChainInfoModal(false);
    }

    //HOTELS
    const [showCreateHotelModal, setShowCreateHotelModal] = useState(false);
    const [showUpdateHotelModal, setShowUpdateHotelModal] = useState(false);
    const [showUpdateHotelInfoModal, setShowUpdateHotelInfoModal] = useState(false);
    const [showDeleteHotelModal, setShowDeleteHotelModal] = useState(false);
    const [hotelName, setHotelName] = useState('');
    const [hotelAddress, setHotelAddress] = useState('');
    const [hotelId, setHotelId] = useState('');
    const [hotelChainName, setHotelChainName] = useState('');
    const [hotelRating, setHotelRating] = useState(null);
    const [createHotelErrorMsg, setCreateHotelErrorMsg] = useState('');
    const handleCreateHotel = () => {
        if (hotelsSQL.some(hotel => hotel.name === hotelName)){
            setCreateHotelErrorMsg('This hotel already exists');
            return;
        }
        if (hotelsSQL.some(hotel => hotel.address === hotelAddress)){
            setCreateHotelErrorMsg('This address already exists');
            return;
        }
        if (hotelsSQL.some(hotel => hotel.id === hotelId)){
            setCreateHotelErrorMsg('This hotelID already exists');
            return;
        }
        if (!(chainsSQL.map(chain => chain.name).includes(hotelChainName))){
            setCreateHotelErrorMsg('The chain you entered does not exist');
            return;
        }
        if (!(['3','4','5'].includes(hotelRating))){
            setCreateHotelErrorMsg('Hotel must be of a 3, 4 or 5 star rating');
            return;
        }
        //OTHER OPTIONS FOR A HOTEL
        createHotel(hotelName, hotelAddress, hotelId, 69, hotelChainName, parseInt(hotelRating));
        handleResetFilter();
        setShowCreateHotelModal(false);
        setHotelName('');
        setHotelAddress('');
        setHotelId('');
        setHotelChainName('');
        setHotelRating('');
        setCreateHotelErrorMsg('');
    }

    const [deleteHotelId, setDeleteHotelId] = useState('');
    const [deleteHotelErrorMsg, setDeleteHotelErrorMsg] = useState('');

    const handleDeleteHotel = () => {
        if (!(hotelsSQL.some(hotel => hotel.id === parseInt(deleteHotelId)))){
            setDeleteHotelErrorMsg('You cannot remove a hotel that doesnt exist');
            return;
        }
        deleteHotel(deleteHotelId);
        handleResetFilter();
        setShowDeleteHotelModal(false);
        setDeleteHotelErrorMsg('');
        setDeleteHotelId('');
    }

    const [updateHotelName, setUpdateHotelName] = useState('');
    const [updateHotelId, setUpdateHotelId] = useState('');
    const [updateHotelAddress, setUpdateHotelAddress] = useState('');
    const [updateHotelChainName, setUpdateHotelChainName] = useState('');
    const [updateHotelRating, setUpdateHotelRating] = useState('');
    const [updateHotelErrorMsg, setUpdateHotelErrorMsg] = useState('');
    const [updateHotelInfoErrorMsg, setUpdateHotelInfoErrorMsg] = useState('');

    const handleUpdateHotelModal = () => {
        if (!(hotelsSQL.some(hotel => hotel.id === parseInt(updateHotelId)))){
            setUpdateHotelErrorMsg('This hotel does not exist');
            return;
        }
        setUpdateHotelErrorMsg('');
        const currentHotel = hotelsSQL.find(hotel => hotel.id === parseInt(updateHotelId));
        setUpdateHotelName(currentHotel.name);
        setUpdateHotelAddress(currentHotel.address);
        setUpdateHotelChainName(currentHotel.chain_name);
        setUpdateHotelRating(currentHotel.ratings);
        setShowUpdateHotelInfoModal(true);
        setShowUpdateHotelModal(false);
    }
    const handleUpdateHotel = () => {
        const currentHotel = hotelsSQL.find(hotel => hotel.id === parseInt(updateHotelId));
        if (!currentHotel){
            alert('This is not an existing hotel');
            return;
        }
        if (hotelsSQL.some(hotel => hotel.name === updateHotelName) && !(currentHotel.name === updateHotelName)){
            setUpdateHotelInfoErrorMsg('Must rename to a hotel name not in list of hotels');
            return;
        }
        if (hotelsSQL.some(hotel => hotel.address === updateHotelAddress) && !(currentHotel.address === updateHotelAddress)){
            setUpdateHotelInfoErrorMsg('Must address to an address not in list of addresses');
            return;
        }
        if (!(chainsSQL.some(chain => chain.name === updateHotelChainName))){
            setUpdateHotelInfoErrorMsg('The hotels new chain must be an existing chain in the database');
            return;
        }
        if (!([3,4,5].includes(parseInt(updateHotelRating)))){
            setUpdateHotelInfoErrorMsg('Hotel must be of a 3, 4 or 5 star rating');
            return;
        }
        updateHotel(updateHotelName, updateHotelAddress, currentHotel.rooms, updateHotelChainName, parseInt(updateHotelRating), parseInt(updateHotelId));
        setUpdateHotelAddress('');
        setUpdateHotelName('');
        setUpdateHotelId('');
        setUpdateHotelChainName('');
        handleResetFilter();
        setUpdateHotelInfoErrorMsg('');
        setShowUpdateHotelInfoModal(false);
    }

    //ROOMS
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
    const [showUpdateRoomModal, setShowUpdateRoomModal] = useState(false);
    const [showUpdateRoomInfoModal, setShowUpdateRoomInfoModal] = useState(false);
    const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);

    const [roomId, setRoomId] = useState('');
    const [roomHotelId, setRoomHotelId] = useState('');
    const [roomPrice, setRoomPrice] = useState('');
    const [roomCapacity, setRoomCapacity] = useState('');
    const [roomView, setRoomView] = useState('');
    const [roomProblems, setRoomProblems] = useState('');
    const [roomExpanding, setRoomExpanding] = useState(false);
    const [createRoomErrorMsg, setCreateRoomErrorMsg] = useState('');
    const handleCreateRoom = () => {
        //createRoom(50,3,69,4,'nice','rats',false);
        const intTest = /^\d+$/;
        if (roomsSQL.some(room => room.id === parseInt(roomId))){
            setCreateRoomErrorMsg('This room id already exists');
            return;
        }
        if (!(hotelsSQL.some(hotel => hotel.id === parseInt(roomHotelId)))){
            setCreateRoomErrorMsg('The hotel id youve entered isnt in our database');
            return;
        }
        if (!(intTest.test(roomPrice))){
            setCreateRoomErrorMsg('Price needs to be a valid number (positive integer)');
            return;
        }
        if (!(['1','2','3','4','5'].includes(roomCapacity))){
            setCreateRoomErrorMsg('Rooms can only have 1-5 people');
            return;
        }
        //OTHER OPTIONS FOR A HOTEL
        createRoom(parseInt(roomId), parseInt(roomHotelId), parseInt(roomPrice), parseInt(roomCapacity), roomView, roomProblems, roomExpanding);
        handleResetFilter();
        setShowCreateRoomModal(false);
        setRoomId('');
        setRoomHotelId('');
        setRoomPrice('');
        setRoomCapacity('');
        setRoomView('');
        setRoomProblems(false);
        setCreateRoomErrorMsg('');
    }

    const [deleteRoomId, setDeleteRoomId] = useState('');
    const [deleteRoomErrorMsg, setDeleteRoomErrorMsg] = useState('');

    const handleDeleteRoom = () => {
        if (!(roomsSQL.some(room => room.id === parseInt(deleteRoomId)))){
            setDeleteRoomErrorMsg('You cannot remove a room that doesnt exist');
            return;
        }
        deleteRoom(deleteRoomId);
        handleResetFilter();
        setShowDeleteRoomModal(false);
        setDeleteRoomErrorMsg('');
        setDeleteRoomId('');

    }

    const [updateRoomId, setUpdateRoomId] = useState('');
    const [updateRoomHotelId, setUpdateRoomHotelId] = useState('');
    const [updateRoomPrice, setUpdateRoomPrice] = useState('');
    const [updateRoomCapacity, setUpdateRoomCapacity] = useState('');
    const [updateRoomView, setUpdateRoomView] = useState('');
    const [updateRoomProblems, setUpdateRoomProblems] = useState('');
    const [updateRoomExpanding, setUpdateRoomExpanding] = useState(false);
    const [updateRoomErrorMsg, setUpdateRoomErrorMsg] = useState('');
    const [updateRoomInfoErrorMsg, setUpdateRoomInfoErrorMsg] = useState('');

    const handleUpdateRoomModal = () => {
        if (!(roomsSQL.some(room => room.id === parseInt(updateRoomId)))){
            setUpdateRoomErrorMsg('This room does not exist');
            return;
        }
        setUpdateRoomErrorMsg('');
        const currentRoom = roomsSQL.find(room => room.id === parseInt(updateRoomId));
        setUpdateRoomHotelId(currentRoom.hotel_id);
        setUpdateRoomPrice(currentRoom.price);
        setUpdateRoomCapacity(currentRoom.capacity);
        setUpdateRoomView(currentRoom.view);
        setUpdateRoomProblems(currentRoom.problems);
        setUpdateRoomExpanding(currentRoom.expanding);
        setUpdateRoomErrorMsg('');
        setShowUpdateRoomInfoModal(true);
        setShowUpdateRoomModal(false);
    }
    const handleUpdateRoom = () => {
        const currentRoom = roomsSQL.find(room => room.id === parseInt(updateRoomId));
        const intTest = /^\d+$/;
        if (!currentRoom){
            alert('This is not an existing room');
            return;
        }
        if (!(hotelsSQL.some(hotel => hotel.id === parseInt(updateRoomHotelId)))){
            setUpdateRoomInfoErrorMsg('The hotel id youve entered isnt in our database');
            return;
        }
        if (!(intTest.test(updateRoomPrice))){
            setUpdateRoomInfoErrorMsg('Price needs to be a valid number (positive integer)');
            return;
        }
        if (!([1,2,3,4,5].includes(parseInt(updateRoomCapacity)))){
            setUpdateRoomInfoErrorMsg('Rooms can only have 1-5 people');
            return;
        }
        updateRoom(parseInt(updateRoomId), parseInt(updateRoomHotelId), parseInt(updateRoomPrice),
                    parseInt(updateRoomCapacity), updateRoomView, updateRoomProblems, updateRoomExpanding);
        setUpdateRoomId('');
        setUpdateRoomHotelId('');
        setUpdateRoomPrice('');
        setUpdateRoomCapacity('');
        setUpdateRoomView('');
        setUpdateRoomProblems('');
        setUpdateRoomExpanding(false);
        handleResetFilter();
        setUpdateRoomInfoErrorMsg('');
        setShowUpdateRoomInfoModal(false);
    }

    

    return (
        <div>
            <div className="my-account-button">
                <Button variant="secondary" className="search-button" onClick={handleMyAccountClick}>My Account</Button>
                <Button variant="secondary" className="search-button" onClick={handleSettingsClick}>Settings</Button>
            </div>
            <div className="search-bar">
                <h1>Welcome Employee!</h1>
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
                        className="dropdown-button"
                        selected={checkInDate}
                        onChange={(date) => {
                            handleCheckInChange(date);
                            handleSearchClick(capacitySize, date, checkOutDate);
                        }}
                        placeholderText="Check In"
                    />
                    <DatePicker
                        className="dropdown-button"
                        selected={checkOutDate}
                        onChange={(date) => {
                            handleCheckOutChange(date);
                            handleSearchClick(capacitySize, checkInDate, date);
                        }}
                        placeholderText="Check Out"
                    />
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary" className="dropdown-button">Select capacity</Dropdown.Toggle>
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
                        <Dropdown.Toggle variant="secondary" className="dropdown-button">Hotel category</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(5); setCategoryChosen(5);}} isSelected={categoryChosen === 5}>5 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(4); setCategoryChosen(4);}} isSelected={categoryChosen === 4}>4 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(3); setCategoryChosen(3);}} isSelected={categoryChosen === 3}>3 star hotel</CustomDropdownItem>
                            <CustomDropdownItem onClick={() => {handleCategoryClick(0); setCategoryChosen(0);}} isSelected={categoryChosen === 0}>Any</CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={InputGroup.Append}>
                        <Dropdown.Toggle variant="secondary" className="dropdown-button">{selectedArea}</Dropdown.Toggle>
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
                                <strong>Role:</strong> {signedInAcc.role}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseMyAccountModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showClientSettingsModal} onHide={handleCloseClientSettingsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Clients Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                            <Button variant="secondary" className="search-button" onClick={setShowUpdateClientModal}>Update Client Info</Button>
                            <Button variant="secondary" className="negative-modal-button" onClick={setShowDeleteClientModal}>Delete Client</Button>
                            <Button variant="secondary" className="positive-modal-button" onClick={setShowCreateClientModal}>Create New Client</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseClientSettingsModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCreateClientModal} onHide={setShowCreateClientModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client First Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={clientF_name}
                                onChange={e => setClientF_name(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={clientL_name}
                                onChange={e => setClientL_name(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client SIN</Form.Label>
                            <Form.Control
                                type="text"
                                value={createClientSin}
                                onChange={e => setCreateClientSin(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={clientAddress}
                                placeholder='email@exmaple.com'
                                onChange={e => setClientAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={clientPassword}
                                onChange={e => setClientPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={clientConPassword}
                                    onChange={e => setClientConPassword(e.target.value)}
                                />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {createClientErrorMsg && <p style={{ color: 'red' }}>{createClientErrorMsg}</p>}
                    <Button variant="primary" className="positive-modal-button" onClick={handleCreateClient}>
                        Create Client
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteClientModal} onHide={setShowDeleteClientModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client SIN</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={deleteClientSin}
                                onChange={e => setDeleteClientSin(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {deleteClientErrorMsg && <p style={{ color: 'red' }}>{deleteClientErrorMsg}</p>}
                    <Button variant="primary" className="negative-modal-button" onClick={handleDeleteClient}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdateClientModal} onHide={setShowUpdateClientModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client SIN</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateClientSin}
                                onChange={e => setUpdateClientSin(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateClientErrorMsg && <p style={{ color: 'red' }}>{updateClientErrorMsg}</p>}
                    <Button variant="primary" className="search-button" onClick={handleUpdateClientModal}>
                        Select Client
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdateClientInfoModal} onHide={setShowUpdateClientInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client First Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateClientF_name}
                                onChange={e => setUpdateClientF_name(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateClientL_name}
                                onChange={e => setUpdateClientL_name(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client Address</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateClientAddress}
                                onChange={e => setUpdateClientAddress(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Client Password</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateClientPassword}
                                onChange={e => setUpdateClientPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateClientInfoErrorMsg && <p style={{ color: 'red' }}>{updateClientInfoErrorMsg}</p>}
                    <Button variant="primary" className="positive-modal-button" onClick={handleUpdateClient}>
                        Confirm Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEmployeeSettingsModal} onHide={handleCloseEmployeeSettingsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                            <Button variant="secondary" className="search-button" onClick={setShowUpdateEmployeeModal}>Update Employee Info</Button>
                            <Button variant="secondary" className="negative-modal-button" onClick={setShowDeleteEmployeeModal}>Delete Employee</Button>
                            <Button variant="secondary" className="positive-modal-button" onClick={setShowCreateEmployeeModal}>Create New Employee</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseEmployeeSettingsModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCreateEmployeeModal} onHide={setShowCreateEmployeeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee First Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={employeeF_name}
                                onChange={e => setEmployeeF_name(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={employeeL_name}
                                onChange={e => setEmployeeL_name(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee SIN</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={employeeSin}
                                onChange={e => setEmployeeSin(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={employeeAddress}
                                placeholder='email@exmaple.com'
                                onChange={e => setEmployeeAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Role</Form.Label>
                            <Form.Control
                                type="text"
                                value={employeeRole}
                                onChange={e => setEmployeeRole(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Associated Hotel ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={employeeHotel_id}
                                onChange={e => setEmployeeHotel_id(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={employeePassword}
                                onChange={e => setEmployeePassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={employeeConPassword}
                                    onChange={e => setEmployeeConPassword(e.target.value)}
                                />
                            </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {createEmployeeErrorMsg && <p style={{ color: 'red' }}>{createEmployeeErrorMsg}</p>}
                    <Button variant="primary" className="positive-modal-button" onClick={handleCreateEmployee}>
                        Create Employee
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteEmployeeModal} onHide={setShowDeleteEmployeeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee SIN</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={deleteEmployeeSin}
                                onChange={e => setDeleteEmployeeSin(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {deleteEmployeeErrorMsg && <p style={{ color: 'red' }}>{deleteEmployeeErrorMsg}</p>}
                    <Button variant="primary" className="negative-modal-button" onClick={handleDeleteEmployee}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdateEmployeeModal} onHide={setShowUpdateEmployeeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee SIN</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateEmployeeSin}
                                onChange={e => setUpdateEmployeeSin(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateEmployeeErrorMsg && <p style={{ color: 'red' }}>{updateEmployeeErrorMsg}</p>}
                    <Button variant="primary" className="search-button" onClick={handleUpdateEmployeeModal}>
                        Select Employee
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdateEmployeeInfoModal} onHide={setShowUpdateEmployeeInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee First Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateEmployeeF_name}
                                onChange={e => setUpdateEmployeeF_name(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateEmployeeL_name}
                                onChange={e => setUpdateEmployeeL_name(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Address</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateEmployeeAddress}
                                onChange={e => setUpdateEmployeeAddress(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Role</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateEmployeeRole}
                                onChange={e => setUpdateEmployeeRole(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Associated Hotel ID</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateEmployeeHotel_id}
                                onChange={e => setUpdateEmployeeHotel_id(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Password</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateEmployeePassword}
                                onChange={e => setUpdateEmployeePassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateEmployeeInfoErrorMsg && <p style={{ color: 'red' }}>{updateEmployeeInfoErrorMsg}</p>}
                    <Button variant="primary" className="positive-modal-button" onClick={handleUpdateEmployee}>
                        Confirm Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSettingsModal} onHide={handleCloseSettingsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                            <Button variant="secondary" className="search-button" onClick={handleChainSettingsClick}>Chain Settings</Button>
                            <Button variant="secondary" className="negative-modal-button" onClick={handleHotelSettingsClick}>Hotel Settings</Button>
                            <Button variant="secondary" className="positive-modal-button" onClick={handleRoomSettingsClick}>Room Settings</Button>
                            <Button variant="secondary" className="positive-modal-button" onClick={handleClientSettingsClick}>Client Settings</Button>
                            <Button variant="secondary" className="positive-modal-button" onClick={handleEmployeeSettingsClick}>Employee Settings</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseSettingsModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showChainSettingsModal} onHide={handleCloseChainSettingsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Chain Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                            <Button variant="secondary" className="search-button" onClick={setShowUpdateChainModal}>Update Chain Info</Button>
                            <Button variant="secondary" className="negative-modal-button" onClick={setShowDeleteChainModal}>Delete Chain</Button>
                            <Button variant="secondary" className="positive-modal-button" onClick={setShowCreateChainModal}>Create New Chain</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseChainSettingsModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showHotelSettingsModal} onHide={handleCloseHotelSettingsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Chain Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                            <Button variant="secondary" className="search-button" onClick={setShowUpdateHotelModal}>Update Hotel Info</Button>
                            <Button variant="secondary" className="negative-modal-button" onClick={setShowDeleteHotelModal}>Delete Hotel</Button>
                            <Button variant="secondary" className="positive-modal-button" onClick={setShowCreateHotelModal}>Create New Hotel</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseHotelSettingsModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showRoomSettingsModal} onHide={handleCloseRoomSettingsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Chain Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                            <Button variant="secondary" className="search-button" onClick={setShowUpdateRoomModal}>Update Room Info</Button>
                            <Button variant="secondary" className="negative-modal-button" onClick={setShowDeleteRoomModal}>Delete Room</Button>
                            <Button variant="secondary" className="positive-modal-button" onClick={setShowCreateRoomModal}>Create New Room</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseRoomSettingsModal}>Close</Button>
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
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseChainModal}>Close</Button>
                </Modal.Footer>
            </Modal>
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
            {/*
            I need to edit this more, similar to what the regular show of rooms looks like but when I click it, I can turn it into a rental
            */}
            <h2>Reserved rooms</h2>
            <div className="room-container">
                <div className="room-grid room-grid-flex">
                    {reservationsSQL.map((reservation) => {
                        const resRoom = roomsSQL.find(room => room.id === reservation.id_room);
                        return (
                            <Card style={{ width: '12.65rem' }}key={resRoom.id} onClick={() => handleShowReserveModal(resRoom, reservation)} className="room-card">
                                <Card.Img
                                    className="room-image"
                                    variant="top"
                                    src="/src/images/hotelRoom.png"
                                    alt="Room Image"
                                />
                                <Card.Body>
                                    <Card.Title>{resRoom.id}</Card.Title>
                                    <Card.Text>
                                        <strong>Price:</strong> ${resRoom.price}/Night
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Capacity:</strong> {resRoom.capacity} Persons
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Client SIN:</strong> {reservation.client_sin}
                                    </Card.Text>

                                    {/* Add more information as needed */}
                                </Card.Body>
                                {/* Additional buttons or actions */}
                                {/* <Button variant="primary">View Details</Button> */}
                            </Card>
                        );
                    })}
                </div>
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
                                {"$" + selectedRoom.price + "/Night"}
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
                                {selectedRoom.expanding ? 'Yes' : 'No'}
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
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseRoomModal}>Close</Button>
                    <Button variant="primary" className="search-button" onClick={handlePayModal}>Make rental</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showReserveModal} onHide={setShowReserveModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reserve Details</Modal.Title>
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
                                {"$" + selectedRoom.price + "/Night"}
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
                                {selectedRoom.expanding ? 'Yes' : 'No'}
                            </p>
                            <p>
                                <strong>Problems:</strong>{' '}
                                {selectedRoom.problems}
                            </p>
                            <p>
                                <strong>Client SIN:</strong>{' '}
                                {selectedReservation.client_sin}
                            </p>
                            <p>
                                <strong>Check in date:</strong>{' '}
                                {selectedReservation.s_date.slice(0,10)}
                            </p>
                            <p>
                                <strong>Check out date:</strong>{' '}
                                {selectedReservation.e_date.slice(0,10)}
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
                    <Button variant="secondary" className="negative-modal-button" onClick={handleCloseRoomModal}>Close</Button>
                    <Button variant="primary" className="search-button" onClick={() => handleReserveToRental(selectedReservation.client_sin, selectedReservation.id_room)}>Turn into rental</Button>
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

            <Modal show={showCreateChainModal} onHide={setShowCreateChainModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Chain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Chain name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={chainName}
                                onChange={e => setChainName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Chain email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={chainAddress}
                                placeholder='chainName@exmaple.com'
                                onChange={e => setChainAddress(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {createChainErrorMsg && <p style={{ color: 'red' }}>{createChainErrorMsg}</p>}
                    <Button variant="primary" onClick={handleCreateChain}>
                        Create Chain
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteChainModal} onHide={setShowDeleteChainModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Chain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Chain name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={deleteChainName}
                                onChange={e => setDeleteChainName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {deleteChainErrorMsg && <p style={{ color: 'red' }}>{deleteChainErrorMsg}</p>}
                    <Button variant="primary" onClick={handleDeleteChain}>
                        Delete Chain
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpdateChainModal} onHide={setShowUpdateChainModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Chain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Chain name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateChainName}
                                onChange={e => setUpdateChainName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateChainErrorMsg && <p style={{ color: 'red' }}>{updateChainErrorMsg}</p>}
                    <Button variant="primary" onClick={handleUpdateChainModal}>
                        Update Chain
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdateChainInfoModal} onHide={setShowUpdateChainInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Chain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Chain name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateChainName2}
                                onChange={e => setUpdateChainName2(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Chain address</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateChainAddress}
                                onChange={e => setUpdateChainAddress(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateChainInfoErrorMsg && <p style={{ color: 'red' }}>{updateChainInfoErrorMsg}</p>}
                    <Button variant="primary" onClick={handleUpdateChain}>
                        Update Chain
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCreateHotelModal} onHide={setShowCreateHotelModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Hotel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={hotelName}
                                onChange={e => setHotelName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel Id</Form.Label>
                            <Form.Control
                                type="text"
                                value={hotelId}
                                onChange={e => setHotelId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel address</Form.Label>
                            <Form.Control
                                type="text"
                                value={hotelAddress}
                                placeholder='123 random rd'
                                onChange={e => setHotelAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel Chain</Form.Label>
                            <Form.Control
                                type="text"
                                value={hotelChainName}
                                placeholder='Ex: Hilton'
                                onChange={e => setHotelChainName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel Rating</Form.Label>
                            <Form.Control
                                type="text"
                                value={hotelRating}
                                placeholder='Ex: 5'
                                onChange={e => setHotelRating(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {createHotelErrorMsg && <p style={{ color: 'red' }}>{createHotelErrorMsg}</p>}
                    <Button variant="primary" onClick={handleCreateHotel}>
                        Create Hotel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteHotelModal} onHide={setShowDeleteHotelModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Hotel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel Id</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={deleteHotelId}
                                onChange={e => setDeleteHotelId(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {deleteHotelErrorMsg && <p style={{ color: 'red' }}>{deleteHotelErrorMsg}</p>}
                    <Button variant="primary" onClick={handleDeleteHotel}>
                        Delete Hotel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpdateHotelModal} onHide={setShowUpdateHotelModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Hotel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel Id</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateHotelId}
                                onChange={e => setUpdateHotelId(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateHotelErrorMsg && <p style={{ color: 'red' }}>{updateHotelErrorMsg}</p>}
                    <Button variant="primary" onClick={handleUpdateHotelModal}>
                        Update Hotel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdateHotelInfoModal} onHide={setShowUpdateHotelInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Hotel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateHotelName}
                                onChange={e => setUpdateHotelName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel address</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateHotelAddress}
                                onChange={e => setUpdateHotelAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel Chain</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateHotelChainName}
                                onChange={e => setUpdateHotelChainName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Hotel Rating</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateHotelRating}
                                placeholder='Ex: 5'
                                onChange={e => setUpdateHotelRating(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateHotelInfoErrorMsg && <p style={{ color: 'red' }}>{updateHotelInfoErrorMsg}</p>}
                    <Button variant="primary" onClick={handleUpdateHotel}>
                        Update Hotel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCreateRoomModal} onHide={setShowCreateRoomModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Id</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={roomId}
                                onChange={e => setRoomId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Rooms Hotel Id</Form.Label>
                            <Form.Control
                                type="text"
                                value={roomHotelId}
                                onChange={e => setRoomHotelId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={roomPrice}
                                placeholder='75'
                                onChange={e => setRoomPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Capacity</Form.Label>
                            <Form.Control
                                type="text"
                                value={roomCapacity}
                                onChange={e => setRoomCapacity(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room View</Form.Label>
                            <Form.Control
                                type="text"
                                value={roomView}
                                placeholder='Ex: Ottawa Canal'
                                onChange={e => setRoomView(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Problems</Form.Label>
                            <Form.Control
                                type="text"
                                value={roomProblems}
                                onChange={e => setRoomProblems(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Expands</Form.Label>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label={roomExpanding ? "Yes" : "No"}
                                onChange={() => setRoomExpanding(prevState => !prevState)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {createRoomErrorMsg && <p style={{ color: 'red' }}>{createRoomErrorMsg}</p>}
                    <Button variant="primary" onClick={handleCreateRoom}>
                        Create Room
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteRoomModal} onHide={setShowDeleteRoomModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Id</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={deleteRoomId}
                                onChange={e => setDeleteRoomId(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {deleteRoomErrorMsg && <p style={{ color: 'red' }}>{deleteRoomErrorMsg}</p>}
                    <Button variant="primary" onClick={handleDeleteRoom}>
                        Delete Room
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpdateRoomModal} onHide={setShowUpdateRoomModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Id</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateRoomId}
                                onChange={e => setUpdateRoomId(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateRoomErrorMsg && <p style={{ color: 'red' }}>{updateRoomErrorMsg}</p>}
                    <Button variant="primary" onClick={handleUpdateRoomModal}>
                        Update Room
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdateRoomInfoModal} onHide={setShowUpdateRoomInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Rooms Hotel Id</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateRoomHotelId}
                                onChange={e => setUpdateRoomHotelId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateRoomPrice}
                                placeholder='75'
                                onChange={e => setUpdateRoomPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Capacity</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateRoomCapacity}
                                onChange={e => setUpdateRoomCapacity(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room View</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateRoomView}
                                placeholder='Ex: Ottawa Canal'
                                onChange={e => setUpdateRoomView(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Problems</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateRoomProblems}
                                onChange={e => setUpdateRoomProblems(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Room Expands</Form.Label>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label={updateRoomExpanding ? "Yes" : "No"}
                                onChange={() => setUpdateRoomExpanding(prevState => !prevState)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {updateRoomInfoErrorMsg && <p style={{ color: 'red' }}>{updateRoomInfoErrorMsg}</p>}
                    <Button variant="primary" onClick={handleUpdateRoom}>
                        Update Room
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Employee;