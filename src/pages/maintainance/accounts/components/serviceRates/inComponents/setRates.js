import React from 'react';
import { Button, PageHeader,  Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { ServiceRatesService, DistanceLimitService, ServiceCategoryService, MemberVehicleTypeService, MemberTypeService, MemberVehicleCategoryService } from '../../../../../../config/_service'

class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleCategory: [],
            vehicleType: [],
            distanceLimit: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            serviceCode: [],
            memberType: [],
            loading: false
        }

    }

    componentDidMount() {

        // Service Code
        ServiceCategoryService.fetchServiceCategories().then(res => {
            console.log("server response", res);
            if (res.data) {
                this.setState({ serviceCode: res.data.content });
            }
        }).catch(error => {
            console.log(error);
        })
        // Service Code

        //  Distance Limits

        DistanceLimitService.fetchDistanceLimits().then(res => {
            if (res.data) {
                this.setState({ distanceLimit: res.data.content });
            }
        }).catch(error => {
            console.log(error);
        })

        //  Distance Limits

        // Vehicle Category

        MemberVehicleCategoryService.fetchMemberVehicleCategory().then(res => {
            console.log("server response", res);
            if (res.data) {
                this.setState({ vehicleCategory: res.data.content });
            }
        }).catch(error => {
            console.log(error);
        })

        

        // Vehicle Category

        //  Vehicle Type

        MemberVehicleTypeService.fetchMemberVehicleType().then(res => {
            console.log("server response", res);
            if (res.data) {
                this.setState({ vehicleType: res.data.content });
            }
        }).catch(error => {
            console.log(error);
        })
        //  Vehicle Type

        //  Member Type

        MemberTypeService.fetchMemberType().then(res => {
            console.log("server response", res);
            if (res.data) {
                this.setState({ memberType: res.data.content });
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handleClick = () => {
        this.setState({loading: true})
    }






    handleSubmit = e => {
        const { initialState } = this.state
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?

                    ServiceRatesService.updateServiceRates(values, values.service_rate_id).then(res => {
                        console.log("updated response", res);
                        if (res.status === 201) {
                            this.setState({loading:false})
                            message.success("Service Rates have been updated successfully");
                            this.props.history.push('/settings/ratesdetails');
                        } else { message.error("There was an error updating Service Rates") }
                    }) :

                    ServiceRatesService.postServiceRates(values).then(res => {
                        console.log("saved response", res);
                        if (res.status === 201) {
                            this.setState({loading:false})
                            // message.success("Service Rates have been saved succesfully ");
                            // this.props.history.push('/settings/ratesdetails');
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving Service Rates") }
                    });



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
            content: 'Service Rate Successfully Submitted',
            onOk() {
                
            },
            onCancel() {
            },
        });
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/settings/ratesdetails")
    };

    handleChangeVehicleCategories = (id) => {
        console.log("id", id)
        MemberVehicleCategoryService.fetchMemberVehicleCategoryId(id).then(res => {
            console.log("server response", res);
           this.setState({vehicleType: res.data.content})
        }). catch( error => {
            console.log(error)
        })

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { vehicleType, vehicleCategory, isLoading, initialState, serviceCode, distanceLimit, memberType } = this.state;
        console.log(initialState)



        return (
            <div id="content">
                <Card >
                    <PageHeader
                        title="Service Rates"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/settings/ratesdetails")} />

                    <Form onSubmit={this.handleSubmit} layout="horizontal"  >
                        <Row gutter={24}>
                            <Col span={8} >

                        <Form.Item label="Service Category" hasFeedback>
                            {getFieldDecorator('service_category_id', {
                                initialValue: initialState ? initialState.service_category_id: "",
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
                        </Col>

                        <Col span={8} >
                        <Form.Item label="Vehicle Category" hasFeedback >
                            {
                                getFieldDecorator('dd', {
                                    initialValue: initialState ? initialState.member_vehicle_category_name: ''
                                })
                            
                            (<Select
                                showSearch
                                placeholder="Vehicle Category"
                                optionFilterProp="children"
                                onChange={this.handleChangeVehicleCategories}  >

                                {vehicleCategory.map(item => (
                                    <Select.Option key={item.category_id} value={item.category_id}>
                                        {item.category_name}
                                    </Select.Option>
                                ))}
                            </Select>)
    }
                        </Form.Item>
                        </Col>
                        <Col span={8} >
                        <Form.Item label="Vehicle Type" hasFeedback>
                            {getFieldDecorator('member_vehicle_type_id', {
                                initialValue: initialState ? initialState.member_vehicle_type_id : "",
                                rules: [
                                    { required: true, message: 'Vehicle Type is required' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Vehicle Type"
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {vehicleType.map(item => (
                                        <Select.Option key={item.type_id} value={item.type_id}>
                                            {item.member_vehicle_type_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        </Col>
                        {/* <Col span={8} >
                        
                        <Form.Item label="Distance From" hasFeedback>
                            {getFieldDecorator('distance_limit_id', {
                                initialValue: initialState ? initialState.distance_limits.id : "",
                                rules: [
                                    { required: true, message: 'Distance Limit is required' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Distance limit required"
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {distanceLimit.map(item => (
                                        <Select.Option key={item.distance_id} value={item.distance_id}>
                                            {item.distance_from} 
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>

                        </Col>
                        <Col span={8} >

                        <Form.Item label="Distance To" hasFeedback>
                            {getFieldDecorator('distance_limit_id', {
                                initialValue: initialState ? initialState.distance_limits.id : "",
                                rules: [
                                    { required: true, message: 'Distance Limit is required' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Distance limit required"
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {distanceLimit.map(item => (
                                        <Select.Option key={item.distance_id} value={item.distance_id}>
                                             {item.distance_to}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        </Col> */}

                        <Col span={8} >

                        <Form.Item label="Distance Limit" hasFeedback>
                            {getFieldDecorator('distance_limit_id', {
                                initialValue: initialState ? initialState.distance_limit_id: "",
                                rules: [
                                    { required: true, message: 'Distance Limit is required' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Distance limit required"
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {distanceLimit.map(item => (
                                        <Select.Option key={item.distance_id} value={item.distance_id}>
                                             {item.distance_from} - {item.distance_to}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>

                        </Col>
                        <Col span={8} >

                        <Form.Item label="Member Subscription" hasFeedback>
                            {getFieldDecorator('member_type_id', {
                                initialValue: initialState ? initialState.member_type_id : '',
                                rules: [
                                    { required: true, message: 'Enter the Member Subscription' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Enter the Member Subscription"
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {memberType.map(item => (
                                        <Select.Option key={item.member_type_id} value={item.member_type_id}>
                                            {item.member_type_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        </Col>

                        <Col span={8} >

                        <Form.Item label="Amount per Km" hasFeedback>
                            {getFieldDecorator('amt_per_km', {
                                initialValue: initialState ? initialState.amt_per_km : "",
                                rules: [
                                    { required: true, message: 'Amount per Km is required' }
                                ],
                            })(
                                <Input placeholder = 'Amount per Km' />
                            )}
                        </Form.Item>
                        </Col>

                        <Col span={8} >

                        <Form.Item label="Base fee" hasFeedback>
                            {getFieldDecorator('base_fee', {
                            initialValue: initialState ? initialState.base_fee : '',
                                rules: [
                                    { required: true, message: 'Enter The Base Fee' }
                                ],
                            })(
                                <Input placeholder = 'Flat Rate' />
                            )}
                        </Form.Item>
                        </Col>

                        <Col span={8} >

                        <Form.Item label="Amount Per Hour" hasFeedback>
                            {getFieldDecorator('amt_per_hour', {
                                initialValue: initialState ? initialState.amt_per_hour : "",
                                rules: [
                                    { required: true, message: 'Enter Service Rate Code' }
                                ],
                            })(<Input placeholder = 'Amount Per Hour' />)

                            }
                        </Form.Item>
                        </Col>
                        <Col span={8} >

                        <Form.Item label="" hasFeedback>
                            {getFieldDecorator('service_rate_id', {
                                initialValue: initialState ? initialState.service_rate_id : "",
                                rules: [
                                    { required: false, message: 'Enter the service rate' }
                                ],
                            })

                            }
                        </Form.Item>
                        </Col>




                        <Divider style={{ marginBottom: 10 }} />
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>

                                <Button onClick={this.handleBackTolist}>
                                    Cancel
                                </Button>
                                {initialState ?
                                    <Button  onClick={this.handleClick} loading={this.state.loading}style={{ marginLeft: 8 }} type="primary" htmlType="submit">
                                        Update
                                </Button> :
                                    <Button  onClick={this.handleClick} loading={this.state.loading}style={{ marginLeft: 8 }} type="primary" htmlType="submit">
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

const WrappedAddPoint = Form.create({ name: 'new-service-points' })(AddPoint);

export default WrappedAddPoint;