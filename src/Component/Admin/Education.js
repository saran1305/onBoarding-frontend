import React, { useEffect } from 'react';
import '../../Styles/education.css';
import { IoMdAdd } from 'react-icons/io';
import propTypes from 'prop-types';

const Education = ({ educationinfo,educationDetails,setEducationDetails }) => {

    useEffect(() => {
        if (educationinfo && educationinfo.length > 0) {
            setEducationDetails(educationinfo);
        }
    }, [educationinfo]);
    

    const handleAddEducation = () => {
        setEducationDetails(prevDetails => [
            ...prevDetails,
            {
                qualification: '',
                university: '',
                institution_name: '',
                degree_achieved: '',
                specialization: '',
                passoutyear: 0,
                percentage: '',
                edu_certificate: ''
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
                        {educationDetails.map((education, index) => {
                            return(
                                <tr key={index}>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={education.qualification||''}
                                            placeholder="Qualification"
                                            onChange={event => handleInputChange(index, 'qualification', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={education.university||''}
                                            placeholder="University"
                                            onChange={event => handleInputChange(index, 'university', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={education.institution_name||''}
                                            placeholder="Institution"
                                            onChange={event => handleInputChange(index, 'institution_name', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={ education.degree_achieved||''}
                                            placeholder="Degree Achieved"
                                            onChange={event => handleInputChange(index, 'degree_achieved', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={ education.specialization||''}
                                            placeholder="Specialization"
                                            onChange={event => handleInputChange(index, 'specialization', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="number"
                                            value={ education.passoutyear||''}
                                            placeholder="Passout Year"
                                            onChange={event => handleInputChange(index, 'passoutyear', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={ education.percentage||''}
                                            placeholder="% Achieved"
                                            onChange={event => handleInputChange(index, 'percentage', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="file"
                                            value={ education.edu_certificate||''}
                                            onChange={event => handleInputChange(index, 'edu_certificate', event.target.files[0])}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="8" className="buttonrow">
                                <button className="addanother" onClick={handleAddEducation}><IoMdAdd className="addIcon" /></button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

Education.propTypes = {
    educationinfo: propTypes.object.isRequired,
    educationDetails: propTypes.object.isRequired,
    setEducationDetails: propTypes.object.isRequired
};

export default Education;
