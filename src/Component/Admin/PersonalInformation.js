/* eslint-disable max-len */
/* eslint-disable max-statements */
/* eslint no-magic-numbers: ["error", { "ignore": [0,1,2,3,4,5,6,7,8] }] */
import React, { useEffect, useState } from 'react';
import '../../Styles/personalInformation.css'
import propTypes from 'prop-types';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import { FaFilePdf } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
// import { convertToBase64 } from '../../Utils/Util'
const PersonalInformation = ({ setPersonalDetails,personalDetails, userId, genId, email }) => {

    const [ martialStatus, setMartialstatus ] = useState([])
    const [ gender, setGender ] = useState([])
    const [ bloodGroup, setBloodGroup ] = useState([])
    const [ fileName, setFileName ] = useState({
        aadhar: '',
        pan: '',
        driving_license: '',
        passport: ''
    })
    

    useEffect(() => {
        if (userId && email) {
            axios.get(`${Endpoint.API_ENDPOINT}/UserDetails/GetPersonalInfo?Id=${userId}&email=${email}`)
                .then(response => {
                    setPersonalDetails(response.data);
                })
                .catch(error => {
                    console.error('Error loading data:', error);
                });

            axios.get(`${Endpoint.API_ENDPOINT}/UserDetails/MartialStatus`)
                .then(response => {
                    setMartialstatus(response.data);
                })
                .catch(error => {
                    console.log('error', error)
                    setMartialstatus([])
                });

            axios.get(`${Endpoint.API_ENDPOINT}/UserDetails/Gender`)
                .then(response => {
                    setGender(response.data);
                })
                .catch(error => {
                    console.log('error', error)
                    setGender([])
                });

            axios.get(`${Endpoint.API_ENDPOINT}/UserDetails/BloodGroup`)
                .then(response => {
                    setBloodGroup(response.data);
                })
                .catch(error => {
                    console.log('error', error)
                    setBloodGroup([])
                });

        }
    }, [ userId, email ])

    useEffect(() => {
        if ((Object.keys(personalDetails).length === 0 || personalDetails?.result === null) && userId) {
            setPersonalDetails({
                result: {
                    loginId: Number(userId),
                    genId: genId,
                    generalVM: {
                        empname: '',
                        personal_Emailid: '',
                        contact_no: '',
                        dob: '',
                        nationality: '',
                        gender: '',
                        maritalStatus: '',
                        dateOfMarriage: '',
                        bloodGrp: '',
                        profile_Pic: ''
                    },
                    contact: [
                        {
                            address1: '',
                            address2: '',
                            country_Id: 0,
                            state_Id: 0,
                            city_Id: 0,
                            pincode: '',
                            addressType: 'present'
                        },
                        {
                            address1: '',
                            address2: '',
                            country_Id: 0,
                            state_Id: 0,
                            city_Id: 0,
                            pincode: '',
                            addressType: 'Permanent'
                        }
                    ],
                    families: [
                        {
                            relationship: '',
                            name: '',
                            dob: '',
                            occupation: '',
                            contact: ''
                        }
                    ],
                    hobby: {
                        professionalBody: null,
                        professionalBody_name: '',
                        hobbies: ''
                    },
                    colleagues: [
                        {
                            empid: '',
                            colleague_Name: '',
                            location: ''
                        }
                    ],
                    emergencies: [
                        {
                            relationship: '',
                            relation_name: '',
                            contact_number: '',
                            contact_address: ''
                        }
                    ],
                    requiredDocuments: {
                        aadhar: '',
                        pan: '',
                        driving_license: '',
                        passport: ''
                    }
                },
                id: 0,
                exception: null,
                status: 0,
                isCanceled: false,
                isCompleted: false,
                isCompletedSuccessfully: false,
                creationOptions: 0,
                asyncState: null,
                isFaulted: false
            })
        }

    }, [ personalDetails, userId ])

    const handleMembershipStatusChange = status => {
        setPersonalDetails({ ...personalDetails, result: { ...personalDetails.result, hobby: { ...personalDetails.result.hobby, professionalBody: status } } })
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

    const handleFileGettingInput = (field, file) => {

        setFileName({ ...fileName, [field]: file.name })
        
        convertToBase64(file, base64String => {
            setPersonalDetails({ ...personalDetails, result: { ...personalDetails.result, requiredDocuments: { ...personalDetails.result.requiredDocuments, [field]: base64String } } })
        })
    };
    
    const handleAddMember = () => {
        const newFamilyMember = {
            relationship: '',
            name: '',
            dob: '',
            occupation: '',
            contact: ''
        };
    
        const _newfamily = [ ...personalDetails.result.families, newFamilyMember ]

        setPersonalDetails({ ...personalDetails, result: { ...personalDetails.result, families: _newfamily } } )
        
    };
    
    const handleChange = (index, field, value) => {
        const updatedFamilies = personalDetails?.result?.families?.map((family, idx) => {
            if (index === idx) {
                return { ...family, [field]: value }
            } else {
                return { ...family }
            }
        })

        setPersonalDetails({ ...personalDetails, result: { ...personalDetails.result, families: updatedFamilies } })
    };
    
    const handleAddEmployee = () => {
        const newEmployee = { empid: '', colleague_Name: '', location: '' };

        const _employee =([ ...personalDetails.result.colleagues, newEmployee ])

        setPersonalDetails({ ...personalDetails, result: { ...personalDetails.result, colleagues: _employee } })
    };

    const handleEmployeeChange = (index, field, value) => {

        const updatedEmployee = personalDetails?.result?.colleagues?.map((emp, ind) => {
            if (index === ind) {
                return { ...emp, [field]: value }
            } else {
                return { ...emp }
            }
        })

        setPersonalDetails({ ...personalDetails, result: { ...personalDetails.result, colleagues: updatedEmployee } })
        

    };

    const handleAddEmergencies = () => {
        const newEmergencies = { relationship: 'Spouse/Partner', relation_name: '', contact_number: '', contact_address: '' };

        const _emergencies = ([ ...personalDetails.result.emergencies, newEmergencies ]);

        setPersonalDetails({ ...personalDetails, result: { ...personalDetails.result, emergencies: _emergencies } } )
    };

    const handleEmergenciesChange = (index, field, value) => {
        const updatedemergencies = personalDetails?.result?.emergencies?.map((contact, idx) => {
            if (index === idx) {
                return { ...contact, [field]: value }
            } else {
                return { ...contact }
            }
        })

        setPersonalDetails({ ...personalDetails, result: { ...personalDetails.result, emergencies: updatedemergencies } })

    };

    const handleProfilePic = (feild, file) => {
        convertToBase64(file, base64String => {
            setPersonalDetails({ ...personalDetails, result: { ...personalDetails.result, generalVM: { ...personalDetails.result.generalVM, profile_Pic: base64String } } });
        });
    };

    const convertToBase64 = (file, callback) => {
        const reader = new FileReader();

        reader.onload = event => {
            const result = event.target.result;

            const base64Data = result.split(',')[1]

            callback(base64Data);
        };
        reader.readAsDataURL(file);
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
                                onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, generalVM: { ...prevDetails?.result?.generalVM, empname: event.target.value } } }))}
                            />
                        </div>
                        <div className="col-4">
                            <h6>Date of Birth<span className="error"> * </span></h6>
                            <div>
                                <input type="date" className="textbox"
                                    value={personalDetails?.result?.generalVM?.dob || ''}
                                    onChange={event => setPersonalDetails(prevDetails => ({ ...prevDetails, result: { ...prevDetails?.result, generalVM: { ...prevDetails?.result?.generalVM, dob: event.target.value } } }))}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 htmlFor="nationality">nationality<span className="error"> * </span></h6>
                            <input type="text" className="textbox"
                                value={personalDetails?.result?.generalVM?.nationality || ''}
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
                                onChange={({ target: { value } }) => setPersonalDetails({ ...personalDetails, result: { ...personalDetails?.result, generalVM: { ...personalDetails?.result?.generalVM, gender: Number(value) } } })}
                            >
                                {gender?.length > 0 && gender.map(gen => {
                                    return <option key={gen.id} value={gen.id}> {gen.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-4">
                            <h6>Marital Status<span className="error"> * </span></h6>
                            <select
                                className="textbox"
                                value={personalDetails?.result?.generalVM?.maritalStatus || ''}
                                onChange={({ target: { value } }) => setPersonalDetails({ ...personalDetails, result: { ...personalDetails?.result, generalVM: { ...personalDetails?.result?.generalVM, maritalStatus: Number(value) } } })}
                            >
                                {martialStatus.length > 0 && martialStatus.map(status => {
                                    return <option key={status.id} value={status.id}> {status.name}</option>
                                })}
                            </select>
                        </div>

                        <div className="col-4">
                            <h6>Marriage Date (if applicable)</h6>
                            <input type="date" className="textbox" value={personalDetails?.result?.generalVM?.dateOfMarriage} onChange={({ target: { value } }) => setPersonalDetails({ ...personalDetails, result: { ...personalDetails?.result, generalVM: { ...personalDetails?.result?.generalVM, dateOfMarriage: value } } })} />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="col">
                        <h6>Profile Picture<span className="error"> * </span></h6>
                        {personalDetails && personalDetails?.result?.generalVM?.profile_Pic !== '' ? (
                            <img src={`data:image/jpeg;base64,${personalDetails?.result?.generalVM?.profile_Pic}`} alt="Profile" className="profile-picture" />

                        ) : (
                            <div className="profile_Pic-box typography">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={event => handleProfilePic('profile_Pic', event.target.files[0])}
                                
                                />
                                <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                                <p>Upload</p>
                                <p>You can drag and drop too</p>
                            </div>)}
                        {personalDetails?.result?.generalVM?.profile_Pic === '' && < p className="filetext">JPG, PNG or JPNG</p>}
                    </div>
                </div>
                <div className="col-3">
                    <h6>Blood Group<span className="error"> * </span></h6>
                    <select className="textbox"
                        value={personalDetails?.result?.generalVM?.bloodGrp || ''}
                        onChange={({ target: { value } }) => setPersonalDetails({ ...personalDetails, result: { ...personalDetails?.result, generalVM: { ...personalDetails?.result?.generalVM, bloodGrp: Number(value) } } })}
                    >
                        {bloodGroup.length > 0 && bloodGroup.map(group => {
                            return <option key={group.id} value={group.id}> {group.name}</option>
                        })}
                    </select>
                </div>
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
                            onChange={event => handleInputChange('contact_no', Number(event.target.value))}
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
                                    {index === 1 && <div className="col-6 mt-5">
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
                                            <span>Permanent address same as present address</span>
                                        </h6>
                                    </div>}
                                </div>
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
                        {personalDetails?.result?.families?.map((member, index) => (
                            <tr key={index}>
                                <th>{member.relationship || (index === 0 ? 'Father' : index === 1 ? 'Mother' : index === 2 ? 'Spouse' : 'Child')}</th>
                                <td><input type="text" className="textbox" placeholder="Name" value={member.name || ''} onChange={event => handleChange(index, 'name', event.target.value)}  /></td>                                
                                <td><input type="date" className="textbox" value={member.dob||''} onChange={event => handleChange(index, 'dob', event.target.value)} /></td>
                                <td><input type="text" className="textbox" placeholder="role" value={member.occupation|| ''} onChange={event => handleChange(index, 'occupation', event.target.value)} /></td>
                                <td><input type="number" className="textbox" placeholder="Number" value={member.contact|| ''} onChange={event => handleChange(index, 'contact', event.target.value)} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5"><button className="addanother" onClick={() => handleAddMember()}><IoMdAdd className="addIcon"/></button></td>
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
                                checked={personalDetails?.result?.hobby?.professionalBody}
                                onChange={() => handleMembershipStatusChange(true)} 
                            />                                                      
                            <h6 htmlFor="yes">Yes</h6>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                name="professionalMember" 
                                id="no" 
                                className="radiodesign"
                                checked={!personalDetails?.result?.hobby?.professionalBody}
                                onChange={() => handleMembershipStatusChange(false)} 
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
                        {personalDetails?.result?.colleagues?.map((employee, index) => {
                            return (
                                <tr key={index}>
                                    <td><input type="number" className="textbox2" placeholder="0000" value={employee.empid||''} onChange={event => handleEmployeeChange(index, 'empid', event.target.value)} /></td>
                                    <td><input type="text" className="textbox2" placeholder="Name" value={employee.colleague_Name||''} onChange={event=> handleEmployeeChange(index, 'colleague_Name', event.target.value)}  /></td>
                                    <td><input type="text" className="textbox2" placeholder="Eg. Chennai" value={employee.location||''} onChange={event=> handleEmployeeChange(index, 'location', event.target.value)}  /></td>
                                </tr>)
                        })}
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
                        {personalDetails?.result?.emergencies?.map((relation, index) => (
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
                            {personalDetails&& (personalDetails?.result?.requiredDocuments === null || !personalDetails?.result?.requiredDocuments?.aadhar || personalDetails?.result === null) ? (
                                <div>
                                    <input
                                        type="file"
                                        accept=".doc, .pdf, .img"
                                        onChange={event => handleFileGettingInput('aadhar', event.target.files[0])}
                                    />
                                    <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>                    
                                    <p>You can drag and drop too</p>
                                </div>
                            ) : (
                                <div className="inline">
                                    <a href={`data:application/pdf;base64,${personalDetails?.result?.requiredDocuments?.aadhar}`} download="aadhar.pdf">
                                        <FaFilePdf className="uploadedfile" />
                                    </a>
                                    <p>{fileName.aadhar}</p>
                                </div>
                            )
                            }
                        </div>

                        {personalDetails?.result?.requiredDocuments?.aadhar == '' && <p className="filetext">File Type Accepted: doc, pdf & img</p>}
                    </div>
                    <div className="col-4 ">
                        <h6>PAN<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            {personalDetails&&( personalDetails?.result?.requiredDocuments === null || !personalDetails?.result?.requiredDocuments?.pan || personalDetails?.result === null)? (
                                <div>
                                    <input
                                        type="file"
                                        accept=".doc, .pdf, .img"
                                        onChange={event => handleFileGettingInput('pan', event.target.files[0])}
                                    />
                                    <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                                    <p>You can drag and drop too</p>
                                </div>
                            )  : (
                                <div className="inline">
                                    <a href={`data:application/pdf;base64,${personalDetails?.result?.requiredDocuments?.pan}`} download="pan.pdf">
                                        <FaFilePdf className="uploadedfile" />
                                    </a>
                                    <p>{fileName.pan}</p>
                                </div>
                            )}
                        </div>
                        {personalDetails?.result?.requiredDocuments?.pan === '' && <p className="filetext">File Type Accepted: doc, pdf & img</p>}
                    </div>
                    <div className="col-4 ">
                        <h6>Driver License<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            {personalDetails && (personalDetails?.result?.requiredDocuments === null || !personalDetails?.result?.requiredDocuments?.driving_license || personalDetails?.result === null)? (
                                <div>
                                    <input
                                        type="file"
                                        accept=".doc, .pdf, .img"
                                        onChange={event => handleFileGettingInput('driving_license', event.target.files[0])}
                                    />
                                    <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                                    <p>Upload</p>
                                    <p>You can drag and drop too</p>
                                </div>
                            ) : (
                                <div className="inline">
                                    <a href={`data:application/pdf;base64,${personalDetails?.result?.requiredDocuments?.driving_license}`} download="driving_license.pdf">
                                        <FaFilePdf className="uploadedfile" />
                                    </a>
                                    <p>{fileName.driving_license}</p>
                                </div>
                            )}
                        </div>
                        {personalDetails?.result?.requiredDocuments?.driving_license && <p className="filetext">File Type Accepted:doc,pdf & img</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 ">
                        <h6>passport<span className="error"> * </span></h6>
                        <div className="doc-box typography">
                            {personalDetails &&(personalDetails?.result?.requiredDocuments === null || !personalDetails?.result?.requiredDocuments?.passport || personalDetails?.result === null) ?  (
                                <div>
                                    <input
                                        type="file"
                                        accept=".doc, .pdf, .img"
                                        onChange={event => handleFileGettingInput('passport', event.target.files[0])}
                                    />
                                    <p><LiaCloudUploadAltSolid className="uploadIcon"/></p>
                                    <p>Upload</p>
                                    <p>You can drag and drop too</p>
                                </div>
                            )  : (
                                <div className="inline">
                                    <a href={`data:application/pdf;base64,${personalDetails?.result?.requiredDocuments?.passport}`} download="passport.pdf">
                                        <FaFilePdf className="uploadedfile" />
                                    </a>
                                    <p>{fileName.passport}</p>
                                </div>
                            )}
                        </div>
                        {personalDetails?.result?.requiredDocuments?.passport === '' && <p className="filetext">File Type Accepted:doc,pdf & img</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

PersonalInformation.propTypes = {
    personalDetails: propTypes.object.isRequired,
    setPersonalDetails: propTypes.object.isRequired,
    userId: propTypes.number.isRequired,
    genId: propTypes.number.isRequired,
    email: propTypes.string.isRequired
};
export default PersonalInformation;
