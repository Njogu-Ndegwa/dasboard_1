import React from 'react';
import { Button, PageHeader,Input, Card, Select, Row, Col, Divider, Switch, message, Modal, Form } from 'antd';
import { RescueVehicleTypesService, ServiceProviderVehicle } from '../../../../../../config/service_provider';

class AddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            vehicleDetails: []

        }


    }


    componentDidMount() {

        RescueVehicleTypesService.fetchRescueVehicleTypes().then(res => {
            console.log("server response", res)
            if (res.data) {
                this.setState({ bank: res.data.content })
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
                    ServiceProviderVehicle.updateServiceProviderVehicle(values, values.banck_branch_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Service Provider Vehicle Details has been updated successfully')
                            this.props.history.push("/bank/branch")
                        } else {
                            message.error('There was an error updating the Service Provider Vehicle Details')
                        }
                    }) :
                    ServiceProviderVehicle.postServiceProviderVehicle(values).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            // message.success('Service Provider Vehicle Details has been saved successfully');
                            // this.props.history.push("/bank/branch")
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else {
                            message.error('There was an error saving the Service Provider Vehicle Details');
                        }

                    })



            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: res.data.content.vehicle_reg_number + ' successfully submitted ',
            onOk() {

            },
            onCancel() {
            },
        });
    }


    // handleBackTolist = () => {
    //     this.props.form.resetFields();
    //     this.props.history.push({
    //         pathname:"/serviceprovider/vehicle",
            // state: {
            //     serviceProvider: this.state.serviceProviderDetails
            // }
    //     })
    // };

    handleBack = () => {
        this.props.history.push({
            pathname: "/serviceprovider/vehicle",
            state: {
                serviceProvider: this.state.servicePoint
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState, vehicleDetails } = this.state;
        console.log("initial state", initialState)

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Vehicle details"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.handleBack()} />

                    <Form onSubmit={this.handleSubmit} >

                        <Row gutter={8} >
                            <Col span={6}>

                                <Form.Item label="Rescue Vehicle Type" hasFeedback>
                                    {getFieldDecorator('rescue_vehicle_type_id', {
                                        initialValue: initialState ? initialState.rescue_vehicle_type_id : "",
                                        rules: [
                                            { required: true, message: 'Rescue Vehicle Type is required' }
                                        ],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="Select Vehicle "
                                            optionFilterProp="children"
                                            onSearch={this.onSearch}  >

                                            {vehicleDetails.map(item => (
                                                <Select.Option key={item.main_bank_id} value={item.main_bank_id}>
                                                    {item.bank_name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item label="Registration Number" hasFeedback >
                                    {getFieldDecorator("vehicle_reg_number", {
                                        initialValue: initialState ? initialState.vehicle_reg_number : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Registration Number",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Registration Number' />)}

                                </Form.Item>
                            </Col>



                            <Col span={6}>

                                <Form.Item label="Insurance " hasFeedback >
                                    {getFieldDecorator("insurance_policy_no", {
                                        initialValue: initialState ? initialState.insurance_policy_no : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Insurance Policy Number",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Insurance' />)}

                                </Form.Item>
                            </Col>

                            <Col span={6}>

                                <Form.Item label="Insurance Id" hasFeedback >
                                    {getFieldDecorator("insurance_id", {
                                        initialValue: initialState ? initialState.insurance_id : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Insurance Id",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Insurance Id' />)}

                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item label="Insurance Start" hasFeedback >
                                    {getFieldDecorator("insurance_start_date", {
                                        initialValue: initialState ? initialState.insurance_start_date : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Insurance start date",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Insurance Start' />)}

                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item label="Insurance Expiry" hasFeedback >
                                    {getFieldDecorator("insurance_end_date", {
                                        initialValue: initialState ? initialState.insurance_end_date : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Insurance End Date",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Insurance Expiry' />)}

                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item label="Color" hasFeedback >
                                    {getFieldDecorator("color", {
                                        initialValue: initialState ? initialState.color : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Color",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Color' />)}

                                </Form.Item>
                            </Col>

                            <Col span={6}>

                                <Form.Item label="Model" hasFeedback >
                                    {getFieldDecorator("model", {
                                        initialValue: initialState ? initialState.model : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Year Of Manufacture",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Year Of Manufacture' />)}

                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item label="Vehicle details id" hasFeedback >
                                    {getFieldDecorator("sp_vehicle_details_id", {
                                        initialValue: initialState ? initialState.sp_vehicle_details_id : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Sp vehicle details id",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Vehicle Details id' />)}

                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="" hasFeedback >
                                    {getFieldDecorator("banck_branch_id", {
                                        initialValue: initialState ? initialState.banck_branch_id : "",
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

const WrappedAddVehicle = Form.create({ name: 'new-service-points' })(AddVehicle);

export default WrappedAddVehicle;