import React from 'react';
import { Button, PageHeader,  Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { CommissionRateservice, ServiceCategoryService } from '../../../../../../config/_service';
class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceCode: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : ""
        }

    }

    componentDidMount() {
        ServiceCategoryService.fetchServiceCategories().then(res => {
            console.log("server response", res);
            if (res.data) {
                this.setState({ serviceCode: res.data.content });
            }
        }).catch(error => {
            console.log(error);
        })
    }


    handleClick= () => {
        
        this.setState({loading: true})
        
    setTimeout(() => {
        this.setState({
       loading:false
        });
      }, 5000);
        
    }


    handleSubmit = e => {
        const { initialState } = this.state;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    CommissionRateservice.updateCommissionRates(values, values.commission_rate_id ).then(res => {
                        console.log('updated response', res);
                        if (res.status === 201) {
                            message.success("Distance limit updated successfully");
                            this.props.history.push('/commission');
                        } else { message.error("There was an error updating the Commision Rates") }
                    }) :

                    CommissionRateservice.postCommissionRates(values).then(res => {
                        console.log('saved response', res)
                        if (res.status === 201) {
                            // message.success("Commision Rates has been updated successfully");
                            // this.props.history.push('/distance');
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving the Commision Rates ") }
                    });


            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: 'Service provider Commision Rate submitted successfully',
            onOk() {
                
            },
            onCancel() {
            },
        });
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/commission")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log('gettt firls', getFieldDecorator)
        const { serviceCode, isLoading, initialState } = this.state;
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
                        title="Manage Commission Rates"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/commission")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                    <Form.Item label="Service Name" hasFeedback>
                            {getFieldDecorator('service_id', {
                                initialValue: initialState ? initialState.service_id: "",
                                rules: [
                                    { required: true, message: 'Service Code is required' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Select a Service Code"
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {serviceCode.map(item => (
                                        <Select.Option key={item.service_id} value={item.service_id}>
                                            {item.service_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="Percentage Rate" hasFeedback>
                            {getFieldDecorator('percentage_rate', {
                                initialValue: initialState ? initialState.percentage_rate : "",
                                rules: [
                                    { required: true, message: 'Percentage Rate is required' }
                                ],
                            })(
                                <Input />
                            )}
                        </Form.Item>


                        <Form.Item label="" hasFeedback>
                            {getFieldDecorator("commission_rate_id", {
                                initialValue: initialState ? initialState.commission_rate_id : "",
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