import React from 'react';
import { Button, PageHeader,  Input, Card, Select, Row, Col, Divider, Switch, message, Modal, TimePicker, Form } from 'antd';
import moment from 'moment';
import {GlobalSettingsService} from '../../config/settings';

class AddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            vehicleDetails: [],
            dataSource: [],

        }


    }


    componentDidMount() {
        GlobalSettingsService.fetchGlobalSettings().then(res => {
            console.log(" server response", res);
            if(res.data){
              this.setState({dataSource: res.data.content});
            }
          });
    }

    handleSubmit = async e => {
        const { initialState } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            
                    GlobalSettingsService.update(values, values.banck_branch_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Service Provider Vehicle Details has been updated successfully')
                            this.props.history.push("/bank/branch")
                        } else {
                            message.error('There was an error updating the Service Provider Vehicle Details')
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


    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push({
            pathname:"/serviceprovider/vehicle",
            state: {
                serviceProvider: this.state.serviceProviderDetails
            }
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState, vehicleDetails, dataSource } = this.state;
        console.log("initial state", initialState)

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Vehicle details"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={this.handleBackTolist} />

                    <Form onSubmit={this.handleSubmit} >

                        

                                <Form.Item label="Settings Name" hasFeedback>
                                    {getFieldDecorator('settings_name', {
                                        initialValue: initialState ? initialState.settings_name : "",
                                        rules: [
                                            { required: true, message: 'Settings Name is required' }
                                        ],
                                    })(
                                        <Select
                                        showSearch
                                        placeholder="Select a Settings Name"
                                        optionFilterProp="children"
                                        onSearch={this.onSearch}  >
    
                                        {dataSource.map(item => (
                                            <Select.Option key={item.id} value={item.settings_name}>
                                                {item.settings_name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    )}
                                </Form.Item>
                           

                                <Form.Item label="Settings Value" hasFeedback >
                                    {getFieldDecorator("settings_value", {
                                        initialValue: initialState ? initialState.settings_value : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter Settings Value",

                                            }
                                        ]
                                    })
                                        (initialState.settings_name === "DayShiftTimeFrom" || initialState.settings_name === "DayShiftTimeTo" ? <Input/> : <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />  )}

                                </Form.Item> 

                                
                  
                    
                                <Form.Item label="Company Id " hasFeedback >
                                    {getFieldDecorator("company_id", {
                                        initialValue: initialState ? initialState.company_id : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Night Start",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Company Id' />)}

                                </Form.Item>
                         
                      
                

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
                       
                    </Form>
                </Card>
            </div>
        );
    }
}

const WrappedAddVehicle = Form.create({ name: 'new-service-points' })(AddVehicle);

export default WrappedAddVehicle;