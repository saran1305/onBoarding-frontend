import React, { useState, useEffect } from 'react';
import * as Endpoint from '../../Entities/Endpoint';
import '../../Styles/admin_screen.css';
import { MdOutlineClear } from 'react-icons/md';
import { RiFileUserFill } from 'react-icons/ri';
import { MdLocalPrintshop } from 'react-icons/md';

const TotalUsers = () => {
    const [ userData, setUserData ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');

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

    const handleSearch = event => {
        setSearchInput(event.target.value);
    };

    const handleClearIcon = () => {
        setSearchInput('');
    };

    return (
        <div className="container">
            <div><button className="add-user">Add User</button></div>
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
        </div>
    );
};

export default TotalUsers;
