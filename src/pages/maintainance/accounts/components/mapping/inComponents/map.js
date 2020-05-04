import React from 'react';
import { Button, PageHeader, Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { MappingService, RescueVehicleTypesService, MemberVehicleTypeService } from '../../../../../../config/_service';

class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleType: [],
            rescueType: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            loading: false
        }

    }


    componentDidMount() {

        MemberVehicleTypeService.fetchMemberVehicleType().then(res => {
            console.log("server response", res);
            if (res.data) {
                this.setState({ vehicleType: res.data.content });
            }
        }).catch(error => {
            console.log(error);
        })

        //Rescue Vehicles

        RescueVehicleTypesService.fetchRescueVehicleTypes().then(res => {
            console.log("server response", res);
            if (res.data) {
                this.setState({ rescueType: res.data.content });
            }
        }).catch(error => {
            console.log(error);
        })

    }


    handleClick = () => {
        this.setState({loading: true})
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

                    MappingService.updateMapping(values, values.vehicles_mapper_id).then(res => {
                        console.log("updated response", res)
                        if (res.status === 201) {
                            this.setState({loading: true})
                            message.success("Map has been updated successfully")
                            this.props.history.push('/map')
                        } else { message.error("There was an error updating Mapping") }
                    }) :
                    MappingService.postMapping(values).then(res => {
                        console.log("saved response", res)
                        if (res.status === 201) {
                            this.setState({loading: true})
                            // message.success("Member  Type has been saved succesfully ")
                            // this.props.history.push('/membertype')
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving Mapping") }
                    });




                // setTimeout( () => this.props.history.push("/vehicledetails"),1000)
            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content:'Vehicles Mapped Successfully',
            onOk() {
                
            },
            onCancel() {
            },
        });
    }


    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/map")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { vehicleType, isLoading, initialState, rescueType } = this.state;
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
                        title="Map"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/map")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                        <Form.Item label="Rescue Vehicle Types" hasFeedback>
                            {getFieldDecorator('rescue_vehicle_id', {
                                initialValue: initialState ? initialState.rescue_vehicle_id : "",
                                rules: [
                                    { required: true, message: 'Rescue Type is required' }
                                ],
                            })(<Select
                                showSearch
                                placeholder="Select Rescue Vehicle type"
                                optionFilterProp="children"
                                onSearch={this.onSearch}  >

                                {rescueType.map(item => (
                                    <Select.Option key={item.rescue_vehicle_id} value={item.rescue_vehicle_id}>
                                        {item.type_name}
                                    </Select.Option>
                                ))}
                            </Select>)}
                        </Form.Item>

                        {/* <Form.Item label="Category Code" hasFeedback>
                            {getFieldDecorator('member_vehicle_type_id_code', {
                                initialValue: initialState ? initialState.description : "",
                                rules: [
                                    { required: true, message: 'Vehicle Id is required' }
                                ],
                            })(
                                <Input />
                            )}
                        </Form.Item> */}

                        <Form.Item label="Member Vehicle Type " hasFeedback>
                            {getFieldDecorator('member_vehicle_type_id', {
                                initialValue: initialState ? initialState.member_vehicle_type_id : "",
                                rules: [
                                    { required: true, message: 'Member Vehicle Type  is required' }
                                ],
                            })(
                                <Select
                                showSearch
                                placeholder="Select Member Vehicle Type"
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

                        <Form.Item label="" hasFeedback>
                            {getFieldDecorator("vehicles_mapper_id", {
                                initialValue: initialState ? initialState.vehicles_mapper_id : "",
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

