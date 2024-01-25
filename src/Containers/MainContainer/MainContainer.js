import React from 'react';
import { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import '../../Styles/common.css'
import * as Endpoint from '../../Entities/Endpoint';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';
import { TbUserSquareRounded } from 'react-icons/tb';
import { IoIosPeople } from 'react-icons/io';
import { FaWpforms } from 'react-icons/fa' ;
import { FiHome } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { TiBell } from 'react-icons/ti';
import { BsChatSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import * as RoutePath from '../../Entities/RoutePath'
import * as MainContainerTypes from '../../Entities/MainContainerTypes'
import { ToastContainer } from 'react-toastify';

const MainContainer =  ({ Children }) => {  
    const [ userDetail, setUserDetail ] = useState([])
    const [ activeNavOption, setActiveNavOption ] = useState(MainContainerTypes.HOME_TYPE);
    const Navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            
            const response = await fetch(`${Endpoint.API_ENDPOINT}/userDetails`);
            const data = await response.json();

            setUserDetail(data);

        };

        fetchData();
    }, []);

    const getFirstLetter = str => {
        return str.charAt(0).toUpperCase();
    }

    const handleClickNavOptions = selectedNavOption => {
        setActiveNavOption(selectedNavOption);

        if (selectedNavOption === MainContainerTypes.ON_BOARDERS_TYPE) {
            Navigate(MainContainerTypes.ADMIN_ROUTE + RoutePath.ON_BOARDERS.URI);
        } else if (selectedNavOption === MainContainerTypes.TOTAL_USERS_TYPE) {
            Navigate(MainContainerTypes.ADMIN_ROUTE + RoutePath.TOTAL_USERS.URI);
        } else if (selectedNavOption === MainContainerTypes.HOME_TYPE) {
            Navigate(MainContainerTypes.ADMIN_ROUTE + RoutePath.HOME.URI);
        } else if (selectedNavOption === MainContainerTypes.USER_ONBOARDINGS_TYPE) {
            Navigate(MainContainerTypes.ADMIN_ROUTE + RoutePath.USER_ONBOARDINGS.URI);
        }
    };
    const handleLogout = () => {
        Navigate('/login');
    };


    return (
        <div className="main-container">
            <div className="navbar">
                <div>
                    <img src={IdeassionLogo} alt="Ideassion Image" className="ideaImage"/>
                    <div className="navbarTwo">
                        <div className={`nav-item ${activeNavOption === MainContainerTypes.ON_BOARDERS_TYPE ? 'active' : ''}`} 
                            onClick={() => handleClickNavOptions(MainContainerTypes.ON_BOARDERS_TYPE)}>
                            <p className="navIconLayout"><TbUserSquareRounded className="navIcon"/></p>
                            <p className="para">Onboarders</p>
                        </div>                        
                        <div className={`nav-item ${activeNavOption === MainContainerTypes.TOTAL_USERS_TYPE ? 'active' : ''}`}
                            onClick={() => handleClickNavOptions(MainContainerTypes.TOTAL_USERS_TYPE)}>
                            <p className="navIconLayout"><IoIosPeople className="navIcon"/></p>
                            <p className="para">TotalUsers</p>
                        </div>
                        <div className={`nav-item ${activeNavOption === MainContainerTypes.HOME_TYPE ? 'active' : ''}`} 
                            onClick={() => handleClickNavOptions(MainContainerTypes.HOME_TYPE)}>
                            <p className="navIconLayout"><FiHome className="navIcon" /></p>
                            <p className="para">Home</p>
                        </div>
                        <div className={`nav-item ${activeNavOption === MainContainerTypes.USER_ONBOARDINGS_TYPE ? 'active' : ''}`} 
                            onClick={() => handleClickNavOptions(MainContainerTypes.USER_ONBOARDINGS_TYPE)}>
                            <p className="navIconLayout"><FaWpforms className="navIcon" /></p>
                            <p className="para">Onboardings</p>
                        </div>
                    </div>
                </div>
                <div className="navBottom">
                    <div className="navBottomOne">
                        <div className="nav-item" onClick={() => handleClickNavOptions(MainContainerTypes.MESSAGES_TYPE)}>  <p className="navIconLayout"> <BsChatSquare className="navIcon" /></p> 
                            <p className="para">Messages</p> 
                            <p className="notification" style={{ marginLeft: '38px' }}>2</p> 
                        </div>
                        <div className="nav-item" onClick={() => handleClickNavOptions(MainContainerTypes.NOTIFICATIONS_TYPE)}>  <p className="navIconLayout"> <TiBell className="navIcon"  /></p> 
                            <p className="para">Notifications</p> 
                            <p className="notification" style={{ marginLeft: '15px' }}>2</p> 
                        </div>
                        <div className="nav-item" onClick={() => (handleClickNavOptions)(MainContainerTypes.SETTINGS_TYPE)}>  <p className="navIconLayout"> <IoSettingsOutline className="navIcon"/></p>
                            <p className="para">Settings</p> 
                        </div>
                        <div className="nav-item" onClick={() => handleLogout(MainContainerTypes.LOGOUT_TYPE)}>  <p className="navIconLayout"> <RiLogoutCircleLine className="navIcon"/></p> 
                            <p className="para">Logout</p> 
                        </div>
                    </div>
                    <div>
                        {userDetail.map(user => (
                            <div key={user.userId} className="navBottomTwo">
                                <div className="mailLogoLayout"><p className="mailLogo">
                                    {getFirstLetter(user.user)}
                                </p></div>
                                <div className="mailName">
                                    <p>{user.user}</p>
                                    <p style={{ color: '#71839B' }}>{user.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                style={{ minWidth: '300px', zIndex: 9999 }}
            />
            <div>
                {Children}
            </div>
        </div>
    );
};

MainContainer.propTypes = {
    Children: propTypes.object.isRequired
}

export default MainContainer