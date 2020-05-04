import React from 'react';
import { Button, PageHeader, Input, Card, Select, Row, Col, Divider, Switch, message, Modal, DatePicker, Upload, Form } from 'antd'
import { RecieptsService } from '../../../../../config/claims_management_service';
import { InsuranceService } from '../../../../../config/_service';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
class AddPolicyManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            insurance: [],

        }


    }


    componentDidMount() {

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
        const { initialState } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    RecieptsService.updateReciepts(values, values.member_policy_mngt_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Member Policy Management has been updated successfully')
                            this.props.history.push("/policy")
                        } else {
                            message.error('There was an error updating the Member Policy Management')
                        }
                    }) :
                    RecieptsService.postReciepts(values).then(res => {
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
            content: 'Reciept for' + res.data.content.payer_name + ' successfully submitted ',
            onOk() {

            },
            onCancel() {
            },
        });
    }


    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/reciepts")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState, insurance } = this.state;
        console.log("insurance", insurance)
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
       
        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 12 },
                }
                : null;

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Prepare Reciepts"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/reciepts")} />


                    <Form onSubmit={this.handleSubmit} >

                        <Form.Item label="" >

                        </Form.Item>

                        <Form.Item label="Payer Name" {...formItemLayout} >
                            {getFieldDecorator("payer_id", {
                                initialValue: initialState ? initialState.payer_name : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the service Name"
                                    }
                                ]
                            })
                                ( <Select
                                    showSearch
                                    placeholder="Payer Name "
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >
                        
                                    {insurance.map(item => (
                                        console.log('item', item),
                                        <Select.Option key={item.payer_id} value={item.payer_id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>)}
                        </Form.Item>

                        <Form.Item label="Document no: "  {...formItemLayout}  >
                            {getFieldDecorator("document_number", {
                                initialValue: initialState ? initialState.document_number : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Document Number",

                                    }
                                ]
                            })
                                (<Input placeholder='Document Number' />)}
                            {/* <Input onChange={this.handleChange}  id='service_code' name='service_code' placeholder="Enter the service code" id='service_code' value={this.state.data.service_code} /> */}
                        </Form.Item>
                        <Form.Item label="Payment Mode "  {...formItemLayout}  >
                            {getFieldDecorator("mode", {
                                initialValue: initialState ? initialState.mode : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Payment Mode",

                                    }
                                ]
                            })
                                (<Select value='payment mode'>
                                    <Select.Option value='Cash' >
                                        Cash
                                    </Select.Option>
                                    <Select.Option value='Cheque' >
                                        Cheque
                                    </Select.Option>
                                    <Select.Option value='ElectronicFundsTransfer' >
                                    ElectronicFundsTransfer
                                    </Select.Option>
                                </Select>)}
                            {/* <Input onChange={this.handleChange}  id='service_code' name='service_code' placeholder="Enter the service code" id='service_code' value={this.state.data.service_code} /> */}
                        </Form.Item>

                        <Form.Item label="Document Date: "  {...formItemLayout}  >
                            {getFieldDecorator("document_date", {
                                initialValue: initialState ? initialState.document_date : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Document Date",

                                    }
                                ]
                            })
                                (<DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                format={"YYYY/MM/DD"}/>)}
                            {/* <Input onChange={this.handleChange}  id='service_code' name='service_code' placeholder="Enter the service code" id='service_code' value={this.state.data.service_code} /> */}
                        </Form.Item>

                        <Form.Item label="Amount: "  {...formItemLayout}  >
                            {getFieldDecorator("amount", {
                                initialValue: initialState ? initialState.amount : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Amount",

                                    }
                                ]
                            })
                                (<Input placeholder='Amount' />)}
                            {/* <Input onChange={this.handleChange}  id='service_code' name='service_code' placeholder="Enter the service code" id='service_code' value={this.state.data.service_code} /> */}
                        </Form.Item>

                        <Form.Item label="" >
                            {getFieldDecorator("service_id", {
                                initialValue: initialState ? initialState.service_id : "",
                                rules: [
                                    {
                                        required: false,
                                        message: "Enter the service code",

                                    }
                                ]
                            })
                            }

                        </Form.Item>

                        <Divider style={{ marginBottom: 5 }} />
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>

                                <Button onClick={this.handleBackTolist}>
                                    Cancel
        </Button>
                                {initialState ?
                                    <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
                                        Update
        </Button> :
                                    <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit"   >
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

const WrappedAddPolicyManagement = Form.create({ name: 'new-service-points' })(AddPolicyManagement);

export default WrappedAddPolicyManagement;