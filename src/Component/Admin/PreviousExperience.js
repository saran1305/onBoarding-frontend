import React, { useEffect } from 'react';
import '../../Styles/previousExperience.css';
import { IoMdAdd } from 'react-icons/io';
import propTypes from 'prop-types';

const PreviousExperience = ({ previousExperienceinfo,referenceinfo,previousExperience,setPreviousExperience,reference,setReference }) => {

    useEffect(() => {
        if (previousExperienceinfo && previousExperienceinfo.length > 0) {
            setPreviousExperience(previousExperienceinfo);
        }
        if (referenceinfo) {
            setReference(referenceinfo);
        }
    }, [ previousExperienceinfo,referenceinfo ]);

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
    

    const handleInputChange = (index, field, value, type = 'previousExperience') => {
        if (type === 'previousExperience') {
            setPreviousExperience(prevDetails => {
                const newDetails = [...prevDetails];

                newDetails[index][field] = value;
                return newDetails;
            });
        }
    };
    
    const handleCheckboxChange = event => {
        const { checked } = event.target;

        setReference(prevRef => prevRef.map(reference => ({ ...reference, authorize: checked })));
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
                        {previousExperience.map((experience, index) => {
                            return(
                                <tr key={index}>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience.company_name||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'company_name', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience.designation||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'designation', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="date"
                                            value={experience.startDate||''}
                                            placeholder="From"
                                            onChange={event => handleInputChange(index, 'startDate', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="date"
                                            value={experience.endDate||''}
                                            placeholder="To"
                                            onChange={event => handleInputChange(index, 'endDate', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience.reporting_to||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'reporting_to', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience.reason||''}
                                            placeholder="Reason"
                                            onChange={event => handleInputChange(index, 'reason', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience.location||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'location', event.target.value)}
                                        />
                                    </td>
                                    <td><button 
                                        className="choosefile"
                                        type="file"
                                        value={experience.exp_Certificate ||''}
                                        placeholder="Proof of Attachments"
                                        onChange={event => handleInputChange(index, 'exp_Certificate', event.target.files[0])}
                                    
                                    >Choose File</button>
                                    </td>
                                </tr>
                            )})}
                        <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                        <tr>
                            <td colSpan="8" className="buttonrow"><button className="addanother" onClick={handleAddPreviousExperience} >
                                <IoMdAdd className="addIcon"/></button></td>
                        </tr >
                        <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                    </tbody>
                </table>
            </div>

            <h4>Reference Details</h4>
            <div className="row">
                <table className="family reference">
                    <thead>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Company Name</th>
                        <th>Contact No</th>
                        <th>Email ID</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input
                                className="textbox"
                                type="text"
                                value={reference.referral_name||''}
                                placeholder="Name"
                                onChange={event => handleInputChange( 'referral_name', event.target.value)}
                            />
                            </td>
                            <td><input
                                className="textbox"
                                type="text"
                                value={reference.designation ||''}
                                placeholder="Role"
                                onChange={event => handleInputChange('designation', event.target.value)}
                            />
                            </td>
                            <td><input
                                className="textbox"
                                type="text"
                                value={reference.company_name||''}
                                placeholder="Name"
                                onChange={event => handleInputChange('company_name', event.target.value )}
                            />
                            </td>
                            <td><input
                                className="textbox"
                                type="number"
                                value={reference.contact_number || ''}
                                placeholder="Contact No."
                                onChange={event => handleInputChange( 'contact_number', event.target.value)}
                            />
                            </td>
                            <td><input
                                className="textbox"
                                type="text"
                                value={reference.email_Id ||''}
                                placeholder="Name"
                                onChange={event => handleInputChange( 'email_Id', event.target.value)}
                            />
                            </td>
                        </tr>
                        <tr><td colSpan={5}><hr /></td></tr>
                    </tbody>
                </table>
                <div><input
                    type="checkbox"
                    checked={reference.length > 0 && reference[0].authorize}
                    onChange={handleCheckboxChange}
                    className="checkbox"
                />I hereby authorize Ideassion Tech to connect with my reference or my background verification.</div>
            </div> 
        </div>
    );
};

PreviousExperience.propTypes = {
    referenceinfo: propTypes.object.isRequired,
    previousExperienceinfo: propTypes.object.isRequired,
    previousExperience:propTypes.object.isRequired,
    setPreviousExperience:propTypes.object.isRequired,
    reference:propTypes.object.isRequired,
    setReference:propTypes.object.isRequired
};

export default PreviousExperience;
