import React, { useEffect } from 'react';
import '../../Styles/existingbank.css';
import '../../Styles/previousExperience.css';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import propTypes from 'prop-types';

const ExistingBankInformation = ({ existingBankInfo,existingbank,setExistingbank }) => { 

    useEffect(() => {
        if (existingBankInfo) {
            setExistingbank(existingBankInfo);
        }
    }, [existingBankInfo]);

    const handleInputChange = (field, value) => {
        setExistingbank(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field, checked) => {
        setExistingbank(prevData => ({
            ...prevData,
            [field]: checked
        }));
    };

    const handleFileChange = event => {
        setExistingbank(prevData => ({
            ...prevData,
            bank_Documents: event.target.files[0]
        }));
    };

    return (
        <div className="existingbank">
            <h4>Existing Bank Account</h4>
            <div className="row">
                <div className="col-3">
                    <h6>Name as on Bank Account</h6>
                    <div>
                        <textarea
                            type="text"
                            placeholder="Name"
                            className="textbox"
                            value={existingbank.account_name|| '' }
                            onChange={event => handleInputChange('account_name', event.target.value)}
                        />                    
                    </div>
                </div>
                <div className="col-3">
                    <h6>Bank Name</h6>
                    <div>
                        <textarea 
                            type="text"
                            placeholder="Bank Name"
                            className="textbox"
                            value={existingbank.bank_name || '' }
                            onChange={event => handleInputChange('bank_name', event.target.value)}
                        />                    
                    </div>
                </div>
                <div className="col-3">
                    <h6>Bank Branch Location</h6>
                    <div>
                        <textarea 
                            type="text"
                            placeholder="Bank Branch Location"
                            className="textbox"
                            value={existingbank.bank_Branch|| '' }
                            onChange={event => handleInputChange('bank_Branch', event.target.value)}
                        />                    
                    </div>
                </div>
                <div className="col-3">
                    <h6>Bank Account Number</h6>
                    <div>
                        <textarea 
                            type="text"
                            placeholder="Account Number"
                            className="textbox"
                            value={existingbank.account_number|| '' }
                            onChange={event => handleInputChange('account_number', event.target.value)}
                        />                     
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <h6>Bank IFSC code</h6>
                            <div>
                                <textarea 
                                    type="text"
                                    placeholder="IFSC code"
                                    className="textbox"
                                    value={existingbank.ifsC_code|| '' }
                                    onChange={event => handleInputChange('ifsC_code', event.target.value)}
                                />    
                            </div>
                        </div>
                        <div className="col-6">
                            <h6>Joint Account?</h6>
                            <div className="radiospace col-6">
                                <div>
                                    <input type="radio" name="professionalMember" id="yes" className="radiodesign"
                                        checked={existingbank.joint_Account || '' }
                                        onChange={event => handleCheckboxChange('joint_Account', event.target.checked)} 
                                    />
                                    <h6 htmlFor="yes">Yes</h6>
                                </div>
                                <div>
                                    <input type="radio" name="professionalMember" id="no" className="radiodesign"
                                        checked={!existingbank.joint_Account || '' }
                                        onChange={event => handleCheckboxChange('joint_Account', event.target.checked)}
                                    />
                                    <h6 htmlFor="no">No</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h6>Bank related Documents</h6>
                        <div className="col-6">
                            <div className="doc-box typography">
                                <label htmlFor="file-upload" className="upload-button">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        onChange={handleFileChange}
                                        className="file-input"
                                    />
                                    <LiaCloudUploadAltSolid className="uploadIcon" />
                                    <p>Upload</p>
                                </label>
                                <p>You can drag and drop too</p>
                            </div>
                            <p className="filetext">File Type Accepted: doc, pdf, & img</p>
                        </div>

                    </div>
                </div>
                <div className="col-6">

                    <div className="col-6">
                        <h6>Proof Submitted (To be updated by HR)</h6>
                        <div className="checkbox-container" >
                            <div><input type="checkbox" className="checkbox" />Cheque Leaf</div>
                            <div><input type="checkbox" className="checkbox" />Bank Statement</div>
                            <div><input type="checkbox" className="checkbox" />Passbook Copy</div>
                            <div><input type="checkbox" className="checkbox" />Cheque main page</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
};

ExistingBankInformation.propTypes = {
    existingBankInfo: propTypes.object.isRequired,
    existingbank: propTypes.object.isRequired,
    setExistingbank: propTypes.object.isRequired
};
export default ExistingBankInformation;
