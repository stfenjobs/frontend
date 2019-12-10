import React from 'react';
// import useUserModel from '../../models/userModel';

// import { message } from 'antd';
import LoginForm from './LoginForm';

import './Login.css';


export default () => {
    React.useEffect(() => {
        // watch login state
    }, []);

    return (
        <div className='login-root'>
            <LoginForm />
        </div>
    );
};
