import React from 'react';
import { Button, PageHeader, Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { InsuranceService } from '../../../../../../config/_service';
const {Option} = Select


class AddInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeAccounts: [],
            expenseAccounts: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : ""
        }

    }

    componentDidMount() {

    }





    handleSubmit = e => {
        const { initialState } = this.state;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    InsuranceService.updateInsurance(values, values.payer_id).then(res => {
                        console.log('updated response', res);
                        if (res.status === 201) {
                            message.success("Insurance updated successfully");
                            this.props.history.push('/insurance');
                        } else { message.error("There was an error updating the distance limit") }
                    }) :

                    InsuranceService.postInsurance(values).then(res => {
                        console.log('saved response', res)
                        if (res.status === 201) {
                            // message.success("Insurance has been updated successfully");
                            // this.props.history.push('/distance');
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving the Insurance ") }
                    });


            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: res.data.content.name + 'Submitted Successfully' ,
            onOk() {
                
            },
            onCancel() {
            },
        });
    }
    handleClick= () => {
        
        this.setState({loading: true})
        
    setTimeout(() => {
        this.setState({
       loading:false
        });
      }, 5000);
        
    }
    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/insurance")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { incomeAccounts, expenseAccounts, isLoading, initialState } = this.state;
        console.log(initialState)


        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 12 },
            },
        };

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Payer"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/insurance")} />

                    <Form onSubmit={this.handleSubmit}>
<Row gutter={8}>
    <Col span={6}>
                        <Form.Item label="Insurance Name" hasFeedback>
                            {getFieldDecorator('name', {
                                initialValue: initialState ? initialState.name : "",
                                rules: [
                                    { required: true, message: 'Insurance Name is required' }
                                ],
                            })(<Input placeholder = 'Insurance Name' />)}
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Contact Number" hasFeedback>
                            {getFieldDecorator('contact', {
                                initialValue: initialState ? initialState.contact : "",
                                rules: [
                                    { required: true, message: 'Contact Number is required' }
                                ],
                            })(
                                <Input placeholder = 'Contact Number' />
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Address" hasFeedback>
                            {getFieldDecorator('address', {
                                initialValue: initialState ? initialState.address : "",
                                rules: [
                                    { required: true, message: 'Address is required' }
                                ],
                            })(
                                <Input placeholder = 'Address' />
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Capitation" hasFeedback>
                            {getFieldDecorator('capitation', {
                                initialValue: initialState ? initialState.capitation : "",
                                rules: [
                                    { required: false, message: 'Capitation is required' }
                                ],
                            })(
                                <Input placeholder = 'Capitation' />
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Co-pay Fixed Amount" hasFeedback>
                            {getFieldDecorator('co_pay_fxed_amt', {
                                initialValue: initialState ? initialState.co_pay_fxed_amt : "",
                                rules: [
                                    { required: false, message: 'Address is required' }
                                ],
                            })(
                                <Input placeholder = 'Address' />
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Co-pay Percentage" hasFeedback>
                            {getFieldDecorator('co_pay_percentage', {
                                initialValue: initialState ? initialState.co_pay_percentage : "",
                                rules: [
                                    { required: false, message: 'Address is required' }
                                ],
                            })(
                                <Input placeholder = 'Address' />
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Payment Terms" hasFeedback>
                            {getFieldDecorator('payment_terms', {
                                initialValue: initialState ? initialState.payment_terms : "",
                                rules: [
                                    { required: true, message: 'Address is required' }
                                ],
                            })(
                                <Input placeholder = 'Address' />
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Insurance ?" hasFeedback>
                            {getFieldDecorator('is_insurance', {
                                initialValue: initialState ? initialState.is_insurance : "",
                                rules: [
                                    { required: true, message: 'Address is required' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Vehicle Type"
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                <Option value='YES'>YES</Option>
                                <Option value='NO'>NO</Option>
                                   
                                </Select>
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="" hasFeedback>
                            {getFieldDecorator("payer_id", {
                                initialValue: initialState ? initialState.payer_id : "",
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
                        </Row>

                        <Divider style={{ marginBottom: 5 }} />
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>

                                <Button onClick={this.handleBackTolist}>
                                    Cancel
                                </Button>
                                {initialState ?
                                    <Button  onClick={this.handleClick} loading={this.state.loading} style={{ marginLeft: 8 }} type="primary" htmlType="submit">
                                        Update
                                </Button> :
                                    <Button  onClick={this.handleClick} loading={this.state.loading} style={{ marginLeft: 8 }} type="primary" htmlType="submit">
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

const WrappedAddInsurance = Form.create({ name: 'new-service-points' })(AddInsurance);

export default WrappedAddInsurance;