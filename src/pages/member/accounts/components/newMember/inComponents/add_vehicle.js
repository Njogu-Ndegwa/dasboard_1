// import React from 'react';
// import { Button, PageHeader, Form, Input, Card, Select, Row, Col, Divider, Switch, message, Modal ,DatePicker } from 'antd'
// import {   MemberVehicleDetailsService } from '../../../../../../config/member_service'
// import { MemberVehicleTypeService} from '../../../../../../config/_service'

// import moment from 'moment'


// class AddVehicle extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             formLayout: 'horizontal',
//             initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
//             vehicleDetails: []

//         }


//     }


//     componentDidMount() {

//         MemberVehicleTypeService.fetchMemberVehicleType().then(res => {
//             console.log("server response", res)
//             if (res.data) {
//                 this.setState({ vehicleDetails: res.data.content })
//             }
//         }).catch(error => {
//             console.log(error)
//         })

//     }

//     handleSubmit = async e => {
//         const { initialState } = this.state
//         e.preventDefault();

//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);

//                 initialState ?
//                     MemberVehicleDetailsService.postMemberVehicleDetails(values ).then(res => {
//                         console.log(res, 'saved response');
//                         if (res.status === 201) {
//                             message.success('Member Vehicle Details has been updated successfully')
//                             this.props.history.push("/bank/branch")
//                         } else {
//                             message.error('There was an error updating the Member Vehicle Details')
//                         }
//                     }) :
//                     MemberVehicleDetailsService.postMemberVehicleDetails(values).then(res => {
//                         console.log(res, 'saved response');
//                         if (res.status === 201) {
//                             // message.success('Member Vehicle Details has been saved successfully');
//                             // this.props.history.push("/bank/branch")
//                             this.showConfirm(res);
//                             this.props.form.resetFields();

//                         } else {
//                             message.error('There was an error saving the Member Vehicle Details');
//                         }

//                     })



//             }
//         });
//     };

//     showConfirm = (res) => {
//         Modal.success({
//             title: 'Success',
//             content: res.data.content.vehicle_reg_number + ' successfully submitted ',
//             onOk() {

//             },
//             onCancel() {
//             },
//         });
//     }


//     handleBackTolist = () => {
//         this.props.form.resetFields();
//         this.props.history.push("/member/vehicle")
//     };

//     render() {
//         const { getFieldDecorator } = this.props.form;
//         const { isLoading, initialState, vehicleDetails } = this.state;
//         console.log("initial state", this.props.location.state)

//         return (
//             <div id="content">
//                 <Card>
//                     <PageHeader
//                         title="Vehicle details"
//                         subTitle={initialState ? "Edit" : "New"}
//                         onBack={() => this.props.history.push("/member/vehicle")} />

//                     <Form onSubmit={this.handleSubmit} >

//                         <Row gutter={8} >
//                             <Col span={6}>

//                                 <Form.Item label="Rescue Vehicle Type" hasFeedback>
//                                     {getFieldDecorator('member_vehicle_type_id', {
//                                         initialValue: initialState ? initialState.member_vehicle_type_id : "",
//                                         rules: [
//                                             { required: true, message: 'Rescue Vehicle Type is required' }
//                                         ],
//                                     })(
//                                         <Select
//                                         showSearch
//                                         placeholder="Select Member vehicle type "
//                                         optionFilterProp="children"
//                                         onSearch={this.onSearch}  >
    
//                                         {vehicleDetails.map(item => (
//                                             <Select.Option key={item.type_id} value={item.type_id}>
//                                                 {item.member_vehicle_categories_name}
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                     )}
//                                 </Form.Item>
//                             </Col>
//                             <Col span={6}>

//                                 <Form.Item label="Registration Number" hasFeedback >
//                                     {getFieldDecorator("vehicle_reg_number", {
//                                         initialValue: initialState ? initialState.vehicle_reg_number : "",
//                                         rules: [
//                                             {
//                                                 required: true,
//                                                 message: "Enter the Registration Number",

//                                             }
//                                         ]
//                                     })
//                                         (<Input placeholder='Registration Number' />)}

//                                 </Form.Item>
//                             </Col>
//                             <Col span={6}>

//                                 <Form.Item label="Registration Number" hasFeedback >
//                                     {getFieldDecorator("member_vehicle_details_id", {
//                                         initialValue: initialState ? initialState.member_vehicle_details_id : "",
//                                         rules: [
//                                             {
//                                                 required: true,
//                                                 message: "Enter the Registration Number",

//                                             }
//                                         ]
//                                     })
//                                         (<Input placeholder='Registration Number' />)}

//                                 </Form.Item>
//                             </Col>
//                             <Col span={6}>

//                                 <Form.Item label="Insurance " hasFeedback >
//                                     {getFieldDecorator("insurance_policy_no", {
//                                         initialValue: initialState ? initialState.insurance_policy_no : "",
//                                         rules: [
//                                             {
//                                                 required: true,
//                                                 message: "Enter the Insurance Policy Number",

