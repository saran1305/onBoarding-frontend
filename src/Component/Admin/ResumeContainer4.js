import React from 'react';
import { useEffect, useState } from 'react';
import '../../Styles/userdetails.css';
import IdeassionLogo from '../../Assets/IdeassionLogo.jpg';

const Container4 = () => {
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
        <div className="container4">
            <div><img src={IdeassionLogo} alt="Ideassion Image" className="ideaimage"/></div>
            <div>
                <h6>Existing Bank Account</h6>
                <table className="table">
                    <thead> 
                        <tr>
                            <th>Details</th>
                            <th>Inputs</th>
                        </tr>
                    </thead>
                    <tr>
                        <th>Name as on Bank Account</th>
                        <td>{userData?.name}</td>
                    </tr>
                    <tr>
                        <th>Bank Name</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Bank Branch Location</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Bank Account No.</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Bank-IFSC Code</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Joint Account</th>
                        <td> Yes / No</td>
                    </tr>
                    <tr>
                        <th>Proof Submitted(To be updated by HR)</th>
                        <td>Cheque Leaf / Bank Statement / Passbook copy / Cheque main page</td>
                    </tr>
                </table>
            </div>  
            <div>
                <h6>Emergency Contact Details</h6>
                <table className="table">
                    <thead>
                        <th>Details</th>
                        <th>Contact 1</th>
                        <th>Contact 2</th>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Relationship</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Contact Number</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Conntact Address</th>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h6>Self-Declaration</h6>
                <ol>
                    <li>I hereby declare that the above information provided by me is true to my knowledge.</li>
                    <li>I hereby declare that in future if there is any change in the provided information, I will take full responsibility to update HR and to change the necessary records.</li>
                    <li>I hereby understand and authorize the company to do background verification on me directly by the company or by employing any third party verification agency.</li>
                </ol>
            </div>
            <div className="line">
                <div>
                    <hr />
                    <h6>Name</h6>
                </div>
                <div>
                    <hr />
                    <h6>Date</h6>
                </div>
                <div>
                    <hr />
                    <h6>Signature</h6>
                </div>
            </div>
        
            <div className="text">
                <p>Page 4 of 4</p>
            </div>
        </div>
    );
};

export default Container4;
