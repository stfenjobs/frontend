import React from 'react';

import { Icon, Input } from 'antd';


export interface EditableLabelProps {
    isEditable: boolean,
    value: string,
    fontSize: string,
    size?: 'large',
    loading: boolean,
    onEdit: () => void,
    onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onConfirm: () => void,
    onCancel: () => void,
};

export default (props: EditableLabelProps) => {
    const [hover, setHover] = React.useState(false);

    React.useEffect(() => {
        if (props.isEditable) {
            setHover(false);
        }
    }, [props.isEditable])

    const onHover = () => { setHover(true); }
    const onUnhover = () => { setHover(false); }

    return (
        props.isEditable ? (
            <div style={{ lineHeight: props.fontSize }}>
                <Input
                    value={props.value}
                    onChange={props.onValueChange}
                    size={props.size ? props.size : 'default'}
                    style={{ width: '10rem' }}
                    disabled={props.loading}
                />
                {
                    props.loading ?
                    <Icon
                        type='loading'
                        style={{ paddingLeft: '0.5rem' }}
                    /> :
                    <div>
                        <Icon
                            type='check'
                            style={{ paddingLeft: '0.5rem' }}
                                onClick={props.onConfirm}
                        />
                        <Icon
                            type='close'
                            style={{ paddingLeft: '0.5rem' }}
                            onClick={props.onCancel}
                        />
                    </div>
                }
            </div>
        ) : (
            <div
                style={{
                    fontSize: props.fontSize
                }}
                onMouseEnter={onHover}
                onMouseLeave={onUnhover}
            >
                {props.value}
                {
                    hover &&
                    <Icon
                        type='edit'
                        style={{ fontSize: props.fontSize, paddingLeft: '0.5rem' }}
                        onClick={props.onEdit}
                    />
                }
            </div>
        )
    );
};