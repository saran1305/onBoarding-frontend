import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import { AiOutlineDownload } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import Container1 from '../../Component/Admin/ResumeContainer1';
import Container2 from '../../Component/Admin/ResumeContainer2';
import Container3 from '../../Component/Admin/ResumeContainer3';
import Container4 from '../../Component/Admin/ResumeContainer4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/userdetails.css';

const UserDetails = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/admin/on-boarders');
    };

    const { toPDF, targetRef } = usePDF({
        filename: 'Resume.pdf'
    });

    return (
        <div>
            <div className="resume">
                <button className="resumebutton1" onClick={handleBack}>
                    <IoArrowBack className="backicon"/>
                </button>
                <button onClick={() => toPDF(targetRef)} className="resumebutton2">
                    <AiOutlineDownload className="resumeicon"/>Resume 
                </button>
            </div>
            <div className="card cardfull" >
                <div ref={targetRef}>
                    <div>
                        <Container1 />
                    </div>
                    <div style={{ pageBreakBefore: 'always' }} />
                    <div>
                        <Container2 />
                    </div>
                    <div style={{ pageBreakBefore: 'always' }} />
                    <div>
                        <Container3 />
                    </div>
                    <div style={{ pageBreakBefore: 'always' }} />
                    <div>
                        <Container4 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;