//                                             }
//                                         ]
//                                     })
//                                         (<Input placeholder='Insurance' />)}

//                                 </Form.Item>
//                             </Col>

//                             <Col span={6}>

//                                 <Form.Item label="Insurance Id" hasFeedback >
//                                     {getFieldDecorator("insurance_id", {
//                                         initialValue: initialState ? initialState.insurance_id : "",
//                                         rules: [
//                                             {
//                                                 required: true,
//                                                 message: "Enter the Insurance Id",

//                                             }
//                                         ]
//                                     })
//                                         (<Input placeholder='Insurance Id' />)}

//                                 </Form.Item>
//                             </Col>
//                             <Col span={6}>

//                                 <Form.Item label="Insurance Start" hasFeedback >
//                                     {getFieldDecorator("insurance_start_date", {
//                                         initialValue: initialState ? initialState.insurance_start_date : "",
//                                         rules: [
//                                             {
//                                                 required: true,
//                                                 message: "Enter the Insurance start date",

//                                             }
//                                         ]
//                                     })
//                                         ( <Input/>)}

//                                 </Form.Item>
//                             </Col>
//                             <Col span={6}>

//                                 <Form.Item label="Insurance Expiry" hasFeedback >
//                                     {getFieldDecorator("insurance_end_date", {
//                                         initialValue: initialState ? initialState.insurance_end_date : "",
//                                         rules: [
//                                             {
//                                                 required: true,
//                                                 message: "Enter the Insurance End Date",

//                                             }
//                                         ]
//                                     })
//                                         ( <Input/>)}

//                                 </Form.Item>
//                             </Col>
//                             <Col span={6}>

//                                 <Form.Item label="Color" hasFeedback >
//                                     {getFieldDecorator("color", {
//                                         initialValue: initialState ? initialState.color : "",
//                                         rules: [
//                                             {
//                                                 required: true,
//                                                 message: "Enter the Color",

//                                             }
//                                         ]
//                                     })
//                                         (<Input placeholder='Color' />)}

//                                 </Form.Item>
//                             </Col>

//                             <Col span={6}>

//                                 <Form.Item label="Year Of Manufacture" hasFeedback >
//                                     {getFieldDecorator("year_of_manfucture", {
//                                         initialValue: initialState ? initialState.year_of_manfucture : "",
//                                         rules: [
//                                             {
//                                                 required: true,
//                                                 message: "Enter the Year Of Manufacture",

//                                             }
//                                         ]
//                                     })
//                                         ( <Input/>)}

//                                 </Form.Item>
//                             </Col>
//                             <Col span={6}>
//                                 <Form.Item label="user_id" hasFeedback >
//                                     {getFieldDecorator("user_id", {
//                                         initialValue: initialState ? initialState.user_id : "",
//                                         rules: [
//                                             {
//                                                 required: false,
//                                                 message: "Enter the service code",

//                                             }
//                                         ]
//                                     })(<Input/>)
//                                     }

//                                 </Form.Item>
//                             </Col>


//                             <Divider style={{ marginBottom: 8 }} />
//                             <Row>
//                                 <Col span={24} style={{ textAlign: 'right' }}>

//                                     <Button onClick={this.handleBackTolist}>
//                                         Cancel
//                                 </Button>
//                                     {initialState ?
//                                         <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
//                                             Update
//                                 </Button> :
//                                         <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit"  >
//                                             Save
//                               </Button>
//                                     }

//                                 </Col>
//                             </Row>
//                         </Row>
//                     </Form>
//                 </Card>
//             </div>
//         );
//     }
// }

// const WrappedAddVehicle = Form.create({ name: 'new-service-points' })(AddVehicle);

// export default WrappedAddVehicle;

import React from "react";
import { Button, PageHeader,  Input, Card, Select, Row, Col, Divider, Switch, message, Modal ,DatePicker, Icon, Form } from 'antd'
import {  MemberVehicleDetailsService } from '../../../../../../config/member_service';
import {  MemberVehicleTypeService } from '../../../../../../config/_service';
import Highlighter from 'react-highlight-words';
import TextArea from "antd/lib/input/TextArea";
import moment from 'moment';
import { DistanceLimitService } from '../../../../../../config/_service';



