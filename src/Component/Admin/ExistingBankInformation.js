import React,{ useState } from 'react';
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
        nameOnBankAccount: '',
        bankName: '',
        bankBranchLocation: '',
        bankAccountNumber: '',
        bankIFSCCode: '',
        isJointAccount: false,
        bankRelatedDocuments: ''
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
    const handleSave = () => {
        axios.post(`${Endpoint.API_ENDPOINT}/existingbankinfo`, existingbank)
            .then(response => {
                console.log('Data saved successfully:', response.data);
                setDraftSaved(true);
            })
            .catch(error => {
                console.error('Error saving data:', error.message || error);
            });
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
                            value={existingBankInfo?.nameOnBankAccount}
                            onChange={event => handleInputChange('nameOnBankAccount', event.target.value)}
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
                            value={existingBankInfo?.bankName}
                            onChange={event => handleInputChange('bankName', event.target.value)}
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
                            value={existingBankInfo?.bankBranchLocation}
                            onChange={event => handleInputChange('bankBranchLocation', event.target.value)}
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
                            value={existingBankInfo?.bankAccountNumber}
                            onChange={event => handleInputChange('bankAccountNumber', event.target.value)}
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
                                    value={existingBankInfo?.bankIFSCCode}
                                    onChange={event => handleInputChange('bankIFSCCode', event.target.value)}
                                    disabled={componentView}/>    
                            </div>
                        </div>
                        <div className="col-6">
                            <h6>Joint Account?</h6>
                            <div className="radiospace col-6">
                                <div>
                                    <input type="radio" name="professionalMember" id="yes" className="radiodesign"
                                        checked={existingBankInfo?.isJointAccount}
                                        onChange={event => handleCheckboxChange('isJointAccount', event.target.checked)} 
                                        disabled={componentView}/>
                                    <h6 htmlFor="yes">Yes</h6>
                                </div>
                                <div>
                                    <input type="radio" name="professionalMember" id="no" className="radiodesign"
                                        checked={!existingBankInfo?.isJointAccount}
                                        onChange={event => handleCheckboxChange('isJointAccount', event.target.checked)}
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
                                <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                                <p>Upload</p>
                                <p>You can drag and drop too</p>
                            </div>
                            <p className="filetext">File Type Accepted:doc,pdf & img</p>
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
    existingBankInfo: propTypes.object.isRequired,
    componentView: propTypes.bool.isRequired
};
export default ExistingBankInformation;
