import React from 'react';
import { Popconfirm, Table} from 'antd';
import useUserModel from "../../../models/userModel";
import useRouter from "use-react-router";


export default () => {
    // TODO import data form service
    const {history} = useRouter();
    const {removeFavorite, token, id, favorite, getFavorite, loading} = useUserModel();

    // local
    const handleDelete = (key: string) => {
        removeFavorite(token, id, key);
        setTimeout(() => getFavorite(token, id), 100);
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
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <a>Delete</a>
                </Popconfirm>
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
                   dataSource={favorite}
                   loading={loading}
                   pagination={{pageSize: 15}}
                   size="small"
                   onRowClick={(record, index, event) => onRowClick(record, index, event)}
            />
        </div>
    );
};
