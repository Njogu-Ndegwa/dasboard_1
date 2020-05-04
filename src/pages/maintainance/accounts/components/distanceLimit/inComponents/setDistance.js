import React from 'react';
import { Button, PageHeader,Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { DistanceLimitService } from '../../../../../../config/_service';
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


handleClick= () => {

    this.props.form.validateFields((err) => {
        if(!err) {
            this.setState({loading: true})
            setTimeout( () => {
                this.setState({loading: false})
            }, 10000 )
        }
    } )

   
    
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
                            this.setState({loading: false})
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
        this.props.history.push("/distance")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log('gettt firls', getFieldDecorator)
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
                        title="Distance Limits"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/distance")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                        <Form.Item label="Distance from" hasFeedback>
                            {getFieldDecorator('distance_from', {
                                initialValue: initialState ? initialState.distance_from : "",
                                rules: [
                                    { required: true, message: 'Distance From is required' }
                                ],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label="To" hasFeedback>
                            {getFieldDecorator('distance_to', {
                                initialValue: initialState ? initialState.distance_to : "",
                                rules: [
                                    { required: true, message: 'Distance To is required' }
                                ],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="Identifier Code" hasFeedback>
                            {getFieldDecorator('distance_identifier_code', {
                                initialValue: initialState ? initialState.distance_identifier_code : "",
                                rules: [
                                    { required: true, message: 'Identifier Code is required' }
                                ],
                            })(
                                <Input />
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

const WrappedAddPoint = Form.create({ name: 'new-service-points' })(AddPoint);

export default WrappedAddPoint;