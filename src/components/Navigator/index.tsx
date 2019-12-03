import React, { useState, useEffect } from 'react';
import useRouter from 'use-react-router';
import qs from 'qs';
import { trim } from '../../utils';

import { Input, Select, Button, message } from 'antd';
import UserMenu from './UserMenu';

import { QueryParam } from '../../types';
import './UserMenu.css'

const { Group } = Input;
const { Option } = Select;


export default () => {
    // TODO: no query bar in explore (main page)
    const [qBar, setQBar] = useState(false);
    const [qType, setQType] = useState('paper');
    const [qValue, setQValue] = useState('');
    const { history, location } = useRouter();

    useEffect(() => {
        if (location.pathname === '/') {
            setQBar(false);
        } else if (location.pathname === '/search') {
            const param: QueryParam = qs.parse(location.search.slice(1));
            setQType(param.type);
            setQValue(param.q);
            setQBar(true);
        } else {
            setQType('paper');
            setQValue('');
            setQBar(true);
        }
    }, [location]);

    const onSelect = (value: string) => {
        setQType(value);
    };

    const onInput = (value: string) => {
        setQValue(value);
    }

    const onSearch = (key: string) => {
        if (trim(key) === '') {
            message.config({ top: 75 });
            message.error('搜索内容不能为空');
            return;
        }

        const url = '/search?' + qs.stringify({ q: key, type: qType });
        history.push(url);
    };

    const searchBar = (
        <div
            style={{
                textAlign: 'center',
                width: '60%',
                float: 'left'
            }}
        >
            <Group
                compact
                style={{
                    marginTop: '16px'
                }}
            >
                <Select
                    value={qType}
                    onChange={(value: string) => onSelect(value)}
                    style={{ width: 90 }}
                >
                    <Option value='paper'>论文</Option>
                    <Option value='expert'>专家</Option>
                </Select>
                <Input
                    placeholder='搜索科技资源或者专家'
                    value={qValue}
                    onChange={(e) => onInput(e.target.value)}
                    onPressEnter={() => onSearch(qValue)}
                    style={{ width: 300, textAlign: 'left' }}
                />
                <Button
                    type='primary'
                    icon='search'
                    onClick={() => onSearch(qValue)}
                    style={{ width: 40 }}
                />
            </Group>
        </div>
    );

    return (
        <div className='app-navigator'>
            <div style={{ float: 'left', width: '20%' }}>
                <span style={{ color: '#cccccc' }}>LOGO</span>
            </div>
            {qBar && searchBar}
            <div style={{ float: 'right', paddingRight: '1%' }}>
                <UserMenu  />
            </div>
        </div>
    );
};
