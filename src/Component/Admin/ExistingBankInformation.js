import React from 'react';
import '../../Styles/existingbank.css'
import { LiaCloudUploadAltSolid } from 'react-icons/lia';

const ExistingBankInformation = () => {
    return (
        <div className="existingbank">
            <h4>Existing Bank Account</h4>
            <div className="row">
                <div className="col-3">
                    <h6>Name as on Bank Account</h6>
                    <div>
                        <input type="text" placeholder="Name" className="textbox"/>
                    </div>
                </div>
                <div className="col-3">
                    <h6>Bank Name</h6>
                    <div>
                        <textarea type="text" placeholder="Bank Name" className="textbox"/>
                    </div>
                </div>
                <div className="col-3">
                    <h6>Bank Branch Location</h6>
                    <div>
                        <textarea type="text" placeholder="Bank Location" className="textbox" />
                    </div>
                </div>
                <div className="col-3">
                    <h6>Bank Account Number</h6>
                    <div>
                        <textarea type="text" placeholder="Account No" className="textbox"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <h6>Bank IFSC code</h6>
                            <div>
                                <textarea type="text" placeholder="0000000000000" className="textbox"/>
                            </div>
                        </div>
                        <div className="col-6">
                            <h6>Joint Account?</h6>
                            <div className="radiospace col-6">
                                <div>
                                    <input type="radio" name="account" id="yes" className="radiodesign" />
                                    <h6 htmlFor="yes">Yes</h6>
                                </div>
                                <div>
                                    <input type="radio" name="account" id="no" className="radiodesign"/>
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
                        <div className="checkbox-container">
                            <div><input type="checkbox" className="checkbox"/>Cheque Leaf</div>
                            <div><input type="checkbox" className="checkbox"/>Bank Statement</div>
                            <div><input type="checkbox" className="checkbox"/>Passbook Copy</div>
                            <div><input type="checkbox" className="checkbox"/>Cheque main page</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default ExistingBankInformation;
