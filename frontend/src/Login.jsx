import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();

    const clients = [{"email": "liamjulien@gmail.com", "password": "12345"}]
    const employees = [{"employeeID": "101", "password": "abcde"}]


    const [showClient, setShowClient] = useState(false);

    const handleCloseClient = () => setShowClient(false);
    const handleShowClient = () => setShowClient(true);

    const [showEmployee, setShowEmployee] = useState(false);

    const handleCloseEmployee = () => setShowEmployee(false);
    const handleShowEmployee = () => setShowEmployee(true);


    const [signin, setSignin] = useState('');
    const [password, setPassword] = useState('');

    // Modify handleCloseClient to check login
    const handleSignInClient = () => {
        const client = clients.find(client => client.email === signin && client.password === password);
        if (client) {
            navigate('/Client');
        } else {
            alert('Try again');
        }
    };

    const handleSignInEmployee = () => {
        const employee = employees.find(employee => employee.employeeID === signin && employee.password === password);
        if (employee) {
            navigate('/Employee');
        } else {
            alert('Try again');
        }
    };
    
    return (
        <div>
            <h1>Welcome to (hotelSiteName)</h1>
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
                    <Button variant="primary" onClick={handleSignInClient}>
                        Sign In
                    </Button>
                    <Button variant="primary" onClick={handleCloseClient}>
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
                    <Button variant="primary" onClick={handleSignInEmployee}>
                        Sign In
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export default Login;