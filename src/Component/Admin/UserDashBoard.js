import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnclickOnboarding from '../../Assets/OnclickOnboarding.png';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import '../../Styles/userDashBoard.css';
const UserDashBoard = () => {

    const [ status, setStatus ] = useState([]);
    const navigate = useNavigate();

    const handleNav = item => {
        window.localStorage.setItem('dashboardUserDetail', JSON.stringify(item));
        navigate('/admin/user-onboardings');
    };
    
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userId = userData?.empId;
    
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${Endpoint.API_ENDPOINT}/UserDetails/GetStatusByLoginId/${userId}`);

                setStatus(response.data);
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };
    
        if (userId) {
            fetchStatus();
        }
    }, []);

    const handleOnboardingForm = () => {
        if (status.length > 0) {
            return status.map((item, index) => {
                return (
                    <div className="userDashBoard" key={index}>
                        <button className="card" onClick={() => handleNav(item)}>
                            <img className="outerlayout" src={OnclickOnboarding} alt="Formimage" />
                            <br />
                            <p className="textalign">Onboarding Form {index + 1}</p>    
                            {item.status === 'Submitted' && (
                                <div className="innerlayout">
                                    <p className="insidelayout">!</p>
                                </div>
                            )}
                            {item.status === 'Confirmed' && (
                                <div className="innerlayout">
                                    <p className="insidelayout2">&#10003;</p>
                                </div>
                            )}
                            {item.status === 'Rejected' && (
                                <div className="innerlayout">
                                    <p className="insidelayout3">&#10060;</p>
                                </div>
                            )}     
                        </button> 
                    </div>
                )
            })
        } else {
            return (
                <div className="userDashBoard">
                    <button className="card" onClick={handleNav}>
                        <img className="outerlayout" src={OnclickOnboarding} alt="Formimage" />
                        <br />
                        <p className="textalign">Onboarding Form</p>    
                    </button> 
                </div>
            )
        }
    }   


    return (
        handleOnboardingForm()
    )
}

export default UserDashBoard