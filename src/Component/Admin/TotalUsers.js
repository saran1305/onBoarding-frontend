/* eslint-disable max-statements */
/* eslint no-magic-numbers: ["error", { "ignore": [0, 3] }] */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Endpoint from '../../Entities/Endpoint';
import '../../Styles/admin_screen.css';
import { MdOutlineClear } from 'react-icons/md';
import { RiFileUserFill } from 'react-icons/ri';
import { MdLocalPrintshop } from 'react-icons/md';
import { MdAddBox } from 'react-icons/md';
import { FaSquareMinus } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const TotalUsers = () => {
    const [ userData, setUserData ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ selectedOption, setSelectedOption ] = useState(null);
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    const [ validation, setValidation ] = useState({ empname: '', email: '' });
    const [ isInviteMultiple, setIsInviteMultiple ] = useState(false);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         // const responsePending = await axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/GetPendingEmployeeDetails`);
    //         // const responseInvited = await axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/GetInvitedEmployeeDetails`);
    //         // const responseExpired = await axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/GetRejectedEmployeeDetails`);

    //         const combinedData = [
    //             ...responsePending.data,
    //             ...responseInvited.data,
    //             ...responseExpired.data
    //         ];

    //         setUserData(combinedData);
    //         filterData(combinedData, searchInput);
    //     };

    //     fetchUserData();
    // }, [searchInput]);
    
    useEffect (() => {
        axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/AdminDashboard`)
            .then(response => {
                console.log('Data getted successflly', response.data);
                
                setUserData(response.data);
                filterData(response.data, searchInput);
            })
            .catch(error => {
                console.error('error fetching data :',error);
            })
    }, [searchInput]);

    const filterData = (data, search) => {
        let filtered = data;

        if (search.length >= 3) {
            filtered = filtered.filter(user =>
                user.empname.toLowerCase().includes(search.toLowerCase())
            );
        }
        setUserData(filtered);
    };

    const handleSort = event => {
        const selectedOption = event.target.value;
        const sortedData = [...userData].sort((firstUser, secondUser) => {
            if (selectedOption === 'ascend') {
                return firstUser.empid - secondUser.empid;
            } else {
                return secondUser.empid - firstUser.empid;
            }
        });

        setUserData(sortedData);
    };

    const addValidUser = () => {
        const validUser = { empname: '', email: '' };

        if (!selectedUsers.every(user => user.empname)) {
            validUser.empname = 'Name is required.';
        }
        if (!selectedUsers.every(user => user.email)) {
            validUser.email = 'Email address is required';
        }

        setValidation(validUser);
        return Object.values(validUser).every(value => value === '');
    };

    const handleAcceptPopup = async () => {
        if (addValidUser()) {            
            await Promise.all(selectedUsers.map(async user => {
                await axios.post(`${Endpoint.API_ENDPOINT}/inviteUser`, {
                    empname: user.empname,
                    email: user.email
                });
            }));
    
            handleClosePopup();
        }
    };
    

    const handleClosePopup = () => {
        setSelectedUsers([{ empname: '', email: '' }]);
        setValidation({ empname: '', email: '' });
        setSelectedOption(null);
    };

    const handleSearch = event => {
        setSearchInput(event.target.value);
    };

    const handleClearIcon = () => {
        setSearchInput('');
    };

    const handleAddUser = () => {
        setShowDropdown(!showDropdown);
    };

    const handleAddUserPopup = option => {
        setSelectedOption(option);
        setIsInviteMultiple(option === 'inviteMultipleUser');
        setSelectedUsers([{ empname: '', email: '' }]);
    };

    const handleAddUserInput = () => {
        setSelectedUsers(prevUsers => [ ...prevUsers, { empname: '', email: '' }] );
    };    

    const handleUserInputChange = (index, field, value) => {
        setSelectedUsers(prevUsers => {
            return prevUsers.map((user, i) => {
                if (i === index) {
                    return {
                        ...user,
                        [field]: value
                    };
                    
                }
                return user;
            });
        });
    };
    
    const handleRemoveUserInput = index => {
        setSelectedUsers(prevUsers => prevUsers.filter((user, i) => i !== index));
    };
    
    const handlePopupClose = () => {
        setSelectedOption(null);
        setShowDropdown(!showDropdown);
    };
    
    const InviteUserPopup = () => (
        <Modal show={true} className="invite-popup">
            <Modal.Header >
                <Modal.Title>
                    {isInviteMultiple ? 'Invite Multiple Users' : 'Invite User'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedUsers.map((user, index) => (
                    <div key={index}>
                        <Form.Group>
                            <Form.Label>Name<span className="validation">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={user.empname}
                                onChange={event =>
                                    handleUserInputChange(index, 'empname', event.target.value)
                                }
                            />
                            {validation && (
                                <Form.Text className="text-danger">{validation.empname}</Form.Text>
                            )}
                        </Form.Group>
                        {index === 0 && isInviteMultiple && (
                            <MdAddBox className="iconAdd" onClick={handleAddUserInput} />
                        )}
                        {index > 0 && (
                            <FaSquareMinus className="iconMinus" onClick={() => handleRemoveUserInput(index)} />
                        )}
                        <Form.Group>
                            <Form.Label>Email<span className="validation">*</span>{' '}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email ID"
                                value={user.email}
                                onChange={event =>
                                    handleUserInputChange(index, 'email', event.target.value)
                                }
                            />
                            {validation && (
                                <Form.Text className="text-danger">{validation.email}</Form.Text>
                            )}
                        </Form.Group>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer className="button-footer">
                <Button className="close-popup" onClick={handleClosePopup}>
                    Cancel
                </Button>
                <Button className="accept-popup" onClick={handleAcceptPopup}>
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    );

    const AddUserDirectly = () => (
        <Modal>
            <p>Add User Directly Popup Content</p>
        </Modal>
    );

    const AddMultipleUserDirectly = () => (
        <Modal>
            <p>Add Multiple User Directly Popup Content</p>
        </Modal>
    );

    return (
        <div className="container">
            <div className="dropdown">
                <button className="add-user" onClick={handleAddUser}>
                    Add User
                </button>
                {showDropdown && (
                    <div className="dropdown-content">
                        <p onClick={() => handleAddUserPopup('inviteUser')}>Invite user</p>
                        <p onClick={() => handleAddUserPopup('inviteMultipleUser')}>Invite Multiple user</p>
                        <p onClick={() => handleAddUserPopup('addUserDirectly')}>Add user Directly</p>
                        <p onClick={() => handleAddUserPopup('addMultipleUserDirectly')}>Add Multiple user Directly</p>
                    </div>
                )}
            </div>
            <div className="card">
                <div className="containerone">
                    <div className="flex-container">
                        <div className="flex-column">
                            <p>Total Users</p>
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
                            <th>Education</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(user => (
                            <tr key={user.empid}>
                                <td>{user.empid}</td>
                                <td>{user.empname}</td>
                                <td>{user.contact}</td>
                                <td>{user.email}</td>
                                <td>{user.education}</td>
                                <td className="actions">
                                    <RiFileUserFill className="iconuser" />
                                    <MdLocalPrintshop className="iconprint" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <span>
                    <p className="bottom-row">
                        Showing data 1 to 8 of 150 entries
                    </p>{' '}
                    <p></p>
                </span>
            </div>
            {selectedOption === 'inviteUser' && (
                <InviteUserPopup onClose={handlePopupClose} />
            )}
            {selectedOption === 'inviteMultipleUser' && (
                <InviteUserPopup onClose={handlePopupClose} />
            )}
            {selectedOption === 'addUserDirectly' && (
                <AddUserDirectly onClose={handlePopupClose} />
            )}
            {selectedOption === 'addMultipleUserDirectly' && (
                <AddMultipleUserDirectly onClose={handlePopupClose} />
            )}
        </div>
    );
};

export default TotalUsers;
