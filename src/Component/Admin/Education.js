import React, { useState } from 'react';
import '../../Styles/education.css';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import { IoMdAdd } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import propTypes from 'prop-types';

const Education = ({ componentView, educationinfo }) => {
    const [ educationDetails, setEducationDetails ] = useState([
        {
            qualification: '',
            university: '',
            institution_name: '',
            degree_achieved: '',
            specialization: '',
            passoutyear: '',
            percentage: '',
            edu_certificate: null
        }
    ]);

    const handleAddEducation = () => {
        setEducationDetails(prevDetails => [
            ...prevDetails,
            {
                qualification: '',
                university: '',
                institution_name: '',
                degree_achieved: '',
                specialization: '',
                passoutyear: '',
                percentage: '',
                edu_certificate: null
            }
        ]);
    };

    const [ draftSaved, setDraftSaved ] = useState(false);

    const handleInputChange = (index, field, value) => {
        setEducationDetails(prevDetails => {
            const newDetails = [...prevDetails];

            newDetails[index][field] = value;
            return newDetails;
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.post(
                `${Endpoint.API_ENDPOINT}/api/User/add-certificate/1`,
                educationDetails,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Data saved successfully:', response.data);
            setDraftSaved(true);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    

    return (
        <div className="education">
            <h4>Education Details</h4>
            <div className="row">
                <table className="family">
                    <thead>
                        <tr>
                            <th>Qualification</th>
                            <th>University</th>
                            <th>Name of the Institution</th>
                            <th>Degree Achieved</th>
                            <th>Specialization</th>
                            <th>Passed out year</th>
                            <th>% Achieved</th>
                            <th>Proof of Attachments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educationDetails.map((education, index) => (
                            <tr key={index}>
                                <td>
                                    <select
                                        className="textbox"
                                        value={education.qualification || educationinfo?.qualification}
                                        onChange={event => handleInputChange(index, 'qualification', event.target.value)}
                                        disabled={componentView}
                                    >
                                        <option value="">Select Qualification</option>
                                        <option value="B.Sc.">B.Sc.</option>
                                        <option value="M.Sc.">M.Sc.</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={education.university || educationinfo?.university}
                                        placeholder="University"
                                        onChange={event => handleInputChange(index, 'university', event.target.value)}
                                        disabled={componentView}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={education.institution_name||educationinfo?.institution_name}
                                        placeholder="Institution"
                                        onChange={event => handleInputChange(index, 'institution_name', event.target.value)}
                                        disabled={componentView}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={education.degree_achieved||educationinfo?.degree_achieved}
                                        placeholder="Degree Achieved"
                                        onChange={event => handleInputChange(index, 'degree_achieved', event.target.value)}
                                        disabled={componentView}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={education.specialization||educationinfo?.specialization}
                                        placeholder="Specialization"
                                        onChange={event => handleInputChange(index, 'specialization', event.target.value)}
                                        disabled={componentView}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="number"
                                        value={education.passoutyear||educationinfo?.passoutyear}
                                        placeholder="Passout Year"
                                        onChange={event => handleInputChange(index, 'passoutyear', event.target.value)}
                                        disabled={componentView}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={education.percentage||educationinfo?.percentage}
                                        placeholder="% Achieved"
                                        onChange={event => handleInputChange(index, 'percentage', event.target.value)}
                                        disabled={componentView}
                                    />
                                </td>
                                <td><button className="choosefile"
                                    type="file"                                    
                                    value={education.edu_certificate||educationinfo?.edu_certificate}
                                    onChange={event => handleInputChange('edu_certificate', event.target.files[0])}
                                >Choose File
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="8" className="buttonrow">
                                <button className="addanother" onClick={handleAddEducation} disabled={componentView}><IoMdAdd className="addIcon" /></button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {draftSaved && <span className="draftSavedText"><TiTick className="icontick" />draft Saved</span>}
            <button onClick={handleSave} disabled={componentView}>Save</button>
        </div>
    );
};

Education.propTypes = {
    educationinfo: propTypes.object.isRequired,
    componentView: propTypes.bool.isRequired
};

export default Education;
