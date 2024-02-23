import React,{ useEffect } from 'react';
import '../../Styles/certification.css'
import { IoMdAdd } from 'react-icons/io';
import propTypes from 'prop-types';

const Certifications = ({ certificationsinfo,certifications,setCertifications }) => {

    useEffect(()=>{
        if(certificationsinfo && certificationsinfo.length>0){
            setCertifications(certificationsinfo)
        }
    },[certificationsinfo])

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
                proof:''
            }
        ]);
    };

    const handleInputChange = (index, field, value) => {
        setCertifications(prevDetails => {
            const newDetails = [...prevDetails];

            if (newDetails[index]) {
                newDetails[index][field] = value;
            }
            return newDetails;
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
                        {certifications.map((certifications, index) => {
                            return(
                                <tr key={index}>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={certifications.certificate_name||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'certificate_name', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={certifications.issued_by||''}
                                            placeholder="Issuer"
                                            onChange={event => handleInputChange(index, 'issued_by', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="date"
                                            value={certifications.valid_till||''}
                                            placeholder="01/01/2024"
                                            onChange={event => handleInputChange(index, 'valid_till', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="textbox"
                                            value={certifications.duration||''}
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
                                        <select
                                            className="textbox"
                                            value={certifications.specialization||''}
                                            onChange={event => handleInputChange(index, 'specialization', event.target.value)}
                                        >
                                            <option>Computer Science</option>
                                            <option>Computer Application</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            className="textbox"
                                            value={certifications.percentage||''}
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
                                        <input
                                            className="choosefile" 
                                            type="file"
                                            value={certifications.proof || ''}
                                            onChange={event => handleInputChange('proof', event.target.files[0])}
                                        />
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
    certificationsinfo: propTypes.object.isRequired,
    certifications: propTypes.object.isRequired,
    setCertifications:  propTypes.object.isRequired
};

export default Certifications;
