import React,{ useState } from 'react';
import '../../Styles/userOnboardings.css';
import PersonalInformation from './PersonalInformation';
import Education from './Education';
import Certifications from './Certifications';
import PreviousExperience from './PreviousExperience';
import HealthInformation from './HealthInformation';
import ExistingBankInformation from './ExistingBankInformation';


const UserOnboardings = () => {

    const [ activeKey, setActiveKey ] = useState('PersonalInformation');
    
    const handleRender = () => {
        if (activeKey === 'PersonalInformation') {
            return <PersonalInformation />;
        } else if (activeKey === 'Education') {
            return <Education />;
        } else if (activeKey === 'Certifications') {
            return <Certifications />;
        } else if (activeKey === 'PreviousExperience') {
            return <PreviousExperience />;
        } else if (activeKey === 'HealthInformation') {
            return <HealthInformation />;
        } else if (activeKey === 'ExistingBankInformation') {
            return <ExistingBankInformation />;
        } else {
            return null;
        }
    };
      
    return (
        <div className="onBoardings">
            <div className="navbars">
                <div className={`nav-item ${activeKey === 'PersonalInformation' ? 'active' : ''}`}     onClick={() => setActiveKey('PersonalInformation')}>Personal Information</div>
                <div className={`nav-item ${activeKey === 'Education' ? 'active' : ''}`}               onClick={() => setActiveKey('Education')}>Education</div>
                <div className={`nav-item ${activeKey === 'Certifications' ? 'active' : ''}`}          onClick={() => setActiveKey('Certifications')}>Certifications</div>
                <div className={`nav-item ${activeKey === 'PreviousExperience' ? 'active' : ''}`}      onClick={() => setActiveKey('PreviousExperience')}>Previous Experience</div>
                <div className={`nav-item ${activeKey === 'HealthInformation' ? 'active' : ''}`}       onClick={() => setActiveKey('HealthInformation')}>Health Information</div>
                <div className={`nav-item ${activeKey === 'ExistingBankInformation' ? 'active' : ''}`} onClick={() => setActiveKey('ExistingBankInformation')}>Existing Bank Information</div>
            </div>
            <div className="card">
                {handleRender()}
            </div>
            <div className="button">
                <button className="btn primary">Save</button>
                <button>Next</button>
            </div>
        </div>
    );
};

export default UserOnboardings;
