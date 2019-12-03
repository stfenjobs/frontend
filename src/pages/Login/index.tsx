import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { message } from 'antd';

import useUser from '../../models/userModel';
import LoginForm from '../../components/LoginForm';

import './Login.css';

import { RouteComponentProps } from 'react-router-dom';


export interface LoginProps extends RouteComponentProps { }

export default withRouter((props: LoginProps) => {
    const user = useUser();
    const [visible, setVisible] = useState(false);

    const onOkClick = () => {
        setVisible(false);
    };

    return (
        <div className='login-root'>
            <LoginForm />
        </div>
    );
});
