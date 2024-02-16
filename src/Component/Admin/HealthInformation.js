import React, { useState } from 'react';
import '../../Styles/healthInformation.css';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import { TiTick } from 'react-icons/ti';
import propTypes from 'prop-types';

const HealthInformation = ({ componentView, healthInfo }) => {
    const [ healthInformationData, setHealthInformationData ] = useState({
        specific_health_condition: '',
        allergies: '',
        surgery: false,
        surgery_explaination: '',
        night_shifts: false,
        disability: false,
        disability_explanation: '',
        covidVaccine: '',
        vaccine_certificate: null,
        health_documents: null
    });

    const [ covidVaccine, setCovidVaccine ] = useState('');
    const [ vaccineCertificate, setVaccineCertificate ] = useState(null);
    const [ validationErrors, setValidationErrors ] = useState({
        covidVaccine: '',
        vaccine_certificate: ''
    });
    const [ draftSaved, setDraftSaved ] = useState(false);

    const validateVaccinationStatus = () => {
        if (!covidVaccine) {
            setValidationErrors(prevErrors => ({
                ...prevErrors,
                covidVaccine: 'Please select your vaccination status.'
            }));
            return false;
        }
        setValidationErrors(prevErrors => ({ ...prevErrors, covidVaccine: '' }));
        return true;
    };
    
    const validateVaccineCertificate = () => {
        if (!vaccineCertificate) {
            setValidationErrors(prevErrors => ({
                ...prevErrors,
                vaccine_certificate: 'Please upload your vaccine certificate.'
            }));
            return false;
        }
        setValidationErrors(prevErrors => ({ ...prevErrors, vaccine_certificate: '' }));
        return true;
    };

    const handleVaccinationStatusChange = event => {
        setCovidVaccine(event.target.value);
        validateVaccinationStatus();
        
        setValidationErrors(prevErrors => ({
            ...prevErrors,
            covidVaccine: '' 
        }));
    };
    
    const handleVaccineCertificateChange = event => {
        const selectedFile = event.target.files[0];
    
        setVaccineCertificate(selectedFile);
        validateVaccineCertificate();
        // setValidationErrors(prevErrors => ({
        //     ...prevErrors,
        //     vaccineCertificate: ''
        // }));
    };
    
    const handleSave = () => {
        const formData = new FormData();

        formData.append('Specific_health_condition', healthInformationData.specific_health_condition || ''); 
        formData.append('Allergies', healthInformationData.allergies || '');
        formData.append('surgery', healthInformationData.surgery);
        formData.append('Surgery_explaination', healthInformationData.surgery_explaination || '');
        formData.append('Night_shifts', healthInformationData.night_shifts);
        formData.append('Disability', healthInformationData.disability);
        formData.append('Disability_explanation', healthInformationData.disability_explanation || '');
        formData.append('CovidVaccine', healthInformationData.covidVaccine || ''); 
        formData.append('Vaccine_certificate', healthInformationData.vaccine_certificate || ''); 
        formData.append('Health_documents', healthInformationData.health_documents || '');
    
        axios.post(`${Endpoint.API_ENDPOINT}/api/User/add-health/1`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log('Data saved successfully:', response.data);
                setDraftSaved(true);
            })
            .catch(error => {
                console.error('Error saving data:', error.message || error);
            });
    };
    const handleRecentSurgeryChange = event => {
        const value = event.target.id === 'no'; 

        handleInputChange('surgery', value);
    };
    const handleWorkInRotationalShiftsChange = event => {
        const value = event.target.id === 'no';

        handleInputChange('night_shifts', value);
    };
    const handleDisabilitiesChange = event => {
        const value = event.target.id === 'yes'; 

        handleInputChange('disability', value);
    };
    const handleInputChange = (field, value) => {
        setHealthInformationData(prevData => ({
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
                            value={healthInfo?.specific_health_condition}
                            onChange={event => handleInputChange('specific_health_condition', event.target.value)}
                            disabled={componentView}/>     
                    </div>
                </div>
                <div className="col-6">
                    <h6>Allergies to?</h6>
                    <div>                    
                        <textarea
                            type="text"
                            placeholder="Answer"
                            className="textbox"
                            value={healthInfo?.allergies}
                            onChange={event => handleInputChange('allergies', event.target.value)}
                            disabled={componentView}/>
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
                                onChange={handleRecentSurgeryChange}
                                checked={healthInformationData.surgery||healthInfo?.surgery}
                                disabled={componentView}/>
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="surgery"
                                id="no"
                                className="radiodesign"
                                onChange={handleRecentSurgeryChange}
                                checked={!healthInformationData.surgery || !healthInfo?.surgery}
                                disabled={componentView} />
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
                            value={healthInfo?.surgery_explaination}
                            onChange={event => handleInputChange('surgery_explaination', event.target.value)}
                            disabled={componentView} />
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
                                onChange={handleWorkInRotationalShiftsChange}
                                checked={healthInformationData.night_shifts ||healthInfo?.night_shifts}
                                disabled={componentView} />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="shifts"
                                id="no"
                                className="radiodesign"
                                onChange={handleWorkInRotationalShiftsChange}
                                checked={!healthInformationData.night_shifts || !healthInfo?.night_shifts}
                                disabled={componentView}/>
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
                                onChange={handleDisabilitiesChange}
                                checked={healthInformationData.disability || healthInfo?.disability}
                                disabled={componentView}/>
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="disability"
                                id="no"
                                className="radiodesign"
                                onChange={handleDisabilitiesChange}
                                checked={!healthInformationData.disability || !healthInfo?.disability }
                                disabled={componentView}/>
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
                            value={healthInfo?.disability_explanation}
                            onChange={event => handleInputChange('disability_explanation', event.target.value)}
                            disabled={componentView} />  
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6>COVID Vaccination Status <span className="validation">*</span></h6>
                    <div className="radiospace2 col-10">
                        <div>
                            <input type="radio" name="vaccination" id="fully" className="radiodesign" 
                                checked={healthInformationData.covidVaccine|| healthInfo?.covidVaccine}
                                onChange={handleVaccinationStatusChange} disabled={componentView}/>
                            <h6 htmlFor="fully">Fully</h6>
                        </div>
                        <div>
                            <input type="radio" name="vaccination" id="patially" className="radiodesign"  
                                checked={healthInformationData.covidVaccine|| healthInfo?.covidVaccine}
                                onChange={handleVaccinationStatusChange} disabled={componentView}/>
                            <h6 htmlFor="patially">Partially</h6>
                        </div>
                        <div>
                            <input type="radio" name="vaccination" id="not vaccinated" className="radiodesign"  
                                checked={healthInformationData.covidVaccine || healthInfo?.covidVaccine}
                                onChange={handleVaccinationStatusChange}disabled={componentView}/>
                            <h6 htmlFor="not vaccinated">Not Vaccinated</h6>
                        </div>
                    </div>
                    <p className="error">{validationErrors.covidVaccine}</p>
                </div>
                <div className="col-6">
                    <h6>Vaccine Certificate <span className="validation">*</span></h6>
                    <div className="col-6">
                        <div className="doc-box typography">
                            <input
                                type="file"
                                onChange={handleVaccineCertificateChange}
                                disabled={componentView}/>
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted:doc,pdf & img</p>
                    </div>
                    <p className="error">{validationErrors.vaccineCertificate}</p>
                </div>
            </div>
            <div className="col-6">
                <h6>Health Related Documents</h6>
                <div className="col-6">
                    <div className="doc-box typography">
                        <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                        <p>Upload</p>
                        <p>You can drag and drop too</p>
                    </div>
                    <p className="filetext">File Type Accepted:doc,pdf & img</p>
                </div>
                {draftSaved && <span className="draftSavedText"><TiTick className="icontick"/>draft Saved</span>}
                <button onClick={handleSave} disabled={componentView}>Save</button>
            </div>
            <hr />
        </div>
    );
};

HealthInformation.propTypes = {
    healthInfo: propTypes.object.isRequired,
    componentView: propTypes.bool.isRequired
};

export default HealthInformation;
