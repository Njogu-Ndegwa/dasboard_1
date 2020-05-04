import React from "react";
import {Table, Input, Button, Icon, Modal, Card, Row, Col, message, Form, InputNumber, DatePicker, Select} from 'antd';
import Highlighter from 'react-highlight-words';
import PatientAction from "./PatientAction";
import TextArea from "antd/lib/input/TextArea";
import moment from 'moment';
import RoomAction from "../../organization/components/room/RoomAction";

const {Option} = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Admission extends React.Component {

    state = {
        roomTypes: []
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                PatientAction.createPatient(values).then(response => {
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
            content: 'Patient details successfully submitted \n Given No. ' + response.data.patient_number,
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
        RoomAction.fetchRoomTypes().then(respoonse => {
            this.setState({
                roomTypes: respoonse
            });
        })
        this.props.form.validateFields();
    }


    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        // Only show error after a field is touched.
        const given_nameError = isFieldTouched('given_name') && getFieldError('given_name');
        return (
            <div id="content">
                <Card title="In-Patient Admission" type={"inner"}>
                    <Form layout="horizontal" onSubmit={this.handleSubmit} className="emergency_reg_form">
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item label="Admission Date" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('admission_date', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input admission date'
                                        }],
                                    })(
                                        <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                                    format={"YYYY/MM/DD"}/>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Admission Type" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('admission_type', {
                                        rules: [{
                                            required: true,
                                        }],
                                    })(
                                        <Select defaultValue="">
                                            <Option value="Emergency">Emergency</Option>
                                            <Option value="Maternity">Maternity</Option>
                                            <Option value="Urgent">Urgent</Option>
                                            <Option value="Routine">Routine</Option>
                                            <Option value="Elective">Elective</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Room Type" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('middle_name', {
                                        rules: [{
                                            required: true,
                                            message: 'Please select room type'
                                        }],
                                    })(
                                        <Select defaultValue="">
                                            {this.state.roomTypes.map(item => <Option
                                                key={item.type_code}>{item.name}</Option>)}

                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="Room No" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('room_no', {
                                        rules: [{
                                            required: true,
                                            message: 'Please select room no'

                                        }],
                                    })(
                                        <Select defaultValue="">
                                            <Option value="-Select-">-Select-</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="Bed No" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('bed_no', {
                                        rules: [{
                                            required: true,
                                            message: 'Please select bed no'
                                        }],
                                    })(
                                        <Select defaultValue="">
                                            <Option value="-Select-">-Select-</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="Expected Date of Discharge"
                                           validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('expected_discharge', {
                                        rules: [{
                                            required: false,
                                            message: 'Please input expected date of discharge'
                                        }],
                                    })(
                                        <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                                    format={"YYYY/MM/DD"}/>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={16}>
                                <Form.Item label="Special Comments" validateStatus={given_nameError ? 'error' : ''}
                                           help={given_nameError || ''}>
                                    {getFieldDecorator('special_comments', {
                                        rules: [{
                                            required: false,
                                        }],
                                    })(
                                        <TextArea type="text"
                                                  prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                  style={{width: '100%', height: '130px'}}/>,
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

export default Form.create({name: 'emergency_reg_form'})(Admission);


