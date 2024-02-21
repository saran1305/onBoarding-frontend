import React, { useState } from 'react';
import '../../Styles/certification.css'
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import { IoMdAdd } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import propTypes from 'prop-types';

const Certifications = ({ componentView, certificationsinfo }) => {
    const [ certifications, setCertifications ] = useState([
        {
            certificate_name: '',
            issued_by: '',
            valid_till: '',
            specialization: '',
            duration: '',
            percentage: '',
            proof:null
        }
    ]);
    const handleAddCertifications = () => {
        setCertifications(prevDetails => [
            ...prevDetails,
            {
                certificate_name: '',
                issued_by: '',
                valid_till: '',
                specialization: '',
                duration: '',
                percentage: '',
                proof:null
            }
        ]);
    };
    const [ draftSaved, setDraftSaved ] = useState(false);

    const handleInputChange = (index, field, value) => {
        setCertifications(prevDetails => {
            const newDetails = [...prevDetails];
    
            if (field === 'proof') {
                const file = value;
    
                if (newDetails[index]) { 
                    newDetails[index][field] = file.name;
                    newDetails[index]['file'] = file;
                }
            } else {
                if (newDetails[index]) { 
                    newDetails[index][field] = value;
                }
            }
            return newDetails;
        });
        setDraftSaved(false);
    };
    

    const handleSave = async () => {
        try {
            const response = await axios.post(
                `${Endpoint.API_ENDPOINT}/api/User/add-certificate/1`,
                certifications, 
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            console.log('Data saved successfully:', response.data);
            setDraftSaved(true);
        } catch (error) {
            console.error('Error saving data in Certification:', error);
        }
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
                                        value={certifications.certificate_name || certificationsinfo?.certificate_name }
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'certificate_name', event.target.value)}
                                        disabled={componentView}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={certifications.issued_by|| certificationsinfo?.issued_by}
                                        placeholder="Issuer"
                                        onChange={event => handleInputChange(index, 'issued_by', event.target.value)}
                                        disabled={componentView}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="date"
                                        value={certifications.valid_till|| certificationsinfo?.valid_till}
                                        placeholder="01/01/2024"
                                        onChange={event => handleInputChange(index, 'valid_till', event.target.value)}
                                        disabled={componentView} />
                                </td>
                                <td>
                                    <select
                                        className="textbox"
                                        value={certifications.duration|| certificationsinfo?.duration}
                                        onChange={event => handleInputChange(index, 'duration', event.target.value)}
                                        disabled={componentView}>
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
                                        value={certifications.specialization|| certificationsinfo?.specialization}
                                        onChange={event => handleInputChange(index, 'specialization', event.target.value)}
                                        disabled={componentView}>
                                        <option>Computer Science</option>
                                        <option>Computer Application</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="textbox"
                                        value={certifications.percentage|| certificationsinfo?.percentage}
                                        onChange={event => handleInputChange(index, 'percentage', event.target.value)}
                                        disabled={componentView}>
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
                                <td>
                                    <input
                                        className="choosefile" 
                                        type="file"
                                        value={certifications.proof|| certificationsinfo?.proof}
                                        onChange={event => handleInputChange('proof', event.target.files[0])}
                                        disabled={componentView}
                                    />
                                </td>                            
                            </tr>
                        ))}

                    </tbody>
                    <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                    <tr>
                        <td colSpan="8" className="buttonrow"><button className="addanother" onClick={handleAddCertifications} disabled={componentView}><IoMdAdd className="addIcon"/></button></td>
                    </tr >
                    <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                </table>
            </div>  
            {draftSaved && <span className="draftSavedText"><TiTick className="icontick"/>draft Saved</span>}
            <button onClick={handleSave} disabled={componentView}>Save</button>
        </div>
    );
};

Certifications.propTypes = {
    certificationsinfo: propTypes.array.isRequired,
    componentView: propTypes.bool.isRequired
};

export default Certifications;
