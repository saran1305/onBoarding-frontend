import React from 'react';
import { useEffect, useState } from 'react';
import '../../Styles/userdetails.css';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';

const Container1 = () => {

    const [ userData, setUserData ] = useState(null);
    const fetchData = async () => {
        const response = await fetch('your_api_endpoint');
        const data = await response.json();

        setUserData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="container1">
            <div><img src={IdeassionLogo} alt="Ideassion Image" className="ideaimage"/></div>

            <div className="tableone">
                <div>
                    <table className="table custom-table table-align">
                        <tbody>
                            <tr>
                                <th>Full Name</th>
                                <td>{userData?.fullname}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table custom-table table-align">
                        <tbody> 
                            <tr>
                                <th>Date of birth</th>
                                <td>{userData?.dob}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="photo">
                        <tbody>
                            <tr>
                                <td>{userData?.image}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <table className="table custom-table table-align">
                    <tbody>
                        <tr>
                            <th>Nationality</th>
                            <td>{userData?.nationality}</td>
                            <th>Gender</th>
                            <td>{userData?.gender}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table className="table custom-table table-align">
                    <tbody>
                        <tr>
                            <th>Marital Status</th>
                            <td>Single/Married/Divorced/Widower</td>
                            <th>Marriage Date</th>
                            <td> </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h6>Contact Details</h6>
            <div>
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th colSpan="2">Present Address:</th>
                            <th colSpan="2">Permanent Address:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <th>Mobile No: </th>
                            <td></td> 

                            <th>Email ID: </th>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div>
                    <h6>Education Details</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Qualification</th>
                                <th>Specialization</th>
                                <th>Year of Passing</th>
                                <th>Grade</th>
                                <th>School / University</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>P.hd.</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Masters</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Bachelors</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Diploma</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>12th</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>10th</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text">
                        <p>Page 1 of 4</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
                
export default Container1;
