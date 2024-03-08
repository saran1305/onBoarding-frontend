import React, { useEffect } from 'react';
import '../../Styles/previousExperience.css';
import * as Endpoint from '../../Entities/Endpoint';
import axios from 'axios';
import { FaFilePdf } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import propTypes from 'prop-types';

const PreviousExperience = ({ previousExperience,setPreviousExperience,reference,setReference }) => {

    const _dashboardUserDetail = JSON.parse(localStorage.getItem('dashboardUserDetail'))
    const _postedGenid = localStorage.getItem('postedGenId')


    useEffect(() => {
        if (Number(_dashboardUserDetail.genId) > 0 || _postedGenid > 0) {
            axios.get(`${Endpoint.API_ENDPOINT}/User/get-experience/${_dashboardUserDetail?.genId ? _dashboardUserDetail?.genId : _postedGenid}`)
                .then(response => {
                    setPreviousExperience(response.data);
                })
                .catch(error => { 
                    console.error('Error saving data:', error);
                    
                });
            axios.get(`${Endpoint.API_ENDPOINT}/User/get-reference/${_dashboardUserDetail?.genId ? _dashboardUserDetail?.genId : _postedGenid}`)
                .then(response => {
                    setReference(response.data);
                })
                .catch(error => { 
                    console.error('Error saving data:', error);
                    
                });
        }},[])
        
    useEffect(() => {
        if (previousExperience && previousExperience?.length == 0) {
            setPreviousExperience([{
                company_name: '',
                designation: '',
                startDate: null,
                endDate: null,
                reporting_to: '',
                reason: '',
                location: '',
                exp_Certificate: '',
                fileName: ''

            }])
            if (Object.keys(reference).lenght === 0) {
                setReference({
                    referral_name: '',
                    designation: '',
                    company_name: '',
                    contact_number: 0,
                    email_Id:'',
                    authorize: true
                });
            }
        }},[previousExperience])

    const handleAddPreviousExperience = () => {
        setPreviousExperience(prevDetails => [
            ...prevDetails,
            {
                company_name: '',
                designation: '',
                startDate: null,
                endDate: null,
                reporting_to: '',
                reason: '',
                location: '',
                exp_Certificate: '',
                fileName: ''
            }
        ]);
    };
    

    const handleInputChange = (index, field, value, type = 'previousExperience') => {
        if (type === 'previousExperience') {
            const update = previousExperience?.map((experience, idx) => {
                if (index === idx) {
                    return { ...experience, [field]: value }
                } else {
                    return { ...experience }
                }
            })
    
            setPreviousExperience(update)
        }
    };
    const handleInputChangeRef = (field, value) => {
        setReference(prevReference => ({
            ...prevReference,
            [field]: value
        }));
    };

    const handleCheckboxChange = event => {
        const { checked } = event.target;

        setReference(prevReference => ({
            ...prevReference,
            authorize: checked
        }));
    };
    const handleFileGettingInput = (index, event) => {

        convertToBase64(event, base64String => {
            setPreviousExperience(previousExperience?.map((data,ind) => {
                if(ind === index){
                    return { ...data , exp_Certificate:base64String,fileName: event?.name }
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
                        {previousExperience.map((experience, index) => {
                            return(
                                <tr key={index}>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience?.company_name||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'company_name', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience?.designation||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'designation', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="date"
                                            value={experience?.startDate||''}
                                            placeholder="From"
                                            onChange={event => handleInputChange(index, 'startDate', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="date"
                                            value={experience?.endDate||''}
                                            placeholder="To"
                                            onChange={event => handleInputChange(index, 'endDate', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience?.reporting_to||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'reporting_to', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience?.reason||''}
                                            placeholder="Reason"
                                            onChange={event => handleInputChange(index, 'reason', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="textbox"
                                            type="text"
                                            value={experience?.location||''}
                                            placeholder="Name"
                                            onChange={event => handleInputChange(index, 'location', event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        {!experience?.exp_Certificate ? 
                                            <input
                                                className="choosefile" 
                                                type="file"
                                                onChange={event => handleFileGettingInput(index, event.target.files[0])}
                                            /> : <div className="inline">
                                                <a href={`data:application/pdf;base64,${experience?.exp_Certificate}`} download="exp_Certificate.pdf">
                                                    <FaFilePdf className="uploadedfile" />
                                                </a>
                                                <p>{experience?.fileName}</p>                                    
                                            </div>}
                                    </td>
                                </tr>
                            )})}
                        <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                        <tr>
                            <td colSpan="8" className="buttonrow"><button className="addanother" onClick={handleAddPreviousExperience} >
                                <IoMdAdd className="addIcon"/></button></td>
                        </tr >
                        <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                    </tbody>
                </table>
            </div>
            <h4>Reference Details</h4>
            <div className="row">
                <table className="family reference">
                    <thead>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Company Name</th>
                        <th>Contact No</th>
                        <th>Email ID</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input
                                className="textbox2"
                                type="text"
                                value={reference?.referral_name||''}
                                placeholder="Name"
                                onChange={event => handleInputChangeRef( 'referral_name', event.target.value)}
                            />
                            </td>
                            <td><input
                                className="textbox2"
                                type="text"
                                value={reference?.designation ||''}
                                placeholder="Role"
                                onChange={event => handleInputChangeRef('designation', event.target.value)}
                            />
                            </td>
                            <td><input
                                className="textbox2"
                                type="text"
                                value={reference?.company_name||''}
                                placeholder="Name"
                                onChange={event => handleInputChangeRef('company_name', event.target.value )}
                            />
                            </td>
                            <td><input
                                className="textbox2"
                                type="number"
                                value={reference?.contact_number || ''}
                                placeholder="Contact No."
                                onChange={event => handleInputChangeRef( 'contact_number', event.target.value)}
                            />
                            </td>
                            <td><input
                                className="textbox2"
                                type="text"
                                value={reference?.email_Id ||''}
                                placeholder="Name"
                                onChange={event => handleInputChangeRef( 'email_Id', event.target.value)}
                            />
                            </td>
                        </tr>
                        <tr><td colSpan={5}><hr /></td></tr>
                    </tbody>
                </table>
                <div><input
                    type="checkbox"
                    checked={reference.authorize}
                    onChange={handleCheckboxChange}
                    className="checkbox"
                />I hereby authorize Ideassion Tech to connect with my reference or my background verification.</div>
            </div> 
        </div>
    );
};

PreviousExperience.propTypes = {
    previousExperience:propTypes.array.isRequired,
    setPreviousExperience:propTypes.func.isRequired,
    reference:propTypes.object.isRequired,
    setReference:propTypes.func.isRequired
};

export default PreviousExperience;
