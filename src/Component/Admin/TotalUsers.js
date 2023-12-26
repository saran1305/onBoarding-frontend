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

const TotalUsers = () => {
    const [ userData, setUserData ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ selectedOption, setSelectedOption ] = useState(null);
    const [ selectedUser, setSelectedUser ] = useState({
        name: '',
        mailId: ''
    });
    const [ validation, setValidation ] = useState({
        name: '',
        mailId: ''
    });

    const filterData = (data, search) => {
        let filtered = data;

        if (search.length >= 3) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        setUserData(filtered);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Endpoint.API_ENDPOINT}/users`);
                const data = await response.json();

                setUserData(data);
                filterData(data, searchInput);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchInput]);

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

        if (!selectedUser.name) {
            validUser.name = 'Name is required.';
        }
        if (!selectedUser.mailId) {
            validUser.mailId = 'Email address is required';
        }

        setValidation(validUser);
        return Object.values(validUser).every(value => value === '');
    };

    const handleAcceptPopup = async () => {
        if (addValidUser()) {
            try {
                await axios.post(`${Endpoint.API_ENDPOINT}/inviteUser`, {
                    name: selectedUser.name,
                    mailId: selectedUser.mailId
                });
                console.log('User accepted:', selectedUser);
            } catch (error) {
                console.error('Error accepting user:', error);
            }
            handleClosePopup();
        }
    };

    const clear = currentField => {
        setValidation({
            ...validation,
            [currentField]: ''
        });
    };

    const handleClosePopup = () => {
        setSelectedUser({ name: '', mailId: '' });
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
        // setShowDropdown(!showDropdown);
    };

    const handlePopupClose = () => {
        setSelectedOption(null);
        setShowDropdown(!showDropdown);
    };
    const handleMultipleAddUser = () => {
        return (
            <div className="popup-user">
                <div className="head-popup">Invite Multiple User</div>
                <div className="body-popup2">
                    <div>
                        <p>
                            Name<span className="validation">*</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={event => {
                                setSelectedUser({
                                    ...selectedUser,
                                    name: event.target.value
                                });
                                clear('name');
                            }}
                        />
                        {validation && (
                            <span className="validation">{validation.name}</span>
                        )}
                    </div>
                    <div><MdAddBox className="iconMinus"/></div>
                    <div>
                        <p>
                            Email<span className="validation">*</span>{' '}
                        </p>
                        <input
                            type="text"
                            placeholder="Email ID"
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
                    </div>
                </div>
                <hr />
                <div className="body-popup2">
                    <div>
                        <p>
                            Name<span className="validation">*</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={event => {
                                setSelectedUser({
                                    ...selectedUser,
                                    name: event.target.value
                                });
                                clear('name');
                            }}
                        />
                        {validation && (
                            <span className="validation">{validation.name}</span>
                        )}
                    </div>
                    <div><FaSquareMinus className="iconMinus"/></div>
                    <div>
                        <p>
                            Email<span className="validation">*</span>{' '}
                        </p>
                        <input
                            type="text"
                            placeholder="Email ID"
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
                    </div>
                </div>
                <hr />
                <div>
                    <button className="close-popup" onClick={handleClosePopup}>
                        Cancel
                    </button>
                    <button className="accept-popup" onClick={handleAcceptPopup}>
                        Send
                    </button>
                </div>
            </div>
        )
    }

    const InviteUserPopup = () => (
        <div className="popup-user">
            <div className="head-popup">Invite User</div>
            <div className="body-popup2">
                <div>
                    <p>
                        Name<span className="validation">*</span>
                    </p>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={event => {
                            setSelectedUser({
                                ...selectedUser,
                                name: event.target.value
                            });
                            clear('name');
                        }}
                    />
                    {validation && (
                        <span className="validation">{validation.name}</span>
                    )}
                </div>
                <div>
                    <p>
                        Email<span className="validation">*</span>{' '}
                    </p>
                    <input
                        type="text"
                        placeholder="Email ID"
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
                </div>
            </div>
            <hr />
            <div>
                <button className="close-popup" onClick={handleClosePopup}>
                    Cancel
                </button>
                <button className="accept-popup" onClick={handleAcceptPopup}>
                    Send
                </button>
            </div>
        </div>

    );    
      
    const InviteMultipleUserPopup = () => (
        <div className="popup-user">
            <div className="head-popup">Invite Multiple User</div>
            <div className="body-popup2">
                <div>
                    <p>
                        Name<span className="validation">*</span>
                    </p>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={event => {
                            setSelectedUser({
                                ...selectedUser,
                                name: event.target.value
                            });
                            clear('name');
                        }}
                    />
                    {validation && (
                        <span className="validation">{validation.name}</span>
                    )}
                </div>
                <div>
                    <MdAddBox className="iconAdd" onClick={handleMultipleAddUser}/>
                </div>
                <div>
                    <p>
                        Email<span className="validation">*</span>{' '}
                    </p>
                    <input
                        type="text"
                        placeholder="Email ID"
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
                </div>
            </div>
            <hr />
            <div>
                <button className="close-popup" onClick={handleClosePopup}>
                    Cancel
                </button>
                <button className="accept-popup" onClick={handleAcceptPopup}>
                    Send
                </button>
            </div>
        </div>
    );
    

    const AddUserDirectly = () => (
        <div className="popup">
            <p>Add User Directly Popup Content</p>
        </div>
    );

    const AddMultipleUserDirectly = () => (
        <div className="popup">
            <p>Add Multiple User Directly Popup Content</p>
        </div>
    );  

    return (
        <div className="container">
            <div className="dropdown">
                <button className="add-user" onClick={handleAddUser} >
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
                                    <MdLocalPrintshop className="iconprint"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <span>
                    <p className="bottom-row">Showing data 1 to 8 of 150 entries</p> <p></p>
                </span>
            </div>
            {selectedOption === 'inviteUser' && <InviteUserPopup onClose={handlePopupClose} />}
            {selectedOption === 'inviteMultipleUser' && <InviteMultipleUserPopup onClose={handlePopupClose} />}
            {selectedOption === 'addUserDirectly' && <AddUserDirectly onClose={handlePopupClose} />}
            {selectedOption === 'addMultipleUserDirectly' && <AddMultipleUserDirectly onClose={handlePopupClose} />} 
        </div>
    );
};

export default TotalUsers;
