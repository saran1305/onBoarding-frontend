/* eslint no-magic-numbers: ["error", { "ignore": [0,1,2,3] }] */
import React, { useState,useEffect } from 'react';
import '../../Styles/healthInformation.css';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import * as Endpoint from '../../Entities/Endpoint';
import axios from 'axios';
import { FaFilePdf } from 'react-icons/fa';
import propTypes from 'prop-types';

const HealthInformation = ({ healthInformation,setHealthInformation }) => {

    const [ fileName, setFileName ] = useState({ vaccine_certificate:'',health_documents:'' })
    const [ validationErrors, setValidationErrors ] = useState({
        covidVaccine: '',
        vaccine_certificate: ''
    });
    const _dashboardUserDetail = JSON.parse(localStorage.getItem('dashboardUserDetail'))
    const _postedGenid = localStorage.getItem('postedGenId')


    useEffect(() => {
        if (Number(_dashboardUserDetail.genId) > 0 || _postedGenid > 0) {
            axios.get(`${Endpoint.API_ENDPOINT}/User/get-health/${_dashboardUserDetail?.genId ? _dashboardUserDetail?.genId : _postedGenid}`)
                .then(response => {
                    setHealthInformation(response.data);
                })
                .catch(error => { 
                    console.error('Error saving data healthinfo:', error);
                    
                });

            axios.get(`${Endpoint.API_ENDPOINT}/UserDetails/VaccinationStatus`)
                .then(response => {
                    setHealthInformation(response.data);
                })
                .catch(error => {
                    console.error('Error fetching vaccination status:', error);
                });
        }},[])

    useEffect(() => {
        if (healthInformation) {
            setHealthInformation({
                specific_health_condition: '',
                allergies:'',
                surgery: false,
                surgery_explaination: '',
                night_shifts: false,
                disability: false,
                disability_explanation: '',
                covidVaccine: 1,
                vaccine_certificate: '',
                health_documents: ''
            });
        }
    },[])

    const handleVaccinationStatusChange = value => {
        setHealthInformation(prevState => ({
            ...prevState,
            covidVaccine: value
        }));
        
        setValidationErrors(prevErrors => ({
            ...prevErrors,
            covidVaccine: '' 
        }));
    };
    
    const handleFileGettingInput = (field, file) => {

        setFileName({ ...fileName,[field]: file.name })
        
        convertToBase64(file, base64String => {
            setHealthInformation({ ...healthInformation, [field]: base64String })
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
    
    const handleRecentSurgeryChange = status => {

        handleInputChange('surgery', status === 'yes' ? true : false);
    };
    const handleWorkInRotationalShiftsChange = status => {

        handleInputChange('night_shifts', status === 'yes' ? true : false);
    };
    const handleDisabilitiesChange = status => {

        handleInputChange('disability', status === 'yes' ? true : false);
    };

    const handleInputChange = (field, value) => {
        setHealthInformation(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    
    return (
        <div className="healthInfo">
            <h4>Health Information</h4>
            <div className="row">
                <div className="col-6">
                    <h6>Is there any specific health condition that you may need to inform us? </h6>
                    <div>
                        <textarea
                            type="text"
                            placeholder="Answer"
                            className="textbox"
                            value={healthInformation?.specific_health_condition ||  '' }
                            onChange={event => handleInputChange('specific_health_condition', event.target.value)}
                        />     
                    </div>
                </div>
                <div className="col-6">
                    <h6>Allergies to?</h6>
                    <div>                    
                        <textarea
                            type="text"
                            placeholder="Answer"
                            className="textbox"
                            value={healthInformation?.allergies|| ''}
                            onChange={event => handleInputChange('allergies', event.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6>Have you undergone any recent major/minor surgery?</h6>
                    <div className="radiospace col-4">
                        <div>
                            <input
                                type="radio"
                                name="surgery"
                                id="yes"
                                className="radiodesign"
                                onChange={() => handleRecentSurgeryChange('yes')}
                                checked={healthInformation?.surgery|| '' }
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="surgery"
                                id="no"
                                className="radiodesign"
                                onChange={() => handleRecentSurgeryChange('no')}
                                checked={!healthInformation?.surgery|| '' }
                            />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h6>
                        If Yes, then Explain it
                    </h6>
                    <div>                        
                        <textarea
                            type="text"
                            placeholder="About Surgery"
                            className="textbox2"
                            value={healthInformation?.surgery_explaination||''}
                            onChange={event => handleInputChange('surgery_explaination', event.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6>Would your health condition permit you to work in rotational/night shifts?</h6>
                    <div className="radiospace col-4">
                        <div>
                            <input
                                type="radio"
                                name="shifts"
                                id="yes"
                                className="radiodesign"
                                onChange={() => handleWorkInRotationalShiftsChange('yes')}
                                checked={healthInformation?.night_shifts|| '' }
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="shifts"
                                id="no"
                                className="radiodesign"
                                onChange={() => handleWorkInRotationalShiftsChange('no')}
                                checked={!healthInformation?.night_shifts|| '' }
                            />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6>Do you have any disabilities?</h6>
                    <div className="radiospace col-4">
                        <div>
                            <input
                                type="radio"
                                name="disability"
                                id="yes"
                                className="radiodesign"
                                onChange={() => handleDisabilitiesChange('yes')}
                                checked={healthInformation?.disability|| ''}
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="disability"
                                id="no"
                                className="radiodesign"
                                onChange={() => handleDisabilitiesChange('no')}
                                checked={!healthInformation?.disability|| '' }
                            />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h6>If yes, then explain it</h6>
                    <div>  
                        <textarea
                            type="text"
                            placeholder="About disability"
                            className="textbox2"
                            value={healthInformation?.disability_explanation}
                            onChange={event => handleInputChange('disability_explanation', event.target.value)}
                        />  
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6>COVID Vaccination Status <span className="validation">*</span></h6>
                    <div className="radiospace2 col-10">
                        <div>
                            <input 
                                type="radio" 
                                name="vaccination" 
                                id="fully" 
                                className="radiodesign" 
                                checked={healthInformation.covidVaccine === 2} 
                                onChange={() => handleVaccinationStatusChange(2)}
                            />
                            <h6 htmlFor="fully">Fully</h6>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                name="vaccination" 
                                id="partially" 
                                className="radiodesign" 
                                checked={healthInformation.covidVaccine === 1}
                                onChange={() => handleVaccinationStatusChange(1)} 
                            />
                            <h6 htmlFor="patially">Partially</h6>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                name="vaccination" 
                                id="not vaccinated" 
                                className="radiodesign" 
                                checked={healthInformation.covidVaccine === 3}
                                onChange={() => handleVaccinationStatusChange(3)}
                            />
                            <h6 htmlFor="not vaccinated">Not Vaccinated</h6>
                        </div>
                    </div>
                    <p className="error">{validationErrors.covidVaccine}</p>
                </div>
                <div className="col-6">
                    <h6>Vaccine Certificate <span className="validation">*</span></h6>
                    <div className="col-6 doc-box typography">
                        {healthInformation && !healthInformation?.vaccine_certificate ? (
                            <div>
                                <input
                                    type="file"
                                    onChange={event => handleFileGettingInput('vaccine_certificate', event.target.files[0])}
                                />
                                <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                                <p>Upload</p>
                                <p>You can drag and drop too</p>
                            </div>
                        ) : (
                            <div className="inline">
                                <a href={`data:application/pdf;base64,${healthInformation?.vaccine_certificate}`} download="vaccine_certificate.pdf">
                                    <FaFilePdf className="uploadedfile" />
                                </a>
                                <p>{fileName.vaccine_certificate}</p>
                            </div>
                        )}
                    </div>
                    {healthInformation?.vaccine_certificate === '' && <p className="filetext">File Type Accepted: doc, pdf & img</p>}
                </div>
            </div>
            <div className="col-6">
                <h6>Health Related Documents</h6>
                <div className="col-6 doc-box typography" >
                    {healthInformation && !healthInformation?.health_documents ? (
                        <div>
                            <input
                                type="file"
                                onChange={event => handleFileGettingInput('health_documents', event.target.files[0])}
                            />
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                    ) : (
                        <div className="inline">
                            <a href={`data:application/pdf;base64,${healthInformation?.health_documents}`} download="aadhar.pdf">
                                <FaFilePdf className="uploadedfile" />
                            </a>
                            <p>{fileName.health_documents}</p>
                        </div>
                    )}
                </div>         
                {healthInformation?.health_documents === '' && <p className="filetext">File Type Accepted: doc, pdf & img</p>}   
            </div>

            <hr />
        </div>
    );
};

HealthInformation.propTypes = {
    healthInformation: propTypes.object.isRequired,
    setHealthInformation: propTypes.object.isRequired
};

export default HealthInformation;
