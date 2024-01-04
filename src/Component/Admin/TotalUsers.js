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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const TotalUsers = () => {
    const [ userData, setUserData ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ selectedOption, setSelectedOption ] = useState(null);
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    const [ validation, setValidation ] = useState({ name: '', mailId: '' });
    const [ isInviteMultiple, setIsInviteMultiple ] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            // const responsePending = await axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/GetPendingEmployeeDetails`);
            // const responseInvited = await axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/GetInvitedEmployeeDetails`);
            // const responseExpired = await axios.get(`${Endpoint.API_ENDPOINT}/api/Admin/api/GetRejectedEmployeeDetails`);
            
            const responsePending = await axios.get(`${Endpoint.API_ENDPOINT}/pending`);
            const responseInvited = await axios.get(`${Endpoint.API_ENDPOINT}/invited`);
            const responseExpired = await axios.get(`${Endpoint.API_ENDPOINT}/expired`);

            const combinedData = [
                ...responsePending.data,
                ...responseInvited.data,
                ...responseExpired.data
            ];

            setUserData(combinedData);
            filterData(combinedData, searchInput);
        };

        fetchUserData();
    }, [searchInput]);

    const filterData = (data, search) => {
        let filtered = data;

        if (search.length >= 3) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        setUserData(filtered);
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

    const addValidUser = () => {
        const validUser = { name: '', mailId: '' };

        if (!selectedUsers.every(user => user.name)) {
            validUser.name = 'Name is required.';
        }
        if (!selectedUsers.every(user => user.mailId)) {
            validUser.mailId = 'Email address is required';
        }

        setValidation(validUser);
        return Object.values(validUser).every(value => value === '');
    };

    const handleAcceptPopup = async () => {
        if (addValidUser()) {            
            await Promise.all(selectedUsers.map(async user => {
                await axios.post(`${Endpoint.API_ENDPOINT}/inviteUser`, {
                    name: user.name,
                    mailId: user.mailId
                });
            }));
    
            handleClosePopup();
        }
    };
    

    const handleClosePopup = () => {
        setSelectedUsers([{ name: '', mailId: '' }]);
        setValidation({ name: '', mailId: '' });
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
        setSelectedUsers([{ name: '', mailId: '' }]);
    };

    const handleAddUserInput = () => {
        setSelectedUsers(prevUsers => [ ...prevUsers, { name: '', mailId: '' }] );
    };    

    const handleUserInputChange = (index, field, value) => {
        setSelectedUsers(prevUsers => {
            const updatedUsers = [...prevUsers];

            updatedUsers[index][field] = value;
            return updatedUsers;
        });
    };
    

    const handlePopupClose = () => {
        setSelectedOption(null);
        setShowDropdown(!showDropdown);
    };
    
    const InviteUserPopup = () => (
        <Modal show={true}>
            <Modal.Header>
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
                                value={user.name}
                                onChange={event =>
                                    handleUserInputChange(index, 'name', event.target.value)
                                }
                            />
                            {validation && (
                                <Form.Text className="text-danger">{validation.name}</Form.Text>
                            )}
                        </Form.Group>
                        {isInviteMultiple && (
                            <MdAddBox className="iconAdd" onClick={handleAddUserInput} />
                        )}
                        <Form.Group>
                            <Form.Label>Email<span className="validation">*</span>{' '}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email ID"
                                value={user.mailId}
                                onChange={event =>
                                    handleUserInputChange(index, 'mailId', event.target.value)
                                }
                            />
                            {validation && (
                                <Form.Text className="text-danger">{validation.mailId}</Form.Text>
                            )}
                        </Form.Group>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePopup}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAcceptPopup}>
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
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.name}</td>
                                <td>{user.contact}</td>
                                <td>{user.mailId}</td>
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
