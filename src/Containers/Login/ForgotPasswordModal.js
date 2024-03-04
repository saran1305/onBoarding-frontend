/* eslint no-magic-numbers: ["error", { "ignore": [0,1,2,3] }] */
import React,{ useState,useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Endpoint from '../../Entities/Endpoint';
import axios from 'axios';
import propTypes from 'prop-types';
import logo from '../../Assets/IdeassionLogomini.png';
import success from '../../Assets/success circle.png';
import '../../Styles/forgetpassword.css';

const ForgotPasswordModal = ({ show,setShow,handleClose,handleCloseTwo,showSecond,setShowSecond,showThird,setShowThird,email }) => {

    const [ passwords, setPasswords ] = useState({ password: '', conf_Password: '' });
    const [ otpDigits, setOtpDigits ] = useState([ '', '', '', '' ]);

    useEffect(() => {
        if (show === true) {
            const sendForgotPasswordRequest = async () => {
                try {
                    const responseForgotPassword = await axios.post(`${Endpoint.API_ENDPOINT}/Login/ForgotPassword`, null, {
                        params: {
                            emailId: email
                        }
                    });
    
                    if (responseForgotPassword.status) {
                        console.log('Forgot password request sent successfully');
                    } else {
                        console.error('Error sending forgot password request');
                    }
                    console.log('responseForgotPassword', responseForgotPassword);
                } catch (error) {
                    console.error('Error sending forgot password request:', error);
                }
            };
    
            sendForgotPasswordRequest();
        }
    }, [ show, email ]);
    

    const handleSendOtp = async () => {
        try {
            const otpString = otpDigits.join('');
            const response = await axios.post(`${Endpoint.API_ENDPOINT}/Login/VerifyOTP`,null,{
                params: {
                    emailId: email,
                    otp: parseInt(otpString)
                }
            });

            console.log('i am  verified',response.status);
            if (response.status) {
                setShowSecond(true)
                setShow(false)
               
            } else {
                console.error('Password confirmation failed');
            }
        } catch (error) {
            console.error('Error confirming password:', error);
        }

        
    };

    const isOtpFilled = otpDigits.every(digit => digit !== '');
    const isPasswordMatched = passwords.password === passwords.conf_Password;

    const handleResendOtp = async () => {
        setShow(true);
    };

    const handleCreatePassword = async () => {
        try {
            const response = await axios.put(`${Endpoint.API_ENDPOINT}/Login/UpdatePassword`, passwords, {
                params: {
                    emailId: email
                }
            });
    
            console.log('i am response.status', response.status);
            if (response.status) {
                setShowThird(true);
                setShowSecond(false);
            } else {
                console.error('Password confirmation failed');
            }
        } catch (error) {
            console.error('Error confirming password:', error);
        }
    };
    
    
    const handleContinue = () => {
        setShowThird(false)
    };

    return (
        < React.Fragment>
            <Modal show={show} className="forgetScreeen">
                <Button className="resumebutton1" onClick={handleClose}>
                    <IoArrowBack className="backicon"/>
                </Button>
                <Modal.Body>             
                    <div className="logoouter">
                        <img src={logo} alt="Logo" className="logoinner" />
                    </div>
                    <h5 className="text">Email Verification Code</h5>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="text2">“Please enter the OTP sent to your respective email to create a new password for your account”.</Form.Label>
                    </Form.Group>
                    <div className="rowtype">
                        <input
                            type="text"
                            className="box"
                            placeholder=""
                            value={otpDigits[0]}
                            onChange={event => setOtpDigits(prevDigits => [ event.target.value, prevDigits[1], prevDigits[2], prevDigits[3] ])}
                        />
                        <input
                            type="text"
                            className="box"
                            placeholder=""
                            value={otpDigits[1]}
                            onChange={event => setOtpDigits(prevDigits => [ prevDigits[0], event.target.value, prevDigits[2], prevDigits[3] ])}
                        />
                        <input
                            type="text"
                            className="box"
                            placeholder=""
                            value={otpDigits[2]}
                            onChange={event => setOtpDigits(prevDigits => [ prevDigits[0], prevDigits[1], event.target.value, prevDigits[3] ])}
                        />
                        <input
                            type="text"
                            className="box"
                            placeholder=""
                            value={otpDigits[3]}
                            onChange={event => setOtpDigits(prevDigits => [ prevDigits[0], prevDigits[1], prevDigits[2], event.target.value ])}
                        />
                    </div>
                    <div className="timer">
                        <div className="buttondesign" onClick={handleResendOtp}>Resend OTP</div>                    
                    </div>
                    <div className="buttonContainer">
                        <Button variant="primary" onClick={handleSendOtp}disabled={!isOtpFilled} >
                            Confirm
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showSecond} className="forgetScreeen">
                <Button className="resumebutton1" onClick={handleCloseTwo}>
                    <IoArrowBack className="backicon"/>
                </Button>
                <Modal.Body>             
                    <div className="logoouter">
                        <img src={logo} alt="Logo" className="logoinner" />
                    </div>
                    <h5 className="text">Enter New Password</h5>
                    <div>
                        <div className="passwordInput">
                            <Form.Group controlId="password">
                                <Form.Label className="text3">New Password</Form.Label>
                                <Form.Control
                                    className="textbox"
                                    type="password"
                                    value={passwords.password}
                                    onChange={event => setPasswords({ ...passwords, password: event.target.value })}                                />
                            </Form.Group>
                        </div>
                        <div className="passwordInput">
                            <Form.Group controlId="conf_password">
                                <Form.Label className="text3">Confirm Password</Form.Label>
                                <Form.Control
                                    className="textbox"
                                    type="password"
                                    value={passwords.conf_Password}
                                    onChange={event => setPasswords({ ...passwords, conf_Password: event.target.value })}                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <Button variant="primary" onClick={handleCreatePassword}>
                            Confirm
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showThird} className="forgetScreeen">
                <Modal.Body>             
                    <div className="logoouter">
                        <img src={success} alt="SuccessLogo" className="logosuccess" />
                    </div>
                    <h5 className="text">Password Created</h5>
                    <div className="text2">“Your password created successfully Click below continue to login”.</div>
                    <div className="buttonContainer">
                        <Button variant="primary" onClick={handleContinue} disabled={!isPasswordMatched}>
                            Continue
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

ForgotPasswordModal.propTypes = {
    show:propTypes.bool.isRequired,
    setShow:propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
    showSecond:propTypes.bool.isRequired,
    setShowSecond:propTypes.bool.isRequired,
    handleCloseTwo: propTypes.func.isRequired,
    showThird:propTypes.bool.isRequired,
    setShowThird:propTypes.bool.isRequired,
    email: propTypes.string.isRequired
};

export default ForgotPasswordModal;