const {Option} = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Admission extends React.Component {

    state = {
        initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
        memberDetails: this.props.location.state.Member,
        vehicleDetails: [],
    };


    handleSubmit = async e => {
        const {  initialState } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

              
console.log('353'); 
            initialState?
                    MemberVehicleDetailsService.postMemberVehicleDetails(values).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Member Vehicle Details has been Saved successfully')
                            this.props.history.push("/member/vehicle")
                        } else {
                            message.error('There was an error saving the Member Vehicle Details')
                        }
                    }) :  MemberVehicleDetailsService.updateMemberVehicleDetails(values, initialState.user_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Member Vehicle Details has been updated successfully')
                            this.props.history.push("/bank/branch")
                        } else {
                            message.error('There was an error updating the Member Vehicle Details')
                        }
                    })
                }



            
        });
    };

    showConfirm = (response) => {
        Modal.success({
            title: 'Success',
            content: 'Patient details successfully submitted \n Given No. ' + response.data.patient_number,
            onOk() {
                // return new Promise((resolve, reject) => {
                //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));

            },
            onCancel() {
            },
        });
    }

    componentDidMount() {
        MemberVehicleTypeService.fetchMemberVehicleType().then(res => {
            console.log("server response", res)
            if (res.data) {
                this.setState({ vehicleDetails: res.data.content })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handleBack = () => {
        this.props.history.push({
            pathname: "/member/vehicle",
            state : {
                Member: this.state.memberDetails
            }
        })
    }


    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        // Only show error after a field is touched.
        const given_nameError = isFieldTouched('given_name') && getFieldError('given_name');
        const { vehicleDetails, initialState, memberDetails } = this.state;
        console.log("intial state", memberDetails)
        return (
            <div id="content">
                <Card  type={"inner"}>
                <PageHeader
                        title="Add Vehicles"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.handleBack()} />
                    <Form layout="horizontal" onSubmit={this.handleSubmit} className="emergency_reg_form">
                        <Row gutter={8}>
                            <Col span={6}>
                                <Form.Item label="Member Vehicle Type"
                                           >
                                    {getFieldDecorator('member_vehicle_type_id', {
                                        initialValue: initialState ? initialState.member_vehicle_type_id : "",
                                        rules: [{
                                            required: true,
                                            message: 'Please input Member Vehicle Type'
                                        }],
                                    })(
                                        <Select
                                    showSearch
                                    placeholder="Select Member vehicle type "
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {vehicleDetails.map(item => (
                                        <Select.Option key={item.type_id} value={item.type_id}>
                                            {item.member_vehicle_categories_name}
                                        </Select.Option>
                                    ))}
                                </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            
                            <Col span={6}>
                                <Form.Item label="Registartion Number"
                                           >
                                    {getFieldDecorator('vehicle_reg_number', {
                                        initialValue: initialState ? initialState.vehicle_reg_number : "",
                                        rules: [{
                                            required: true,
                                            message: 'Please select Registration Number'
                                        }],
                                    })(
                                        <Input />,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="Insurance Policy Number"
                                           >
                                    {getFieldDecorator('insurance_policy_no', {
                                        initialValue: initialState ? initialState.insurance_policy_no : "",
                                        rules: [{
                                            required: true,
                                            message: 'Please Enter Insurance Policy no'

                                        }],
                                    })(
                                        <Input />,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="Insurance Id"
                                          
                                           >
                                    {getFieldDecorator('insurance_id', {
                                        initialValue: initialState ? initialState.insurance_id : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Insurance Id'
                                        }],
                                    })(
                                        <Input/>,
                                    )}
                                </Form.Item>
                            </Col>

                           

                            <Col span={4}>
                                <Form.Item label="Insurance Start Date"
                                          
                                           >
                                    {getFieldDecorator('insurance_start_date', {
                                        initialValue: initialState ? initialState.insurance_start_date : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input Insurance Start Date'
                                        }],
                                    })(
                                        <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                                    format={"YYYY/MM/DD"}/>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Insurance End Date"
                                          
                                           >
                                    {getFieldDecorator('insurance_end_date', {
                                        initialValue: initialState ? initialState.insurance_end_date : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Insurance End date'
                                        }],
                                    })(
                                        <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                                    format={"YYYY/MM/DD"}/>,
                                    )}
                                </Form.Item>
                            </Col>
                            
                            <Col span={4}>
                                <Form.Item label="Model"
                                          
                                           >
                                    {getFieldDecorator('model', {
                                        initialValue: initialState ? initialState.model : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Model'
                                        }],
                                    })(
                                        <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                                    format={"YYYY/MM/DD"}/>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="Color"
                                          
                                           >
                                    {getFieldDecorator('color', {
                                        initialValue: initialState ? initialState.color : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Insurance Id'
                                        }],
                                    })(
                                        <Input/>,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="User Id"
                                          
                                           >
                                    {getFieldDecorator('user_id', {
                                        initialValue: initialState ? initialState.user_id : "",
                                        rules: [{
                                            required: false,
                                            message: 'Please input the Year'
                                        }],
                                    })(
                                        <Input />,
                                    )}
                                </Form.Item>
                            </Col>
                            
                        </Row>
                        <Divider style={{ marginBottom: 8 }} />
                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>

                                    <Button onClick={()=>this.handleBack()}>
                                        Cancel
                                </Button>
                                    {initialState ?
                                        <Button  style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
                                            Update
                                </Button> :
                                        <Button  style={{ marginLeft: 8 }} type="primary" htmlType="submit"  >
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

export default Form.create({name: 'emergency_reg_form'})(Admission);