import React, { useState,useEffect } from 'react';
import propTypes from 'prop-types';
import '../../Styles/common.css';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';
import { TbUserSquareRounded } from 'react-icons/tb';
import { IoIosPeople } from 'react-icons/io';
import { FiHome } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { TiBell } from 'react-icons/ti';
import { BsChatSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import * as RoutePath from '../../Entities/RoutePath';
import * as MainContainerTypes from '../../Entities/MainContainerTypes';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const MainContainer = ({ Children }) => {
    const [ userData, setUserData ] = useState(null);
    const [ activeNavOption, setActiveNavOption ] = useState();
    const Navigate = useNavigate();

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        if (storedUserData) {
            setUserData(storedUserData);
        }

        const loginSuccess = window.localStorage.getItem('success');

        if (loginSuccess === 'true') {
            toast.success('Login successful');
            window.localStorage.removeItem('success');
        }
    }, []);

    useEffect(() => {
        if (userData && userData.role) {
            if (userData.role === 'User') {
                Navigate(MainContainerTypes.ADMIN_ROUTE + RoutePath.HOME.URI);
                setActiveNavOption(MainContainerTypes.HOME_TYPE);
            } else if (userData.role === 'Admin') {
                Navigate(MainContainerTypes.ADMIN_ROUTE + RoutePath.ON_BOARDERS.URI);
                setActiveNavOption(MainContainerTypes.ON_BOARDERS_TYPE);
            }
        }
    }, [userData]);
    const getFirstLetter = str => {
        if (str && str.length > 0) {
            return str.charAt(0).toUpperCase();
        } else {
            return '';
        }
    };

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
        localStorage.removeItem('userData');
        localStorage.removeItem('dashboardUserDetail');
        localStorage.removeItem('postedGenId');
        Navigate('/login');
    };

    return (
        <React.Fragment><div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                style={{ minWidth: '300px', zIndex: 9999 }} />
        </div><div className="main-container">
            <div className="navbar">
                <div>
                    <img src={IdeassionLogo} alt="Ideassion Image" className="ideaImage" />
                    <div className="navbarTwo">
                        {userData && userData.role === 'User' && (
                            <React.Fragment>
                                <div className={`nav-item ${activeNavOption === MainContainerTypes.HOME_TYPE ? 'active' : ''}`} onClick={() => handleClickNavOptions(MainContainerTypes.HOME_TYPE)}>
                                    <p className="navIconLayout"><FiHome className="navIcon" /></p>
                                    <p className="para">Home</p>
                                </div>
                            </React.Fragment>
                        )}
                        {userData && userData.role === 'Admin' && (
                            <React.Fragment>
                                <div className={`nav-item ${activeNavOption === MainContainerTypes.ON_BOARDERS_TYPE ? 'active' : ''}`} onClick={() => handleClickNavOptions(MainContainerTypes.ON_BOARDERS_TYPE)}>
                                    <p className="navIconLayout"><TbUserSquareRounded className="navIcon" /></p>
                                    <p className="para">Onboarders</p>
                                </div>
                                <div className={`nav-item ${activeNavOption === MainContainerTypes.TOTAL_USERS_TYPE ? 'active' : ''}`} onClick={() => handleClickNavOptions(MainContainerTypes.TOTAL_USERS_TYPE)}>
                                    <p className="navIconLayout"><IoIosPeople className="navIcon" /></p>
                                    <p className="para">TotalUsers</p>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
                <div className="navBottom">
                    <div className="navBottomOne">
                        <div className="nav-item" onClick={() => handleClickNavOptions(MainContainerTypes.MESSAGES_TYPE)}>  <p className="navIconLayout"> <BsChatSquare className="navIcon" /></p>
                            <p className="para">Messages</p>
                            <p className="notification" style={{ marginLeft: '38px' }}>2</p>
                        </div>
                        <div className="nav-item" onClick={() => handleClickNavOptions(MainContainerTypes.NOTIFICATIONS_TYPE)}>  <p className="navIconLayout"> <TiBell className="navIcon" /></p>
                            <p className="para">Notifications</p>
                            <p className="notification" style={{ marginLeft: '15px' }}>2</p>
                        </div>
                        <div className="nav-item" onClick={() => (handleClickNavOptions)(MainContainerTypes.SETTINGS_TYPE)}>  <p className="navIconLayout"> <IoSettingsOutline className="navIcon" /></p>
                            <p className="para">Settings</p>
                        </div>
                        <div className="nav-item" onClick={() => handleLogout(MainContainerTypes.LOGOUT_TYPE)}>  <p className="navIconLayout"> <RiLogoutCircleLine className="navIcon" /></p>
                            <p className="para">Logout</p>
                        </div>
                    </div>
                    <div>
                        {userData && (
                            <div key={userData.userId} className="navBottomTwo">
                                <div className="mailLogoLayout"><p className="mailLogo">
                                    {getFirstLetter(userData.name)}
                                </p></div>
                                <div className="mailName">
                                    <p>{userData.name}</p>
                                    <p style={{ color: '#71839B', width:'150px' }}>{userData.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                {Children}
            </div>
        </div></React.Fragment>
    );
};

MainContainer.propTypes = {
    Children: propTypes.object.isRequired
}

export default MainContainer