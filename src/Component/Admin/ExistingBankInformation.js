import React, { useState } from 'react';
import '../../Styles/existingbank.css';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import '../../Styles/previousExperience.css';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import { TiTick } from 'react-icons/ti';
import propTypes from 'prop-types';

const ExistingBankInformation = ({ componentView, existingBankInfo }) => {
    const [ draftSaved, setDraftSaved ] = useState(false);
    const [ existingbank, setExistingbank ] = useState({
        account_name: '',
        bank_name: '',
        bank_Branch: '',
        account_number: '',
        ifsC_code: '',
        joint_Account: false,
        proofSubmitted: [],
        bank_Documents: null
    });

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

    const handleSave = async () => {
        try {
            const formData = new FormData();

            formData.append('account_name', existingbank.account_name);
            formData.append('bank_name', existingbank.bank_name);
            formData.append('bank_Branch', existingbank.bank_Branch);
            formData.append('account_number', existingbank.account_number);
            formData.append('ifsC_code', existingbank.ifsC_code);
            formData.append('joint_Account', existingbank.joint_Account.toString()); 
            formData.append('ProofSubmitted', 'your_value_here');
            formData.append('bank_Documents', existingbank.bank_Documents);

            const response = await axios.post(
                `${Endpoint.API_ENDPOINT}/api/User/add-existing-bank/1`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            console.log('Data saved successfully:', response.data);
            setDraftSaved(true);
        } catch (error) {
            console.error('Error saving data in PrevExp:', error);
        }
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
                            value={existingbank.account_name||existingBankInfo?.account_name}
                            onChange={event => handleInputChange('account_name', event.target.value)}
                            disabled={componentView}/>                    
                    </div>
                </div>
                <div className="col-3">
                    <h6>Bank Name</h6>
                    <div>
                        <textarea 
                            type="text"
                            placeholder="Bank Name"
                            className="textbox"
                            value={existingbank.bank_name||existingBankInfo?.bank_name}
                            onChange={event => handleInputChange('bank_name', event.target.value)}
                            disabled={componentView}/>                    
                    </div>
                </div>
                <div className="col-3">
                    <h6>Bank Branch Location</h6>
                    <div>
                        <textarea 
                            type="text"
                            placeholder="Bank Branch Location"
                            className="textbox"
                            value={existingbank.bank_Branch||existingBankInfo?.bank_Branch}
                            onChange={event => handleInputChange('bank_Branch', event.target.value)}
                            disabled={componentView}/>                    
                    </div>
                </div>
                <div className="col-3">
                    <h6>Bank Account Number</h6>
                    <div>
                        <textarea 
                            type="text"
                            placeholder="Account Number"
                            className="textbox"
                            value={existingbank.account_number||existingBankInfo?.account_number}
                            onChange={event => handleInputChange('account_number', event.target.value)}
                            disabled={componentView}/>                     
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
                                    value={existingbank.ifsC_code||existingBankInfo?.ifsC_code}
                                    onChange={event => handleInputChange('ifsC_code', event.target.value)}
                                    disabled={componentView}/>    
                            </div>
                        </div>
                        <div className="col-6">
                            <h6>Joint Account?</h6>
                            <div className="radiospace col-6">
                                <div>
                                    <input type="radio" name="professionalMember" id="yes" className="radiodesign"
                                        checked={existingbank.joint_Account||existingBankInfo?.joint_Account}
                                        onChange={event => handleCheckboxChange('joint_Account', event.target.checked)} 
                                        disabled={componentView}/>
                                    <h6 htmlFor="yes">Yes</h6>
                                </div>
                                <div>
                                    <input type="radio" name="professionalMember" id="no" className="radiodesign"
                                        checked={!existingbank.joint_Account||!existingBankInfo?.joint_Account}
                                        onChange={event => handleCheckboxChange('joint_Account', event.target.checked)}
                                        disabled={componentView}/>
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
                            <div><input type="checkbox" className="checkbox" disabled={componentView}/>Cheque Leaf</div>
                            <div><input type="checkbox" className="checkbox" disabled={componentView}/>Bank Statement</div>
                            <div><input type="checkbox" className="checkbox" disabled={componentView}/>Passbook Copy</div>
                            <div><input type="checkbox" className="checkbox" disabled={componentView}/>Cheque main page</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {draftSaved && <span className="draftSavedText"><TiTick className="icontick"/>draft Saved</span>}
            <button onClick={handleSave} disabled={componentView}>Save</button>
        </div>
    );
};

ExistingBankInformation.propTypes = {
    existingBankInfo: propTypes.array.isRequired,
    componentView: propTypes.bool.isRequired
};
export default ExistingBankInformation;
