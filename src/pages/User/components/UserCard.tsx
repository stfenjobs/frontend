import React from 'react';
import useRouter from 'use-react-router';
import useUserModel from '../../../models/userModel';
import api from "../../../api"
import {Upload, Icon, message, Card} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import EditableLabel from './EditableLabel';


enum errCode {
    UNAVAILABLE = 0,
    REPEATED_EMAIL = 1,
    SERVICE_REFUSED = 2,
    TOKEN_EXPIRED = 3,
}

interface UploadFile {
    type: string;
    size: number;
}


const getBase64 = (img: any, callback: (imgUrl: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

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
};

export default () => {
    const {history} = useRouter();
    const {
        token, id, username, avatar, email, points, eid,
        loading, error, updateProfile, clearError
    } = useUserModel();

    const [uploadLoading, setUploadLoading] = React.useState(false);
    const [img, setImg] = React.useState(avatar);

    const [tmpName, setTmpName] = React.useState(username);
    const [nameEditable, setNameEditable] = React.useState(false);

    const [tmpEmail, setTmpEmail] = React.useState(email);
    const [emailEditable, setEmailEditable] = React.useState(false);

    const [hover, setHover] = React.useState(false);

    React.useEffect(() => {
        setNameEditable(false);
        setTmpName(username);
    }, [username]);

    React.useEffect(() => {
        setEmailEditable(false);
        setTmpEmail(email);
    }, [email]);

    React.useEffect(() => {
        updateProfile(token, id, {avatar: img})
    }, [img]);

    React.useEffect(() => {
        switch (error) {
            case errCode.UNAVAILABLE: {
                message.error('服务不可用，请稍后再试');
                break;
            }
            case errCode.REPEATED_EMAIL: {
                message.error('该邮箱已被注册');
                break;
            }
            case errCode.SERVICE_REFUSED: {
                message.error('非法操作');
                break;
            }
            case errCode.TOKEN_EXPIRED: {
                message.info('登录过期，请重新登录');
                clearError();
                history.push('/login');
                return;
            }
        }
        clearError();
    }, [error]);

    const handleUploadChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setUploadLoading(true);
        } else if (info.file.status === 'done') {
            console.log(info);
            getBase64(info.file.originFileObj, imgUrl => {
                setUploadLoading(false);
                setImg(imgUrl);
            });
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: "5rem",
                right: '14rem',
            }}
        >
            <Card style={{padding: "1rem"}}>
                <div
                    onMouseEnter={() => !hover && setHover(true)}
                    onMouseLeave={() => hover && setHover(false)}
                >
                    <Upload className={"uploader"}
                        listType='picture-card'
                        data={() => api.uploader.getToken()}
                        beforeUpload={beforeUpload}
                        showUploadList={false}
                        onChange={handleUploadChange}
                        disabled={uploadLoading}
                        action="https://up-z1.qiniup.com"
                    >
                        <img
                            src={img}
                            alt="avatar"
                            style={{width: '100%'}}
                        />
                        {hover ? <Icon type="upload" className={"icon"} style={{marginLeft: "2.5rem"}}/> : null}
                    </Upload>
                </div>
                <EditableLabel
                    isEditable={nameEditable}
                    value={tmpName}
                    fontSize={"2rem"}
                    loading={loading}
                    onEdit={() => setNameEditable(true)}
                    onValueChange={(e) => setTmpName(e.target.value)}
                    onConfirm={
                        () => tmpName !== username ?
                            updateProfile(token, id, {username: tmpName}) :
                            setNameEditable(false)
                    }
                    onCancel={() => {
                        setTmpName(username);
                        setNameEditable(false);
                    }}
                />
                <div style={{paddingTop: '1.5rem'}}>
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
                        value={tmpEmail}
                        fontSize={"1rem"}
                        loading={loading}
                        onEdit={() => setEmailEditable(true)}
                        onValueChange={(e) => setTmpEmail(e.target.value)}
                        onConfirm={
                            () => tmpEmail !== email ?
                                updateProfile(token, id, {email: tmpEmail}) :
                                setEmailEditable(false)
                        }
                        onCancel={() => {
                            setTmpEmail(email);
                            setEmailEditable(false);
                        }}
                    />
                </div>
                <div style={{paddingTop: '0.4rem'}}>
                    <Icon
                        type='pay-circle'
                        style={{
                            padding: '0.28rem 0.5rem 0 0',
                            float: 'left',
                        }}
                    />
                    <span style={{fontSize: '1rem'}}>
                    可用 <span style={{color: 'rgba(200, 0, 0, 0.6)'}}>{points}</span> 积分
                </span>
                </div>
                {
                    eid !== '' &&
                    <div style={{paddingTop: '0.4rem'}}>
                        <Icon
                            type="schedule"
                            style={{
                                padding: '0.32rem 0.5rem 0 0',
                                float: 'left'
                            }}
                        />
                        <span style={{fontSize: '1rem'}}>已通过<b>专家认证</b></span>
                    </div>
                }
            </Card>
        </div>
    )
}