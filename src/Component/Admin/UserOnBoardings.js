/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { SiGoogleforms } from 'react-icons/si';
import { RxReload } from 'react-icons/rx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/userOnboardings.css';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import Done from '../../Assets/Done.png';
import View from '../../Assets/View.png';
import Approved from '../../Assets/Approved.png';
import Reject from '../../Assets/Reject.png';
import PersonalInformation from './PersonalInformation';
import Education from './Education';
import Certifications from './Certifications';
import PreviousExperience from './PreviousExperience';
import HealthInformation from './HealthInformation';
import ExistingBankInformation from './ExistingBankInformation';

const UserOnboardings = () => {
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({ name: '', date: '' });
    const [ validationError, setValidationError ] = useState({});
    const [ submissionStatus, setSubmissionStatus ] = useState(false);
    const [ componentView, setComponentView ] = useState(false);

    const componentOrder = [
        'Personal Information',
        'Education',
        'Certifications',
        'Previous Experience',
        'Health Information',
        'Existing Bank Information'
    ];
    const [ personalinfo, setPersonalinfo ] = useState({});
    const [ educationinfo, setEducationinfo ] = useState({});
    const [ certificationsinfo, setCertificationsinfo ]= useState({});
    const [ previousExperienceinfo, setPreviousExperienceinfo ]= useState({});
    const [ healthInfo, setHealthInfo ]= useState({});
    const [ existingBankInfo, setExistingBankInfo ]= useState({});
    const [ reference, setReference ]= useState({});

    useEffect(() => {

        setActiveIndex(0);
        axios.get(`${Endpoint.API_ENDPOINT}/personalinfo`)
            .then(response => {
                setPersonalinfo(response.data[0]);
                console.log('Personal Info in UserOnboarding:', response.data[0] ); 
            })
            .catch(error => {
                console.error('Error loading data:', error);
            });

        axios.get(`${Endpoint.API_ENDPOINT}/api/User/get-education/1`)
            .then(response => {
                setEducationinfo(response.data[0]);
                console.log('Education in UserOnboarding: ',response.data);
            })
            .catch(error => { 
                console.error('Error saving data:', error);
                    
            });

        axios.get(`${Endpoint.API_ENDPOINT}/api/User/get-certificate/1`)
            .then(response => {
                setCertificationsinfo(response.data[0]);
                console.log('certifications in UserOnboarding: ',response.data[0]);
            })
            .catch(error => { 
                console.error('Error saving data:', error);
                    
            });

        axios.get(`${Endpoint.API_ENDPOINT}/api/User/get-experience/1`)
            .then(response => {
                setPreviousExperienceinfo(response.data[0]);
                console.log('previousexperience in UserOnboarding: ',response.data[0]);
            })
            .catch(error => { 
                console.error('Error saving data:', error);
                    
            });
        axios.get(`${Endpoint.API_ENDPOINT}/api/User/get-reference/1`)
            .then(response => {
                setReference(response.data);
                console.log('reference in UserOnboarding: ',response.data);
            })
            .catch(error => { 
                console.error('Error saving data:', error);
                    
            });

        axios.get(`${Endpoint.API_ENDPOINT}/api/User/get-health/1`)
            .then(response => {
                setHealthInfo(response.data);
                console.log('HealthInfo in UserOnboarding: ',response.data);
            })
            .catch(error => { 
                console.error('Error saving data healthinfo:', error);
                    
            });

        axios.get(`${Endpoint.API_ENDPOINT}/api/User/get-existing-bank/1`)
            .then(response => {
                setExistingBankInfo(response.data);
                console.log('existingbankinfo in UserOnboarding: ',response.data);
            })
            .catch(error => { 
                console.error('Error saving data Existing bank infos :', error);
                    
            });
    }, [componentView]); 

    const handleNext = () => {
        if (activeIndex < componentOrder.length - 1) {
            setActiveIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleSubmit = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setValidationError({});
    };

    const handleViewStatus = () => {
        if (!formData.name) {
            setValidationError({ name: 'Please fill in the name field.' });
            return;
        }

        if (!formData.date) {
            setValidationError({ date: 'Please fill in the date field.' });
            return; 
        }
        setSubmissionStatus('View');
        setShowModal(false);
    };

    const handleIconClick = () => {
        setComponentView(true);
        setActiveIndex(0);
        handleRender();
        renderButtons();
    };  

    const handleRender = () => {
        if (componentView) {
            const activeKey = componentOrder[activeIndex];

            switch (activeKey) {
            case 'Personal Information':
                return <PersonalInformation componentView={true} personalinfo={personalinfo} />;
            case 'Education':
                return <Education componentView={true} educationinfo={educationinfo} />;
            case 'Certifications':
                return <Certifications componentView={true} certificationsinfo={certificationsinfo}/>;
            case 'Previous Experience':
                return <PreviousExperience componentView={true} previousExperienceinfo={previousExperienceinfo} refInfo={reference}/>;
            case 'Health Information':
                return <HealthInformation componentView={true} healthInfo={healthInfo}/>;
            case 'Existing Bank Information':
                return <ExistingBankInformation componentView={true} existingBankInfo={existingBankInfo}/>;
            default:
                return null;
            }
        } 
        else if (submissionStatus === 'Done') {
            return (
                <div className="statusdesign">
                    <img src={Done} alt="Thank you" />
                    <h5>All Fields were successfully Filled.</h5>
                </div>
            );
        } else if (submissionStatus === 'View') {
            return (
                <div className="statusdesign">
                    <img src={View} alt="Under Review" />
                    <h5>Your form is under review. You will be notified once its done.</h5>
                    <div className="iconFormLayout" onClick={handleIconClick}>
                        <SiGoogleforms className="iconForm" />
                    </div>
                </div>
            );
        } else if (submissionStatus === 'Reject') {
            return (
                <div className="statusdesign">
                    <img src={Reject} alt="Rejected" />
                    <h5>Sorry, Your Form got Rejected. Please Check and Resubmit</h5>
                    <div className="iconFormLayout">
                        <SiGoogleforms className="iconForm" />
                    </div>
                    <div>
                        <Button className="resubmitButton">
                            Resubmit <RxReload className="iconreload" />
                        </Button>
                    </div>
                </div>
            );
        } else if (submissionStatus === 'Approved') {
            return (
                <div className="statusdesign">
                    <img src={Approved} alt="Approved" />
                    <h5>Congratulations! Your Form Verified and Approved</h5>
                    <div className="iconFormLayout" onClick={handleIconClick}>
                        <SiGoogleforms className="iconForm" />
                    </div>
                </div>
            );
        }
        else {
            const activeKey = componentOrder[activeIndex];
            
            switch (activeKey) {
            case 'Personal Information':
                return <PersonalInformation />;
            case 'Education':
                return <Education />;
            case 'Certifications':
                return <Certifications />;
            case 'Previous Experience':
                return <PreviousExperience />;
            case 'Health Information':
                return <HealthInformation />;
            case 'Existing Bank Information':
                return <ExistingBankInformation />;
            default:
                return null;
            }
        }
        
    };

    const renderButtons = () => {
        const activeKey = componentOrder[activeIndex];

        if (submissionStatus !== false) {
            return null;
        }
        if (activeKey === 'Personal Information') {
            return (
                <ButtonToolbar className="justify-content-end">
                    <Button className="savebutton">Save</Button>
                    <Button className="nextbutton" onClick={handleNext}>
                        Next
                    </Button>
                </ButtonToolbar>
            );
        } else if (
            activeKey === 'Education' ||
            activeKey === 'Certifications' ||
            activeKey === 'Previous Experience' ||
            activeKey === 'Health Information'
        ) {
            return (
                <ButtonToolbar className="justify-content-end">
                    <Button className="savebutton">Save</Button>
                    <Button className="backbutton" onClick={handleNext}>
                        Back
                    </Button>
                    <Button className="nextbutton" onClick={handleNext}>
                        Next
                    </Button>
                </ButtonToolbar>
            );
        } else if (activeKey === 'Existing Bank Information') {
            return (
                <ButtonToolbar className="justify-content-end">
                    <Button className="backbutton" onClick={handleNext}>
                        Back
                    </Button>
                    <Button className="submitbutton" onClick={handleSubmit}>
                        Submit
                    </Button>
                </ButtonToolbar>
            );
        } else {
            return null;
        }
        
    };

    return (
        <div className="onBoardings">
            <div className="navbars">
                {componentOrder.map((componentKey, index) => (
                    <div
                        key={componentKey}
                        className={`nav-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {componentKey}
                    </div>
                ))}
            </div>
            <div className="card">{handleRender()}</div>
            <div className="button">{renderButtons()}</div>
            <Modal show={showModal} onHide={handleModalClose} className="acknowledgementModal" centered>
                <Modal.Header>
                    <Modal.Title>Self-Declaration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <ol>
                            <li>I hereby declare that the above information provided by me is true to my knowledge.</li>
                            <li>
                                I hereby declare that in the future if there is any change in the provided information,
                                I will take full responsibility to update HR and to change the necessary records.
                            </li>
                            <li>
                                I hereby understand and authorize the company to do background verification on me directly
                                by the company or by employing any third-party verification agency.
                            </li>
                        </ol>
                    </div>
                    <div className="modaltextAlign">
                        <div>
                            <p>Name</p>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={componentView}
                            />
                            <p>{validationError.name && <span style={{ color: 'red' }}>{validationError.name}</span>}</p>
                        </div>
                        <div>
                            <p>Date</p>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                disabled={componentView}
                            />
                            <p>{validationError.date && <span style={{ color: 'red' }}>{validationError.date}</span>}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="button-footer">
                    <Button className="close-popup" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button className="accept-popup" onClick={handleViewStatus}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserOnboardings;
