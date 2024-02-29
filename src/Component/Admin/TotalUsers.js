/* eslint-disable max-statements */
/* eslint no-magic-numbers: ["error", { "ignore": [0,1, 3] }] */
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
import { Modal, Button } from 'react-bootstrap';

const TotalUsers = () => {
    const [ userData, setUserData ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ selectedOption, setSelectedOption ] = useState(null);
    const [ selectedUsers, setSelectedUsers ] = useState([{ name: '', emailid: '' }]);
    const [ validation, setValidation ] = useState({ name: '', emailid: '' });
    const [ isInviteMultiple, setIsInviteMultiple ] = useState(false);
    
    useEffect (() => {
        axios.get(`${Endpoint.API_ENDPOINT}/Admin/api/AdminDashboard`)
            .then(response => {                
                setUserData(response.data);
                filterData(response.data, searchInput);
            })
            .catch(error => {
                console.error('error fetching data :',error);
            })
    }, []);

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
        const validUser = { name: '', emailid: '' };

        if (!selectedUsers.every(user => user.name)) {
            validUser.name = 'Name is required.';
        }
        if (!selectedUsers.every(user => user.emailid)) {
            validUser.emailid = 'Email address is required';
        }

        setValidation(validUser);
        return Object.values(validUser).every(value => value === '');    
    };

    const handleAcceptPopup = () => {
        if (addValidUser()) {
            try {
                const response = axios.post(`${Endpoint.API_ENDPOINT}/Login/LoginInvite`, selectedUsers, 
                    { headers: { 'Content-Type': 'application/json' } });

                console.log('Invite data sent successfully:', response);
                handleClosePopup();
            } catch (error) {
                console.error('Error inviting users:', error);
            }
        }
    };
    
    const handleClosePopup = () => {
        setSelectedUsers([{ name: '', emailid: '' }]);
        setValidation({ name: '', emailid: '' });
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
        setSelectedUsers([{ name: '', emailid: '' }]);
    };

    const handleAddUserInput = () => {
        setSelectedUsers(prevUsers => [ ...prevUsers, { name: '', emailid: '' }] );
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

    const [ openInviteUserModal , setopenInviteUserModal ] = useState(false);

    const handleCloseInviteUserModal = () => {
        setopenInviteUserModal(false)
    }
    
    
    const handleOpenInviteUserModal = () => {
        setopenInviteUserModal(true)
    }
    
    // const InviteUserPopup = () => (
    //     <Modal show={true} className="invite-popup">
    //         <Modal.Header >
    //             <Modal.Title>
    //                 {isInviteMultiple ? 'Invite Multiple Users' : 'Invite User'}
    //             </Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>
    //             {selectedUsers.map((user, index) => (
    //                 <div key={index}>
    //                     <div>
    //                         <p>Name<span className="validation">*</span></p>
    //                         <input
    //                             type="text"
    //                             placeholder="Name"
    //                             value={user.name}
    //                             onChange={event =>
    //                                 handleUserInputChange(index, 'name', event.target.value)
    //                             }
    //                         />
    //                         {validation && (
    //                             <p className="text-danger">{validation.name}</p>
    //                         )}
    //                     </div>
    //                     {index === 0 && isInviteMultiple && (
    //                         <MdAddBox className="iconAdd" onClick={handleAddUserInput} />
    //                     )}
    //                     {index > 0 && (
    //                         <FaSquareMinus className="iconMinus" onClick={() => handleRemoveUserInput(index)} />
    //                     )}
    //                     <div>
    //                         <p>Email<span className="validation">*</span>{' '}</p>
    //                         <input
    //                             type="text"
    //                             placeholder="Email ID"
    //                             value={user.emailid}
    //                             onChange={event =>
    //                                 handleUserInputChange(index, 'emailid', event.target.value)
    //                             }
    //                         />
    //                         {validation && (
    //                             <p className="text-danger">{validation.emailid}</p>
    //                         )}
    //                     </div>
    //                 </div>
    //             ))}
    //         </Modal.Body>
    //         <Modal.Footer className="button-footer">
    //             <Button className="close-popup" onClick={handleClosePopup}>
    //                 Cancel
    //             </Button>
    //             <Button className="accept-popup" onClick={handleAcceptPopup}>
    //                 Send
    //             </Button>
    //         </Modal.Footer>
    //     </Modal>
    // );

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
                        <p onClick={() => handleOpenInviteUserModal()}>Invite user</p>
                        <p onClick={() => handleOpenInviteUserModal()}>Invite Multiple user</p>
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
            {/* {selectedOption === 'inviteUser' && (
                <InviteUserPopup onClose={handlePopupClose} />
            )}
            {selectedOption === 'inviteMultipleUser' && (
                <InviteUserPopup onClose={handlePopupClose} />
            )} */}
            {selectedOption === 'addUserDirectly' && (
                <AddUserDirectly onClose={handlePopupClose} />
            )}
            {selectedOption === 'addMultipleUserDirectly' && (
                <AddMultipleUserDirectly onClose={handlePopupClose} />
            )}
            <Modal show={openInviteUserModal} >
                <Modal.Header className="invite-popup" >
                    <Modal.Title>
                        {isInviteMultiple ? 'Invite Multiple Users' : 'Invite User'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUsers.map((user, index) => (
                        <div key={index}>
                            <div>
                                <p>Name<span className="validation">*</span></p>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={user.name}
                                    onChange={event =>
                                        handleUserInputChange(index, 'name', event.target.value)
                                    }
                                />
                                {validation && (
                                    <p className="text-danger">{validation.name}</p>
                                )}
                            </div>
                            {index === 0 && isInviteMultiple && (
                                <MdAddBox className="iconAdd" onClick={handleAddUserInput} />
                            )}
                            {index > 0 && (
                                <FaSquareMinus className="iconMinus" onClick={() => handleRemoveUserInput(index)} />
                            )}
                            <div>
                                <p>Email<span className="validation">*</span>{' '}</p>
                                <input
                                    type="text"
                                    placeholder="Email ID"
                                    value={user.emailid}
                                    onChange={event =>
                                        handleUserInputChange(index, 'emailid', event.target.value)
                                    }
                                />
                                {validation && (
                                    <p className="text-danger">{validation.emailid}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer className="button-footer">
                    <Button className="close-popup" onClick={handleCloseInviteUserModal}>
                        Cancel
                    </Button>
                    <Button className="accept-popup" onClick={handleAcceptPopup}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TotalUsers;
