
import React from 'react';
import { Button, PageHeader, Form, Input, Card, Select, Row, Col, Divider, Switch, message, Modal } from 'antd'
import {PrepareInvoiceService} from '../../../../../config/claims_management_service'


class AddPolicyManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            bank: [],

        }


    }


    componentDidMount() {

       

    }

    handleSubmit = async e => {
        const { initialState } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    PrepareInvoiceService.updatePrepareInvoice(values, values.banck_branch_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Bank Branch has been updated successfully')
                            this.props.history.push("/bank/branch")
                        } else {
                            message.error('There was an error updating the Bank Branch')
                        }
                    }) :
                    PrepareInvoiceService.postPrepareInvoice(values).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            // message.success('Bank Branch has been saved successfully');
                            // this.props.history.push("/bank/branch")
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else {
                            message.error('There was an error saving the Bank Branch');
                        }

                    })



            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: res.data.content.branch_name+ ' successfully submitted ',
            onOk() {
                
            },
            onCancel() {
            },
        });
    }


    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/newinvoice")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState, bank } = this.state;
        console.log("initial state",initialState)
        console.log(this.props.location, 'sdfsdfsd')

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Prepare Invoice"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/newinvoice")} />

                    <Form onSubmit={this.handleSubmit} >

                        <Row gutter={8} >
                            <Col span={6}>

                        <Form.Item label="Status" hasFeedback>
                            {getFieldDecorator('status', {
                                initialValue: initialState ? initialState.status : "",
                                rules: [
                                    { required: true, message: 'Main Bank is required' }
                                ],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={6}>

                        <Form.Item label="Request Number"  hasFeedback >
                            {getFieldDecorator("request_id", {
                                initialValue: initialState ? initialState.request_id : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Request Id",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={6}>

                        <Form.Item label="Payer Name" hasFeedback >
                            {getFieldDecorator("payer_id", {
                                initialValue: initialState ? initialState.payer_id : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Payer Id",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={6}>

                        <Form.Item label="Due Date" hasFeedback >
                            {getFieldDecorator("due_date", {
                                initialValue: initialState ? initialState.due_date : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Due Date",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={6}>

                        <Form.Item label="Total Amount " hasFeedback >
                            {getFieldDecorator("total_amount", {
                                initialValue: initialState ? initialState.total_amount : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the total",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={6}>

                        <Form.Item label="Amount Balance" hasFeedback >
                            {getFieldDecorator("amount_balance", {
                                initialValue: initialState ? initialState.amount_balance : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Amount Balance",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={6}>

                        <Form.Item label="Narration" hasFeedback >
                            {getFieldDecorator("narration", {
                                initialValue: initialState ? initialState.narration : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Narration",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>

                        </Col>
                        <Col span={6}>
                        <Form.Item label="" hasFeedback >
                            {getFieldDecorator("invoice_id", {
                                initialValue: initialState ? initialState.invoice_id : "",
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