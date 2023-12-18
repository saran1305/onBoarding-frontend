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


    return (
        <div className="main-container">
            <div className="navbar">
                <div>
                    <img src={ideassionImage} alt="Ideassion Image" className="ideaImage"/>
                    <div className="navbarTwo">
                        <p onClick={''}> <TbUserSquareRounded className="navIcon"/> <span>Onboarders</span></p>
                        <p onClick={''}> <IoIosPeople className="navIcon"/> <span>TotalUsers</span></p>
                    </div>
                </div>
                <div className="navBottom">
                    <div className="navBottomOne">
                        <p onClick={''}> <BsChatSquare className="navIcon" /> <span>Messages</span> </p>
                        <p onClick={''}> <TiBell className="navIcon"  /> <span>Notifications</span>  </p>
                        <p onClick={''}> <IoSettingsOutline className="navIcon"/> <span>Settings</span> </p>
                        <p onClick={''}> <RiLogoutCircleLine className="navIcon"/> <span>Logout</span> </p>
                    </div>
                    <div className="navBottomTwo">
                        <div className="mailName">A</div>
                        {userDetail.map(user => (
                            <div key={user.userId}>
                                <p>{user.user}</p>
                                <p>{user.email}</p>
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