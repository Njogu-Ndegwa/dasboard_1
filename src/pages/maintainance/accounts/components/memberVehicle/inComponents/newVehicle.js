import React from 'react';
import { Button, PageHeader,  Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { MemberVehicleTypeService, MemberVehicleCategoryService } from '../../../../../../config/_service';

class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleCategory: [],
            expenseAccounts: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            loading: false
        }

    }

    componentDidMount() {

MemberVehicleCategoryService.fetchMemberVehicleCategory().then(res => {
    console.log("server response", res)
    if(res.data){
        this.setState({vehicleCategory: res.data.content})
    }
}).catch (error => {
    console.log(error)
})

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

                    MemberVehicleTypeService.updateMemberVehicleType(values, values.type_id).then(res => {
                        console.log("updated response", res)
                        if (res.status === 201) {
                            this.setState({loading: false})
                            message.success("Member Vehicle Type has been updated successfully")
                            this.props.history.push('/vehicledetails')
                        } else { message.error("There was an error updating Member Vehicle Category") }
                    }) :
                    MemberVehicleTypeService.postMemberVehicleType(values).then(res => {
                        console.log("saved response", res)
                        if (res.status === 201) {
                            this.setState({loading: false})
                            // message.success("Member Vehicle Type has been saved succesfully ")
                            // this.props.history.push('/vehicledetails')
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving Member Vehicle Category") }
                    });




                // setTimeout( () => this.props.history.push("/vehicledetails"),1000)
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
            content: res.data.content.member_vehicle_type_name + ' successfully submitted ',
            onOk() {
                
            },
            onCancel() {
            },
        });
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/vehicledetails")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { vehicleCategory, isLoading, initialState } = this.state;
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
                        title="Member Vehicle Type"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/vehicledetails")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                        <Form.Item label="Vehicle Type" hasFeedback>
                            {getFieldDecorator('member_vehicle_type_name', {
                                initialValue: initialState ? initialState.member_vehicle_type_name : "",
                                rules: [
                                    { required: true, message: 'Vehicle Type is required' }
                                ],
                            })(<Input placeholder = 'Vehicle Type' />)}
                        </Form.Item>

                        

                        <Form.Item label="Identifier Code" hasFeedback>
                            {getFieldDecorator('member_vehicle_type_id_code', {
                                initialValue: initialState ? initialState.member_vehicle_type_id_code : "",
                                rules: [
                                    { required: true, message: 'Identifier Code is required' }
                                ],
                            })(
                                <Input placeholder = 'Identifier Code' />
                            )}
                        </Form.Item>

                        <Form.Item label="Category Type" hasFeedback>
                            {getFieldDecorator('category_id', {
                                initialValue: initialState ? initialState.category_id : "",
                                rules: [
                                    { required: true, message: 'Category Type is required' }
                                    
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder = 'Category Type'
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {vehicleCategory.map(item => (
                                        <Select.Option key={item.category_id} value={item.category_id} >
                                            {item.category_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>


                        <Form.Item label="" {...formItemLayout}>
                            {getFieldDecorator("type_id", {
                                initialValue: initialState ? initialState.type_id : "",
                                rules: [
                                    {
                                        required: false,
                                        message: "Enter the type id",

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