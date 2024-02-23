import React, { useState,useEffect } from 'react';
import '../../Styles/healthInformation.css';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import propTypes from 'prop-types';

const HealthInformation = ({ healthInfo,healthInformationData,setHealthInformationData }) => {

    useEffect(() => {
        if (healthInfo) {
            setHealthInformationData(healthInfo);
        }
    }, [healthInfo]);

    const [ covidVaccine, setCovidVaccine ] = useState('');
    const [ vaccineCertificate, setVaccineCertificate ] = useState(null);
    const [ validationErrors, setValidationErrors ] = useState({
        covidVaccine: '',
        vaccine_certificate: ''
    });

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
                            value={healthInformationData.specific_health_condition ||  '' }
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
                            value={healthInformationData.allergies|| ''}
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
                                onChange={handleRecentSurgeryChange}
                                checked={healthInformationData.surgery|| '' }
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="surgery"
                                id="no"
                                className="radiodesign"
                                onChange={handleRecentSurgeryChange}
                                checked={!healthInformationData.surgery|| '' }
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
                            value={healthInformationData.surgery_explaination||''}
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
                                onChange={handleWorkInRotationalShiftsChange}
                                checked={healthInformationData.night_shifts|| '' }
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="shifts"
                                id="no"
                                className="radiodesign"
                                onChange={handleWorkInRotationalShiftsChange}
                                checked={!healthInformationData.night_shifts|| '' }
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
                                onChange={handleDisabilitiesChange}
                                checked={healthInformationData.disability|| '' || healthInfo?.disability}
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="disability"
                                id="no"
                                className="radiodesign"
                                onChange={handleDisabilitiesChange}
                                checked={!healthInformationData.disability|| '' || !healthInfo?.disability }
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
                            value={healthInfo?.disability_explanation}
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
                            <input type="radio" name="vaccination" id="fully" className="radiodesign" 
                                checked={healthInformationData.covidVaccine|| '' || healthInfo?.covidVaccine}
                                onChange={handleVaccinationStatusChange} />
                            <h6 htmlFor="fully">Fully</h6>
                        </div>
                        <div>
                            <input type="radio" name="vaccination" id="patially" className="radiodesign"  
                                checked={healthInformationData.covidVaccine|| '' || healthInfo?.covidVaccine}
                                onChange={handleVaccinationStatusChange} />
                            <h6 htmlFor="patially">Partially</h6>
                        </div>
                        <div>
                            <input type="radio" name="vaccination" id="not vaccinated" className="radiodesign"  
                                checked={healthInformationData.covidVaccine|| '' || healthInfo?.covidVaccine}
                                onChange={handleVaccinationStatusChange}/>
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
                            />
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
            </div>
            <hr />
        </div>
    );
};

HealthInformation.propTypes = {
    healthInfo: propTypes.object.isRequired,
    healthInformationData: propTypes.object.isRequired,
    setHealthInformationData: propTypes.object.isRequired
};

export default HealthInformation;
