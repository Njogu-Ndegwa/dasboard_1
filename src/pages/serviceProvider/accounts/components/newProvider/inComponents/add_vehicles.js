import React from "react";
import { Button, Form, PageHeader, Input, Card, Select, Row, Col, Divider, Switch, message, Modal ,DatePicker, Icon } from 'antd'
import { RescueVehicleTypesService, ServiceProviderVehicle } from '../../../../../../config/service_provider';
import Highlighter from 'react-highlight-words';
import TextArea from "antd/lib/input/TextArea";
import moment from 'moment';


const {Option} = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Admission extends React.Component {

    state = {
        initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
        memberDetails: this.props.location.state.Member,
        vehicleDetails: [],
    };


    handleSubmit = async e => {
        const {  initialState, memberDetails } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

             
                ServiceProviderVehicle.postServiceProviderVehicle(values, memberDetails.users_id).then(res => {
                    console.log(res, 'saved response');
                    if (res.status === 201) {
                        // message.success('Service Provider Vehicle Details has been saved successfully');
                        // this.props.history.push("/bank/branch")
                        this.showConfirm(res);
                        this.props.form.resetFields();

                    } else {
                        message.error('There was an error saving the Service Provider Vehicle Details');
                    }

                })



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
        RescueVehicleTypesService.fetchRescueVehicleTypes().then(res => {
            console.log("server response", res)
            if (res.data) {
                this.setState({ vehicleDetails: res.data.content })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handleBack = () => {
        this.props.history.push({
            pathname: "/serviceprovider/vehicle",
            state : {
                Member: this.state.memberDetails
            }
        })
    }


    render() {

        const {getFieldDecorator, getFieldError, isFieldTouched,  } = this.props.form;
        // Only show error after a field is touched.
        const given_nameError = isFieldTouched('given_name') && getFieldError('given_name');
        const { vehicleDetails, initialState, memberDetails } = this.state;
        console.log("member Details", memberDetails)
        return (
            <div id="content">
                <Card  type={"inner"}>
                <PageHeader
                        title="Add Vehicles"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.handleBack()} />
                    <Form layout="horizontal" onSubmit={this.handleSubmit} className="emergency_reg_form">
                        <Row gutter={8}>
                            <Col span={6}>
                                <Form.Item label="Member Vehicle Type"
                                           >
                                    {getFieldDecorator('rescue_vehicle_type_id', {
                                        initialValue: initialState ? initialState.rescue_vehicle_type_id : "",
                                        rules: [{
                                            required: true,
                                            message: 'Please input Member Vehicle Type'
                                        }],
                                    })(
                                        <Select
                                    showSearch
                                    placeholder="Select Member vehicle type "
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {vehicleDetails.map(item => (
                                        <Select.Option key={item.rescue_vehicle_id} value={item.rescue_vehicle_id}>
                                            {item.type_name}
                                        </Select.Option>
                                    ))}
                                </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            
                            <Col span={6}>
                                <Form.Item label="Registartion Number"
                                           >
                                    {getFieldDecorator('vehicle_reg_number', {
                                        initialValue: initialState ? initialState.vehicle_reg_number : "",
                                        rules: [{
                                            required: true,
                                            message: 'Please select Registration Number'
                                        }],
                                    })(
                                        <Input />,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="Insurance Policy Number"
                                           >
                                    {getFieldDecorator('insurance_policy_no', {
                                        initialValue: initialState ? initialState.insurance_policy_no : "",
                                        rules: [{
                                            required: true,
                                            message: 'Please Enter Insurance Policy no'

                                        }],
                                    })(
                                        <Input />,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="Insurance Id"
                                          
                                           >
                                    {getFieldDecorator('insurance_id', {
                                        initialValue: initialState ? initialState.insurance_id : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Insurance Id'
                                        }],
                                    })(
                                        <Input/>,
                                    )}
                                </Form.Item>
                            </Col>

                           

                           
                            
                            <Col span={6}>
                                <Form.Item label="Model"
                                          
                                           >
                                    {getFieldDecorator('model', {
                                        initialValue: initialState ? initialState.model : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Model'
                                        }],
                                    })(
                                        <Input/>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="Color"
                                          
                                           >
                                    {getFieldDecorator('color', {
                                        initialValue: initialState ? initialState.color : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Insurance Id'
                                        }],
                                    })(
                                        <Input/>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="User Id" >
                                    {getFieldDecorator('users_id', {
                                        initialValue: initialState ? initialState.users_id : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the User'
                                        }],
                                    })(
                                        <Input />,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={4}>
                                <Form.Item label="Insurance Start Date"
                                          
                                           >
                                    {getFieldDecorator('insurance_start_date', {
                                        initialValue: initialState ? initialState.insurance_start_date : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input Insurance Start Date'
                                        }],
                                    })(
                                        <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                                    format={"YYYY/MM/DD"}/>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Insurance End Date"
                                          
                                           >
                                    {getFieldDecorator('insurance_end_date', {
                                        initialValue: initialState ? initialState.insurance_end_date : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Insurance End date'
                                        }],
                                    })(
                                        <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                                    format={"YYYY/MM/DD"}/>,
                                    )}
                                </Form.Item>
                            </Col>
                            
                        </Row>
                        <Divider style={{ marginBottom: 8 }} />
                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>

                                    <Button onClick={()=>this.handleBack()}>
                                        Cancel
                                </Button>
                                    {initialState ?
                                        <Button  style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
                                            Update
                                </Button> :
                                        <Button  style={{ marginLeft: 8 }} type="primary" htmlType="submit"  >
                                            Save
                              </Button>
                                    }

                                </Col>
                            </Row>
                    </Form>
                </Card>


            </div>
        );
    }
}

export default Form.create({name: 'emergency_reg_form'})(Admission);