import React, { useState } from 'react';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';
import { Button, Form, Container, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import IdeassionLogomini from '../../Assets/IdeassionLogomini.png';
import box from '../../Assets/box.png';
import girl from '../../Assets/girl.png';
import iconcup from '../../Assets/iconcup.png';
import iconnotepad from '../../Assets/iconnotepad.png';
import group from '../../Assets/Group.png';
import '../../Styles/login.css';

const Login = ({ toastContainer }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailError, setEmailError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');

    const MIN_PASSWORD_LENGTH = 6;

    const Navigate = useNavigate();

    const statustwo = 204;

    const handleSubmit = async event => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');
    
        if (!validator.isEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            setPasswordError('Password must be at least 6 characters long.');
            return;
        }
        try {
            const responseLogin = await axios.post(`${Endpoint.API_ENDPOINT}/api/Login/AuthenticateEmp`, null, {
                params: {
                    emailid: email,
                    password: password }
            });
    
            if (responseLogin.status === statustwo) {
                toast.success('Login successful');
                Navigate('/admin/on-boarders');
            } else {
                toast.error('Error during login');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Error during login');
        }
    };     

    return (
        <Container fluid>
            {toastContainer}
            <Row sm={12}>
                <Col sm={6} className="column">
                    <img src={box} alt="box" className="box" />
                    <div>
                        <img src={IdeassionLogomini} alt="logo" className="logo" />
                    </div>
                    <div className="title">Login</div>
                    <Form onSubmit={handleSubmit} className="body">
                        <Form.Group controlId="email">
                            <Form.Label className="label">Email:</Form.Label>
                            <Form.Control
                                className="control"
                                type="email"
                                value={email}
                                placeholder="Mail Id"
                                onChange={event => setEmail(event.target.value)}
                            />
                            {emailError && <p className="error">{emailError}</p>}
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label className="label">Password:</Form.Label>
                            <Form.Control
                                className="control"
                                type="password"
                                value={password}
                                placeholder="password"
                                onChange={event => setPassword(event.target.value)}
                            />
                            {passwordError && <p className="error">{passwordError}</p>}
                        </Form.Group>
                        <Row>
                            <Col xs={6}>
                                <Form.Group controlId="rememberMe" className="checking">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                            </Col>
                            <Col xs={6} className="checking">
                                <p>Forgot Password?</p>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" className="button-login">Login</Button>
                    </Form>
                    <img src={group} alt="group" className="group" />
                </Col>
                <Col sm={6} className="column-2">
                    <div>
                        <img src={iconcup} alt="iconcup" className="iconcup" />
                        <div className="content" >

                            <img src={iconnotepad} alt="iconnotepad" className="iconnotepad" />
                            <p>Very good works are  waiting for you  🤞 Login Now </p>
                            <img src={girl} alt="girl" className="girl" />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

Login.propTypes = {
    toastContainer: propTypes.object.isRequired
};

export default Login;
