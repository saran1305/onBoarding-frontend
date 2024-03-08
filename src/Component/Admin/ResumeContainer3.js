import React from 'react';
import { useEffect, useState } from 'react';
import '../../Styles/userdetails.css';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';


const Container3 = () => {
    const location = useLocation();
    const [genId] = useState(location.state.genId);
    const [ containerData, setContainerData ] = useState('')
    const [ Certification, setCertification ] = useState([])

    const GetPersonalInfo = ()=>{axios.get(Endpoint.API_ENDPOINT+'/UserDetails/GetPersonalInfo/'+genId).then(res=>{setContainerData(res.data.result)})}
    const GetCertification = ()=>{axios.get(Endpoint.API_ENDPOINT+'/User/get-certificate/'+genId).then(res=>{setCertification(res.data)})}


    useEffect(() => {
        GetPersonalInfo()
        GetCertification()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container3">
            <div><img src={IdeassionLogo} alt="Ideassion Image" className="ideaimage"/></div>
            <div>
                <h6>Hobbies and Membership</h6>
                <table className="table hobbies">
                    <thead >
                        <tr>
                            <th>Details</th>
                            <th colSpan="2">Inputs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Are you a member of any professional body?</td>
                            <td colSpan="2">{containerData?.hobby?.professionalBody ? 'yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td>Hobbies and interests</td>
                            <td colSpan="2">{containerData?.hobby?.hobbies}</td>
                        </tr> 
                        <tr>
                            <td rowSpan="3">Is any of your friends working/worked with Ideassion?</td>
                            <th style={{ width:'fit-content', padding:'10px 20px' }}>Emp ID</th>
                            <td>{containerData?.colleagues?.length > 0 ? containerData.colleagues[0].empid : ''}</td>
                        </tr>
                        <tr>
                            <th style={{ width:'fit-content', padding:'10px 20px' }}>Name</th>
                            <td>{containerData?.colleagues?.length > 0 ? containerData.colleagues[0].colleague_Name : ''}</td>
                        </tr>
                        <tr>
                            <th style={{ width:'fit-content', padding:'10px 20px' }}>Location</th>
                            <td>{containerData?.colleagues?.length > 0 ? containerData.colleagues[0].location : ''}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h6>Certifications</h6>
                <table className="table certifications">
                    <tr>
                        <th>Details</th>
                        <th colSpan="2">Inputs</th>
                    </tr>
                    <tr>
                        <td>Have you completed any professional certifications?</td>
                        <td colSpan="2">{Certification.length > 0 ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td rowSpan="10">If yes, Kindly list the details-</td>
                    </tr>
                    {Certification.length > 0 && Certification.map((el, index)=>(
                        <tr key={index}>
                            <th>Name of Certification</th>
                            <td>{el.certificate_name}</td>
                        </tr>
                    ))}
                    {Certification.length > 0 && Certification.map((el, index)=>(
                        <tr key={index}>
                            <th>Issuing Authority</th>
                            <td>{el.issued_by}</td>
                        </tr>
                    ))}
                    {Certification.length > 0 && Certification.map((el, index)=>(
                        <tr key={index}>
                            <th>Valid Till</th>
                            <td>{el.valid_till}</td>
                        </tr>
                    ))}
                </table>
            </div>  
            <div className="text">
                <p>Page 3 of 4</p>
            </div>
        </div>
    );
};

export default Container3;
