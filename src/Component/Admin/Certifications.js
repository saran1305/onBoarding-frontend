import React,{ useEffect } from 'react';
import '../../Styles/certification.css'
import * as Endpoint from '../../Entities/Endpoint';
import axios from 'axios';
import { LiaFileSolid } from 'react-icons/lia';
import { IoMdAdd } from 'react-icons/io';
import propTypes from 'prop-types';

const Certifications = ({ certifications,setCertifications,genId }) => {

    useEffect(() => {
        if (genId) {
            axios.get(`${Endpoint.API_ENDPOINT}/User/get-certificate/${genId}`)
                .then(response => {
                    setCertifications(response.data);
                    console.log('certifications get: ',response.data);
                })
                .catch(error => { 
                    console.error('Error saving data:', error);
                    
                });
        }},[genId])

    useEffect(() => {
        if (certifications && certifications?.length === 0) {
            setCertifications([{
                certificate_name: '',
                issued_by: '',
                valid_till: '',
                specialization: '',
                duration: 0,
                percentage: '',
                proof:'',
                fileName: ''
            }])
        }},[certifications])

    const handleAddCertifications = () => {
        setCertifications(prevDetails => [
            ...prevDetails,
            {
                certificate_name: '',
                issued_by: '',
                valid_till: '',
                specialization: '',
                duration: 0,
                percentage: '',
                proof:'',
                fileName: ''
            }
        ]);
    };

   
    const handleInputChange = (index, field, value) => {
        const update = certifications?.map((certification, idx) => {
            if (index === idx) {
                return { ...certification, [field]: value }
            } else {
                return { ...certification }
            }
        })

        setCertifications(update)
    };
    const handleFileGettingInput = (index, event) => {

        convertToBase64(event, base64String => {
            setCertifications(certifications?.map((data,ind) => {
                if(ind === index){
                    return { ...data , proof:base64String,fileName: event?.name }
                }else return data
            }))
        })
    };
    const convertToBase64 = (file, callback) => {
        const reader = new FileReader();

        reader.onload = event => {
            const result = event.target.result;

            callback(result);
        };
        reader.readAsDataURL(file);
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
                        {certifications.map((certifications, index) => {
                            return(
                                <tr key={index}>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={certifications?.certificate_name||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'certificate_name', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={certifications?.issued_by||''}
                                            placeholder="Issuer"
                                            onChange={event => handleInputChange(index, 'issued_by', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="date"
                                            value={certifications?.valid_till||''}
                                            placeholder="01/01/2024"
                                            onChange={event => handleInputChange(index, 'valid_till', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="textbox"
                                            value={certifications?.duration||''}
                                            onChange={event => handleInputChange(index, 'duration', event.target.value)}
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
                                        <input
                                            className="textbox"
                                            type="text"
                                            placeholder="Specialization"
                                            value={certifications?.specialization||''}
                                            onChange={event => handleInputChange(index, 'specialization', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="textbox"
                                            value={certifications?.percentage||''}
                                            onChange={event => handleInputChange(index, 'percentage', event.target.value)}
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
                                    <td>
                                        {certifications?.fileName === '' ? 
                                            <input
                                                className="choosefile" 
                                                type="file"
                                                onChange={event => handleFileGettingInput(index, event.target.files[0])}
                                            /> : <div className="inline">
                                                <LiaFileSolid />
                                                <p>{certifications?.fileName}</p>                                    
                                            </div>}
                                        {/* {certifications?.proof === '' && certifications?.proof === null ? (
                                            <div>
                                                <input
                                                    className="choosefile" 
                                                    type="file"
                                                    onChange={event => handleFileGettingInput(index,'proof', event.target.files[0])}
                                                />
                                                <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                                                <p>You can drag and drop too</p>
                                            </div>
                                        ) : (
                                            <div className="inline">
                                                <LiaFileSolid />
                                                <p>{certifications?.proof}</p>
                                            </div>
                                        )}
                                        {certifications?.proof === '' && <p className="filetext">File Type Accepted: doc, pdf & img</p>} */}
                                    </td>
                                </tr>
                            )})}

                    </tbody>
                    <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                    <tr>
                        <td colSpan="8" className="buttonrow"><button className="addanother" onClick={handleAddCertifications} ><IoMdAdd className="addIcon"/></button></td>
                    </tr >
                    <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                </table>
            </div>  
        </div>
    );
};

Certifications.propTypes = {
    certifications: propTypes.array.isRequired,
    setCertifications:  propTypes.func.isRequired,
    genId: propTypes.number.isRequired
};

export default Certifications;
