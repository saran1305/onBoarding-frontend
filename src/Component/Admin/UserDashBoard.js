import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnclickOnboarding from '../../Assets/OnclickOnboarding.png';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import '../../Styles/userDashBoard.css';
const UserDashBoard = () => {

    const [ status, setStatus ] = useState('');
    const navigate = useNavigate();
    
    const handleNav = () => {
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

    return (
        <div className="userDashBoard">
            <button className="card" onClick={handleNav}>
                <img className="outerlayout" src={OnclickOnboarding} alt="Formimage" />
                <br />
                <p className="textalign">Onboarding Form</p>    
                {status === 'Submitted' && (
                    <div className="innerlayout">
                        <p className="insidelayout">!</p>
                    </div>
                )}
                {status === 'Confirmed' && (
                    <div className="innerlayout">
                        <p className="insidelayout2">&#10003;</p>
                    </div>
                )}
                {status === 'Rejected' && (
                    <div className="innerlayout">
                        <p className="insidelayout3">&#10060;</p>
                    </div>
                )}     
            </button> 
        </div>
    )
}

export default UserDashBoard