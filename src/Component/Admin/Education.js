import React, { useState,useEffect } from 'react';
import * as Endpoint from '../../Entities/Endpoint';
import axios from 'axios';
import '../../Styles/education.css';
import { IoMdAdd } from 'react-icons/io';
import propTypes from 'prop-types';

const Education = ({ educationinfo,setEducationinfo,userId }) => {
    const [ fileName, setFileName ] = useState({ edu_certificate: '' })

    useEffect(() => {
        if (userId) {
            axios.get(`${Endpoint.API_ENDPOINT}/User/get-education/${userId}`)
                .then(response => {
                    setEducationinfo(response.data);
                    console.log('Education in UserOnboarding: ',response.data); 
                })
                .catch(error => { 
                    console.error('Error saving data:', error);
                
                });
        }},[userId])

    useEffect(() => {
        
        if (educationinfo && educationinfo?.length === 0 ) {
            setEducationinfo([{
                qualification: '',
                university: '',
                institution_name: '',
                degree_achieved: '',
                specialization: '',
                passoutyear: 0,
                percentage: '',
                edu_certificate: ''
            }])
        }},[educationinfo])

    const handleAddEducation = () => {
        setEducationinfo(prevDetails => [
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
        const update = educationinfo?.map((education, idx) => {
            if (index === idx) {
                return { ...education, [field]: value }
            } else {
                return { ...education }
            }
        })

        setEducationinfo(update)
    };
    
    const handleFileGettingInput = (field, file) => {

        setFileName({ ...fileName, edu_certificate: file.name })
        
        convertToBase64(file, base64String => {
            setFileName({ edu_certificate: base64String })
        })
        return
    };

    const convertToBase64 = (file, callback) => {
        const reader = new FileReader();

        reader.onload = event => {
            const result = event.target.result;

            callback(result);
        };
        reader.readAsDataURL(file); };

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
                        {educationinfo && educationinfo.map((education, index) => {
                            return(
                                <tr key={index}>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={education?.qualification||''}
                                            placeholder="Qualification"
                                            onChange={event => handleInputChange(index, 'qualification', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={education?.university||''}
                                            placeholder="University"
                                            onChange={event => handleInputChange(index, 'university', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={education?.institution_name||''}
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
                                            value={ education?.specialization||''}
                                            placeholder="Specialization"
                                            onChange={event => handleInputChange(index, 'specialization', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="number"
                                            value={ education?.passoutyear||''}
                                            placeholder="Passout Year"
                                            onChange={event => handleInputChange(index, 'passoutyear', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={ education?.percentage||''}
                                            placeholder="% Achieved"
                                            onChange={event => handleInputChange(index, 'percentage', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="file"
                                            value={ education?.edu_certificate||''}
                                            onChange={event => handleFileGettingInput(index, 'edu_certificate', event.target.files[0])}
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
    educationinfo: propTypes.array.isRequired,
    setEducationinfo: propTypes.func.isRequired,
    userId: propTypes.number.isrequired
};

export default Education;
