import React, { FormEvent } from 'react';
import { clone } from '../../../utils';
import useService from '../services';
// import useUserModel from '../../../models/userModel';

import { Form, Input, Icon, Button, Tag, AutoComplete } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { SelectValue } from 'antd/lib/select';

const { Option, OptGroup } = AutoComplete;


export interface CertificationFormProps extends RouteComponentProps {
    form: WrappedFormUtils;
};

export interface CertificationFormValue {
    name: string;
    organization: string;
}

interface IDataSource {
    title: string,
    children: Array<{ title: string }>,
};

const CertificationForm = (props: CertificationFormProps) => {
    const [tags, setTags] = React.useState(Array<string>());
    const { onUnEdit } = useService();

    const dataSource: Array<IDataSource> = [
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

    const [searchResult, setResult] = React.useState(dataSource);
    const validTags = ['操作系统', '石墨烯', '强化学习', '神经网络'];

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

        console.log(tags);

        // api
        props.form.validateFieldsAndScroll((err: any, values: CertificationFormValue) => {
            if (!err) {
                console.log("certification")
            }
        });
    };

    const handleAutoCompleteChange = (value: SelectValue) => {
        let inTag = false, valid = false;

        for (const tag of tags) {
            if (tag === (value as string)) {
                inTag = true;
                break;
            }
        }

        for (const validTag of validTags) {
            if (validTag === (value as string)) {
                valid = true;
                break;
            }
        }

        if (!inTag && valid) {
            setTags([...tags, value as string]);
        }
    }

    const handleSearch = (value: string) => {
        const regExp = new RegExp(value, 'i');
        let result = clone(dataSource); // deep copy

        for (let category of result) {
            category.children = category.children.filter(
                (value: { title: string }) =>  regExp.test(value.title)
            );
        }

        setResult(result.filter((value: IDataSource) => value.children.length !== 0));
    }

    const handleClose = (removedTag: string) => {
        const tempTags = tags.filter(tag => tag !== removedTag);
        setTags(tempTags);
    }

    const { getFieldDecorator } = props.form;

    const renderForm = () => (
        <Form
            {...formItemLayout}
            onSubmit={handleSubmit}
            style={{
                maxWidth: '100%',
                padding: '8rem 12rem 8rem 12rem',
                margin: '7% 10%'
            }}
        >
            <Form.Item
                label="真实姓名"
                hasFeedback
            >
                {getFieldDecorator('name', {
                    rules: [{
                        required: true,
                        message: '请输入真实姓名！',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="所在单位"
                hasFeedback
            >
                {getFieldDecorator('organization', {
                    rules: [{
                        required: true,
                        message: '请输入所在单位！',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="领域信息"
            >
                {/* TODO: 领域信息是否必填 */}
                <div>
                            <AutoComplete
                                className="certain-category-search"
                                dropdownClassName="certain-category-search-dropdown"
                                dropdownMatchSelectWidth={false}
                                dropdownStyle={{ width: 300 }}
                                size="large"
                                style={{ width: '100%' }}
                                dataSource={
                                    searchResult.map(group => (
                                        <OptGroup key={group.title} label={group.title}>
                                            {group.children.map(opt => (
                                                <Option key={opt.title} value={opt.title}>
                                                    {opt.title}
                                                </Option>
                                            ))}
                                        </OptGroup>
                                    ))
                                }
                                placeholder="请输入关键字"
                                optionLabelProp="value"
                                onChange={handleAutoCompleteChange}
                                onSearch={handleSearch}
                            >
                                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                            </AutoComplete>
                            <div>
                                {tags.map(tag => (<Tag key={tag} closable onClose={() => handleClose(tag)}>{tag}</Tag>))}
                            </div>
                        </div>
            </Form.Item>
            <Form.Item
                style={{
                    marginTop: '3rem',
                    padding: '0 10%',
                    textAlign: 'center'
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '40%', marginLeft: '10%' }}
                >
                    认证
                </Button>
                <Button
                    style={{ width: '40%', marginLeft: '10%' }}
                    onClick={() => onUnEdit()}
                >
                    取消
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