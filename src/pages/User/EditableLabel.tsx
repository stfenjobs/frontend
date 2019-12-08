import React from 'react';

import { Icon, Input } from 'antd';


export interface EditableLabelProps {
    isEditable: boolean,
    value: string,
    fontSize: string,
    size?: 'large',
    onEdit: () => void,
    onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onConfirm: () => void,
    onCancel: () => void,
};

export default (props: EditableLabelProps) => {
    return (
        props.isEditable ? (
            <div style={{ lineHeight: props.fontSize }}>
                <Input
                    value={props.value}
                    onChange={props.onValueChange}
                    size={props.size ? props.size : 'default'}
                    style={{
                        marginLeft: '0.5rem',
                        width: '10rem',
                    }}
                />
                <Icon
                    type='check'
                    style={{ paddingLeft: '0.5rem' }}
                    onClick={props.onConfirm}
                />
                <Icon
                    type='close'
                    style={{ paddingLeft: '0.5rem' }}
                    onClick={props.onCancel} />
            </div>
        ) : (
            <div style={{ marginLeft: '0.5rem', fontSize: props.fontSize }}>
                {props.value}
                <Icon
                    type='edit'
                    style={{ fontSize: props.fontSize, paddingLeft: '0.5rem' }}
                    onClick={props.onEdit}
                />
            </div>
        )
    );
};