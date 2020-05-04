import React from 'react';
import { Button, PageHeader, Input, Card, Select, Row, Col, Divider, Switch, message, Modal, Form } from 'antd'
import { MemberVehicleDocsService, MemberVehicleDetailsService} from '../../../../../../config/member_service'

class AddDrivers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            vehicleDetails: []

        }


    }


    componentDidMount() {

    }

    handleSubmit = async e => {
        const { initialState } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    MemberVehicleDocsService.updateMemberVehicleDocs(values, values.banck_branch_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Member Vehicle Documents has been updated successfully')
                            this.props.history.push("/bank/branch")
                        } else {
                            message.error('There was an error updating the Member Vehicle Documents')
                        }
                    }) :
                    MemberVehicleDocsService.postMemberVehicleDocs(values).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            // message.success('Member Vehicle Documents has been saved successfully');
                            // this.props.history.push("/bank/branch")
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else {
                            message.error('There was an error saving the Member Vehicle Documents');
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
        this.props.history.push("/member/vehicle")
    };

    render() {
        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 12 },
                }
                : null;
        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState, vehicleDetails } = this.state;
        console.log("initial state", this.props.location.state)

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Vehicle documents"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/member/vehicle")} />

                    <Form onSubmit={this.handleSubmit} >

                        

                                <Form.Item label="Documents Name" hasFeedback {...formItemLayout} >
                                    {getFieldDecorator('doc_name', {
                                        initialValue: initialState ? initialState.doc_name : "",
                                        rules: [
                                            { required: true, message: 'Documens name   is required' }
                                        ],
                                    })(
                                        <Input placeholder = 'Documents Name' />
                                    )}
                                </Form.Item>
                            

                                <Form.Item label="Documents Path" hasFeedback {...formItemLayout} >
                                    {getFieldDecorator("doc_pathr", {
                                        initialValue: initialState ? initialState.doc_pathr : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Documents Path",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Documents path' />)}

                                </Form.Item>
                            

                                <Form.Item label="Member vehicle Id " hasFeedback {...formItemLayout} >
                                    {getFieldDecorator("insurance_policy_no", {
                                        initialValue: initialState ? initialState.insurance_policy_no : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "Enter the Member Vehicle Id ",

                                            }
                                        ]
                                    })
                                        (<Input placeholder='Member Vehicle Id' />)}

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

const WrappedAddDrivers = Form.create({ name: 'new-service-points' })(AddDrivers);

export default WrappedAddDrivers;