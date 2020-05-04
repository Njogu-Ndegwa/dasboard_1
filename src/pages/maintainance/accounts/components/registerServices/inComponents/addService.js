

import React from 'react';
import { Button, PageHeader, Input, Card, Select, Row, Col, Divider, Switch, message, Modal, Form } from 'antd'
import { ServiceCategoryService } from '../../../../../../config/_service'

class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            loading: false,
        }
        


    }


    componentDidMount() {


    }
    



    handleChange = e => {
        const data = { ...this.state.data }
        data[e.currentTarget.name] = e.currentTarget.value

        this.setState({ data })



    }

    handleClick= () => {
        
        this.setState({loading: true})
        
    setTimeout(() => {
        this.setState({
       loading:false
        });
      }, 5000);
        
    }

    handleSubmit = async e => {
        const { initialState } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    ServiceCategoryService.updateServiceCategories(values, values.service_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Service category has been updated successfully')
                            this.props.history.push("/settings/servicepoint")
                            this.setState({loading: false})
                        } else {
                            message.error('There was an error updating the service Category')
                        }
                    }) :
                    ServiceCategoryService.postServiceCategories(values).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            this.setState({loading: false})
                            // message.success('Service category has been saved successfully');
                            // this.props.history.push("/settings/servicepoint")
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else {
                            message.error('There was an error saving the service category');
                        }

                    })



            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: res.data.content.service_name + ' successfully submitted ',
            onOk() {

            },
            onCancel() {
            },
        });
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/settings/servicepoint")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState } = this.state;
        console.log(initialState)

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
                        title="Service Category"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/settings/servicepoint")} />

                    <Form onSubmit={this.handleSubmit} >

                        <Form.Item label="" >

                        </Form.Item>

                        <Form.Item label="Service Name" {...formItemLayout} >
                            {getFieldDecorator("service_name", {
                                initialValue: initialState ? initialState.service_name : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the service Name"
                                    }
                                ]
                            })
                                (<Input placeholder='Service Name' />)}
                        </Form.Item>

                        <Form.Item label="Service Code"  {...formItemLayout}  >
                            {getFieldDecorator("service_code", {
                                initialValue: initialState ? initialState.service_code : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the service code",

                                    }
                                ]
                            })
                                (<Input placeholder='Service Code' />)}
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



                        <Form.Item label="Top 5" {...formItemLayout} >
                            {getFieldDecorator('core_service', {
                                valuePropName: 'checked',
                                initialValue: initialState ? initialState.core_service : false,
                                //    initialValue: initialState? initialState.core_service : false
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
                                    <Button onClick={this.handleClick} loading={this.state.loading} style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
                                        Update
                                </Button> :
                                    <Button onClick={this.handleClick} loading={this.state.loading} style={{ marginLeft: 8 }} type="primary" htmlType="submit"   >
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