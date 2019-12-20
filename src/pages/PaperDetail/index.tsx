import React from 'react';
import useRouter from 'use-react-router';
import useUserModel from '../../models/userModel';

import { message } from 'antd';
import Detail from './components/Detail';
import Cards from './components/Cards';

export default () => {
    const { location, history } = useRouter();
    const { token } = useUserModel();

    React.useEffect(() => {
        if (token === '') {
            message.error('请先登录');
            history.push('/login');
        }
    }, [token])

    return (
        <div style={{ padding: "0 12%" }}>
            <div style={{
                float: 'left',
                marginTop: '3%',
                width: '70%',
                backgroundColor: "white",
                padding: "3%",
                paddingBottom: "5%"
            }}>
                <Detail id={location.pathname.split('/').pop() as string}/>
            </div>
            <Cards
                id={location.pathname.split('/').pop() as string}
                style={{ float: 'right', paddingTop: '3%' }}
            />
        </div>
    )
};