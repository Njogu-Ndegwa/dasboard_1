import React from 'react';
import { Button, PageHeader, Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Form } from 'antd';
import { MemberVehicleCategoryService } from '../../../../../../config/_service';
class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeAccounts: [],
            expenseAccounts: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            loading: false
        }

    }

    componentDidMount() {

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
        console.log("initalstate",initialState );
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    MemberVehicleCategoryService.updateMemberVehicleCategory(values, values.category_id).then(res => {
                        console.log("Updated response", res);
                        if (res.status === 201) {
                            this.setState({loading: false})
                            message.success("Member Vehicle Category updated succesfully");
                            this.props.history.push('/vehiclecategory');
                        } else { message.error("There was an error updating Member Vehicle Category ") }
                    }) :

                    MemberVehicleCategoryService.postMemberVehicleCategory(values).then(res => {
                        console.log("Saved Response", res);
                        if (res.status === 201) {
                            this.setState({loading: false})
                            // message.success("Member Vehicle Category has been saved successfully");
                            // this.props.history.push('/vehiclecategory');
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error updating Member Vehicle Category") }
                    });


            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: res.data.content.category_name + ' successfully submitted ',
            onOk() {
                
            },
            onCancel() {
            },
        });
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/vehiclecategory")
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
                        title="Vehicle Category"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/vehiclecategory")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                        <Form.Item label="Category Name" hasFeedback>
                            {getFieldDecorator('category_name', {
                                initialValue: initialState ? initialState.category_name : "",
                                rules: [
                                    { required: true, message: 'Category name is required' }
                                ],
                            })(<Input placeholder = 'Category Name' />)}
                        </Form.Item>

                        <Form.Item label="Category Code" hasFeedback>
                            {getFieldDecorator('category_code', {
                                initialValue: initialState ? initialState.category_code : "",
                                rules: [
                                    { required: true, message: 'Category Code is required' }
                                ],
                            })(
                                <Input placeholder = 'Category Code' />
                            )}
                        </Form.Item>

                        <Form.Item label="" {...formItemLayout}>
                            {getFieldDecorator("category_id", {
                                initialValue: initialState ? initialState.category_id : "",
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