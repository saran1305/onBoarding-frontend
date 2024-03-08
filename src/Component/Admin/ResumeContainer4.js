import React from 'react';
import { useEffect, useState } from 'react';
import '../../Styles/userdetails.css';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import { useLocation } from 'react-router-dom';

const Container4 = () => {
    const [ containerData, setContainerData ] = useState('')
    const [ BankDetails, setBankDetails ] = useState('')
    const [ proofSubmitted, setproofSubmitted ] = useState('')
    const location = useLocation();
    const [genId] = useState(location.state.genId);

    const GetPersonalInfo = ()=>{axios.get(Endpoint.API_ENDPOINT+'/UserDetails/GetPersonalInfo/'+genId).then(res=>{setContainerData(res.data.result)})}
    const GetBankBetails = ()=>{axios.get(Endpoint.API_ENDPOINT+'/User/get-existing-bank/'+genId)
        .then(res=>{setBankDetails(res.data) 
            let proof=[]

            BankDetails?.proofSubmitted?.map(el=>(
                proof.push(el)
            ))
            setproofSubmitted(proof)
        })}
        


    useEffect(() => {
        GetPersonalInfo();
        GetBankBetails()
    }, []);

    return (
        <div className="container4">
            <div><img src={IdeassionLogo} alt="Ideassion Image" className="ideaimage"/></div>
            <div>
                <h6>Existing Bank Account</h6>
                <table className="table">
                    <thead> 
                        <tr>
                            <th style={{ width:'50%' }}>Details</th>
                            <th style={{ width:'50%' }}>Inputs</th>
                        </tr>
                    </thead>
                    <tr>
                        <th>Name as on Bank Account</th>
                        <td>{BankDetails?.account_name}</td>
                    </tr>
                    <tr>
                        <th>Bank Name</th>
                        <td>{BankDetails?.bank_name}</td>
                    </tr>
                    <tr>
                        <th>Bank Branch Location</th>
                        <td>{BankDetails?.bank_Branch}</td>
                    </tr>
                    <tr>
                        <th>Bank Account No.</th>
                        <td>{BankDetails?.account_number}</td>
                    </tr>
                    <tr>
                        <th>Bank-IFSC Code</th>
                        <td>{BankDetails?.ifsC_code}</td>
                    </tr>
                    <tr>
                        <th>Joint Account</th>
                        <td> {BankDetails?.joint_Account ? 'yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <th>Proof Submitted(To be updated by HR)</th>
                        <td>{proofSubmitted}</td>
                    </tr>
                </table>
            </div>  
            <div>
                <h6>Emergency Contact Details</h6>
                <table className="table">
                    <thead>
                        <th>Details</th>
                        <th>Contact 1</th>
                        <th>Contact 2</th>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{containerData?.emergencies?.length > 0 ? containerData.emergencies[0].relation_name : ''}</td>
                            <td>{containerData?.emergencies?.length > 1 ? containerData.emergencies[1].relation_name : ''}</td>
                        </tr>
                        <tr>
                            <th>Relationship</th>
                            <td>{containerData?.emergencies?.length > 0 ? containerData.emergencies[0].relationship : ''}</td>
                            <td>{containerData?.emergencies?.length > 1 ? containerData.emergencies[1].relationship : ''}</td>
                        </tr>
                        <tr>
                            <th>Contact Number</th>
                            <td>{containerData?.emergencies?.length > 0 ? containerData.emergencies[0].contact_number : ''}</td>
                            <td>{containerData?.emergencies?.length > 1 ? containerData.emergencies[1].contact_number : ''}</td>
                        </tr>
                        <tr>
                            <th>Conntact Address</th>
                            <td>{containerData?.emergencies?.length > 0 ? containerData.emergencies[0].contact_address : ''}</td>
                            <td>{containerData?.emergencies?.length > 1 ? containerData.emergencies[1].contact_address : ''}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h6>Self-Declaration</h6>
                <ol>
                    <li>I hereby declare that the above information provided by me is true to my knowledge.</li>
                    <li>I hereby declare that in future if there is any change in the provided information, I will take full responsibility to update HR and to change the necessary records.</li>
                    <li>I hereby understand and authorize the company to do background verification on me directly by the company or by employing any third party verification agency.</li>
                </ol>
            </div>
            <br/>
            <br/>
            <div className="line">
                <div>
                    <hr />
                    <h6>Name</h6>
                </div>
                <div>
                    <hr />
                    <h6>Date</h6>
                </div>
                <div>
                    <hr />
                    <h6>Signature</h6>
                </div>
            </div>
        
            <div className="text">
                <p>Page 4 of 4</p>
            </div>
        </div>
    );
};

export default Container4;
