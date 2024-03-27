/* eslint-disable max-len */
/* eslint-disable max-statements */
/* eslint no-magic-numbers: ["error", { "ignore": [0,1,2,3,4,5,6,7,8,18] }] */
import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { SiGoogleforms } from 'react-icons/si';
import { RxReload } from 'react-icons/rx';
import { toast } from 'react-toastify';
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
    const [ SelfDeclaration, setSelfDeclaration ] = useState({});
    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({ name: '', date: '' });
    const [ validationError, setValidationError ] = useState({});
    const [ submissionStatus, setSubmissionStatus ] = useState('');
    const [ componentView, setComponentView ] = useState(true);
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
    const _dashboardUserDetail = JSON.parse(localStorage.getItem('dashboardUserDetail'))
    const userDataEmpId = JSON.parse(localStorage.getItem('userData'))
    const _postedGenid = localStorage.getItem('postedGenId')

    useEffect(() => {
        if (_dashboardUserDetail) {

            setSubmissionStatus(_dashboardUserDetail?.status);
        }

        GetSelfDeclaration()
        
    }, [])

    const GetSelfDeclaration = () => {
        axios.get(`${Endpoint.API_ENDPOINT}/User/GetSelfDeclaration/${_dashboardUserDetail ? _dashboardUserDetail.genId : _postedGenid}`)
            .then( res => (setSelfDeclaration(res.data, 'resdata') ))
    }

    const handleNext =async () => {
        const activeKey = componentOrder[activeIndex];

        if(activeKey === 'Personal Information'){
            try{
                const storedUserData = JSON.parse(localStorage.getItem('userData'));

                if (storedUserData) {
                    setUserData(storedUserData);
                    const role = storedUserData.role

                    const directAdd = role === 'Admin' ? true : false;

                    const _data = personalDetails.result

                    const response = await axios.post(`${Endpoint.API_ENDPOINT}/UserDetails/AddPersonalInfo`, _data, {
                        params: { directAdd: directAdd },
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (activeIndex < componentOrder.length - 1) {
                        setActiveIndex(prevIndex => prevIndex + 1);
                    }
                    window.localStorage.setItem('postedGenId', Number(response.data));
                }
            }catch (error) {
                console.error('Error in saving Education data:', error);
                toast.error('Failed to save data. Please try again.');
            }
        }
        else if (activeKey === 'Education') {

            try{
                const response = await axios.post(`${Endpoint.API_ENDPOINT}/User/add-education/${_dashboardUserDetail ? _dashboardUserDetail.genId : _postedGenid}`, educationinfo, 
                    { headers: { 'Content-Type': 'application/json' } });

                if (activeIndex < componentOrder.length - 1) {
                    setActiveIndex(prevIndex => prevIndex + 1);
                }
                window.localStorage.setItem('postedGenId', Number(response.data));
            }catch (error) {
                console.error('Error in saving Education data:', error);
                toast.error('Failed to save data. Please try again.');
            }
        } else if (activeKey === 'Certifications') {
 
            try {
                const response = await axios.post(`${Endpoint.API_ENDPOINT}/User/add-certificate/${_dashboardUserDetail.genId ? _dashboardUserDetail.genId : _postedGenid}`, certifications,
                    { headers: { 'Content-Type': 'application/json' } }
                );

                if (activeIndex < componentOrder.length - 1) {
                    setActiveIndex(prevIndex => prevIndex + 1);
                }
                window.localStorage.setItem('postedGenId', Number(response.data));
            } catch (error) {
                console.error('Error saving data in Certification:', error);
                toast.error('Failed to save data. Please try again.');
            }
        } else if (activeKey === 'Previous Experience') {

            try {
                const expResponse = await axios.post(`${Endpoint.API_ENDPOINT}/User/add-experience/${_dashboardUserDetail.genId ? _dashboardUserDetail.genId : _postedGenid}`, previousExperience);

                const refResponse = await axios.post(`${Endpoint.API_ENDPOINT}/User/add-reference/${_dashboardUserDetail.genId ? _dashboardUserDetail.genId : _postedGenid}`, reference, { headers: { 'Content-Type': 'application/json' } });

                if (activeIndex < componentOrder.length - 1) {
                    setActiveIndex(prevIndex => prevIndex + 1);
                }
                window.localStorage.setItem('postedGenId', Number(expResponse.data));
                window.localStorage.setItem('postedGenId', Number(refResponse.data));
            } catch (error) {
                console.error('Error saving data:', error);
                toast.error('Failed to save data. Please try again.');
            }
        } else if (activeKey === 'Health Information') {

            axios.post(`${Endpoint.API_ENDPOINT}/User/add-health/${_dashboardUserDetail.genId ? _dashboardUserDetail.genId : _postedGenid}`, healthInformation, 
                { headers: { 'Content-Type':  'application/json'    } })
                .then(response => {
                    if (activeIndex < componentOrder.length - 1) {
                        setActiveIndex(prevIndex => prevIndex + 1);
                    }
                    window.localStorage.setItem('postedGenId', Number(response.data));

                })
                .catch(error => {
                    console.error('Error saving data:', error.message || error);
                    toast.error('Failed to save data. Please try again.');
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

            
            delete existingbank.fileName

            axios.post(`${Endpoint.API_ENDPOINT}/User/add-existing-bank/${_dashboardUserDetail.genId ? _dashboardUserDetail.genId : _postedGenid}`,existingbank,
                { headers: { 'Content-Type':  'application/json'    } })
                .then(response => {   
                    !SelfDeclaration.isSelfDeclared && setShowModal(true) 
                    window.localStorage.setItem('postedGenId', Number(response.data));
                })
                .catch(error => {
                    console.error('Error saving data:', error.message || error);
                    toast.error('Failed to save data. Please try again.');
                });
        }
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

        if(formData.date && formData.name) {
            const parts = formData.date.split('-')

            const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`

            let declaration = {  
                name: formData.name,  
                date: formattedDate,
                createdBy: userDataEmpId.empId  }
            
            axios.post(`${Endpoint.API_ENDPOINT}/User/CreateSelfDeclaration/${_dashboardUserDetail ? _dashboardUserDetail.genId : _postedGenid}`, declaration)
        }
        
        setShowModal(false);
        setSubmissionStatus('Done')
    };

    const handleIconClick = () => {
        setSubmissionStatus(false)
        setComponentView(true);
        setActiveIndex(0);
        handleRender();
        renderButtons();
    };

    const handleRender = () => { 
        if(!submissionStatus || submissionStatus.length === 0 || submissionStatus === 'Invited') {
            const activeKey = componentOrder[activeIndex];

            switch (activeKey) {
            case 'Personal Information':
                return <PersonalInformation  personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} userId={userData && userData.empId} genId={genId} setGenId={setGenId} email={userData && userData.email} />;
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
        } else if (submissionStatus === 'Submitted') {
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
            } else if (activeKey === 'Education' ||activeKey === 'Certifications'||activeKey === 'Previous Experience'|| activeKey === 'Health Information') {
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
            } else if (activeKey === 'Education' ||activeKey === 'Certifications'||activeKey === 'Previous Experience'|| activeKey === 'Health Information') {
                return (
                    <ButtonToolbar className="justify-content-end">
                        <Button className="backbutton" onClick={handleBack}>Back</Button>
                        <Button className="nextbutton" onClick={handleNext}>Next </Button>
                    </ButtonToolbar>
                );
            } 
            else if (activeKey === 'Existing Bank Information') {
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
                                value={formData?.name}
                                onChange={event => handleInputChange(event)}
                            />
                            <p>{validationError.name && <span style={{ color: 'red' }}>{validationError.name}</span>}</p>
                        </div>
                        <div>
                            <p>Date</p>
                            <input
                                type="date"
                                name="date"
                                value={formData?.date}
                                onChange={event => handleInputChange(event)}
                            />
                            <p>{validationError.date && <span style={{ color: 'red' }}>{validationError.date}</span>}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="button-footer">
                    <Button className="close-popup" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button className="accept-popup" onClick={() => handleViewStatus()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserOnboardings;
