import React, { useState } from 'react';
import '../../Styles/personalInformation.css'
import { LiaCloudUploadAltSolid } from 'react-icons/lia';

const PersonalInformation = () => {

    const [ familyMembers, setFamilyMembers ] = useState([
        { relationship: 'Father', name: '', dob: '', role: '', number: '' },
        { relationship: 'Mother', name: '', dob: '', role: '', number: '' },
        { relationship: 'Spouse', name: '', dob: '', role: '', number: '' },
        { relationship: 'Child 1', name: '', dob: '', role: '', number: '' }
    ]);
    const [ childCount, setChildCount ] = useState(1);
    const [ employees, setEmployees ] = useState([{ empId: '', name: '', location: '' }]);
    const [ relations, setRelations ] = useState([{ relationship: 'Spouse/Partner', name: '', number: '', location: '' }]);

    const handleAddMember = () => {
        const newFamilyMember = {
            relationship: `Child ${childCount+1}`,
            name: '',
            dob: '',
            role: '',
            number: ''
        };

        setFamilyMembers([ ...familyMembers, newFamilyMember ]);
        setChildCount(childCount + 1);
    };
    const handleChange = (index, field, value) => {
        const updatedFamilyMembers = [...familyMembers];

        updatedFamilyMembers[index][field] = value;
        setFamilyMembers(updatedFamilyMembers);
    };

    const handleAddEmployee = () => {
        const newEmployee = { empId: '', name: '', location: '' };

        setEmployees([ ...employees, newEmployee ]);
    };
    const handleEmployeeChange = (index, field, value) => {
        const updatedEmployees = [...employees];

        updatedEmployees[index][field] = value;
        setEmployees(updatedEmployees);
    };

    const handleAddRelation = () => {
        const newRelation = { relationship: 'Spouse/Partner', name: '', number: '', location: '' };

        setRelations([ ...relations, newRelation ]);
    };

    const handleRelationChange = (index, field, value) => {
        const updatedRelations = [...relations];

        updatedRelations[index][field] = value;
        setRelations(updatedRelations);
    };

    return (
        <div className="personalinfo">
            <h4>General Info</h4>
            <div className="generalinfo row">
                <div className="col-9">
                    <div className="row">
                        <div className="col-4">
                            <h6>Full Name</h6>
                            <input type="text" className="textbox" />
                        </div>
                        <div className="col-4">
                            <h6>Date of Birth</h6>
                            <div>
                                <input type="date" className="textbox"/>
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 htmlFor="nationality">Nationality</h6>
                            <input type="text" className="textbox" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <h6>Gender</h6> 
                            <select className="textbox">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <h6>Marital Status</h6>
                            <select className="textbox">
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <h6>Marriage Date (if applicable)</h6>
                            <input type="date" className="textbox"/>
                        </div>
                    </div>
                </div>
                
                {/* <div className="col-3"></div> */}
                <div className="col-3">
                    <div className="col typography">
                        <h6>Profile Picture</h6>
                        <div className="profile-box">
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p>JPG, JPNG or PNG</p>
                    </div>
                </div>
                
            </div>
            <div className="col-3">
                <h6>Blood Group</h6>
                <select defaultValue="select" className="textbox">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <hr />
            <h4>Contact details</h4>
            <div className="contact">
                <div className="row">
                    <div className="col-3">
                        <h6>Email</h6>
                        <input type="text" className="textbox"/>
                    </div>
                    <div className="col-3">
                        <h6>Mobile No.</h6>
                        <input type="number" className="textbox" />
                    </div>
                </div>
                <div>
                    <h4>Present Address</h4>
                    <div className="row">
                        <div className="col-3">
                            <h6>Address Line 1</h6>
                            <input type="text" className="textbox"/>
                        </div>
                        <div className="col-3">
                            <h6>Address Line 1</h6>
                            <input type="text" className="textbox"/>
                        </div>
                        <div className="col-3">
                            <h6>Country</h6>
                            <select className="textbox">
                                <option>India</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <h6>State</h6>
                            <select className="textbox">
                                <option>Tamil Nadu</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <h6>City</h6>
                            <select className="textbox">
                                <option>Chennai</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <h6>Zip Code</h6>
                            <input type="number" className="textbox"/>
                        </div>
                        <div className="col-6">
                            <h6>
                                <input type="checkbox" className="checkbox"/>Present address same as permanent address  
                            </h6>
                        </div>
                    </div>
                </div>
                <h4>Permanent Address</h4>
                <div className="row">
                    <div className="col-3">
                        <h6>Address Line 1</h6>
                        <input type="text" className="textbox" />
                    </div>
                    <div className="col-3">
                        <h6>Address Line 1</h6>
                        <input type="text" className="textbox"/>
                    </div>
                    <div className="col-3">
                        <h6>Country</h6>
                        <select className="textbox">
                            <option>India</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <h6>State</h6>
                        <select className="textbox">
                            <option>Tamil Nadu</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h6>City</h6>
                        <select className="textbox">
                            <option>Chennai</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <h6>Zip Code</h6>
                        <input type="number" className="textbox"/>
                    </div>
                </div>
                <hr />
            </div>
            <div className="family">
                <table>
                    <thead>
                        <th>Relationship</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Occupation</th>
                        <th>Contact No</th>
                    </thead>
                    <tbody>
                        {familyMembers.map((member, index) => (
                            <tr key={index}>
                                <th>{member.relationship}</th>
                                <td><input type="text" className="textbox" placeholder="Name" onChange={event => handleChange(index, 'name', event.target.value)} /></td>
                                <td><input type="date" className="textbox" onChange={event => handleChange(index, 'dob', event.target.value)} /></td>
                                <td><input type="text" className="textbox" placeholder="role" onChange={event => handleChange(index, 'role', event.target.value)} /></td>
                                <td><input type="number" className="textbox" placeholder="Number" onChange={event => handleChange(index, 'number', event.target.value)} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5"><button className="addanother" onClick={handleAddMember}>+</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <h4>Hobbies & Membership</h4>
            <div className="row">
                <div className="col-4">
                    <div>Are you a member of any professional body</div>
                    <div >
                        <h6>
                            <input type="radio" name="professionalMember" /> Yes
                        </h6>
                        <h6>
                            <input type="radio" name="professionalMember" /> No
                        </h6>
                    </div>
                </div>

                <div className="col-4">
                    <div>If yes, Name of the Professionial Body</div>
                    <textarea type="text" className="hobbie" placeholder="Name"/>
                </div>
                <div className="col-4">
                    <div>Hobbies & Interests</div>
                    <textarea type="text" className="hobbie" placeholder="Hobbies"/>
                </div>
            </div>
            <hr />
            <h4>Friends/Colleagues Information</h4>
            <div className="row">
                <table className="family">
                    <thead>
                        <th>Emp ID</th>
                        <th>Name</th>
                        <th>Location</th>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <td><input type="number" className="textbox2" placeholder="0000" onChange={event => handleEmployeeChange(index, 'empId', event.target.value)} /></td>
                                <td><input type="text" className="textbox2" placeholder="Name" onChange={event=> handleEmployeeChange(index, 'name', event.target.value)} /></td>
                                <td><input type="text" className="textbox2" placeholder="Eg. Chennai" onChange={event=> handleEmployeeChange(index, 'location', event.target.value)} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3"><button className="addanother" onClick={handleAddEmployee}>+</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <h4>Emergency Contact Details</h4>
            <div className="row">
                <table className="family">
                    <thead>
                        <th>Relationship</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Contact Address</th>
                    </thead>
                    <tbody>
                        {relations.map((relation, index) => (
                            <tr key={index}>
                                <td>
                                    <select className="textbox" onChange={event => handleRelationChange(index, 'relationship', event.target.value)}>
                                        <option>Spouse/Partner</option>
                                        <option>Father</option>
                                        <option>Mother</option>
                                        <option>Siblings</option>
                                        <option>Guardian</option>
                                    </select>
                                </td>
                                <td><input type="text" className="textbox" placeholder="Name" onChange={event => handleRelationChange(index, 'name', event.target.value)} /></td>
                                <td><input type="number" className="textbox" placeholder="Mobile No." onChange={event => handleRelationChange(index, 'number', event.target.value)} /></td>
                                <td><input type="text" className="textbox" placeholder="Eg. Chennai" onChange={event => handleRelationChange(index, 'location', event.target.value)} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4"><button className="addanother" onClick={handleAddRelation}>+</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <h4>Required Documents</h4>
            <div className="row">
                <div className="row">
                    <div className="col-4 ">
                        <div>Aadhar</div>
                        <div className="doc-box typography">
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted:doc,pdf & img</p>
                    </div>
                    <div className="col-4 ">
                        <div>PAN</div>
                        <div className="doc-box typography">
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted:doc,pdf & img</p>
                    </div>
                    <div className="col-4 ">
                        <div>Driver License</div>
                        <div className="doc-box typography">
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted:doc,pdf & img</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 ">
                        <div>Passport</div>
                        <div className="doc-box typography">
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted:doc,pdf & img</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
