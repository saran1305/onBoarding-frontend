import React, { useState } from 'react';
import '../../Styles/certification.css'
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import { IoMdAdd } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';


const Certifications = () => {
    const [ certifications, setCertifications ] = useState([
        {
            name: '',
            issue: '',
            valid: '',
            specialization: '',
            yearofCertifications: '',
            percentageAchieved: ''
        }
    ]);
    const handleAddCertifications = () => {
        setCertifications(prevDetails => [
            ...prevDetails,
            {
                name: '',
                issue: '',
                valid: '',
                specialization: '',
                yearofCertifications: '',
                percentageAchieved: ''
            }
        ]);
    };
    const [ draftSaved, setDraftSaved ] = useState(false);

    const handleInputChange = (index, field, value) => {
        setCertifications(prevDetails => {
            const newDetails = [...prevDetails];

            newDetails[index][field] = value;
            return newDetails;
        });
        setDraftSaved(false);
    };
    const handleSave = () => {
        const dataToSave = certifications;

        axios.post(`${Endpoint.API_ENDPOINT}/certifications`, dataToSave)
            .then(response => {
                console.log('Data saved successfully:', response.data);
                setDraftSaved(true);
            })
            .catch(error => {
                console.error('Error saving data:', error.message || error);
            });
    };

    return (
        <div className="certifications">
            <h4>Certifications</h4>
            <div className="row">
                <table className="family">
                    <thead>
                        <th>Name</th>
                        <th>Issued by</th>
                        <th>Valid Till</th>
                        <th>Year of Certifications</th>
                        <th>Specialization</th>
                        <th>% Achieved</th>
                        <th>Proof of Attachments</th>
                    </thead>
                    <tbody>
                        {certifications.map((certifications, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={certifications.name}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'name', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={certifications.issue}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'issue', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="date"
                                        value={certifications.valid}
                                        placeholder="01/01/2024"
                                        onChange={event => handleInputChange(index, 'valid', event.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="textbox"
                                        value={certifications.yearofCertifications}
                                        onChange={event => handleInputChange(index, 'yearofCertifications', event.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="textbox"
                                        value={certifications.specialization}
                                        onChange={event => handleInputChange(index, 'specialization', event.target.value)}
                                    >
                                        <option>Computer Science</option>
                                        <option>Computer Application</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="textbox"
                                        value={certifications.percentageAchieved}
                                        onChange={event => handleInputChange(index, 'percentageAchieved', event.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {Array.from({ length: 101 }, (_, i) => i).map(percentage => (
                                            <option key={percentage} value={percentage}>
                                                {percentage}%
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td><button className="choosefile">Choose File</button></td>
                            </tr>
                        ))}

                    </tbody>
                    <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                    <tr>
                        <td colSpan="8" className="buttonrow"><button className="addanother" onClick={handleAddCertifications}><IoMdAdd className="addIcon"/></button></td>
                    </tr >
                    <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                </table>
            </div>  
            {draftSaved && <span className="draftSavedText"><TiTick className="icontick"/>draft Saved</span>}
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Certifications;
