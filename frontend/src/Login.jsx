import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Background.css';

const Login = () => {
    const navigate = useNavigate();

    const clients = [{"email": "liamjulien@gmail.com", "password": "12345"}]
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

    const handleCloseClientSignUp = () => setShowClientSignUp(false);
    const handleShowClientSignUp = () => setShowClientSignUp(true);


    const [signin, setSignin] = useState('');
    const [password, setPassword] = useState('');
    const [errorSigninClient, setErrorSigninClient] = useState("");
    const [errorSigninEmployee, setErrorSigninEmployee] = useState("");

    // Modify handleCloseClient to check login
    const handleSignInClient = () => {
        const client = clients.find(client => client.email === signin && client.password === password);
        if (client) {
            navigate('/Client');
            setErrorSigninClient("");
        } else {
            setErrorSigninClient("Wrong email or password.");
        }
    };

    const handleSignInEmployee = () => {
        const employee = employees.find(employee => employee.employeeID === signin && employee.password === password);
        if (employee) {
            navigate('/Employee');
            setErrorSigninEmployee("");
        } else {
            setErrorSigninEmployee("Wrong Employee ID or password");
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
                            <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    //value={password}
                                    //onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseClientSignUp}>
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