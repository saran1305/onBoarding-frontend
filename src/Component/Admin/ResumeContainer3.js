import React from 'react';
import { useEffect, useState } from 'react';
import '../../Styles/userdetails.css';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';

const Container3 = () => {
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
        <div className="container3">
            <div><img src={IdeassionLogo} alt="Ideassion Image" className="ideaimage"/></div>
            <div>
                <h6>Hobbies and Membership</h6>
                <table className="table hobbies">
                    <thead >
                        <tr>
                            <th>Details</th>
                            <th colSpan="2">Inputs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Are you a member of any professional body?</td>
                            <td colSpan="2">{userData?.fullname}</td>
                        </tr>
                        <tr>
                            <td>Hobbies and interests</td>
                            <td colSpan="2"></td>
                        </tr> 
                        <tr>
                            <td rowSpan="3">Is any of your friends working/worked with Ideassion?</td>
                            <th>Emp ID</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Location</th>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h6>Certifications</h6>
                <table className="table certifications">
                    <tr>
                        <th>Details</th>
                        <th colSpan="2">Inputs</th>
                    </tr>
                    <tr>
                        <td>Have you completed any professional certifications?</td>
                        <td colSpan="2">Yes/No</td>
                    </tr>
                    <tr>
                        <td rowSpan="10">If yes, Kindly list the details-</td>
                    </tr>
                    <tr>
                        <th>Name of Certification</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Issuing Authority</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Valid Till</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Name of Certification</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Issuing Authority</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Valid Till</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Name of Certification</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Issuing Authority</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Valid Till</th>
                        <td></td>
                    </tr>
                </table>
            </div>  
            <div className="text">
                <p>Page 3 of 4</p>
            </div>
        </div>
    );
};

export default Container3;
