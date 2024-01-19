import React from 'react';
import '../../Styles/healthInformation.css';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';

const HealthInformation = () => {
    return (
        <div className="healthInfo">
            <h4>Health Information</h4>
            <div className="row">
                <div className="col-6">
                    <h6>Is there any specific health condition that you may need to inform us? </h6>
                    <div>
                        <textarea type="text" placeholder="Answer" className="textbox"/>
                    </div>
                </div>
                <div className="col-6">
                    <h6>Allergies to?</h6>
                    <div>                    
                        <textarea type="text" placeholder="Answer" className="textbox"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6> Have you undergone any recent major/minor surgery?</h6>
                    <div className="radiospace col-4">
                        <div>
                            <input type="radio" name="surgery" id="yes" className="radiodesign" />
                            <h6 htmlFor="yes">Yes</h6>
                        </div>
                        <div>
                            <input type="radio" name="surgery" id="no" className="radiodesign"/>
                            <h6 htmlFor="no">No</h6>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h6>
                        If Yes, then Explain it
                    </h6>
                    <div>                        
                        <textarea type="text" placeholder="About Surgery" className="textbox2"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6>Would your health condition permit you to work in rotational/night shifts?</h6>
                    <div className="radiospace col-4">
                        <div>
                            <input type="radio" name="surgery" id="yes" className="radiodesign" />
                            <h6 htmlFor="yes">Yes</h6>
                        </div>
                        <div>
                            <input type="radio" name="surgery" id="no" className="radiodesign"/>
                            <h6 htmlFor="no">No</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6>Do you have any disabilities?</h6>
                    <div className="radiospace col-4">
                        <div>
                            <input type="radio" name="surgery" id="yes" className="radiodesign" />
                            <h6 htmlFor="yes">Yes</h6>
                        </div>
                        <div>
                            <input type="radio" name="surgery" id="no" className="radiodesign"/>
                            <h6 htmlFor="no">No</h6>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h6>If yes, then explain it</h6>
                    <div>                    
                        <textarea type="text" placeholder="About disability" className="textbox2"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h6>COVID Vaccination Status</h6>
                    <div className="radiospace2 col-10">
                        <div>
                            <input type="radio" name="vaccination" id="fully" className="radiodesign" />
                            <h6 htmlFor="fully">Fully</h6>
                        </div>
                        <div>
                            <input type="radio" name="vaccination" id="patially" className="radiodesign"/>
                            <h6 htmlFor="patially">Partially</h6>
                        </div>
                        <div>
                            <input type="radio" name="vaccination" id="not vaccinated" className="radiodesign"/>
                            <h6 htmlFor="not vaccinated">Not Vaccinated</h6>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h6>Vaccine Certificate</h6>
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

export default HealthInformation;
