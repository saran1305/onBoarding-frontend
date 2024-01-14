/* eslint-disable max-statements */
/* eslint no-magic-numbers: ["error", { "ignore": [0, 3] }] */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import * as RoutePath from '../../Entities/RoutePath';
import '../../Styles/admin_screen.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdOutlineCancel } from 'react-icons/md';
import { RiFileUserFill } from 'react-icons/ri';
import { MdOutlineClear } from 'react-icons/md';
import { MdMailOutline } from 'react-icons/md';
import { Modal, Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router';

const OnBoarders = () => {
    const [ userData, setUserData ] = useState([]);
    const [ activeKey, setActiveKey ] = useState('Pending');
    const [ searchInput, setSearchInput ] = useState('');
    const [ showAcceptance, setShowAcceptance ] = useState(false);
    const [ showRejection, setShowRejection ] = useState(false);
    const [ comments, setComments ] = useState('');
    const [ selectedUser, setSelectedUser ] = useState({
        userId: '',
        mailId: ''
    });
    const [ validation, setValidation ] = useState({
        userId: '',
        mailId: ''
    });

    const Navigate = useNavigate();
    const handleNavClick = () => {
        const _url = 'user-details'; 
        const mainContainerURI = RoutePath.MAIN_CONTAINER.URI.replace('*', _url);

        Navigate(mainContainerURI);
    };

    const fetchData = async status => {
        let response;

        if (status === 'Pending') {
            response = await axios.get(`${Endpoint.API_ENDPOINT}/pending`);
        } else if (status === 'Invited') {
            response = await axios.get(`${Endpoint.API_ENDPOINT}/invited`);
        } else if (status === 'Expired') {
            response = await axios.get(`${Endpoint.API_ENDPOINT}/expired`);
        }

        // if (status === 'Pending') {
        //     response = await axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/GetPendingEmployeeDetails`);
        // } else if (status === 'Invited') {
        //     response = await axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/GetInvitedEmployeeDetails`);
        // } else if (status === 'Expired') {
        //     response = await axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/GetRejectedEmployeeDetails`);
        // }
        setUserData(response.data);
    };

    useEffect(() => {
        fetchData(activeKey);
    }, [ activeKey, searchInput ]);


    const filterData = search => {
        let filteredData = [...userData];

        if (search.length >= 3) {
            filteredData = filteredData.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setUserData(filteredData);
    };

    const handleSort = event => {
        const selectedOption = event.target.value;
        const sortedData = [...userData].sort((firstUser, secondUser) => {
            if (selectedOption === 'ascend') {
                return firstUser.userId - secondUser.userId;
            } else {
                return secondUser.userId - firstUser.userId;
            }
        });

        setUserData(sortedData);
    };
  
    const handleStatus = status => {
        if (status === 'Invited') {
            return 'active1';
        } else if (status === 'Expired') {
            return 'active2';
        } else {
            return '';
        }
    };
  
    const handleSearch = event => {
        setSearchInput(event.target.value);
        filterData(event.target.value);
    };
  
    const filterTag = status => {
        setActiveKey(status);
        fetchData(status);
    };

    const handleClearIcon = () => {
        setSearchInput('');
    };
  
    const handleAcceptance = () => {
        setShowAcceptance(true);
        setShowRejection(false);
        setComments('');
    };
  
    const handleClosePopup = () => {
        setShowAcceptance(false);
        setShowRejection(false);
        setComments('');
        setSelectedUser({ userId: '', mailId: '' });
        setValidation({ userId: '', mailId: '' });
    };
  
    const handleRejection = () => {
        setShowRejection(true);
        setShowAcceptance(false);
    };
  
    const handleAcceptPopup = async () => {
        if (addValidUser()) {
        
            await axios.post(`${Endpoint.API_ENDPOINT}/userAccept`, {
                userId: selectedUser.userId,
                mailId: selectedUser.mailId
            });
            
            handleClosePopup();
        }
    };

    const handleRejectionPopup = async () => {
        if (addValidUser()) {
            await axios.post(`${Endpoint.API_ENDPOINT}/comments`, {
                userId: selectedUser.userId,
                comments: comments
            });
            handleClosePopup();
        }
    };
    
    const clear = currentField => {
        setValidation({
            ...validation,
            [currentField]: ''
        });
    };
    const addValidUser = () => {
        const validUser = { userId: '', mailId: '', comments: '' };
    
        if (!selectedUser.userId) {
            validUser.userId = 'User ID is required.';
        }
        if (!selectedUser.mailId) {
            validUser.mailId = 'Email address is required';
        }
        if (!comments && showRejection) {
            validUser.comments = 'Please enter comments';
        }
    
        setValidation(validUser);
        return Object.values(validUser).every(value => value === '');
    };    
  
    return (
        <div className="container">
            <div className="tag">
                <button
                    className={activeKey === 'Pending' ? 'active' : ''}
                    onClick={() => filterTag('Pending')}
                >
                    Pending
                </button>
                <button
                    className={activeKey === 'Invited' ? 'active' : ''}
                    onClick={() => filterTag('Invited')}
                >
                    Invited
                </button>
                <button
                    className={activeKey === 'Expired' ? 'active' : ''}
                    onClick={() => filterTag('Expired')}
                >
                    Expired
                </button>
            </div>
            <div className="card">
                <div className="containerone">
                    <div className="flex-container">
                        <div className="flex-column">
                            <p>Onboarders</p>
                            <span>All Members</span>
                        </div>
                        <div className="containerone-one">
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={handleSearch}
                                    value={searchInput}
                                    className="clear"
                                />
                                <MdOutlineClear
                                    className="iconclear"
                                    onClick={handleClearIcon}
                                />
                            </div>
                            <select onChange={handleSort} defaultValue="descend">
                                <option value="descend">Newest</option>
                                <option value="ascend">Oldest</option>
                            </select>
                        </div>
                    </div>
                </div>
                <table className="tablebox">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Contact No</th>
                            <th>Official Mail ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(user => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.name}</td>
                                <td>{user.contact}</td>
                                <td>{user.mailId}</td>
                                <td className="status">
                                    <button className={handleStatus(user.status)}>
                                        {user.status}
                                    </button>
                                </td>
                                <td className="actions">
                                    {user.status === 'Pending' ? (
                                        <RiFileUserFill className="iconuser" onClick={handleNavClick}/>
                                    ) : (
                                        <MdMailOutline className="iconmessage" />
                                    )}
                                    <FaRegCircleCheck
                                        onClick={() => handleAcceptance(user)}
                                        className={`iconcorrect ${user.status === 'Invited' || user.status === 'Expired'
                                            ? 'disabled'
                                            : ''
                                        }`}
                                    />
                                    <MdOutlineCancel
                                        onClick={() => handleRejection(user)}
                                        className={`iconwrong ${user.status === 'Invited' || user.status === 'Expired'
                                            ? 'disabled'
                                            : ''
                                        }`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showAcceptance && (
                    <Modal show={showAcceptance} className="popup">
                        <Modal.Header className="head-popup" >
                            <Modal.Title >Acceptance</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="body-popup">
                            <div className="body-popup1">Create ID & Email </div>
                            <p>
                                User ID<span className="validation">*</span>
                            </p>
                            <input
                                type="number"
                                placeholder="User ID"
                                onChange={event => {
                                    setSelectedUser({
                                        ...selectedUser,
                                        userId: event.target.value
                                    });
                                    clear('userId');
                                }}
                            />
                            {validation && (
                                <span className="validation">{validation.userId}</span>
                            )}
                            <p>
                                Mail Id<span className="validation">*</span>{' '}
                            </p>
                            <input
                                type="text"
                                placeholder="Mail ID"
                                value={selectedUser.mailId}
                                onChange={event => {
                                    setSelectedUser({
                                        ...selectedUser,
                                        mailId: event.target.value
                                    });
                                    clear('mailId');
                                }}
                            />
                            {validation && (
                                <span className="validation">{validation.mailId}</span>
                            )}
                        </Modal.Body>
                        <Modal.Footer className="button-footer">
                            <Button className="close-popup" onClick={handleClosePopup}>
                                Cancel
                            </Button>
                            <Button className="accept-popup" onClick={handleAcceptPopup}>
                                Accept
                            </Button>
                        </Modal.Footer>
                    </Modal>    
                )}
                {showRejection && (
                    <Modal show={showRejection} className="popup">
                        <Modal.Header className="head-popup" >
                            <Modal.Title >Are you sure to reject?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ overflow: 'auto' }} className="modalBody">
                            <p>
                                Write Comments<span className="validation">*</span>
                            </p>
                            <input
                                className="comment"
                                type="text"
                                placeholder="Comments"
                                value={comments}
                                onChange={event => {
                                    setComments(event.target.value);
                                    clear('comments');
                                }}
                            />
                            {validation && (
                                <span className="validation">{validation.comments}</span>
                            )}
                        </Modal.Body>
                        <Modal.Footer className="button-footer">
                            <Button className="close-popup" onClick={handleClosePopup}>
                                Cancel
                            </Button>
                            <Button className="accept-popup" onClick={handleRejectionPopup}>
                                Submit
                            </Button> 
                        </Modal.Footer>
                    </Modal>
                )}
                <span>
                    <p className="bottom-row">Showing data 1 to 8 of 150 entries</p> <p></p>
                </span>
            </div>
        </div>
    );
};

export default OnBoarders