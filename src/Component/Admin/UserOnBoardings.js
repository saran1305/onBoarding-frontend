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
    const [ userData, setUserData ] = useState(null);
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
    const [ personalDetails, setPersonalDetails ] = useState({});
    const [ educationinfo, setEducationinfo ] = useState([]);
    const [ certifications, setCertifications ] = useState([]);
    const [ previousExperience, setPreviousExperience ] = useState([]);
    const [ reference, setReference ] = useState({});
    const [ healthInformation, setHealthInformation ] = useState({});
    const [ existingbank, setExistingbank ] = useState({});
    const [ genId, setGenId ] = useState(null);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        if (storedUserData) {
            setUserData(storedUserData);
            const userId = Number(storedUserData.empId); 
            
            // console.log('storedUserData',userId);

            setActiveIndex(0);

            axios.get(`${Endpoint.API_ENDPOINT}/UserDetails/GetPersonalInfo/${userId}`)
                .then(response => {
                    const genId = response.data.result.genId;

                    setGenId(genId);    
                    console.log('genId',genId);
                })
                .catch(error => {
                    console.error('Error fetching personalInfo:', error);
                });
        }}, []); 
            
    const handleNext =async () => {
        if (activeIndex < componentOrder.length - 1) {
            setActiveIndex(prevIndex => prevIndex + 1);
        }
        // const userId = Number(userData.empId);

        const activeKey = componentOrder[activeIndex];

        if(activeKey === 'Personal Information'){
            try{
                const response = await axios.post(`${Endpoint.API_ENDPOINT}/UserDetails/AddPersonalInfo`, personalDetails.result, 
                    { headers: { 'Content-Type': 'application/json' } });

                console.log('Education data saved successfully:', response.data);
            }catch (error) {
                console.error('Error in saving Education data:', error);
            }
        }
        else if (activeKey === 'Education') {
            const _data  = educationinfo.filter(item => item.fileName)

            try{
                const response = await axios.post(`${Endpoint.API_ENDPOINT}/User/add-education/${genId}`, _data, 
                    { headers: { 'Content-Type': 'application/json' } });

                console.log('Education data saved successfully:', response.data);
            }catch (error) {
                console.error('Error in saving Education data:', error);
            }
        } else if (activeKey === 'Certifications') {
            try {
                const response = await axios.post(`${Endpoint.API_ENDPOINT}/User/add-certificate/${genId}`, certifications,
                    { headers: { 'Content-Type': 'application/json' } }
                );

                console.log('Certifications Data saved successfully:', response.data);
            } catch (error) {
                console.error('Error saving data in Certification:', error);
            }
        } else if (activeKey === 'Previous Experience') {
            try {
                await axios.post(`${Endpoint.API_ENDPOINT}/User/add-experience/${genId}`, previousExperience);
                await axios.post(`${Endpoint.API_ENDPOINT}/User/add-reference/${genId}`, reference);
            } catch (error) {
                console.error('Error saving data:', error);
            }
        } else if (activeKey === 'Health Information') {
            axios.post(`${Endpoint.API_ENDPOINT}/User/add-health/${genId}`, healthInformation, 
                { headers: { 'Content-Type':  'application/json'    } })
                .then(response => {
                    console.log('Data saved successfully HealthInfo:', response.data);
                })
                .catch(error => {
                    console.error('Error saving data:', error.message || error);
                });
        } 
    };
    const handleBack = () => {
        if (activeIndex > 0) {
            setActiveIndex(prevIndex => prevIndex - 1);
        }
    }
    
    const handleSubmit = () => {
        const activeKey = componentOrder[activeIndex];

        if (activeKey === 'Existing Bank Information') {
            axios.post(`${Endpoint.API_ENDPOINT}/User/add-existing-bank/${genId}`,existingbank,
                { headers: { 'Content-Type':  'application/json'    } })
                .then(response => {
                    console.log('Existing Bank data saved successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error saving data:', error.message || error);
                });
        }
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
        setSubmissionStatus(false)
        setComponentView(true);
        setActiveIndex(0);
        handleRender();
        renderButtons();
    };  

    const handleRender = () => {
        if(!submissionStatus) {
            const activeKey = componentOrder[activeIndex];

            switch (activeKey) {
            case 'Personal Information':
                return <PersonalInformation  personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} userId={userData && userData.empId} genId={genId} setGenId={setGenId} />;
            case 'Education':
                return <Education educationinfo={educationinfo} setEducationinfo={setEducationinfo} genId={genId} setGenId={setGenId} />;
            case 'Certifications':
                return <Certifications certifications={certifications} setCertifications={setCertifications}genId={genId} setGenId={setGenId}  />;
            case 'Previous Experience':
                return <PreviousExperience previousExperience={previousExperience}setPreviousExperience={setPreviousExperience}
                    reference={reference} setReference={setReference}/>;
            case 'Health Information':
                return <HealthInformation healthInformation={healthInformation} setHealthInformation={setHealthInformation}genId={genId} setGenId={setGenId}/>;
            case 'Existing Bank Information':
                return <ExistingBankInformation existingbank={existingbank} setExistingbank={setExistingbank}genId={genId} setGenId={setGenId}/>;
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
    };
    const renderButtons = () => {
        const activeKey = componentOrder[activeIndex];

        if(componentView){
            if (activeKey === 'Personal Information') {
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="nextbutton" onClick={handleNext}>Next</Button>
                    </ButtonToolbar>
                );
            } else if (activeKey === 'Education') {
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="nextbutton" onClick={handleNext}>Next </Button>
                    </ButtonToolbar>
                );
            } else if(activeKey === 'Certifications') {
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="nextbutton" onClick={handleNext}>Next </Button>
                    </ButtonToolbar>
                );
            }else if(activeKey === 'Previous Experience'){
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="nextbutton" onClick={handleNext}>Next </Button>
                    </ButtonToolbar>
                );
            }else if( activeKey === 'Health Information'){
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="nextbutton" onClick={handleNext}>Next </Button>
                    </ButtonToolbar>
                );
            } else if (activeKey === 'Existing Bank Information') {
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                    </ButtonToolbar>
                );
            }else{
                return null;
            }}
        if(submissionStatus !== false) {
            return null;
        }
        if(!componentView){
            if (activeKey === 'Personal Information') {
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="nextbutton" onClick={handleNext}>Next</Button>
                    </ButtonToolbar>
                );
            } else if (activeKey === 'Education') {
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="nextbutton" onClick={handleNext}>Next </Button>
                    </ButtonToolbar>
                );
            } else if(activeKey === 'Certifications') {
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="nextbutton" onClick={handleNext}>Next </Button>
                    </ButtonToolbar>
                );
            }else if(activeKey === 'Previous Experience'){
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="nextbutton" onClick={handleNext}>Next </Button>
                    </ButtonToolbar>
                );
            }else if( activeKey === 'Health Information'){
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="nextbutton" onClick={handleNext}>Next </Button>
                    </ButtonToolbar>
                );
            } else if (activeKey === 'Existing Bank Information') {
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="submitbutton" onClick={handleSubmit}>Submit</Button>
                    </ButtonToolbar>
                );
            } else {
                return null;
            }
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
