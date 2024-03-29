import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Background.css';

const Login = ({setLoggedIn, setAccount}) => {

    const [clientsSQL, setClients] = useState(null);
    function getClients() {
        fetch('http://localhost:3001/clients')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setClients(data);
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
                //alert(data);
                getClients();
            });
    }

    const [employeesSQL, setEmployees] = useState(null);
    function getEmployees() {
        fetch('http://localhost:3001/employees')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setEmployees(data);
        });
    }
    
    const navigate = useNavigate();

    const clients = [{"address": "liamjulien@gmail.com", "password": "12345"}]
    const employees = [{"employeeID": "101", "password": "abcde"}]


    const [showClient, setShowClient] = useState(false);

    const handleCloseClient = () => {
        setShowClient(false);
        setErrorSigninClient("");
        setSignin("");
        setPassword("");
    }
    const handleShowClient = () => setShowClient(true);

    const [showEmployee, setShowEmployee] = useState(false);

    const handleCloseEmployee = () => {
        setShowEmployee(false);
        setErrorSigninEmployee("");
        setSignin("");
        setPassword("");
    }
    const handleShowEmployee = () => setShowEmployee(true);

    const [showClientSignUp, setShowClientSignUp] = useState(false);
    const [signUpError, setSignUpError] = useState(null);

    const handleCloseClientSignUp = () => setShowClientSignUp(false);
    const handleShowClientSignUp = () => {
        setShowClientSignUp(true);
        setF_name('');
        setL_name('');
        setSignUpEmail('');
        setSignUpSIN('');
        setSignUpPassword('');
        setSignUpConPassword('');
    }
    const handleClientSignUp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        // Email regex
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
        // Minimum eight characters, at least one letter and one number
        const sinRegex = /^\d{9}$/; 
        //SIN are 9 numbers

        if (!emailRegex.test(signUpEmail)) {
            setSignUpError('Invalid email address');
            return;
        }
        
        if (!sinRegex.test(signUpSIN)) {
            setSignUpError('SIN are 9 numbers');
            return;
        }

        if (!passwordRegex.test(signUpPassword)) {
            setSignUpError('Password must contain 8 digits containing atleast a letter and a number');
            return;
        }
        if (signUpPassword !== signUpConPassword){
            setSignUpError('Your passwords dont match');
            return;
        }
        /*const existingClient = clientsSQL.find(client => client.sin === parseInt(signUpSIN));
        if (existingClient) {
            setSignUpError('A client with this SIN already exists');
            return;
        }*/

        createClient(signUpF_name, signUpL_name, parseInt(signUpSIN), signUpEmail, signUpDate, signUpPassword);
        const client = clientsSQL.find(client => client.sin === parseInt(signUpSIN));
        
        setAccount(client);
        navigate('/Client');
        setLoggedIn(1);
        setShowClientSignUp(false);
        setSignUpError(null);
        
    }

    const [signin, setSignin] = useState('');
    const [password, setPassword] = useState('');
    const [errorSigninClient, setErrorSigninClient] = useState("");
    const [errorSigninEmployee, setErrorSigninEmployee] = useState("");

    const [signUpF_name, setF_name] = useState('');
    const [signUpL_name, setL_name] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpSIN, setSignUpSIN] = useState('');
    const [signUpDate, setSignUpDate] = useState(new Date().toISOString().slice(0,10));
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConPassword, setSignUpConPassword] = useState('');

    // Modify handleCloseClient to check login
    const handleSignInClient = () => {
        getClients();
        const client = clientsSQL.find(client => client.address === signin && client.password === password);
        if (client) {
            setAccount(client);
            setLoggedIn(1);
            setErrorSigninClient("");
            navigate('/Client');
        } else {
            setErrorSigninClient("Wrong email or password.");
        }
    };

    const handleSignInEmployee = () => {
        getEmployees();
        const employee = employeesSQL.find(employee => employee.sin === parseInt(signin) && employee.password === password);
        if (employee) {
            setAccount(employee);
            setLoggedIn(2);
            setErrorSigninEmployee("");
            navigate('/Employee');
        } else {
            setErrorSigninEmployee("Wrong Employee ID or password.");
        }
    };


    return (
        <div className='bg-fade-wrapper'>
            <div className="bg-fade" />
            <div className="bg-fade" />
            <div className="bg-fade" />

            <div className="text-over-image">
                <h1 style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 2.5)' }}>Welcome to (hotelSiteName)</h1>
                <Button variant="primary" onClick={handleShowClient}>
                    Client Sign in
                </Button>

                <Modal show={showClient} onHide={handleCloseClient}>
                    <Modal.Header closeButton>
                        <Modal.Title>Client Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    autoFocus
                                    value={signin}
                                    onChange={e => setSignin(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {errorSigninClient && <p style={{ color: 'red' }}>{errorSigninClient}</p>}
                        <Button variant="primary" onClick={handleSignInClient}>
                            Sign In
                        </Button>
                        <Button variant="primary" onClick={() => { handleCloseClient(); handleShowClientSignUp(); }}>
                            Sign Up
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showClientSignUp} onHide={handleCloseClientSignUp}>
                    <Modal.Header closeButton>
                        <Modal.Title>Client Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={signUpF_name}
                                    onChange={e => setF_name(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={signUpL_name}
                                    onChange={e => setL_name(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    value={signUpEmail}
                                    onChange={e => setSignUpEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Enter your SIN</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={signUpSIN}
                                    onChange={e => setSignUpSIN(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={signUpPassword}
                                    onChange={e => setSignUpPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={signUpConPassword}
                                    onChange={e => setSignUpConPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {signUpError && <p style={{ color: 'red' }}>{signUpError}</p>}
                        <Button 
                        variant="primary" 
                        onClick={handleClientSignUp}>
                            Sign Up
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Button variant="primary" onClick={handleShowEmployee}>
                    Employee Sign in
                </Button>

                <Modal show={showEmployee} onHide={handleCloseEmployee}>
                    <Modal.Header closeButton>
                        <Modal.Title>Employee Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Employee ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={signin}
                                    onChange={e => setSignin(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {errorSigninEmployee && <p style={{ color: 'red' }}>{errorSigninEmployee}</p>}
                        <Button variant="primary" onClick={handleSignInEmployee}>
                            Sign In
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Login;