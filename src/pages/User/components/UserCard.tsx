import React from 'react';
import useUserModel from '../../../models/userModel';

import { Upload, Icon, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import EditableLabel from './EditableLabel';


interface UploadFile {
    type: string;
    size: number;
}

const getBase64 = (img: any, callback: (imgUrl: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

const beforeUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG格式或PNG格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小要小于2MB');
    }
    return isJpgOrPng && isLt2M;
}

export default () => {
    /* wait for api */
    const { /* token, username, avatar, email, points, updateProfile */ eid } = useUserModel();

    const avatar = 'https://avatars3.githubusercontent.com/u/37368558?s=400&u=2cee58569e7ab9446e77ef3ad76362fb598a019f&v=4';
    const userName = 'zx555';
    const userEmail ='czr.cn.525@gmail.com';
    const userPoints ='3';

    const [loading, setLoading] = React.useState(false);
    const [img, setImg] = React.useState(avatar);

    const [name, setName] = React.useState(userName);
    const [nameEditable, setNameEditable] = React.useState(false);

    const [email, setEmail] = React.useState(userEmail);
    const [emailEditable, setEmailEditable] = React.useState(false);

    React.useEffect(() => {
        // check if login?
        /*
        if (token === '') {
            message.info('请先登录');
            history.push('/login');
        }
        */
    }, []);

    const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
        } else if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imgUrl => {
                setLoading(false);
                setImg(imgUrl);
            });
        }
    }

    const onNameEdit = () => {
        setNameEditable(true);
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onNameConfirm = () => {
        // api request
        setNameEditable(false);
    }

    const onNameCancel = () => {
        setName(userName);
        setNameEditable(false);
    }

    const onEmailEdit = () => {
        setEmailEditable(true);
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onEmailConfirm = () => {
        // api
        setEmailEditable(false);
    }

    const onEmailCancel = () => {
        setEmail(userEmail);
        setEmailEditable(false);
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: '6rem',
                right: '14rem',
            }}
        >
            <Upload
                listType='picture-card'
                beforeUpload={beforeUpload}
                showUploadList={false}
                onChange={handleChange}
                disabled={loading}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
                <img src={img} alt="avatar" style={{width: '100%'}} />
            </Upload>
            <EditableLabel
                isEditable={nameEditable}
                value={name}
                fontSize={"2rem"}
                size='large'
                onEdit={onNameEdit}
                onValueChange={onNameChange}
                onConfirm={onNameConfirm}
                onCancel={onNameCancel}
            />
            <div style={{ paddingTop: '1.5rem' }}>
                <Icon
                    type='mail'
                    style={{
                        paddingRight: '0.5rem',
                        float: 'left',
                        paddingTop: emailEditable ? '0.6rem' : '0.4rem'
                    }}
                />
                <EditableLabel
                    isEditable={emailEditable}
                    value={email}
                    fontSize={"1rem"}
                    onEdit={onEmailEdit}
                    onValueChange={onEmailChange}
                    onConfirm={onEmailConfirm}
                    onCancel={onEmailCancel}
                />
            </div>
            <div style={{ paddingTop: '0.4rem' }}>
                <Icon
                    type='pay-circle'
                    style={{
                        padding: '0.28rem 0.5rem 0 0',
                        float: 'left',
                    }}
                />
                <span style={{ fontSize: '1rem' }}>
                    可用 <span style={{ color: 'rgba(200, 0, 0, 0.6)' }}>{userPoints}</span> 积分
                </span>
            </div>
            {
                eid !== '' &&
                <div style={{ paddingTop: '0.4rem' }}>
                    <Icon
                        type="schedule"
                        style={{
                            padding: '0.32rem 0.5rem 0 0.5rem',
                            float: 'left'
                        }}
                    />
                    <span style={{ fontSize: '1rem' }}>已通过<b>专家认证</b></span>
                </div>
            }
        </div>
    )
}