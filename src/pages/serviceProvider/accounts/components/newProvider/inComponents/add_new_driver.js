import React from "react";
import { Button, PageHeader,  Input, Card, Select, Row, Col, Divider, Switch, message, Modal, DatePicker, Icon, Form } from 'antd'
import { MemberVehicleDetailsService } from '../../../../../../config/member_service';
import { MemberVehicleTypeService } from '../../../../../../config/_service';
import Highlighter from 'react-highlight-words';
import TextArea from "antd/lib/input/TextArea";
import moment from 'moment';
import { DistanceLimitService } from '../../../../../../config/_service';



const { Option } = Select;

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
        const { initialState } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    // MemberVehicleDetailsService.updateMemberVehicleDetails(values, values.banck_branch_id).then(res => {
                    //     console.log(res, 'saved response');
                    //     if (res.status === 201) {
                    //         message.success('Member Vehicle Details has been updated successfully')
                    //         this.props.history.push("/bank/branch")
                    //     } else {
                    //         message.error('There was an error updating the Member Vehicle Details')
                    //     }
                    // }) :
                    // MemberVehicleDetailsService.postMemberVehicleDetails(values).then(res => {
                    //     console.log(res, 'saved response');
                    //     if (res.status === 201) {
                    //         // message.success('Member Vehicle Details has been saved successfully');
                    //         // this.props.history.push("/bank/branch")
                    //         this.showConfirm(res);
                    //         this.props.form.resetFields();

                    //     } else {
                    //         message.error('There was an error saving the Member Vehicle Details');
                    //     }

                    // })

                    MemberVehicleDetailsService.postMemberVehicleDetails(values, initialState.user_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Member Vehicle Details has been updated successfully')
                            this.props.history.push("/bank/branch")
                        } else {
                            message.error('There was an error updating the Member Vehicle Details')
                        }
                    }) : MemberVehicleDetailsService.updateMemberVehicleDetails(values, initialState.user_id).then(res => {
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
            pathname: "/serviceprovider/vehicle/driver",
            state: {
                Member: this.state.memberDetails
            }
        })
    }


    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const given_nameError = isFieldTouched('given_name') && getFieldError('given_name');
        const { vehicleDetails, initialState, memberDetails } = this.state;
        console.log("intial state", memberDetails)
        return (
            <div id="content">
                <Card type={"inner"}>
                    <PageHeader
                        title="Add Driver Details"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.handleBack()} />
                    <Form layout="horizontal" onSubmit={this.handleSubmit} className="emergency_reg_form">
<Row gutter={24} >
    <Col span={13} >
                        <Form.Item label="Username" hasFeedback >
                            {getFieldDecorator('username', {
                                initialValue: initialState ? initialState.username : "",
                                rules: [
                                    { required: true, message: 'Username is required' }
                                ],
                            })(
                                <Input placeholder='Documents Name' />
                            )}
                        </Form.Item>
</Col>
<Col span={13}>

                        <Form.Item label="Plate Number" hasFeedback >
                            {getFieldDecorator("plate_number", {
                                initialValue: initialState ? initialState.plate_number : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Plate Number",

                                    }
                                ]
                            })
                                (<Input placeholder='Documents path' />)}

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
                                    <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
                                        Update
                                </Button> :
                                    <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit"  >
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

export default Form.create({ name: 'emergency_reg_form' })(Admission);