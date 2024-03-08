/* eslint-disable no-magic-numbers */
import React from 'react';
import { useEffect, useState } from 'react';
import '../../Styles/userdetails.css';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';
import * as Endpoint from '../../Entities/Endpoint';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Container1 = () => {

    const location = useLocation();
    const [genId] = useState(location.state.genId);
    const [ containerData, setContainerData ] = useState('')
    const [ educationData, setEducationData ] = useState([])
    const [ maritualStatus, setMaritualStatus ] = useState('')
    const [ PermanentAdd, setPermanentAdd ] = useState('')
    const [ PresentAdd, setPresentAdd ] = useState('')

    const GetPersonalInfo = ()=>{
        axios.get(Endpoint.API_ENDPOINT+'/UserDetails/GetPersonalInfo/'+genId)
            .then(res=>{
                setContainerData(res.data.result)
                setMaritualStatus(res.data.result.generalVM.maritalStatus)
                res.data.result.contact.map( el=>(
                    el.addressType === 'Present' && setPresentAdd(el.address1+', '+el.address2+', '+el.address1+', '+el.pincode),
                    el.addressType === 'Permanent' && setPermanentAdd(el.address1+', '+el.address2+', '+el.address1+', '+el.pincode) 
                ))
            })}
    const geteducation = ()=>{
        axios.get(Endpoint.API_ENDPOINT+'/User/get-education/'+genId)
            .then(res=>{
                setEducationData(res.data)
            })}

    useEffect(() => {
        GetPersonalInfo()
        geteducation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="container1">
            <div><img src={IdeassionLogo} alt="Ideassion Image" className="ideaimage"/></div>

            <div className="tableone">
                <div>
                    <table className="table custom-table table-align">
                        <tbody>
                            <tr>
                                <th>Full Name</th>
                                <td>{containerData?.generalVM?.empname}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table custom-table table-align">
                        <tbody> 
                            <tr>
                                <th>Date of birth</th>
                                <td>{containerData?.generalVM?.dob}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table  className="photo">
                        <tbody>
                            <tr>
                                <td style={{ padding:'5px' }}><img style={{ height:'140px', width:'120px' }} src={'data:image/webp;base64,'+containerData?.generalVM?.profile_Pic}></img></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <table className="table custom-table table-align">
                    <tbody>
                        <tr>
                            <th>Nationality</th>
                            <td>{containerData?.generalVM?.nationality}</td>
                            <th>Gender</th>
                            <td>{containerData?.generalVM?.gender == 1 ? 'Male' : containerData?.generalVM?.gender == 2 ? 'Female' : 'Others'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table className="table custom-table table-align">
                    <tbody>
                        <tr>
                            <th>Marital Status</th>
                            <td>{maritualStatus === 1 ? 'Married' : maritualStatus === 2 ? 'UnMarried' : maritualStatus === 3 && 'Divorced' }</td>
                            <th>Marriage Date</th>
                            <td>{containerData?.generalVM?.dateOfMarriage} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h6>Contact Details</h6>
            <div>
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th >Present Address: </th>
                            <td >{PresentAdd}</td>
                            <th >Permanent Address: </th>
                            <td >{PermanentAdd}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <th>Mobile No: </th>
                            <td>{containerData?.generalVM?.contact_no}</td> 

                            <th>Email ID: </th>
                            <td>{containerData?.generalVM?.personal_Emailid}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div>
                    <h6>Education Details</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Qualification</th>
                                <th>Specialization</th>
                                <th>Year of Passing</th>
                                <th>Grade</th>
                                <th>School / University</th>
                            </tr>
                        </thead>
                        <tbody>
                            { educationData?.map((el, index) => (
                                <tr key={index}>
                                    <td>{el?.qualification}</td>
                                    <td>{el?.specialization}</td>
                                    <td>{el?.passoutyear}</td>
                                    <td>{el?.percentage}</td>
                                    <td>{el?.university}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text">
                        <p>Page 1 of 4</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
                
export default Container1;
