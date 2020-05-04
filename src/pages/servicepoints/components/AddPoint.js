import React from 'react';
import { Button, PageHeader, Form, Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

class AddPoint extends React.Component {
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
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { expense_account, income_account, ...newValues } = values
                const { initialState } = this.state

                let servicePoint = {
                    ...newValues,
                    expense_account: {
                        account_number: values.expense_account
                    },
                    income_account: {
                        account_number: values.income_account
                    }
                }

                console.log(servicePoint)
                if (initialState) {
                    this.editServicePoint(servicePoint, initialState.id)
                } else {
                    this.createServicePoint(servicePoint)
                }

            }
        });
    };

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/settings/servicepoints")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { incomeAccounts, expenseAccounts, isLoading, initialState } = this.state;
        console.log(initialState)


        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Service Points"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/settings/servicepoints")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>
                        <Form.Item label="Type">
                            {getFieldDecorator("service_point_type", {
                                initialValue: initialState ? initialState.type : "",
                                rules: [
                                    {
                                        required: false,
                                        message: "Select the type"
                                    }
                                ]
                            })(
                                <Select>
                                    <Option value="Triage">Triage</Option>
                                    <Option value="Consultation">Consultation</Option>
                                    <Option value="Pharmacy">Pharmacy</Option>
                                    <Option value="Laboratory">Laboratory</Option>
                                    <Option value="Radiology">Radiology</Option>
                                </Select>
                            )}
                        </Form.Item>


                        <Form.Item label="Name" hasFeedback>
                            {getFieldDecorator('name', {
                                initialValue: initialState ? initialState.name : "",
                                rules: [
                                    { required: true, message: 'Name is required' }
                                ],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label="Description" hasFeedback>
                            {getFieldDecorator('description', {
                                initialValue: initialState ? initialState.description : "",
                                rules: [
                                    { required: false, message: 'Description is required' }
                                ],
                            })(
                                <TextArea rows={3} />
                            )}
                        </Form.Item>
                        <Form.Item label="Income Account" hasFeedback>
                            {getFieldDecorator('income_account', {
                                initialValue: initialState ? initialState.income_account.account_number : "",
                                rules: [
                                    { required: true, message: 'Income Account is required' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Select an expense account"
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {incomeAccounts.map(item => (
                                        <Select.Option key={item.account_number} value={item.account_number}>
                                            {item.account_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Expense Account" hasFeedback>
                            {getFieldDecorator('expense_account', {
                                initialValue: initialState ? initialState.expense_account.account_number : "",
                                rules: [
                                    { required: true, message: 'Expense Account is required' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Select an income account"
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {expenseAccounts.map(item => (
                                        <Select.Option key={item.account_number} value={item.account_number}>
                                            {item.account_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Activate" >
                            {getFieldDecorator('active', {
                                valuePropName: 'checked',
                                initialValue: initialState ? initialState.active : false,
                            })(
                                <Switch />
                            )}
                        </Form.Item>

                        <Divider style={{ marginBottom: 5 }} />
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>

                                <Button onClick={this.handleBackTolist}>
                                    Cancel
                                </Button>
                                {initialState ?
                                    <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit">
                                        Edit
                                </Button> :
                                    <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit">
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

const WrappedAddPoint = Form.create({ name: 'new-service-points' })(AddPoint);

export default WrappedAddPoint;