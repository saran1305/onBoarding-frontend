import React, { useState } from 'react';
import '../../Styles/previousExperience.css'

const PreviousExperience = () => {
    const [ previousExperience, setPreviousExperience ] = useState([
        {
            name: '',
            designation: '',
            fromDate: '',
            toDate: '',
            reporting: '',
            reasonforleaving: '',
            location: '',
            proofofattachments: ''
        }
    ]);
    const handleAddPreviousExperience = () => {
        setPreviousExperience(prevDetails => [
            ...prevDetails,
            {
                name: '',
                designation: '',
                fromDate: '',
                toDate: '',
                reporting: '',
                reasonforleaving: '',
                location: '',
                proofofattachments: ''
            }
        ]);
    };
    const handleInputChange = (index, field, value) => {
        setPreviousExperience(prevDetails => {
            const newDetails = [...prevDetails];

            if (field === 'fromDate') {
                newDetails[index][field] = value;
            } else if (field === 'toDate') {
                newDetails[index][field] = value;
            } else {
                newDetails[index][field] = value;
            }

            return newDetails;
        });
    };

    // const getAllExperienceData = async () => {
    //     try {
    //         const allExperienceData = previousExperience.map(experience => ({
    //             name: experience.name,
    //             designation: experience.designation,
    //             fromDate: experience.fromDate,
    //             toDate: experience.toDate,
    //             reporting: experience.reporting,
    //             reasonforleaving: experience.reasonforleaving,
    //             location: experience.location,
    //             proofofattachments: experience.proofofattachments
    //         }));
    //         const apiUrl = 'https://example.com/api/your-endpoint';
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(allExperienceData)
    //         });

    //         if (response.ok) {
    //             console.log('Data successfully posted to the API');
    //         } else {
    //             console.error('Failed to post data to the API');
    //         }
    //     } catch (error) {
    //         console.error('Error posting data to the API', error);
    //     }
    // };

    // <button className="getalldata" onClick={getAllExperienceData}>
    //         Get All Data & Post to API
    //       </button>
    return (
        <div className="previousExp">
            <h4>Previous Experience</h4>
            <div className="row">
                <table className="family">
                    <thead>
                        <th>Name</th>
                        <th>Designation</th>
                        <th colSpan={2}>Duration (From - To)</th>
                        <th>Reporting to</th>
                        <th>Reason for Leaving</th>
                        <th>Location</th>
                        <th>Proof of Attachments</th>
                    </thead>
                    <tbody>
                        {previousExperience.map((previousExperience, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={previousExperience.name}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'name', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={previousExperience.designation}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'designation', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="date"
                                        value={previousExperience.fromDate}
                                        placeholder="From"
                                        onChange={event => handleInputChange(index, 'fromDate', event.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="date"
                                        value={previousExperience.toDate}
                                        placeholder="To"
                                        onChange={event => handleInputChange(index, 'toDate', event.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={previousExperience.reporting}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'reporting', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={previousExperience.reasonforleaving}
                                        placeholder="Reason"
                                        onChange={event => handleInputChange(index, 'reasonforleaving', event.target.value)}/>
                                </td>
                                <td>
                                    <input
                                        className="textbox"
                                        type="text"
                                        value={previousExperience.location}
                                        placeholder="Name"
                                        onChange={event => handleInputChange(index, 'location', event.target.value)}/>
                                </td>
                                <td><button className="choosefile">Choose File</button></td>
                            </tr>
                        ))}
                        <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                        <tr>
                            <td colSpan="8" className="buttonrow"><button className="addanother" onClick={handleAddPreviousExperience}>+</button></td>
                        </tr >
                        <tr><td colSpan="8" className="buttonrow"><hr /></td></tr>
                    </tbody>
                </table>
            </div>

            <h4>Reference Details</h4>
            <div className="row">
                <table className="family ref">
                    <thead>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Company Name</th>
                        <th>Contact No</th>
                        <th>Email ID</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" className="textbox" placeholder="Name" /></td>
                            <td><input type="text" className="textbox" placeholder="role" /></td>
                            <td><input type="text" className="textbox" placeholder="Name" /></td>
                            <td><input type="number" className="textbox" placeholder="Mobile no" /></td>
                            <td><input type="text" className="textbox" placeholder="Email ID"/></td>
                        </tr>
                        <tr><td colSpan={5}><hr /></td></tr>
                    </tbody>
                </table>
                <div><input type="checkbox" className="checkbox" />I hearby authorize Ideassion Tech to connect with my reference or my background verification.</div>
            </div> 
        </div>
    );
};

export default PreviousExperience;
