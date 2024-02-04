import React, { useState } from 'react';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import '../../Styles/previousExperience.css';
import { IoMdAdd } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';

const PreviousExperience = () => {
    const [ previousExperience, setPreviousExperience ] = useState([
        {
            name: '',
            designation: '',
            fromDate: '',
            toDate: '',
            reporting: '',
            reasonforleaving: '',
            location: '',
            proofofattachments: '',
            reference: {
                name: '',
                designation: '',
                companyName: '',
                contact: '',
                emailId: ''
            }
        }
    ]);

    const handleAddPreviousExperience = () => {
        setPreviousExperience(prevDetails => [
            ...prevDetails,
            {
                name: '',
                designation: '',
                fromDate: '',
                toDate: '',
                reporting: '',
                reasonforleaving: '',
                location: '',
                proofofattachments: '',
                reference: {
                    name: '',
                    designation: '',
                    companyName: '',
                    contact: '',
                    emailId: ''
                }
            }
        ]);
    };
    
    const [ draftSaved, setDraftSaved ] = useState(false);

    const handleInputChange = (index, field, value, type = 'previousExperience') => {
        setPreviousExperience(prevDetails => {
            const newDetails = [...prevDetails];

            if (type === 'previousExperience') {
                if (field === 'fromDate' || field === 'toDate') {
                    newDetails[index][field] = value;
                } else {
                    newDetails[index][field] = value;
                }
            } else if (type === 'reference') {
                newDetails[index].reference[field] = value;
            }

            return newDetails;
        });
    };
    

    const handleSave = async () => {
        try {
            const allExperienceData = previousExperience.map(experience => ({
                name: experience.name,
                designation: experience.designation,
                fromDate: experience.fromDate,
                toDate: experience.toDate,
                reporting: experience.reporting,
                reasonforleaving: experience.reasonforleaving,
                location: experience.location,
                proofofattachments: experience.proofofattachments,
                reference: {
                    name: experience.reference.name,
                    designation: experience.reference.designation,
                    companyName: experience.reference.companyName,
                    contact: experience.reference.contact,
                    emailId: experience.reference.emailId
                }
            }));

            axios.post(`${Endpoint.API_ENDPOINT}/previousexperience`, allExperienceData)
                .then(response => {
                    console.log('Data saved successfully:', response.data);
                    setDraftSaved(true);
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });

        } catch (error) {
            console.error('Error posting data to the API', error);
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
                                        value={experience.name}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'name', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={experience.designation}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'designation', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="date"
                                        value={experience.fromDate}
                                        placeholder="From"
                                        onChange={event => handleInputChange(index, 'fromDate', event.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="date"
                                        value={experience.toDate}
                                        placeholder="To"
                                        onChange={event => handleInputChange(index, 'toDate', event.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={experience.reporting}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'reporting', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={experience.reasonforleaving}
                                        placeholder="Reason"
                                        onChange={event => handleInputChange(index, 'reasonforleaving', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={experience.location}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'location', event.target.value)}/>
                                </td>
                                <td><button className="choosefile">Choose File</button></td>
                            </tr>
                        ))}
                        <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                        <tr>
                            <td colSpan="8" className="buttonrow"><button className="addanother" onClick={handleAddPreviousExperience}><IoMdAdd className="addIcon"/></button></td>
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
                        {previousExperience.map((experience, index) => (
                            <tr key={index}>
                                <td><input
                                    className="textbox"
                                    type="text"
                                    value={experience.reference.name}
                                    placeholder="Name"
                                    onChange={event => handleInputChange(index, 'name', event.target.value, 'reference')}/>
                                </td>
                                <td><input
                                    className="textbox"
                                    type="text"
                                    value={experience.reference.designation}
                                    placeholder="Role"
                                    onChange={event => handleInputChange(index, 'designation', event.target.value, 'reference')}/>
                                </td>
                                <td><input
                                    className="textbox"
                                    type="text"
                                    value={experience.reference.companyName}
                                    placeholder="Name"
                                    onChange={event => handleInputChange(index, 'companyName', event.target.value, 'reference')}/>
                                </td>
                                <td><input
                                    className="textbox"
                                    type="number"
                                    value={experience.reference.contact}
                                    placeholder="Contact No."
                                    onChange={event => handleInputChange(index, 'contact', event.target.value, 'reference')}/>
                                </td>
                                <td><input
                                    className="textbox"
                                    type="text"
                                    value={experience.reference.emailId}
                                    placeholder="Name"
                                    onChange={event => handleInputChange(index, 'emailId', event.target.value, 'reference')}/>
                                </td>
                            </tr>
                        ))}
                        <tr><td colSpan={5}><hr /></td></tr>
                    </tbody>
                </table>
                <div><input type="checkbox" className="checkbox" />I hereby authorize Ideassion Tech to connect with my reference or my background verification.</div>
            </div> 
            {draftSaved && <span className="draftSavedText"><TiTick className="icontick"/>draft Saved</span>}
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default PreviousExperience;
