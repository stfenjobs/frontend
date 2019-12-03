import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import useUser from '../../models/userModel';
import RegisterForm from '../../components/RegisterForm';

import { RouteComponentProps } from 'react-router-dom';

import './Register.css';

import { message } from 'antd';


export default withRouter((props: RouteComponentProps) => {
    const user = useUser();
    const [visible, setVisible] = useState(false);

    const onOkClick = () => {
        setVisible(false);
    };

    return (
        <div className='register-root'>
            <RegisterForm />
        </div>
    );
});
