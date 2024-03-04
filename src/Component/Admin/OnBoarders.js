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
import propTypes from 'prop-types';

const OnBoarders = () => {
    const [ userData, setUserData ] = useState([]);
    const [ activeKey, setActiveKey ] = useState('Pending');
    const [ searchInput, setSearchInput ] = useState('');
    const [ showAcceptance, setShowAcceptance ] = useState(false);
    const [ showRejection, setShowRejection ] = useState(false);
    const [ comments, setComments ] = useState('');
    const [ selectedUser, setSelectedUser ] = useState({
        empGen_Id: '',
        email_id: ''
    });
    const [ validation, setValidation ] = useState({
        empGen_Id: '',
        email_id: ''
    });
    const [ userGenId, setUserGenid ] = useState(0)

    const Navigate = useNavigate();
    const handleNavClick = () => {
        const _url = 'user-details'; 
        const mainContainerURI = RoutePath.MAIN_CONTAINER.URI.replace('*', _url);

        Navigate(mainContainerURI);
    };

    const fetchData = async current_Status => {
        let response;

        if (current_Status === 'Pending') {
            response = await axios.get(`${Endpoint.API_ENDPOINT}/Admin/api/GetPendingEmployeeDetails`);
        } else if (current_Status === 'Invited') {
            response = await axios.get(`${Endpoint.API_ENDPOINT}/Admin/api/GetInvitedEmployeeDetails`);
        } else if (current_Status === 'Expired') {
            response = await axios.get(`${Endpoint.API_ENDPOINT}/Admin/api/GetRejectedEmployeeDetails`);
        }
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
                return firstUser.empGen_Id - secondUser.empGen_Id;
            } else {
                return secondUser.empGen_Id - firstUser.empGen_Id;
            }
        });

        setUserData(sortedData);
    };
  
    const handleStatus = current_Status => {
        if (current_Status === 'Invited') {
            return 'active1';
        } else if (current_Status === 'Expired') {
            return 'active2';
        } else {
            return '';
        }
    };
  
    const handleSearch = event => {
        setSearchInput(event.target.value);
        filterData(event.target.value);
    };
  
    const filterTag = current_Status => {
        setActiveKey(current_Status);
        fetchData(current_Status);
    };

    const handleClearIcon = () => {
        setSearchInput('');
    };
  
    const handleAcceptance = user => {
        setUserGenid(user?.empGen_Id)
        setShowAcceptance(true);
        setShowRejection(false);
        setComments('');
    };
  
    const handleClosePopup = () => {
        setShowAcceptance(false);
        setShowRejection(false);
        setComments('');
        setSelectedUser({ empGen_Id: '', email_id: '' });
        setValidation({ empGen_Id: '', email_id: '' });
    };
  
    const handleRejection = user => {
        setUserGenid(user.empGen_Id)
        setShowRejection(true);
        setShowAcceptance(false);
    };

    const handleAcceptPopup = () => {
        if (addValidUser()) {
            try {
                axios.post(`${Endpoint.API_ENDPOINT}/Status/approve/${userGenId}`,
                    {
                        emp_id: selectedUser.empGen_Id,
                        official_EmailId: selectedUser.email_id
                    }
                );
                handleClosePopup();
            } catch (error) {
                console.error('Error accepting user:', error);
            }
        }
    };
    
    const handleRejectionPopup = () => {
        if (addValidUser()) {
            try {
                axios.post(`${Endpoint.API_ENDPOINT}/Status/reject/${userGenId}`,
                    { comments: comments }
                );
                handleClosePopup();
            } catch (error) {
                console.error('Error posting comments:', error);
            }
        }
    };
    
    
    const clear = currentField => {
        setValidation({
            ...validation,
            [currentField]: ''
        });
    };
    const addValidUser = () => {
        const validUser = { empGen_Id: '', email_id: '', comments: '' };
    
        if (!selectedUser.empGen_Id) {
            validUser.empGen_Id = 'User ID is required.';
        }
        if (!selectedUser.email_id) {
            validUser.email_id = 'Email address is required';
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
                            <tr key={user.empGen_Id}>
                                <td>{user.empGen_Id}</td>
                                <td>{user.name}</td>
                                <td>{user.contact_no}</td>
                                <td>{user.email_id}</td>
                                <td className="status">
                                    <button className={handleStatus(user.current_Status)}>
                                        {user.current_Status}
                                    </button>
                                </td>
                                <td className="actions">
                                    {user.current_Status === 'Pending' ? (
                                        <RiFileUserFill className="iconuser" onClick={handleNavClick}/>
                                    ) : (
                                        <MdMailOutline className="iconmessage" />
                                    )}
                                    <FaRegCircleCheck
                                        onClick={() => handleAcceptance(user)}
                                        className={`iconcorrect ${user.current_Status === 'Invited' || user.current_Status === 'Expired'
                                            ? 'disabled'
                                            : ''
                                        }`}
                                    />
                                    <MdOutlineCancel
                                        onClick={() => handleRejection(user)}
                                        className={`iconwrong ${user.current_Status === 'Invited' || user.current_Status === 'Expired'
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
                    <Modal show={showAcceptance} className="popup" centered>
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
                                        empGen_Id: event.target.value
                                    });
                                    clear('empGen_Id');
                                }}
                            />
                            {validation && (
                                <span className="validation">{validation.empGen_Id}</span>
                            )}
                            <p>
                                Mail Id<span className="validation">*</span>{' '}
                            </p>
                            <input
                                type="text"
                                placeholder="Mail ID"
                                value={selectedUser.email_id}
                                onChange={event => {
                                    setSelectedUser({
                                        ...selectedUser,
                                        email_id: event.target.value
                                    });
                                    clear('email_id');
                                }}
                            />
                            {validation && (
                                <span className="validation">{validation.email_id}</span>
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
            </div>
        </div>
    );
};

OnBoarders.propTypes = {
    genId: propTypes.number.isRequired
};
export default OnBoarders