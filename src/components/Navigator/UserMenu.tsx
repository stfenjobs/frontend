import React from 'react';
import { Link } from 'react-router-dom';
import useUserModel from '../../models/userModel';

import { Menu, Dropdown, Avatar } from 'antd';

const { Item } = Menu;

export default () => {
    const {
        token, username, avatar, eid, logout
    } = useUserModel();

    // TODO: useEffect to catch token change

    const touristTitle = (
        <span>
            <Avatar icon='user' size='small' />
            <span
                style={{
                    color: '#cccccc',
                    paddingLeft: '1em',
                    paddingTop: '5px'
                }}
            >
                游客请登录
            </span>
        </span>
    );

    const touristMenu = (
        <Menu>
            <Item>
                <Link to='/login'>登录</Link>
            </Item>
            <Item>
                <Link to='/register'>注册</Link>
            </Item>
        </Menu>
    );

    const userTitle = (
        <span>
            {
                avatar === ''
                ? <Avatar icon='user' size='small' />
                : <Avatar src={avatar} size='small' />
            }
            <span
                style={{
                    color: '#cccccc',
                    paddingLeft: '1em',
                    paddingTop: '5px'
                }}
            >
                {username}
            </span>
        </span>
    );

    const userMenu = (
        <Menu>
            <Item onClick={() => logout(token)}>
                注销
            </Item>
            <Item>
                <Link to={`/user`}>用户中心</Link>
            </Item>
            {
                eid !== '' &&
                <Item>
                    <Link to={`/experts/${eid}`}>专家主页</Link>
                </Item>
            }
        </Menu>
    );

    return (
        <Dropdown
            overlay={token === '' ? touristMenu : userMenu}
            overlayStyle={{
                width: 150,
                paddingTop: 10,
            }}
            placement='bottomLeft'
        >
            <a className='ant-dropdown-link' href='#'>
                {token === '' ? touristTitle : userTitle}
            </a>
        </Dropdown>
    );
};
