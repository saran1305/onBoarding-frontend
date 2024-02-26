/* eslint no-magic-numbers: ["error", { "ignore": [110,1000,60,10,1,0] }] */
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
import ForgotPasswordModal from '../../Containers/Login/ForgotPasswordModal';

const Login = ({ toastContainer }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    // const [ emailError, setEmailError ] = useState('');
    // const [ passwordError, setPasswordError ] = useState('');
    const [ showForgotPasswordModal, setShowForgotPasswordModal ] = useState(false);
    const [ emailValid, setEmailValid ] = useState(false);
    const [ showSecondModal, setShowSecondModal ] = useState(false);
    const [ showThird, setShowThird ] = useState(false);

    const handleCloseForgotPasswordModal = () => setShowForgotPasswordModal(false);

    const handleEmailChange = event => {
        const inputEmail = event.target.value;

        setEmail(inputEmail);
        // setEmailValid(event.target.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value));
        const isValid = validEmail(inputEmail);

        setEmailValid(isValid);
    };
    const validEmail = email =>{
        // const rex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return validator.isEmail(email);
    };
    const handleShowForgotPasswordModal = async () => {
        try {
            const responseForgotPassword = await axios.post(`${Endpoint.API_ENDPOINT}/Login/ForgotPassword`, null, {
                params: {
                    emailId: email
                }
            });
        
            if (responseForgotPassword.status) {
                toast.success('Forgot password request sent successfully');
                setShowForgotPasswordModal(true);
            } else {
                toast.error('Error sending forgot password request');
            }
        } catch (error) {
            console.error('Error sending forgot password request:', error);
            toast.error('Error sending forgot password request');
        }
    };
    
    const handleCloseShowSecondModal = () => setShowSecondModal(false);

    const Navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        // setEmailError('');
        // setPasswordError('');
    
        // if (!validator.isEmail(email)) {
        //     setEmailError('Please enter a valid email address.');
        //     return;
        // }
        // if (!password) {
        //     setPasswordError('Please enter your password.');
        //     return;
        // }
        try {
            const responseLogin = await axios.post(`${Endpoint.API_ENDPOINT}/Login/AuthenticateEmp`, null, {
                params: {
                    emailid: email,
                    password: password
                }
            });
    
            if (responseLogin.data) {
                toast.success('Login successful');
                window.localStorage.setItem('userData', JSON.stringify(responseLogin.data));
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
        <React.Fragment>
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
                                    onChange={handleEmailChange}
                                />
                                {/* {emailError && <p className="error">{emailError}</p>} */}
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
                                {/* {passwordError && <p className="error">{passwordError}</p>} */}
                            </Form.Group>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="rememberMe" className="checking">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} className="checking">
                                    <Button variant="link" onClick={handleShowForgotPasswordModal} disabled={!emailValid}>
                                        Forgot Password?
                                    </Button>
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
            <ForgotPasswordModal 
                show={showForgotPasswordModal} 
                setShow={setShowForgotPasswordModal}
                handleClose={handleCloseForgotPasswordModal} 
                showSecond={showSecondModal}
                setShowSecond={setShowSecondModal}
                handleCloseTwo={handleCloseShowSecondModal}
                showThird={showThird}
                setShowThird={setShowThird}
            />
        </React.Fragment>
    );
};

Login.propTypes = {
    toastContainer: propTypes.object.isRequired
};

export default Login;