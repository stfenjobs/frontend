import React from 'react';

import { Upload, Icon, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import EditableLabel from './EditableLabel';


interface UploadFile {
    type: string;
    size: number;
}

export interface UserCardProps {
    userAvatar: string;
    userName: string;
    userEmail: string;
};


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

export default (props: UserCardProps) => {
    const [loading, setLoading] = React.useState(false);
    const [img, setImg] = React.useState(props.userAvatar);

    const [name, setName] = React.useState(props.userName);
    const [nameEditable, setNameEditable] = React.useState(false);

    const [email, setEmail] = React.useState(props.userEmail);
    const [emailEditable, setEmailEditable] = React.useState(false);

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
        setName(props.userName);
        setNameEditable(false);
    }

    const onEmailEdit = () => {
        setEmailEditable(true);
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onEmailConfirm = () => {
        setEmailEditable(false);
    }

    const onEmailCancel = () => {
        setEmail(props.userEmail);
        setEmailEditable(false);
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: '11%',
                right: '14%',
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
            <div style={{ paddingTop: '2rem' }}>
                <Icon
                    type='mail'
                    style={{
                        paddingLeft: '0.5rem',
                        paddingRight: emailEditable ? 0 : '0.5rem',
                        float: 'left',
                        paddingTop: emailEditable ? '0.65rem' : '0.45rem'
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
        </div>
    )
}