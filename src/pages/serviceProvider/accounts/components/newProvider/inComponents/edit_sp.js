
import React from "react";
import { Button, PageHeader, Form, Input, Card, Select, Row, Col, Divider, Switch, message, Modal ,DatePicker, Icon } from 'antd'
import Highlighter from 'react-highlight-words';
import TextArea from "antd/lib/input/TextArea";
import moment from 'moment';
import { ServiceProviderService} from '../../../../../../config/service_provider';



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
        const {  initialState } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                
                ServiceProviderService.updateServiceProvider(values, values.phone_number).then(res => {
                    console.log(res, 'saved response');
                    if (res.status === 201) {
                        message.success('Service Provider Vehicle Details has been updated successfully')
                        this.props.history.push("/bank/branch")
                    } else {
                        message.error('There was an error updating the Service Provider Vehicle Details')
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
 
    }

    handleBack = () => {
        this.props.history.push({
            pathname: "/serviceprovider",
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
        console.log("intial state", memberDetails)
        return (
            <div id="content">
                <Card  type={"inner"}>
                <PageHeader
                        title="Edit Service Provider"
                        onBack={() => this.handleBack()} />
                    <Form layout="horizontal" onSubmit={this.handleSubmit} className="emergency_reg_form">
                        <Row gutter={8}>
                            <Col span={6}>
                                <Form.Item label="First Name"
                                           >
                                    {getFieldDecorator('first_name', {
                                        initialValue: initialState ? initialState.first_name : "",
                                        rules: [{
                                            required: true,
                                            message: 'Please input the First Name'
                                        }],
                                    })(
                                       
                             <Input placeholder='First Name' />,
                                    )}
                                </Form.Item>
                            </Col>
                            
                            <Col span={6}>
                                <Form.Item label="Last Name"
                                           >
                                    {getFieldDecorator('last_name', {
                                        initialValue: initialState ? initialState.last_name : "",
                                        rules: [{
                                            required: true,
                                            message: 'Please select Registration Number'
                                        }],
                                    })(
                                        <Input placeholder='Last Name' />,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="Surname"
                                           >
                                    {getFieldDecorator('sur_name', {
                                        initialValue: initialState ? initialState.sur_name : "",
                                        rules: [{
                                            required: true,
                                            message: 'Please Enter the Surname'

                                        }],
                                    })(
                                        <Input placeholder='Surname' />,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="Email"
                                          
                                           >
                                    {getFieldDecorator('email', {
                                        initialValue: initialState ? initialState.email : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Email'
                                        }],
                                    })(
                                        <Input placeholder='Email' />,
                                    )}
                                </Form.Item>
                            </Col>

                           

                           
                            
                            <Col span={6}>
                                <Form.Item label="Gender"
                                          
                                           >
                                    {getFieldDecorator('gender', {
                                        initialValue: initialState ? initialState.gender : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Gender'
                                        }],
                                    })(
                                        <Select>
                                            <Select.Option value= 'male'>
                                                Male
                                            </Select.Option>
                                            <Select.Option value= 'female'>
                                                Female
                                            </Select.Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="Phone Number"
                                          
                                           >
                                    {getFieldDecorator('phone_number', {
                                        initialValue: initialState ? initialState.phone_number : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Phone Number'
                                        }],
                                    })(
                                        <Input placeholder='Phone Number' />,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="User Category"
                                          
                                           >
                                    {getFieldDecorator('user_category', {
                                        initialValue: initialState ? initialState.user_category : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the User'
                                        }],
                                    })(
                                        <Select>
                                            <Select.Option value='ServiceProvider'>
                                                ServiceProvider
                                            </Select.Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={4}>
                                <Form.Item label="Date Of Birth"
                                          
                                           >
                                    {getFieldDecorator('date_of_birth', {
                                        initialValue: initialState ? initialState.date_of_birth : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input Day Of Birth'
                                        }],
                                    })(
                                        <Input/>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Id Number"
                                          
                                           >
                                    {getFieldDecorator('id_number', {
                                        initialValue: initialState ? initialState.id_number : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Id Number'
                                        }],
                                    })(
                                       <Input/>,
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