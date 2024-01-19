import React, { useState } from 'react';
import '../../Styles/education.css';

const Education = () => {
    const [ educationDetails, setEducationDetails ] = useState([
        {
            qualification: '',
            university: '',
            institution: '',
            degreeAchieved: '',
            specialization: '',
            passedOutYear: '',
            percentageAchieved: ''
        }
    ]);

    const handleAddEducation = () => {
        setEducationDetails(prevDetails => [
            ...prevDetails,
            {
                qualification: '',
                university: '',
                institution: '',
                degreeAchieved: '',
                specialization: '',
                passedOutYear: '',
                percentageAchieved: ''
            }
        ]);
    };

    const handleInputChange = (index, field, value) => {
        setEducationDetails(prevDetails => {
            const newDetails = [...prevDetails];

            newDetails[index][field] = value;
            return newDetails;
        });
    };

    return (
        <div className="education">
            <h4>Education Details</h4>
            <div className="row">
                <table className="family">
                    <thead>
                        <th>Qualification</th>
                        <th>University</th>
                        <th>Name of the Institution</th>
                        <th>Degree Achieved</th>
                        <th>Specialization</th>
                        <th>Passed out year</th>
                        <th>% Achieved</th>
                        <th>Proof of Attachments</th>
                    </thead>
                    <tbody>
                        {educationDetails.map((education, index) => (
                            <tr key={index}>
                                <td>
                                    <select
                                        className="textbox"
                                        value={education.qualification}
                                        onChange={event => handleInputChange(index, 'qualification', event.target.value)}
                                    >
                                        <option>B.Sc.</option>
                                        <option>M.Sc</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={education.university}
                                        placeholder="University"
                                        onChange={event => handleInputChange(index, 'university', event.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={education.institution}
                                        placeholder="Institution"
                                        onChange={event => handleInputChange(index, 'institution', event.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="textbox"
                                        value={education.degreeAchieved}
                                        onChange={event => handleInputChange(index, 'degreeAchieved', event.target.value)}
                                    >
                                        <option>B.Sc.</option>
                                        <option>M.Sc</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={education.specialization}
                                        placeholder="Specialization"
                                        onChange={event => handleInputChange(index, 'specialization', event.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="textbox"
                                        value={education.passedOutYear}
                                        onChange={event => handleInputChange(index, 'passedOutYear', event.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select Year
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
                                        value={education.percentageAchieved}
                                        onChange={event => handleInputChange(index, 'percentageAchieved', event.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select Percentage
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
                    <tr><td colSpan="8" className= "buttonrow"><hr /></td></tr>
                    <tr>
                        <td colSpan="8" className= "buttonrow"><button className="addanother" onClick={handleAddEducation}>+</button></td>
                    </tr >
                    <tr><td colSpan="8" className= "buttonrow"><hr /></td></tr>
                </table>
            </div>  
        </div>
    );
};

export default Education;
