import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnclickOnboarding from '../../Assets/OnclickOnboarding.png';
import '../../Styles/userDashBoard.css';

const UserDashBoard = () => {
    const navigate = useNavigate();

    const handleNav = () => {
        navigate('/admin/user-onboardings');
    };

    return (
        <div className="userDashBoard">
            <button className="card" onClick={handleNav}>
                <img className="outerlayout" src={OnclickOnboarding} alt="Formimage" />
                <br />
                <p>Onboarding Form</p>    
                <div className="innerlayout">
                    <p className="insidelayout">!</p>
                </div>       
            </button>
            
        </div>
    )
}

export default UserDashBoard