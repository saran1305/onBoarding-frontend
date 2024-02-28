/* eslint no-magic-numbers: ["error", { "ignore": [110,1000,60,10,1,0] }] */
import React,{ useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Endpoint from '../../Entities/Endpoint';
import axios from 'axios';
import propTypes from 'prop-types';
import logo from '../../Assets/IdeassionLogomini.png';
import success from '../../Assets/success circle.png';
import '../../Styles/forgetpassword.css';

const ForgotPasswordModal = ({ show,setShow,handleClose,handleCloseTwo,showSecond,setShowSecond,showThird,setShowThird }) => {

    
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ otpDigits, setOtpDigits ] = useState([ '', '', '', '' ]);

    const handleSendOtp = () => {
        setShowSecond(true)
        setShow(false)
    };

    const handleOtpChange = (index, value) => {
        const updatedDigits = [...otpDigits];

        updatedDigits[index] = value;
        setOtpDigits(updatedDigits);
    };

    const isOtpFilled = otpDigits.every(digit => digit !== '');
    const isPasswordMatched = newPassword === confirmPassword;
    const handleResendOtp = () => {}

    const handleCreatePassword = async () => {
        try {
            const response = await axios.put(`${Endpoint.API_ENDPOINT}/api/Login/ForgotPassword`, {
                password: newPassword,
                conf_Password: confirmPassword
            });

            console.log('i am  response.status',response.status);
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
                        {otpDigits.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                className="box"
                                placeholder=""
                                value={digit}
                                onChange={event => handleOtpChange(index, event.target.value)}
                            />
                        ))}
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
                                    value={newPassword}
                                    onChange={event => setNewPassword(event.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className="passwordInput">
                            <Form.Group controlId="conf_password">
                                <Form.Label className="text3">Confirm Password</Form.Label>
                                <Form.Control
                                    className="textbox"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={event => setConfirmPassword(event.target.value)}
                                />
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
    setShowThird:propTypes.bool.isRequired
};

export default ForgotPasswordModal;
