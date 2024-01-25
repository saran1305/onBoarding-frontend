import React, { useState } from 'react';
import '../../Styles/personalInformation.css'
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import propTypes from 'prop-types';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import { IoMdAdd } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';

const PersonalInformation = () => {

    const [ personalDetails, setPersonalDetails ] = useState({
        generalInfo: {
            fullName: '',
            dateOfBirth: '',
            nationality: '',
            gender: 'male',
            maritalStatus: 'single',
            marriageDate: '',
            bloodGroup: 'A+',
            email: '',
            mobileNumber: '',
            presentAddress: {
                addressLine1: '',
                addressLine2: '',
                country: 'India',
                state: 'Tamil Nadu',
                city: 'Chennai',
                zipCode: '',
                sameAsPermanent: false
            },
            permanentAddress: {
                addressLine1: '',
                addressLine2: '',
                country: 'India',
                state: 'Tamil Nadu',
                city: 'Chennai',
                zipCode: ''
            }
        },
        familyMembers: [
            { relationship: 'Father', name: '', dob: '', role: '', number: '' },
            { relationship: 'Mother', name: '', dob: '', role: '', number: '' },
            { relationship: 'Spouse', name: '', dob: '', role: '', number: '' },
            { relationship: 'Child 1', name: '', dob: '', role: '', number: '' }
        ],
        childCount: 1,
        employees: [{ empId: '', name: '', location: '' }],
        relations: [{ relationship: 'Spouse/Partner', name: '', number: '', location: '' }],
        hobbies: {
            memberOfProfessionalBody: false,
            professionalBodyName: '',
            hobbiesAndInterests: ''
        },
        friendsColleagues: [{ empId: '', name: '', location: '' }],
        emergencyContacts: [
            { relationship: 'Spouse/Partner', name: '', number: '', location: '' },
            { relationship: 'Father', name: '', number: '', location: '' },
            { relationship: 'Mother', name: '', number: '', location: '' },
            { relationship: 'Siblings', name: '', number: '', location: '' },
            { relationship: 'Guardian', name: '', number: '', location: '' }
        ],
        requiredDocuments: {
            aadhar: null,
            pan: null,
            driverLicense: null,
            passport: null
        }
    })
    const [ validation, setValidation ] = useState({
        fullName: '',
        dateOfBirth: '',
        nationality: '',
        email: '',
        mobileNumber: '',
        gender: '',
        maritalStatus: '',
        marriageDate: '',
        bloodGroup: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        aadhar: '',
        pan: '',
        driverLicense: '',
        passport: ''
    });
    const [ draftSaved, setDraftSaved ] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
        case 'fullName':
            return value.trim() === '' ? 'Full Name is required' : '';
        case 'dateOfBirth':
            return value.trim() === '' ? 'Date of Birth is required' : '';
        case 'nationality':
            return value.trim() === '' ? 'Nationality is required' : '';
        case 'gender':
            return value.trim() === '' ? 'Gender is required' : '';
        case 'email':
            return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Invalid email address';
        case 'mobileNumber':
            return /^\d{10}$/.test(value) ? '' : 'Invalid mobile number';
        default:
            return '';
        }
    };
    const handleSave = () => {
        const allValidations = Object.keys(validation).map(field => validateField(field, personalDetails.generalInfo[field]));
    
        if (allValidations.some(error => error !== '')) {
            setValidation(prevErrors => ({
                ...prevErrors,
                ...Object.fromEntries(allValidations.map((error, index) => [ Object.keys(validation)[index], error ]))
            }));
            
            return;
        }
        axios.post(`${Endpoint.API_ENDPOINT}/personalinfo`, personalDetails)
            .then(response => {
                console.log('Data saved successfully:', response.data);
                setDraftSaved(true);
            })
            .catch(error => { 
                console.error('Error saving data:', error);
                
            });
    };

    const handleInputChange = (field, value) => {
        const updatedDetails = { ...personalDetails };
        const error = validateField(field, value);

        setValidation(prevErrors => ({
            ...prevErrors,
            [field]: error
        }));

        updatedDetails.generalInfo[field] = value;
        setPersonalDetails(updatedDetails);
    };

    const { familyMembers, childCount, employees, relations } = personalDetails;

    const setFamilyMembers = updatedFamilyMembers => {
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            familyMembers: updatedFamilyMembers
        }));
    };

    const setChildCount = newCount => {
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            childCount: newCount
        }));
    };

    const setEmployees = updatedEmployees => {
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            employees: updatedEmployees
        }));
    };

    const setRelations = updatedRelations => {
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            relations: updatedRelations
        }));
    };

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
                            <h6>Full Name<span className="error"> * </span></h6>
                            <input
                                type="text"
                                className="textbox"
                                value={personalDetails.generalInfo.fullName}
                                onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, generalInfo: { ...prevDetails.generalInfo, fullName: event.target.value } }))}/>
                            <span className="error">{validation.fullName}</span>
                        </div>
                        <div className="col-4">
                            <h6>Date of Birth<span className="error"> * </span></h6>
                            <div>
                                <input type="date" className="textbox"
                                    value={personalDetails.generalInfo.dateOfBirth}
                                    onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, generalInfo: { ...prevDetails.generalInfo, dateOfBirth: event.target.value } }))}/>
                                <span className="error">{validation.dateOfBirth}</span>
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 htmlFor="nationality">Nationality<span className="error"> * </span></h6>
                            <input type="text" className="textbox"
                                value={personalDetails.generalInfo.nationality}
                                onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, generalInfo: { ...prevDetails.generalInfo, nationality: event.target.value } }))}/>
                            <span className="error">{validation.nationality}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <h6>Gender<span className="error"> * </span></h6>
                            <select className="textbox"
                                value={personalDetails.generalInfo.gender}
                                onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, generalInfo: { ...prevDetails.generalInfo, gender: event.target.value } }))}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <span className="error">{validation.gender}</span>
                        </div>
                        <div className="col-4">
                            <h6>Marital Status<span className="error"> * </span></h6>
                            <select
                                className="textbox"
                                value={personalDetails.generalInfo.maritalStatus}
                                onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails,
                                    generalInfo: { ...prevDetails.generalInfo, maritalStatus: event.target.value
                                    }
                                }))
                                }
                            >
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                            </select>
                            <span className="error">{validation.maritalStatus}</span>
                        </div>
                        <div className="col-4">
                            <h6>Marriage Date (if applicable)</h6>
                            <input type="date" className="textbox"/>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="col">
                        <h6>Profile Picture<span className="error"> * </span></h6>
                        <div className="profile-box typography">
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">JPG, PNG or JPNG</p>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <h6>Blood Group<span className="error"> * </span></h6>
                <select defaultValue={personalDetails.generalInfo.bloodGroup} className="textbox">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                <span className="error">{validation.bloodGroup}</span>
            </div>
            <hr />
            <h4>Contact details</h4>
            <div className="contact">
                <div className="row">
                    <div className="col-3">
                        <h6>Email<span className="error"> * </span></h6>
                        <input
                            type="text"
                            className="textbox"
                            value={personalDetails.generalInfo.email}
                            onChange={event => handleInputChange('email', event.target.value)}
                        />
                        <span className="error">{validation.email}</span>
                    </div>
                    <div className="col-3">
                        <h6>Mobile No<span className="error"> * </span></h6>
                        <input
                            type="text"
                            className="textbox"
                            value={personalDetails.generalInfo.mobileNumber}
                            onChange={event => handleInputChange('mobileNumber', event.target.value)}
                        />
                        <span className="error">{validation.mobileNumber}</span>
                    </div>
                </div>
                <div>
                    <h4>Present Address</h4>
                    <div className="row">
                        <div className="col-3">
                            <h6>Address Line 1<span className="error"> * </span></h6>
                            <input type="text" className="textbox"/>
                        </div>
                        <div className="col-3">
                            <h6>Address Line 2<span className="error"> * </span></h6>
                            <input type="text" className="textbox"/>
                        </div>
                        <div className="col-3">
                            <h6>Country<span className="error"> * </span></h6>
                            <select className="textbox">
                                <option>India</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <h6>State<span className="error"> * </span></h6>
                            <select className="textbox">
                                <option>Tamil Nadu</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <h6>City<span className="error"> * </span></h6>
                            <select className="textbox">
                                <option>Chennai</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <h6>Zip Code<span className="error"> * </span></h6>
                            <input type="number" className="textbox"/>
                        </div>
                        <div className="col-6">
                            <h6>
                                <input
                                    type="checkbox" className="checkbox"
                                    checked={personalDetails.generalInfo.presentAddress.sameAsPermanent}
                                    onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails,
                                        generalInfo: { ...prevDetails.generalInfo,
                                            presentAddress: { ...prevDetails.generalInfo.presentAddress,
                                                sameAsPermanent: event.target.checked }
                                        }
                                    }))
                                    }
                                />
                                Present address same as permanent address
                            </h6>
                        </div>
                    </div>
                </div>
                <h4>Permanent Address</h4>
                <div className="row">
                    <div className="col-3">
                        <h6>Address Line 1<span className="error"> * </span></h6>
                        <input type="text" className="textbox" />
                    </div>
                    <div className="col-3">
                        <h6>Address Line 2<span className="error"> * </span></h6>
                        <input type="text" className="textbox"/>
                    </div>
                    <div className="col-3">
                        <h6>Country<span className="error"> * </span></h6>
                        <select className="textbox">
                            <option>India</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <h6>State<span className="error"> * </span></h6>
                        <select className="textbox">
                            <option>Tamil Nadu</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h6>City<span className="error"> * </span></h6>
                        <select className="textbox">
                            <option>Chennai</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <h6>Zip Code<span className="error"> * </span></h6>
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
                            <td colSpan="5"><button className="addanother" onClick={handleAddMember}><IoMdAdd className="addIcon"/></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <h4>Hobbies & Membership</h4>
            <div className="row">
                <div className="col-4">
                    <div>Are you a member of any professional body</div>
                    <div className="radiospace col-6">
                        <div>
                            <input type="radio" name="professionalMember" id="yes" className="radiodesign" />
                            <h6 htmlFor="yes">Yes</h6>
                        </div>
                        <div>
                            <input type="radio" name="professionalMember" id="no" className="radiodesign"/>
                            <h6 htmlFor="no">No</h6>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <div>If yes, Name of the Professionial Body</div>
                    <textarea type="text" className="hobbie" placeholder="Name"/>
                </div>
                <div className="col-4">
                    <div>Hobbies & Interests</div>
                    <textarea
                        type="text"
                        className="hobbie"
                        placeholder="Name"
                        value={personalDetails.hobbies.professionalBodyName}
                        onChange={event =>
                            setPersonalDetails(prevDetails => ({ ...prevDetails,
                                hobbies: { ...prevDetails.hobbies, professionalBodyName: event.target.value }
                            }))
                        }
                    />
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
                            <td colSpan="3"><button className="addanother" onClick={handleAddEmployee}><IoMdAdd className="addIcon"/></button></td>
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
                            <td colSpan="4"><button className="addanother" onClick={handleAddRelation}><IoMdAdd className="addIcon"/></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <h4>Required Documents</h4>
            <div className="row">
                <div className="row">
                    <div className="col-4 ">
                        <h6>Aadhar<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            <input
                                type="file"
                                accept=".doc, .pdf, .img"
                                onChange={event => handleInputChange('aadhar', event.target.files[0])}
                            />
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted: doc, pdf & img</p>
                        <span className="error">{validation.aadhar}</span>
                    </div>
                    <div className="col-4 ">
                        <h6>PAN<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            <input
                                type="file"
                                accept=".doc, .pdf, .img"
                                onChange={event => handleInputChange('pan', event.target.files[0])}
                            />
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted: doc, pdf & img</p>
                        <span className="error">{validation.aadhar}</span>
                    </div>
                    <div className="col-4 ">
                        <h6>Driver License<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            <input
                                type="file"
                                accept=".doc, .pdf, .img"
                                onChange={event => handleInputChange('driverLicense', event.target.files[0])}
                            />
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted:doc,pdf & img</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 ">
                        <h6>Passport<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            <input
                                type="file"
                                accept=".doc, .pdf, .img"
                                onChange={event => handleInputChange('passport', event.target.files[0])}
                            />
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>Upload</p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted:doc,pdf & img</p>
                    </div>
                </div>
            </div>
            {draftSaved && <span className="draftSavedText"><TiTick className="icontick"/>draft Saved</span>}
            <button onClick={handleSave}>Save</button>  
        </div>
    );
};

PersonalInformation.propTypes = {
    onSave: propTypes.func.isRequired
};
  
export default PersonalInformation;
