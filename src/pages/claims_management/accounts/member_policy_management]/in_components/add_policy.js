import React from 'react';
import { Button, PageHeader, Form, Input, Card, Select, Row, Col, Divider, Switch, message, Modal, Upload } from 'antd'
import { DatePicker } from 'antd';
import { MemberPolicyManagementService } from '../../../../../config/claims_management_service';
import { InsuranceService, ServiceCategoryService } from '../../../../../config/_service';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

class AddPolicyManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            insurance: [],
            service: [],
            service_id: [],

        }


    }


    componentDidMount() {

        ServiceCategoryService.fetchServiceCategories().then(res => {
            if(res.data) {
                this.setState({service: res.data.content})
            }
        } ). catch(error => {
            console.log(error)
        } )
    
// Insurance 
        InsuranceService.fetchInsurance().then(res => {
            console.log("server response", res)
            if (res.data) {
                this.setState({ insurance: res.data.content })
            }
        }).catch(error => {
            console.log(error)
        })

    }

    handleSubmit = async e => {
        const { initialState, service_id } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                let data ={} 

                data= {
                    ...values,
                    services_covered_data: service_id
                }

                console.log('dtaaa', data)

                initialState ?
                    MemberPolicyManagementService.updateMemberPolicyManagement(data, values.member_policy_mngt_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Member Policy Management has been updated successfully')
                            this.props.history.push("/policy")
                        } else {
                            message.error('There was an error updating the Member Policy Management')
                        }
                    }) :
                    MemberPolicyManagementService.postMemberPolicyManagement(data).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            // message.success('insurance Branch has been saved successfully');
                            // this.props.history.push("/insurance/branch")
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else {
                            message.error('There was an error saving the insurance Branch');
                        }

                    })



            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: 'Policy number for ' + res.data.content.vehicle_owner + ' successfully submitted ',
            onOk() {

            },
            onCancel() {
            },
        });
    }


    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/policy")
    };

    handleChange = (values) => {

        const data = []
        for (let i = 0; i < values.length; i++  ){
          data.push({
            service_id: values[i],
   
          })
        }

        console.log( 'values', data)

        // let service_id = ''
        // console.log('values', service_id= values)

        this.setState({service_id: data})

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState, insurance, service } = this.state;
        console.log("initial state", initialState)
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Member Policy Management"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/policy")} />
                    <Upload {...props}>
                        <Button style={{ marginBottom: 10 }} >
                            <UploadOutlined /> Click to Upload
    </Button>
                    </Upload>

        <Form onSubmit={this.handleSubmit} >

                        <Row gutter={8} >

                            <Col span={6}>

                                <Form.Item label="Service Name" hasFeedback>
                                {getFieldDecorator('services_covered_data', {
                                        initialValue: initialState ? initialState.services_covered_data.service_id : "",
                                        rules: [
                                            { required: true, message: 'Payer Name is required' }
                                        ],
                                    })(
                                        <Select
                                            mode="multiple"
                                            showSearch
                                            placeholder="Payer Name "
                                            optionFilterProp="children"
                                            onSearch={this.onSearch} 
                                            onChange={this.handleChange}
                                            defaultValue={['Towing']}
                                            
                                            >

                                            {service.map(item => (
                                                <Select.Option key={item.service_id} value={item.service_id}>
                                                    {item.service_name}
                                                </Select.Option>
                                            ))}
                                        </Select>
        )}
                                        
                                   
                                </Form.Item>
                            </Col>

                            <Col span={6}>

                                <Form.Item label="Payer Name" hasFeedback>
                                    {getFieldDecorator('payer_id', {
                                        initialValue: initialState ? initialState.payer_id : "",
                                        rules: [
                                            { required: true, message: 'Payer Name is required' }
                                        ],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="Payer Name "
                                            optionFilterProp="children"
                                            onSearch={this.onSearch}  >

                                            {insurance.map(item => (
                                                <Select.Option key={item.payer_id} value={item.payer_id}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item label="Policy No" hasFeedback>
                                    {getFieldDecorator('policy_number', {
                                        initialValue: initialState ? initialState.policy_number : "",
                                        rules: [
                                            { required: true, message: 'Policy Number is required' }
                                        ],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item label="Vehicle registration no" hasFeedback >
                                    {getFieldDecorator("vehicle_registration_number", {
                                        initialValue: initialState ? initialState.vehicle_registration_number : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Vehicle Registration Number",

                                            }
                                        ]
                                    })
                                        (<Input />)}

                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item label="Vehicle Owner" hasFeedback >
                                    {getFieldDecorator("vehicle_owner", {
                                        initialValue: initialState ? initialState.vehicle_owner : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Vehicle Owner",

                                            }
                                        ]
                                    })
                                        (<Input />)}

                                </Form.Item>
                            </Col>
                            <Col span={4}>

                                <Form.Item label="Date From " hasFeedback >
                                    {getFieldDecorator("date_from", {
                                        initialValue: initialState ? initialState.date_from : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Date From",

                                            }
                                        ]
                                    })
                                        (<Input/>)}

                                </Form.Item>
                            </Col>

                            <Col span={4}>

                                <Form.Item label="Date To" hasFeedback >
                                    {getFieldDecorator("date_to", {
                                        initialValue: initialState ? initialState.date_to : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Date To",

                                            }
                                        ]
                                    })
                                        (<Input/>)}

                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item label="Amount Limit" hasFeedback >
                                    {getFieldDecorator("amount_limit", {
                                        initialValue: initialState ? initialState.amount_limit : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Amount Limit",

                                            }
                                        ]
                                    })
                                        (<Input />)}

                                </Form.Item>
                            </Col>
                            

                            <Col span={6}>
                                <Form.Item label="" hasFeedback >
                                    {getFieldDecorator("member_policy_mngt_id", {
                                        initialValue: initialState ? initialState.member_policy_mngt_id : "",
                                        rules: [
                                            {
                                                required: false,
                                                message: "Enter the service code",

                                            }
                                        ]
                                    })
                                    }

                                </Form.Item>
                            </Col>


                            <Divider style={{ marginBottom: 8 }} />
                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>

                                    <Button onClick={this.handleBackTolist}>
                                        Cancel
                                </Button>
                                    {initialState ?
                                        <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
                                            Update
                                </Button> :
                                        <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit"  >
                                            Save
                              </Button>
                                    }

                                </Col>
                            </Row>
                        </Row>
                    </Form>            
                </Card>
            </div>
        );
    }
}

const WrappedAddPolicyManagement = Form.create({ name: 'new-service-points' })(AddPolicyManagement);

export default WrappedAddPolicyManagement;