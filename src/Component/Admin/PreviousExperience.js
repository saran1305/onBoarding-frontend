import React, { useState } from 'react';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import '../../Styles/previousExperience.css';
import { IoMdAdd } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import propTypes from 'prop-types';

const PreviousExperience = ({ componentView,previousExperienceinfo,refInfo }) => {
    const [ previousExperience, setPreviousExperience ] = useState([
        {
            company_name: '',
            designation: '',
            startDate: '',
            endDate: '',
            reporting_to: '',
            reason: '',
            location: '',
            exp_Certificate: ''
        }
    ]);
        
    const [ reference, setReference ] = useState([
        {
            referral_name: '',
            designation: '',
            company_name: '',
            contact_number: '',
            email_Id: '',
            authorize: true
        }

    ]);

    const handleAddPreviousExperience = () => {
        setPreviousExperience(prevDetails => [
            ...prevDetails,
            {
                company_name: '',
                designation: '',
                startDate: '',
                endDate: '',
                reporting_to: '',
                reason: '',
                location: '',
                exp_Certificate: ''
            }
        ]);
    };
    
    const [ draftSaved, setDraftSaved ] = useState(false);

    const handleInputChange = (index, field, value, type = 'previousExperience') => {
        if (type === 'previousExperience') {
            setPreviousExperience(prevDetails => {
                const newDetails = [...prevDetails];

                newDetails[index][field] = value;
                return newDetails;
            });
        } else if (type === 'reference') {
            setReference(prevRef => {
                const newReference = [...prevRef];

                newReference[index][field] = value;
                return newReference;
            });
        }
    };
    
    const handleCheckboxChange = event => {
        const { checked } = event.target;

        setReference(prevRef => prevRef.map(ref => ({ ...ref, authorize: checked })));
    };


    const handleSave = async () => {
        try {
            const allPreviousExperienceData = previousExperience.map(experience => ({
                company_name: experience.company_name,
                designation: experience.designation,
                startDate: experience.startDate,
                endDate: experience.endDate,
                reporting_to: experience.reporting_to,
                reason: experience.reason,
                location: experience.location,
                exp_Certificate: experience.exp_Certificate
            }));
            
            await axios.post(`${Endpoint.API_ENDPOINT}/api/User/add-experience/1`, allPreviousExperienceData);
                
            const allReferenceData = reference.map(ref => ({
                referral_name: ref.referral_name,
                designation: ref.designation,
                company_name: ref.company_name,
                contact_number: ref.contact_number,
                email_Id: ref.email_Id,
                authorize: ref.authorize
            }));
            
            await axios.post(`${Endpoint.API_ENDPOINT}/api/User/add-reference/1`, allReferenceData);
    
            setDraftSaved(true);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    
    
    
    return (
        <div className="previousExp">
            <h4>Previous Experience</h4>
            <div className="row">
                <table className="family">
                    <thead>
                        <th>Name</th>
                        <th>Designation</th>
                        <th colSpan={2}>Duration (From - To)</th>
                        <th>Reporting to</th>
                        <th>Reason for Leaving</th>
                        <th>Location</th>
                        <th>Proof of Attachments</th>
                    </thead>
                    <tbody>
                        {previousExperience.map((experience, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={experience.company_name||previousExperienceinfo?.company_name}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'company_name', event.target.value)}
                                        disabled={componentView}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={experience.designation||previousExperienceinfo?.designation}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'designation', event.target.value)}
                                        disabled={componentView}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="date"
                                        value={experience.startDate||previousExperienceinfo?.startDate}
                                        placeholder="From"
                                        onChange={event => handleInputChange(index, 'startDate', event.target.value)}
                                        disabled={componentView}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="date"
                                        value={experience.endDate||previousExperienceinfo?.endDate}
                                        placeholder="To"
                                        onChange={event => handleInputChange(index, 'endDate', event.target.value)}
                                        disabled={componentView}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={experience.reporting_to||previousExperienceinfo?.reporting_to}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'reporting_to', event.target.value)}
                                        disabled={componentView}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={experience.reason||previousExperienceinfo?.reason}
                                        placeholder="Reason"
                                        onChange={event => handleInputChange(index, 'reason', event.target.value)}
                                        disabled={componentView}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={experience.location||previousExperienceinfo?.location}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'location', event.target.value)}
                                        disabled={componentView}/>
                                </td>
                                <td><button 
                                    className="choosefile"
                                    type="file"
                                    value={experience.exp_Certificate || previousExperienceinfo?.exp_Certificate}
                                    placeholder="Proof of Attachments"
                                    onChange={event => handleInputChange(index, 'exp_Certificate', event.target.files[0])}
                                    disabled={componentView}
                                >Choose File</button>
                                </td>
                            </tr>
                        ))}
                        <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                        <tr>
                            <td colSpan="8" className="buttonrow"><button className="addanother" onClick={handleAddPreviousExperience} disabled={componentView}>
                                <IoMdAdd className="addIcon"/></button></td>
                        </tr >
                        <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                    </tbody>
                </table>
            </div>

            <h4>Reference Details</h4>
            <div className="row">
                <table className="family ref">
                    <thead>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Company Name</th>
                        <th>Contact No</th>
                        <th>Email ID</th>
                    </thead>
                    <tbody>
                        {reference.map((ref, index) => (
                            <tr key={index}>
                                <td><input
                                    className="textbox"
                                    type="text"
                                    value={ref.referral_name||refInfo?.referral_name}
                                    placeholder="Name"
                                    onChange={event => handleInputChange(index, 'referral_name', event.target.value, 'reference')}
                                    disabled={componentView}/>
                                </td>
                                <td><input
                                    className="textbox"
                                    type="text"
                                    value={ref.designation || refInfo?.designation}
                                    placeholder="Role"
                                    onChange={event => handleInputChange(index, 'designation', event.target.value, 'reference')}
                                    disabled={componentView}/>
                                </td>
                                <td><input
                                    className="textbox"
                                    type="text"
                                    value={ref.company_name||refInfo?.company_name}
                                    placeholder="Name"
                                    onChange={event => handleInputChange(index, 'company_name', event.target.value, 'reference')}
                                    disabled={componentView}/>
                                </td>
                                <td><input
                                    className="textbox"
                                    type="number"
                                    value={ref.contact_number || refInfo?.contact_number}
                                    placeholder="Contact No."
                                    onChange={event => handleInputChange(index, 'contact_number', event.target.value, 'reference')}
                                    disabled={componentView}/>
                                </td>
                                <td><input
                                    className="textbox"
                                    type="text"
                                    value={ref.email_Id || refInfo?.email_Id}
                                    placeholder="Name"
                                    onChange={event => handleInputChange(index, 'email_Id', event.target.value, 'reference')}
                                    disabled={componentView}/>
                                </td>
                            </tr>
                        ))}
                        <tr><td colSpan={5}><hr /></td></tr>
                    </tbody>
                </table>
                <div><input
                    type="checkbox"
                    checked={reference.length > 0 && reference[0].authorize}
                    onChange={handleCheckboxChange}
                    className="checkbox"
                    disabled={componentView}
                />I hereby authorize Ideassion Tech to connect with my reference or my background verification.</div>
            </div> 
            {draftSaved && <span className="draftSavedText"><TiTick className="icontick"/>draft Saved</span>}
            <button onClick={handleSave}disabled={componentView}>Save</button>
        </div>
    );
};

PreviousExperience.propTypes = {
    refInfo: propTypes.object.isRequired,
    previousExperienceinfo: propTypes.object.isRequired,
    componentView: propTypes.bool.isRequired
};

export default PreviousExperience;
