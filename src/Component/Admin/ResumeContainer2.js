import React from 'react';
import { useEffect, useState } from 'react';
import '../../Styles/userdetails.css';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';

const Container2 = () => {

    const [ userData, setUserData ] = useState(null);
    const fetchData = async () => {
        const response = await fetch('your_api_endpoint');
        const data = await response.json();

        setUserData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const number =5;

    return (
        <div className="container2">
            <div><img src={IdeassionLogo} alt="Ideassion Image" className="ideaimage"/></div>
            <div>
                <h6>Professional Experience</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name of Company</th>
                            <th>Designation</th>
                            <th>Duration (From - To)</th>
                            <th>Location</th>
                            <th>Reason for Leaving</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(number)].map((_, index) => (
                            <tr key={index}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h6>Family Details</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Relationship</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Occupation</th>
                            <th>Contact No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Father</td>
                            <td>{userData?.fullname}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Mother</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Spouse</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>child 1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Child 2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h6>Health Condition</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Health Status</th>
                            <th>Inputs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Is there any specific health condition that you may need to inform us? </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Allergies to?</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Have you undergone any recent major/minor surgery?</td>
                            <td>Yes/No</td>
                        </tr>
                        <tr>
                            <td>Would your health condition permit you to work in rotational/night shifts</td>
                            <td>Yes/No</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="text">
                <p>Page 2 of 4</p>
            </div>
        </div>
    );
};
                
export default Container2;
