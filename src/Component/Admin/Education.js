import React, { useEffect } from 'react';
import * as Endpoint from '../../Entities/Endpoint';
import axios from 'axios';
import '../../Styles/education.css';
import { IoMdAdd } from 'react-icons/io';
import propTypes from 'prop-types';
import { FaFilePdf } from 'react-icons/fa';

const Education = ({ educationinfo,setEducationinfo,genId }) => {

    const _dashboardUserDetail = JSON.parse(localStorage.getItem('dashboardUserDetail'))

    useEffect(() => {
        if (_dashboardUserDetail) {
            axios.get(`${Endpoint.API_ENDPOINT}/User/get-education/${_dashboardUserDetail.genId}`)
                .then(response => {
                    setEducationinfo(response.data);
                })
                .catch(error => { 
                    console.error('Error saving data:', error);                
                });
        }},[genId])

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
                edu_certificate: '',
                fileName: ''
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
                edu_certificate: '',
                fileName: ''
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
    const handleFileGettingInput = (index, event) => {

        convertToBase64(event, base64String => {
            setEducationinfo(educationinfo?.map((data,ind) => {
                if(ind === index){
                    return { ...data , edu_certificate:base64String,fileName: event?.name }
                }else return data
            }))
        })
    };
    const convertToBase64 = (file, callback) => {
        const reader = new FileReader();

        reader.onload = event => {
            const result = event.target.result;

            const base64Data = result.split(',')[1]

            callback(base64Data);
        };
        reader.readAsDataURL(file);
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
                                        {!education?.edu_certificate ? 
                                            <input
                                                className="choosefile" 
                                                type="file"
                                                onChange={event => handleFileGettingInput(index, event.target.files[0])}
                                            /> : <div className="inline">
                                                <a href={`data:application/pdf;base64,${education?.edu_certificate}`} download="edu_certificate.pdf">
                                                    <FaFilePdf className="uploadedfile" />
                                                </a>
                                                <p>{education?.fileName}</p>                                    
                                            </div>}
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
    genId: propTypes.number.isRequired
};

export default Education;
