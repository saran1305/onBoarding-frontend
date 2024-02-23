/* eslint-disable max-len */
/* eslint-disable max-statements */
/* eslint no-magic-numbers: ["error", { "ignore": [0,1,2,3,4,5,6,7,8] }] */
import React, { useEffect } from 'react';
import '../../Styles/personalInformation.css'
import propTypes from 'prop-types';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import { IoMdAdd } from 'react-icons/io';


const PersonalInformation = ({ personalinfo,setPersonalDetails,personalDetails }) => {
    useEffect(() => {
        if (personalinfo) {
            setPersonalDetails(personalinfo);
        }
    }, [personalinfo]);


    // const [ personalDetails, setPersonalDetails ] = useState({
    //     generalVM: {
    //         empname: '',
    //         dob: '',
    //         nationality: '',
    //         personal_Emailid: '',
    //         contact_no: '',
    //         gender: '',
    //         maritalStatus: '',
    //         dateOfMarriage: '',
    //         bloodGrp: '',
    //         contact: {
    //             address1: '',
    //             address2: '',
    //             country_Id: '',
    //             state_Id: '',
    //             city_Id: '',
    //             pincode: '',
    //             addressType: false
    //         },
    //         profile_Pic: null
    //     },
    //     families: [ 
    //         { relationship: 'Father', name: '', dob: '', occupation: '', contact: '' },
    //         { relationship: 'Mother', name: '', dob: '', occupation: '', contact: '' },
    //         { relationship: 'Spouse', name: '', dob: '', occupation: '', contact: '' },
    //         { relationship: 'Child 1', name: '', dob: '', occupation: '', contact: '' }],
    //     employees: [],
    //     hobby: {
    //         professionalBody: false,
    //         professionalBody_name: '',
    //         hobbies: ''
    //     },
    //     emergencies: [],
    //     requiredDocuments: {
    //         aadhar: '',
    //         pan: '',
    //         driving_license: '',
    //         passport: ''
    //     }
    // });

    const handleMembershipStatusChange = status => {
        setPersonalDetails(prevDetails => ({
            ...prevDetails, result: { ...prevDetails?.result, hobby: { ...prevDetails.result.hobby, hobbies: status } }
        }));
    };
    
    const handleAddressChange = (index, fieldName,type,value) => {
        const _contact = personalDetails?.result?.contact?.map((con, idx) => {
            if (idx === index) {
                return { ...con, [fieldName]: value }
            } else {
                return { ...con }
            }
        })

        const result = { ...personalDetails, result: { ...personalDetails.result, contact: _contact } }


        setPersonalDetails(result)
    };
    
    

    const handleInputChange = (field, value) => {
        const updatedDetails = { ...personalDetails };

        updatedDetails.result.generalVM[field] = value;
        setPersonalDetails(updatedDetails);
    };

    const handleFileGettingInput = (fieldName, file) => {
        
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            requiredDocuments: {
                ...prevDetails.requiredDocuments,
                [fieldName]: file
            }
        }));    
    };
    
    const { employees,emergencies } = personalDetails;

    // const setChildCount = newCount => {
    //     setPersonalDetails(prevDetails => ({
    //         ...prevDetails,
    //         childCount: newCount
    //     }));
    // };

    const setEmployees = updatedEmployees => {
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            employees: updatedEmployees
        }));
    };

    const setEmergencies = updatedEmergencies => {
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            emergencies: updatedEmergencies
        }));
    };

    const handleAddMember = () => {
        // const newChildCount = childCount + 1;
        const newFamilyMember = {
            relationship: '',
            name: '',
            dob: '',
            occupation: '',
            contact: ''
        };
    
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            families: [ ...prevDetails.families, newFamilyMember ]
        }));
        // setChildCount(newChildCount);
    };
    
    const handleChange = (index, field, value) => {
        const updatedFamilyMembers = [...personalDetails.result.families];

        updatedFamilyMembers[index][field] = value;
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            families: updatedFamilyMembers
        }));
    };
    
    const handleAddEmployee = () => {
        const newEmployee = { empid: '', colleague_Name: '', location: '' };

        setEmployees([ ...employees, newEmployee ]);
    };
    const handleEmployeeChange = (index, field, value) => {
        const updatedEmployees = [...employees];

        updatedEmployees[index][field] = value;
        setEmployees(updatedEmployees);
    };

    const handleAddEmergencies = () => {
        const newEmergencies = { relationship: 'Spouse/Partner', relation_name: '', contact_number: '', contact_address: '' };

        setEmergencies([ ...emergencies, newEmergencies ]);
    };

    const handleEmergenciesChange = (index, field, value) => {
        const updatedEmergencies = [...emergencies];

        updatedEmergencies[index][field] = value;
        setEmergencies(updatedEmergencies);
    };

    return (
        <div className="personalinfo">
            <h4>General Info</h4>
            <div className="generalVM row">
                <div className="col-9">
                    <div className="row">
                        <div className="col-4">
                            <h6>Full Name<span className="error"> * </span></h6>
                            <input
                                type="text"
                                className="textbox"
                                value={personalDetails?.result?.generalVM?.empname ||''}
                                // onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, generalVM: { ...prevDetails?.result?.generalVM, empname: event.target.value } }))}
                                onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, generalVM: { ...prevDetails?.result?.generalVM, empname: event.target.value } } }))}
                            />
                        </div>
                        <div className="col-4">
                            <h6>Date of Birth<span className="error"> * </span></h6>
                            <div>
                                <input type="date" className="textbox"
                                    value={personalDetails?.result?.generalVM?.dob|| ''}
                                    // onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, generalVM: { ...prevDetails.generalVM, dob: event.target.value } }))}
                                    onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, generalVM: { ...prevDetails?.result?.generalVM, dob: event.target.value } } }))}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 htmlFor="nationality">nationality<span className="error"> * </span></h6>
                            <input type="text" className="textbox"
                                value={personalDetails?.result?.generalVM?.nationality || ''}
                                // onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, generalVM: { ...prevDetails.generalVM, nationality: event.target.value } }))}
                                onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, generalVM: { ...prevDetails?.result?.generalVM, nationality: event.target.value } } }))}
                            />                        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <h6>gender<span className="error"> * </span></h6>
                            <select
                                className="textbox"
                                value={personalDetails?.result?.generalVM?.gender || ''}
                                onChange={event => {
                                    let genderValue;

                                    if (event.target.value === 'male') {
                                        genderValue = 1;
                                    } else if (event.target.value === 'female') {
                                        genderValue = 2;
                                    } else {
                                        genderValue = 3;
                                    }
                                    setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, generalVM: { ...prevDetails?.result?.generalVM, gender: genderValue } } }));
                                }}
                            >
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Other</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <h6>Marital Status<span className="error"> * </span></h6>
                            <select
                                className="textbox"
                                value={personalDetails?.result?.generalVM?.maritalStatus || ''}
                                onChange={event => {
                                    let statusValue;

                                    if (event.target.value === 'married') {
                                        statusValue = 1;
                                    } else if (event.target.value === 'unmarried') {
                                        statusValue = 2;
                                    } else if (event.target.value === 'divorced') {
                                        statusValue = 3;
                                    } else {
                                        statusValue = 0;
                                    }
                                    setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, generalVM: { ...prevDetails?.result?.generalVM, maritalStatus: statusValue } } }));
                                }}
                            >
                                <option value="1">Married</option>
                                <option value="2">Unmarried</option>
                                <option value="3">Divorced</option>
                            </select>
                        </div>

                        <div className="col-4">
                            <h6>Marriage Date (if applicable)</h6>
                            <input type="date" className="textbox" />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="col">
                        <h6>Profile Picture<span className="error"> * </span></h6>
                        <div className="profile_Pic-box typography">
                            <input
                                type="file"
                                accept=".doc, .pdf, .img"
                                onChange={event => handleFileGettingInput('profile_Pic', event.target.files[0])}
                                
                            />
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
                <select className="textbox"
                    value={personalDetails?.result?.generalVM?.bloodGrp || ''}
                    onChange={event => {
                        let bloodGroupValue;

                        if (event.target.value === 'O+') {
                            bloodGroupValue = 1;
                        } else if (event.target.value === 'A+') {
                            bloodGroupValue = 2;
                        } else if (event.target.value === 'B+') {
                            bloodGroupValue = 3;
                        } else if (event.target.value === 'AB+') {
                            bloodGroupValue = 4;
                        } else if (event.target.value === 'AB-') {
                            bloodGroupValue = 5;
                        } else if (event.target.value === 'A-') {
                            bloodGroupValue = 6;
                        } else if (event.target.value === 'B-') {
                            bloodGroupValue = 7;
                        } else if (event.target.value === 'O-') {
                            bloodGroupValue = 8;
                        } else {
                            bloodGroupValue = 0; 
                        }
                        setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, generalVM: { ...prevDetails?.result?.generalVM, bloodGrp: bloodGroupValue } } }));  }}>
                    <option value="1">O+</option>
                    <option value="2">A+</option>
                    <option value="3">B+</option>
                    <option value="4">AB+</option>
                    <option value="5">AB-</option>
                    <option value="6">A-</option>
                    <option value="7">B-</option>
                    <option value="8">O-</option>
                </select>
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
                            value={personalDetails?.result?.generalVM?.personal_Emailid || ''}
                            onChange={event => handleInputChange('personal_Emailid', event.target.value)}
                        />
                    </div>
                    <div className="col-3">
                        <h6>Mobile No<span className="error"> * </span></h6>
                        <input
                            type="text"
                            className="textbox"
                            value={personalDetails?.result?.generalVM?.contact_no || ''}
                            onChange={event => handleInputChange('contact_no', event.target.value)}
                        />
                    </div>
                </div>
                <div>
                    {personalDetails?.result?.contact?.map((contact, index) => (
                        <div key={index}>
                            <h4>{contact.addressType === 'Present' ? 'Present Address' : 'Permanent Address'}</h4> 
                            <div className="row">
                                <div className="col-3">
                                    <h6>Address Line 1<span className="error"> * </span></h6>
                                    <input
                                        type="text"
                                        className="textbox"
                                        value={contact?.address1 || ''}
                                        onChange={event => handleAddressChange(index, 'address1', contact.addressType,event.target.value)}
                                    />
                                </div>
                                <div className="col-3">
                                    <h6>Address Line 2<span className="error"> * </span></h6>
                                    <input
                                        type="text"
                                        className="textbox"
                                        value={contact?.address2 || ''}
                                        onChange={event => handleAddressChange(index, 'address2',contact.addressType, event.target.value)}
                                    /> 
                                </div>
                                <div className="col-3">
                                    <h6>Country<span className="error"> * </span></h6>
                                    <select
                                        className="textbox"
                                        value={contact?.country_Id || ''}
                                        onChange={event => handleAddressChange(index, 'country_Id',contact.addressType, event.target.value)}
                                    >
                                        <option>India</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <h6>State<span className="error"> * </span></h6>
                                    <select
                                        className="textbox"
                                        value={contact?.state_Id || ''}
                                        onChange={event => handleAddressChange(index, 'state_Id',contact.addressType, event.target.value)}
                                    >
                                        <option>Tamil Nadu</option>
                                    </select>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <h6>City<span className="error"> * </span></h6>
                                        <select
                                            className="textbox"
                                            value={contact?.city_Id || ''}
                                            onChange={event => handleAddressChange(index, 'city_Id', contact.addressType,event.target.value)}
                                        >
                                            <option>Chennai</option>
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <h6>Zip Code<span className="error"> * </span></h6>
                                        <input
                                            type="number"
                                            className="textbox"
                                            value={contact?.pincode || ''}
                                            onChange={event => handleAddressChange(index, 'pincode',contact.addressType, event.target.value)}
                                        />  
                                    </div>
                                    <div className="col-6">
                                        <h6>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                checked={contact.sameAsPermanent || ''}
                                                onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails,
                                                    result: { ...prevDetails.result,
                                                        contact: prevDetails.result.contact.map((item, idx) => idx === index ? { ...item, sameAsPermanent: event.target.checked } : item)
                                                    }
                                                }))}
                                            />
                                            Present address same as permanent address
                                        </h6>
                                    </div>
                                </div>
                                {/* <div>
                                    <h4>Permanent Address</h4>
                                    <div className="row">
                                        <div className="col-3">
                                            <h6>Address Line 1<span className="error"> * </span></h6>
                                            <input
                                                type="text"
                                                className="textbox"
                                                value={contact?.address1 || ''}
                                                onChange={event => handleAddressChange(index, 'address1','permanent', event.target.value)}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <h6>Address Line 2<span className="error"> * </span></h6>
                                            <input
                                                type="text"
                                                className="textbox"
                                                value={contact?.address2 || ''}
                                                onChange={event => handleAddressChange(index, 'address2','permanent', event.target.value)}
                                            /> 
                                        </div>
                                        <div className="col-3">
                                            <h6>Country<span className="error"> * </span></h6>
                                            <select
                                                className="textbox"
                                                value={contact?.country_Id || ''}
                                                onChange={event => handleAddressChange(index, 'country_Id','permanent', event.target.value)}
                                            >
                                                <option>India</option>
                                            </select>
                                        </div>
                                        <div className="col-3">
                                            <h6>State<span className="error"> * </span></h6>
                                            <select
                                                className="textbox"
                                                value={contact?.state_Id || ''}
                                                onChange={event => handleAddressChange(index, 'state_Id','permanent', event.target.value)}
                                            >
                                                <option>Tamil Nadu</option>
                                            </select>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">
                                                <h6>City<span className="error"> * </span></h6>
                                                <select
                                                    className="textbox"
                                                    value={contact?.city_Id || ''}
                                                    onChange={event => handleAddressChange(index, 'city_Id','permanent', event.target.value)}
                                                >
                                                    <option>Chennai</option>
                                                </select>
                                            </div>
                                            <div className="col-3">
                                                <h6>Zip Code<span className="error"> * </span></h6>
                                                <input
                                                    type="number"
                                                    className="textbox"
                                                    value={contact?.pincode || ''}
                                                    onChange={event => handleAddressChange(index, 'pincode','permanent', event.target.value)}
                                                />  
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>

                <hr />
            </div>
            <h4>Family details</h4>
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
                        {personalDetails?.result?.families.map((member, index) => (
                            <tr key={index}>
                                <th>{member.relationship || (index === 0 ? 'Father' : index === 1 ? 'Mother' : index === 2 ? 'Spouse' : `Child ${index - 2}`)}</th>
                                <td><input type="text" className="textbox" placeholder="Name" value={member.name || ''} onChange={event => handleChange(index, 'name', event.target.value)}  /></td>                                
                                <td><input type="date" className="textbox" value={member.dob||''} onChange={event => handleChange(index, 'dob', event.target.value)} /></td>
                                <td><input type="text" className="textbox" placeholder="role" value={member.occupation|| ''} onChange={event => handleChange(index, 'occupation', event.target.value)} /></td>
                                <td><input type="number" className="textbox" placeholder="Number" value={member.contact|| ''} onChange={event => handleChange(index, 'contact', event.target.value)} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5"><button className="addanother" onClick={handleAddMember}><IoMdAdd className="addIcon"/></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <h4>hobbies & Membership</h4>
            <div className="row">
                <div className="col-4">
                    <div>Are you a member of any professional body</div>
                    <div className="radiospace col-6">
                        <div>
                            <input 
                                type="radio" 
                                name="professionalMember" 
                                id="yes" 
                                className="radiodesign"
                                checked={personalDetails?.result?.hobby?.professionalBody === 'yes'}
                                onChange={() => handleMembershipStatusChange('yes')} 
                            />                                                      
                            <h6 htmlFor="yes">Yes</h6>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                name="professionalMember" 
                                id="no" 
                                className="radiodesign"
                                checked={personalDetails?.result?.hobby?.professionalBody === 'no'}
                                onChange={() => handleMembershipStatusChange('no')} 
                            />
                            <h6 htmlFor="no">No</h6>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <div>If yes, Name of the Professionial Body</div>
                    <textarea 
                        type="text" 
                        className="hobbie"
                        placeholder="Name"
                        value={personalDetails?.result?.hobby?.professionalBody_name||''}
                        onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, hobby: { ...prevDetails?.result?.hobby, professionalBody_name: event.target.value } } }))}
                    />
                </div>
                <div className="col-4">
                    <div>hobbies & Interests</div>
                    <textarea
                        type="text"
                        className="hobbie"
                        placeholder="Name"
                        value={personalDetails?.result?.hobby?.hobbies||''}
                        onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, hobby: { ...prevDetails?.result?.hobby,hobbies: event.target.value } } }))}
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
                        {personalDetails?.result?.colleagues?.map((employee, index) => (
                            <tr key={index}>
                                <td><input type="number" className="textbox2" placeholder="0000" value={employee.empid||''} onChange={event => handleEmployeeChange(index, 'empid', event.target.value)} /></td>
                                <td><input type="text" className="textbox2" placeholder="Name" value={employee.colleague_Name||''} onChange={event=> handleEmployeeChange(index, 'colleague_Name', event.target.value)}  /></td>
                                <td><input type="text" className="textbox2" placeholder="Eg. Chennai" value={employee.location||''} onChange={event=> handleEmployeeChange(index, 'location', event.target.value)}  /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3"><button className="addanother" onClick={handleAddEmployee} ><IoMdAdd className="addIcon"/></button></td>
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
                        {personalDetails?.result?.emergencies.map((relation, index) => (
                            <tr key={index}>
                                <td>
                                    <select className="textbox" value={relation.relationship||''} onChange={event => handleEmergenciesChange(index, 'relationship', event.target.value)}>
                                        <option>Spouse/Partner</option>
                                        <option>Father</option>
                                        <option>Mother</option>
                                        <option>Siblings</option>
                                        <option>Guardian</option>
                                    </select>
                                </td>
                                <td><input type="text" className="textbox" placeholder="Name" value={relation.relation_name||''}onChange={event => handleEmergenciesChange(index, 'relation_name', event.target.value)} /></td>
                                <td><input type="number" className="textbox" placeholder="Mobile No." value={relation.contact_number||''}onChange={event => handleEmergenciesChange(index, 'contact_number', event.target.value)} /></td>
                                <td><input type="text" className="textbox" placeholder="Eg. Chennai" value={relation.contact_address||''} onChange={event => handleEmergenciesChange(index, 'contact_address', event.target.value)} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4"><button className="addanother" onClick={handleAddEmergencies}><IoMdAdd className="addIcon"/></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <h4>Required Documents</h4>
            <div className="row">
                <div className="row">
                    <div className="col-4 ">
                        <h6>aadhar<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            <input
                                type="file"
                                accept=".doc, .pdf, .img"
                                onChange={event => handleFileGettingInput('aadhar', event.target.files[0])}
                            />
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted: doc, pdf & img</p>
                    </div>
                    <div className="col-4 ">
                        <h6>PAN<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            <input
                                type="file"
                                accept=".doc, .pdf, .img"
                                onChange={event => handleFileGettingInput('pan', event.target.files[0])}
                            />
                            <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                            <p>You can drag and drop too</p>
                        </div>
                        <p className="filetext">File Type Accepted: doc, pdf & img</p>
                    </div>
                    <div className="col-4 ">
                        <h6>Driver License<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            <input
                                type="file"
                                accept=".doc, .pdf, .img"
                                onChange={event => handleFileGettingInput('driving_license', event.target.files[0])}
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
                        <h6>passport<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            <input
                                type="file"
                                accept=".doc, .pdf, .img"
                                onChange={event => handleFileGettingInput('passport', event.target.files[0])}
                            />
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

PersonalInformation.propTypes = {
    personalinfo: propTypes.object.isRequired,
    personalDetails: propTypes.object.isRequired,
    setPersonalDetails: propTypes.object.isRequired
};
export default PersonalInformation;
