import React from 'react';
import { Button, PageHeader, Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { RescueVehicleTypesService } from '../../../../../../config/_service';
class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeAccounts: [],
            expenseAccounts: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            loading: false,
        }

    }

    componentDidMount() {

    }

    handleClick = () => {
        this.setState({loading: true})
    }




    handleSubmit = e => {
        const { initialState } = this.state;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    RescueVehicleTypesService.updateRescueVehicleTypes(values, values.rescue_vehicle_id).then(res => {
                        console.log("updated response", res);
                        if (res.status === 201) {
                            this.setState({loading: false})
                            message.success("Rescue Vehicle Types have been updated succesfully");
                            this.props.history.push("/settings/vehicledetails");
                        } else { message.error("There was an error updating Rescue Vehicle Types") }
                    }) :

                    RescueVehicleTypesService.postRescueVehicleTypes(values).then(res => {
                        console.log("saved response", res);
                        if (res.status === 201) {
                            this.setState({loading: false})
                            // message.success("Rescue Vehicle Types have been saved succesfully");
                            // this.props.history.push("/settings/vehicledetails");
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving Rescue Vehicle Types") }
                    })



            }
        });
    };
    handleClick= () => {
        
        this.setState({loading: true})
        
    setTimeout(() => {
        this.setState({
       loading:false
        });
      }, 5000);
        
    }
    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: res.data.content.type_name + ' successfully submitted ',
            onOk() {

            },
            onCancel() {
            },
        });
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/settings/vehicledetails")
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
                        title="Vehicle Details"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/settings/vehicledetails")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                        <Form.Item label="Vehicle Type" hasFeedback>
                            {getFieldDecorator('type_name', {
                                initialValue: initialState ? initialState.type_name : "",
                                rules: [
                                    { required: true, message: 'Vehicle Type is required' }
                                ],
                            })(<Input placeholder='Vehicle Type' />)}
                        </Form.Item>

                        <Form.Item label="Identifier Code" hasFeedback>
                            {getFieldDecorator('rescue_vehicle_id_code', {
                                initialValue: initialState ? initialState.rescue_vehicle_id_code : "",
                                rules: [
                                    { required: true, message: 'Vehicle Id is required' }
                                ],
                            })(
                                <Input placeholder='Identifier Code' />
                            )}
                        </Form.Item>

                        <Form.Item label="Running Cost" hasFeedback >
                            {getFieldDecorator("running_cost_per_km", {
                                initialValue: initialState ? initialState.running_cost_per_km : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Select the running Cost"
                                    }
                                ]
                            })(
                                <Input placeholder='Running Cost' />
                            )}
                        </Form.Item>

                        <Form.Item label="" {...formItemLayout}>
                            {getFieldDecorator("rescue_vehicle_id", {
                                initialValue: initialState ? initialState.rescue_vehicle_id : "",
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