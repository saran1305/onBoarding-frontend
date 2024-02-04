import React, { useState } from 'react';
import '../../Styles/healthInformation.css';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import { TiTick } from 'react-icons/ti';

const HealthInformation = () => {
    const [ healthInformationData, setHealthInformationData ] = useState({
        specificHealthCondition: '',
        allergies: '',
        recentSurgery: false,
        surgeryExplanation: '',
        workInRotationalShifts: false,
        disabilities: false,
        disabilityExplanation: '',
        vaccinationStatus: '',
        vaccineCertificate: null,
        healthRelatedDocuments: null
    });

    const [ vaccinationStatus, setVaccinationStatus ] = useState('');
    const [ vaccineCertificate, setVaccineCertificate ] = useState(null);
    const [ validationErrors, setValidationErrors ] = useState({
        vaccinationStatus: '',
        vaccineCertificate: ''
    });
    const [ draftSaved, setDraftSaved ] = useState(false);

    const validateVaccinationStatus = () => {
        if (!vaccinationStatus) {
            setValidationErrors(prevErrors => ({
                ...prevErrors,
                vaccinationStatus: 'Please select your vaccination status.'
            }));
            return false;
        }
        setValidationErrors(prevErrors => ({ ...prevErrors, vaccinationStatus: '' }));
        return true;
    };
    
    const validateVaccineCertificate = () => {
        if (!vaccineCertificate) {
            setValidationErrors(prevErrors => ({
                ...prevErrors,
                vaccineCertificate: 'Please upload your vaccine certificate.'
            }));
            return false;
        }
        setValidationErrors(prevErrors => ({ ...prevErrors, vaccineCertificate: '' }));
        return true;
    };

    const handleVaccinationStatusChange = event => {
        setVaccinationStatus(event.target.value);
        validateVaccinationStatus();
        
        setValidationErrors(prevErrors => ({
            ...prevErrors,
            vaccinationStatus: '' 
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
        if (validateVaccinationStatus() && validateVaccineCertificate()) {
            const formData = new FormData();

            // Append data to formData
            formData.append('specificHealthCondition', healthInformationData.specificHealthCondition);
            formData.append('allergies', healthInformationData.allergies);
            formData.append('recentSurgery', healthInformationData.recentSurgery);
            formData.append('surgeryExplanation', healthInformationData.surgeryExplanation);
            formData.append('workInRotationalShifts', healthInformationData.workInRotationalShifts);
            formData.append('disabilities', healthInformationData.disabilities);
            formData.append('disabilityExplanation', healthInformationData.disabilityExplanation);
            formData.append('vaccinationStatus', healthInformationData.vaccinationStatus);
            formData.append('vaccineCertificate', healthInformationData.vaccineCertificate);
            formData.append('healthRelatedDocuments', healthInformationData.healthRelatedDocuments);

            axios.post(`${Endpoint.API_ENDPOINT}/healthinfo`, healthInformationData)
                .then(response => {
                    console.log('Data saved successfully:', response.data);
                    setDraftSaved(true);
                })
                .catch(error => {
                    console.error('Error saving data:', error.message || error);
                });
        } else {
            console.log('Form validation failed.');
        }
    };
    const handleRecentSurgeryChange = event => {
        const value = event.target.id === 'no'; 

        handleInputChange('recentSurgery', value);
    };
    const handleWorkInRotationalShiftsChange = event => {
        const value = event.target.id === 'no';

        handleInputChange('workInRotationalShifts', value);
    };
    const handleDisabilitiesChange = event => {
        const value = event.target.id === 'yes'; 

        handleInputChange('disabilities', value);
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
                            onChange={event => handleInputChange('specificHealthCondition', event.target.value)}
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
                                checked={healthInformationData.recentSurgery}
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
                                checked={!healthInformationData.recentSurgery}
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
                            onChange={event => handleInputChange('surgeryExplanation', event.target.value)}
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
                                checked={healthInformationData.workInRotationalShifts}
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
                                checked={!healthInformationData.workInRotationalShifts}
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
                                name="disabilities"
                                id="yes"
                                className="radiodesign"
                                onChange={handleDisabilitiesChange}
                                checked={healthInformationData.disabilities}
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="disabilities"
                                id="no"
                                className="radiodesign"
                                onChange={handleDisabilitiesChange}
                                checked={!healthInformationData.disabilities}
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
                            onChange={event => handleInputChange('disabilityExplanation', event.target.value)}
                        />  
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6>COVID Vaccination Status <span className="validation">*</span></h6>
                    <div className="radiospace2 col-10">
                        <div>
                            <input type="radio" name="vaccination" id="fully" className="radiodesign"  onChange={handleVaccinationStatusChange} />
                            <h6 htmlFor="fully">Fully</h6>
                        </div>
                        <div>
                            <input type="radio" name="vaccination" id="patially" className="radiodesign"  onChange={handleVaccinationStatusChange}/>
                            <h6 htmlFor="patially">Partially</h6>
                        </div>
                        <div>
                            <input type="radio" name="vaccination" id="not vaccinated" className="radiodesign"  onChange={handleVaccinationStatusChange}/>
                            <h6 htmlFor="not vaccinated">Not Vaccinated</h6>
                        </div>
                    </div>
                    <p className="error">{validationErrors.vaccinationStatus}</p>
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
                {draftSaved && <span className="draftSavedText"><TiTick className="icontick"/>draft Saved</span>}
                <button onClick={handleSave}>Save</button>
            </div>
            <hr />
        </div>
    );
};

export default HealthInformation;
