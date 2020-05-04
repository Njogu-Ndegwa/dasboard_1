import React from "react";
import {Table, Input, Button, Icon, Modal, Card, Row, Col, message, Form, InputNumber} from 'antd';
import Highlighter from 'react-highlight-words';
import PatientAction from "./PatientAction";
import TextArea from "antd/lib/input/TextArea";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EmergencyRegistration extends React.Component {

    state = {};


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                PatientAction.createPatient(values).then(response => {
                    console.log("response ", response);
                    if (response.status === 201) {
                        //message.info(response.message);
                        this.showConfirm(response);
                        this.props.form.resetFields();
                    }
                });
            }
        });
    };

    showConfirm = (response) => {
        Modal.success({
            title: 'Success',
            content: 'Patient details successfully submitted \n Given No. '+response.data.patient_number,
            onOk() {
                // return new Promise((resolve, reject) => {
                //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));

            },
            onCancel() {
            },
        });
    }

    componentDidMount() {
        this.props.form.validateFields();
    }


    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        // Only show error after a field is touched.
        const given_nameError = isFieldTouched('given_name') && getFieldError('given_name');
        return (
            <div id="content">

                <Card title="Emergency Patient Registration" type={"inner"}>


                    <Form layout="horizontal" onSubmit={this.handleSubmit} className="emergency_reg_form">
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item label="First Name" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('given_name', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input first name'
                                        }],
                                    })(
                                        <Input
                                            prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Middle Name" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('middle_name', {
                                        rules: [{
                                            required: false,
                                        }],
                                    })(
                                        <Input
                                            prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Surname" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('surname', {
                                        rules: [{
                                            required: false,
                                        }],
                                    })(
                                        <Input
                                            prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Age" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('age', {
                                        rules: [{
                                            required: true,
                                        }],
                                    })(
                                        <Input type="number"/>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Contact Person" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('contact_person', {
                                        rules: [{
                                            required: true,
                                        }],
                                    })(
                                        <Input type="number"
                                               prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               style={{width: '100%'}}/>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Basic Notes" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('basic_notes', {
                                        rules: [{
                                            required: false,
                                        }],
                                    })(
                                        <TextArea type="text"
                                                  prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                  style={{width: '100%'}}/>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Critical Information" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('critical_information', {
                                        rules: [{
                                            required: false,
                                        }],
                                    })(
                                        <TextArea type="text"
                                                  prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                  style={{width: '100%'}}/>,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign: 'right'}}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>


                </Card>


            </div>
        );
    }
}

export default Form.create({name: 'emergency_reg_form'})(EmergencyRegistration);


