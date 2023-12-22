import React from 'react';
import { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import '../../Styles/common.css'
import * as Endpoint from '../../Entities/Endpoint';
import ideassionImage from '../../Images/Idea.jpg';
import { TbUserSquareRounded } from 'react-icons/tb';
import { IoIosPeople } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { TiBell } from 'react-icons/ti';
import { BsChatSquare } from 'react-icons/bs';

const MainContainer =  ({ Children }) => {
    const [ userDetail, setUserDetail ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Endpoint.API_ENDPOINT}/userDetails`);
                const data = await response.json();

                setUserDetail(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchData();
    }, []);

    const getFirstLetter = str => {
        return str.charAt(0).toUpperCase();
    }

    return (
        <div className="main-container">
            <div className="navbar">
                <div>
                    <img src={ideassionImage} alt="Ideassion Image" className="ideaImage"/>
                    <div className="navbarTwo">
                        <div className="navTextItem">
                            <p className="navIconLayout"><TbUserSquareRounded className="navIcon"/></p>
                            <p className="para">Onboarders</p>
                        </div>                        
                        <div className="navTextItem">
                            <p className="navIconLayout"><IoIosPeople className="navIcon"/></p>
                            <p className="para">TotalUsers</p></div>
                    </div>
                </div>
                <div className="navBottom">
                    <div className="navBottomOne">
                        <div className="navTextItem" onClick={''}>  <p className="navIconLayout"> <BsChatSquare className="navIcon" /></p> 
                            <p className="para">Messages</p> 
                            <p className="notification" style={{ marginLeft: '38px' }}>2</p> 
                        </div>
                        <div className="navTextItem">  <p className="navIconLayout"> <TiBell className="navIcon"  /></p> 
                            <p className="para">Notifications</p> 
                            <p className="notification" style={{ marginLeft: '15px' }}>2</p> 
                        </div>
                        <div className="navTextItem">  <p className="navIconLayout"> <IoSettingsOutline className="navIcon"/></p>
                            <p className="para">Settings</p> 
                        </div>
                        <div className="navTextItem">  <p className="navIconLayout"> <RiLogoutCircleLine className="navIcon"/></p> 
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