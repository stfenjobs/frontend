import React, { FormEvent } from 'react';

import { Form, Input, Icon, Button, Tag, AutoComplete } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { SelectValue } from 'antd/lib/select';

const { Option, OptGroup } = AutoComplete;


export interface CertificationFormProps extends RouteComponentProps {
    form: WrappedFormUtils;
};

export interface CertificationFormValue {
    department: string;
    profile: string;
    phone: string;
    field: BigInteger;
    position: string;
}

const dataSource = [
    {
        title: '机器学习',
        children: [
            {
                title: '强化学习',
            },
            {
                title: '神经网络',
            },
        ],
    },
    {
        title: '材料',
        children: [
            {
                title: '石墨烯',
            },
        ],
    },
    {
        title: '计算机',
        children: [
            {
                title: '操作系统',
            },
        ],
    },
];

function renderTitle(title: string) {
    return (
        <span>
            {title}
            <a
                style={{ float: 'right' }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
        </a>
        </span>
    );
}

const myTags = ['操作系统', '石墨烯', '强化学习', '神经网络']

const options = dataSource
    .map(group => (
        <OptGroup key={group.title} label={renderTitle(group.title)}>
            {group.children.map(opt => (
                <Option key={opt.title} value={opt.title}>
                    {opt.title}
                    <span className="certain-search-item-count"></span>
                </Option>
            ))}
        </OptGroup>
    ))
    .concat([
        <Option disabled key="all" className="show-all">
            <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
                View all results
        </a>
        </Option>,
    ]);

const CertificationForm = (props: CertificationFormProps) => {
    const [tags, setTags] = React.useState(Array<string>());

    React.useEffect(() => {
        console.log(tags);
    }, [tags])

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // api
        console.log("certification")
    };

    const handleAutoCompleteChange = (value: SelectValue) => {
        let inTag = false, inMyTag = false;
        let i = 0;
        for (i = 0; i < tags.length; i++) {
            console.log(tags[i], value as string)
            if (tags[i] === (value as string)) {
                inTag = true;
                break;
            }
        }
        for (i = 0; i < myTags.length; i++) {
            if (myTags[i] === (value as string)) {
                inMyTag = true;
                break;
            }
        }
        if (!inTag && inMyTag) {
            setTags([...tags, value as string]);
        }
    }

    const handleClose = (removedTag: string) => {
        const tempTags = tags.filter(tag => tag !== removedTag);
        setTags(tempTags);
    }

    const { getFieldDecorator } = props.form;

    const renderForm = () => (
        <Form {...formItemLayout} onSubmit={handleSubmit} className='certification-form'>
            <Form.Item
                label="院系"
                hasFeedback
            >
                {getFieldDecorator('department', {
                    rules: [{
                        required: true,
                        message: '请输入院系!',
                    },
                    ],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="资料"
                hasFeedback
            >
                {getFieldDecorator('profile', {
                    rules: [{
                        required: true,
                        message: '请输入资料!',
                    },
                    ],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="电话"
                hasFeedback
            >
                {getFieldDecorator('phone', {
                    rules: [{
                        required: true,
                        message: '请输入电话!',
                    },
                    ],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="位置"
                hasFeedback
            >
                {getFieldDecorator('position', {
                    rules: [{
                        required: true,
                        message: '请输入位置!',
                    },
                    ],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="领域"
            >
                <div>
                    <AutoComplete
                        className="certain-category-search"
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={false}
                        dropdownStyle={{ width: 300 }}
                        size="large"
                        style={{ width: '100%' }}
                        dataSource={options}
                        placeholder="input here"
                        optionLabelProp="value"
                        onChange={handleAutoCompleteChange}
                    >
                        <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                    </AutoComplete>
                    <div>
                        {tags.map(tag => (<Tag key={tag} closable onClose={() => handleClose(tag)}>{tag}</Tag>))}
                    </div>
                </div>
            </Form.Item>
            <Form.Item className="certification-button-wrapper">
                <Button className="certification-button" type="primary" htmlType="submit">
                    认证
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <div>
            {renderForm()}
        </div>
    )
}

export default Form.create({ name: 'certification-form' })(CertificationForm);