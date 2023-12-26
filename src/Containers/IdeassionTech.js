/* eslint no-magic-numbers: ["error", { "ignore": [1500] }] */
import React from 'react'
import IdeassionLogo from '../Assets/IdeassionLogo.jpg'
import { useNavigate } from 'react-router';
import * as RoutePath from '../Entities/RoutePath'
import LoadingSpinner from '../Common/Spinner';
// import 'bootstrap/dist/css/bootstrap.min.css';

const IdeassionTech = () => {
    const Navigate = useNavigate();

    setTimeout(() => {
        Navigate(RoutePath.LOGIN.URI);
    }, 1500);

    return (
        <div className="App-header">
            <img width={'350px'} height={'200px'} src={IdeassionLogo} />
            {/* <Spinner animation="border" size="lg" variant="primary" style={spinnerStyle} /> */}
            <LoadingSpinner />
        </div>
    )
}

export default IdeassionTech