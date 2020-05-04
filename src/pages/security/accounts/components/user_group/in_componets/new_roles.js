import React from 'react';
import { Button, PageHeader, Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { DistanceLimitService } from '../../../../../../config/_service';

class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeAccounts: [],
            expenseAccounts: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            disabled: true
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
                    DistanceLimitService.updateDistanceLimits(values, values.distance_id).then(res => {
                        console.log('updated response', res);
                        if (res.status === 201) {
                            message.success("Distance limit updated successfully");
                            this.props.history.push('/distance');
                        } else { message.error("There was an error updating the distance limit") }
                    }) :

                    DistanceLimitService.postDistanceLimits(values).then(res => {
                        console.log('saved response', res)
                        if (res.status === 201) {
                            // message.success("Distance limit has been updated successfully");
                            // this.props.history.push('/distance');
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving the distance limit ") }
                    });


            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: 'Distance Limits successfully submitted \n Given No. ' + res.data.content.distance_identifier_code,
            onOk() {
                
            },
            onCancel() {
            },
        });
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/usergroup")
    };

    handleClick = () => {
        this.setState({disabled: !this.state.disabled});

        console.log(this.state.disabled, 'disabled')
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log('gettt firls', getFieldDecorator)
        const { incomeAccounts, expenseAccounts, isLoading, initialState, disabled } = this.state;
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
                        title="Manage User Roles"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/usergroup")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                        <Form.Item label="Role Name" hasFeedback>
                            {getFieldDecorator('name', {
                                initialValue: initialState ? initialState.name : "",
                                rules: [
                                    { required: true, message: 'Role Name is required' }
                                ],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label="Description" hasFeedback>
                            {getFieldDecorator('description', {
                                initialValue: initialState ? initialState.description : "",
                                rules: [
                                    { required: true, message: 'Description is required' }
                                ],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="Role Id" hasFeedback>
                            {getFieldDecorator('id', {
                                initialValue: initialState ? initialState.id : "",
                                rules: [
                                    { required: true, message: 'Role Id is required' }
                                ],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="Disable" hasFeedback>
                            {getFieldDecorator('disabled', {
                                initialValue: initialState ? initialState.disabled : '',
                                rules: [
                                    { required: true, message: 'Role Id is required' }
                                ],
                            })(
                            <Switch onClick={this.handleClick} defaultChecked />
                            )}
                        </Form.Item>


                        <Form.Item label="" hasFeedback>
                            {getFieldDecorator("distance_id", {
                                initialValue: initialState ? initialState.distance_id : "",
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
                                    <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit">
                                        Update
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