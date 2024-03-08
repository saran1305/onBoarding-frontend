import React from 'react';
import { useEffect, useState } from 'react';
import '../../Styles/userdetails.css';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import { useLocation } from 'react-router-dom';


const Container2 = () => {

    const [ ExperienceData, setExperienceData ] = useState([]);
    const [ healthData, setHealthData ] = useState('');
    const [ containerData, setContainerData ] = useState('')
    const location = useLocation();
    const [genId] = useState(location.state.genId);



    const Getexperience = ()=>{axios.get(Endpoint.API_ENDPOINT+'/User/get-experience/'+genId).then(res=>{setExperienceData(res.data)})}
    const GetHealth = ()=>{axios.get(Endpoint.API_ENDPOINT+'/User/get-health/'+genId).then(res=>{setHealthData(res.data)})}
    const GetPersonalInfo = ()=>{
        axios.get(Endpoint.API_ENDPOINT+'/UserDetails/GetPersonalInfo/'+genId)
            .then(res=>{
                setContainerData(res.data.result)
            })}

     
    useEffect(() => {
        GetPersonalInfo()
        Getexperience()
        GetHealth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <div className="container2">
            <div><img src={IdeassionLogo} alt="Ideassion Image" className="ideaimage"/></div>
            <div>
                <h6>Professional Experience</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name of Company</th>
                            <th>Designation</th>
                            <th>Duration (From - To)</th>
                            <th>Location</th>
                            <th>Reason for Leaving</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ExperienceData.map((el, index) => (
                            <tr key={index}>
                                <td>{el.company_name}</td>
                                <td>{el.designation}</td>
                                <td>{el.startDate + ' - '+ el.endDate}</td>
                                <td>{el.location}</td>
                                <td>{el.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h6>Family Details</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Relationship</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Occupation</th>
                            <th>Contact No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {containerData?.families?.map((el, index)=>(
                            <tr key={index}>
                                <td>{el.relationship}</td>
                                <td>{el.name}</td>
                                <td>{el.dob}</td>
                                <td>{el.occupation}</td>
                                <td>{el.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h6>Health Condition</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Health Status</th>
                            <th>Inputs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Is there any specific health condition that you may need to inform us? </td>
                            <td>{healthData.specific_health_condition}</td>
                        </tr>
                        <tr>
                            <td>Allergies to?</td>
                            <td>{healthData.allergies}</td>
                        </tr>
                        <tr>
                            <td>Have you undergone any recent major/minor surgery?</td>
                            <td>{healthData.surgery? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td>Would your health condition permit you to work in rotational/night shifts</td>
                            <td>{healthData.night_shifts? 'Yes' : 'No'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="text">
                <p>Page 2 of 4</p>
            </div>
        </div>
    );
};
                
export default Container2;
