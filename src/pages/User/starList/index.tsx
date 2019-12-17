import React, {useState} from 'react';
import {Card, Divider, Popconfirm, Select, Table} from 'antd';
import useUserModel from "../../../models/userModel";
import useRouter from "use-react-router";
import useService from '../services';

const range = (end = 0, step = 1) => {
    let arr = [];
    for (let i = 0; i < end; i += step) {
        arr[i] = {
            key: i,
            id: "53e99784b7602d9701f3e142" + i,
            title: "Effect of a charged scanned probe microscope tip on a subsurface electron gas" + "AHCUASHUFISAHFUSIHUIDS".slice(i),
            addTime: 1576486228825 + i * 123777723// 注意这里的时间是时间戳
        };
    }
    return arr
};


export default () => {
    // TODO import data form service
    const {loading, favorite, getFavorite} = useService();
    const {history} = useRouter();
    const {removeFavorite, token, id} = useUserModel();


    // local
    // data = records = starList
    const [data, setData] = useState(range(6));
    const [dataIndex, setDataIndex] = useState('');

    const handleDelete = (key: string) => {
        removeFavorite(token, id, key);
        if (!favorite) setData(data.filter(item => item.id !== key));
        else getFavorite(token, id);
    };

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            width: '80%',
            sorter: (a: any, b: any) => a.title.localeCompare(b.title),
        },
        {
            title: '收藏时间',
            dataIndex: 'addTime',
            width: '12%',
            sorter: (a: any, b: any) => a.addTime - b.addTime,
            render: (date: number) => {
                let time = new Date(date)
                return time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay()
            }
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (text: any, record: any) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        }
    ];

    const onRowClick = (record: any, index: any, event: any) => {
        if (event.target.tagName == 'TD') history.push("/paper/" + index.id)
    }
    return (
        <div style={{margin: "0", verticalAlign: "middle", padding: 0, backgroundColor: "white"}}>
            {/*<Divider orientation="right">收  藏  列  表</Divider>*/}
            <Table style={{marginTop: "1%"}}
                   columns={columns}
                   dataSource={favorite ? favorite : data}
                   loading={loading}
                   pagination={{pageSize: 15}}
                   size="small"
                   onRowClick={(record, index, event) => onRowClick(record, index, event)}
            />
        </div>
    );
};
