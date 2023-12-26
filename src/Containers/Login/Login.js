import React from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const Navigate = useNavigate()

    const handleClick = () => {
        Navigate('/admin' + '/on-boarders')
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <button onClick={() => handleClick()}>mainContainer</button>
        </div>
    )
}

export default Login