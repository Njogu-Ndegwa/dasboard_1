import React from 'react';
import { Button, PageHeader, Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { MemberTypeService } from '../../../../../../config/_service';

class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleCategory: [],
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

                    MemberTypeService.updateMemberType(values, values.member_type_id).then(res => {
                        console.log("updated response", res)
                        if (res.status === 201) {
                            this.setState({loading: false})
                            message.success("Member Type has been updated successfully")
                            this.props.history.push('/membertype')
                        } else { message.error("There was an error updating Member Vehicle Category") }
                    }) :
                    MemberTypeService.postMemberType(values).then(res => {
                        console.log("saved response", res)
                        if (res.status === 201) {
                            this.setState({loading: false})
                            // message.success("Member  Type has been saved succesfully ")
                            // this.props.history.push('/membertype')
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving Member  Category") }
                    });




                // setTimeout( () => this.props.history.push("/vehicledetails"),1000)
            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: res.data.content.member_type_name + ' successfully submitted ',
            onOk() {
                
            },
            onCancel() {
            },
        });
    }
    handleClick= () => {
        
        this.setState({loading: true})
        
    setTimeout(() => {
        this.setState({
       loading:false
        });
      }, 5000);
        
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/membertype")
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
                        title="Member Type"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/membertype")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                        <Form.Item label="Member Type" hasFeedback>
                            {getFieldDecorator('member_type_name', {
                                initialValue: initialState ? initialState.member_type_name : "",
                                rules: [
                                    { required: true, message: 'Member Type is required' }
                                ],
                            })(<Input placeholder = 'Member Type' />)}
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

                        <Form.Item label="Member Type Code" hasFeedback>
                            {getFieldDecorator('member_type_id_code', {
                                initialValue: initialState ? initialState.member_type_id_code : "",
                                rules: [
                                    { required: true, message: 'Member Type Code is required' }
                                ],
                            })(
                                <Input placeholder = 'Member Type Code' />
                            )}
                        </Form.Item>

                        <Form.Item label="" hasFeedback>
                            {getFieldDecorator("member_type_id", {
                                initialValue: initialState ? initialState.member_type_id : "",
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

