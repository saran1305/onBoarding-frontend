import React, { useState } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/userOnboardings.css';
import PersonalInformation from './PersonalInformation';
import Education from './Education';
import Certifications from './Certifications';
import PreviousExperience from './PreviousExperience';
import HealthInformation from './HealthInformation';
import ExistingBankInformation from './ExistingBankInformation';

const UserOnboardings = () => {
    const [componentOrder] = useState([
        'Personal Information',
        'Education',
        'Certifications',
        'Previous Experience',
        'Health Information',
        'Existing Bank Information'
    ]);
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({ name: '',date: '' });
    const [ validationError, setValidationError ] = useState('')

      
    const handleNext = () => {
        if (activeIndex < componentOrder.length - 1) {
            setActiveIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleBack = () => {
        if (activeIndex > 0) {
            setActiveIndex(prevIndex => prevIndex - 1);
        }
    };

    // const handleSave = () => {
    //     switch (activeComponent) {
    //     case 'Personal Information':
    //         saveData( `${Endpoint.API_ENDPOINT}/personalinfo`);
    //         break;
    //     case 'Education':
    //         saveData(`${Endpoint.API_ENDPOINT}/education`);
    //         break;
    //     case 'Certifications':
    //         saveData(`${Endpoint.API_ENDPOINT}/certifications`);                
    //         break;
    //     case 'Previous Experience':
    //         saveData(`${Endpoint.API_ENDPOINT}/previousexperience`);                    
    //         break;
    //     case 'Health Information':
    //         saveData(`${Endpoint.API_ENDPOINT}/healthinfo`);                    
    //         break;
    //     case 'Existing Bank Information':
    //         saveData(`${Endpoint.API_ENDPOINT}/existingbankinfo`);                    
    //         break;
    //     default:
    //         break;
    //     }
    // };

    // const saveData = async apiEndpoint => {
    //     try {
    //         const dataToSave = { };
    
    //         const response = await axios.post(apiEndpoint, dataToSave, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    
    //         console.log(`Data saved for ${activeComponent} using API: ${apiEndpoint}, Status: ${response.status}`);
    //     } catch (error) {
    //         console.error('Error:', error.message || error);
    //     }
    // };
    const handleSubmit = () => {
        setShowModal(true);
        console.log('Form submitted!');
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
        setValidationError('');
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
    
        // Validation passed, proceed with submission
        console.log('Form submitted with data:', formData);
        setValidationError({});
            
        setShowModal(false);
    }

    const handleSave = () => {
       
        // if (onSave) {
        //     onSave();
        // }
    };

    const handleRender = () => {
        const activeKey = componentOrder[activeIndex];

        switch (activeKey) {
        case 'Personal Information':
            return  <PersonalInformation onClick={handleSave} />
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
    };

    const renderButtons = () => {
        const activeKey = componentOrder[activeIndex];
    
        if (activeKey === 'Personal Information') {
            return (
                <ButtonToolbar className="justify-content-end">
                    <Button className="savebutton" onClick={handleSave}>
                        {/* <span className="draftSavedText">Draft Saved</span> */}
                        Save </Button>
                    <Button className="nextbutton" onClick={handleNext}> Next </Button>
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
                    <Button className="savebutton" onClick={handleSave}>Save</Button>
                    <Button className="backbutton" onClick={handleBack}>Back</Button>
                    <Button className="nextbutton" onClick={handleNext}>Next</Button>
                </ButtonToolbar>
            );
        } else if (activeKey === 'Existing Bank Information') {
            return (
                <ButtonToolbar className="justify-content-end">
                    <Button className="backbutton" onClick={handleBack}>Back</Button>
                    <Button className="submitbutton" onClick={handleSubmit}>Submit</Button>
                </ButtonToolbar>
            );
        } else { return null; }
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
                            <li>
                                I hereby declare that the above information provided by me is true to my knowledge.
                            </li>
                            <li>
                                I hereby declare that in the future if there is any change in the provided information,
                                I will take full responsibility to update HR and to change the necessary records.
                            </li>
                            <li>
                                I hereby understand and authorize the company to do background verification on me directly
                                by the company or by employing any third party verification agency.
                            </li>
                        </ol>
                    </div>
                    <div className="modaltextAlign">
                        <div> <p>Name</p>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            /> 
                            <p>{validationError && validationError.name && <p style={{ color: 'red' }}>{validationError.name}</p>}</p>
                        </div>
                        
                        <div> <p>Date</p>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                            /> 
                            <p>{validationError && validationError.date && <p style={{ color: 'red' }}>{validationError.date}</p>}</p> 
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
