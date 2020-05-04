import React from 'react';
import { Button, PageHeader, Input, Card, Select, Row, Col, Divider, Switch, message, Modal, Form } from 'antd'
import { BankBranchService, MainBankService } from '../../../../../../config/_service'

class BankBranch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            bank: [],

        }


    }


    componentDidMount() {

        MainBankService.fetchMainBank().then(res => {
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
                    BankBranchService.updateBankBranch(values, values.banck_branch_id).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            message.success('Bank Branch has been updated successfully')
                            this.props.history.push("/bank/branch")
                        } else {
                            message.error('There was an error updating the Bank Branch')
                        }
                    }) :
                    BankBranchService.postBankBranch(values).then(res => {
                        console.log(res, 'saved response');
                        if (res.status === 201) {
                            // message.success('Bank Branch has been saved successfully');
                            // this.props.history.push("/bank/branch")
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else {
                            message.error('There was an error saving the Bank Branch');
                        }

                    })



            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: res.data.content.branch_name+ ' successfully submitted ',
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
        this.props.history.push("/bank/branch")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState, bank } = this.state;
        console.log("initial state",initialState)

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Bank Branch"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/bank/branch")} />

                    <Form onSubmit={this.handleSubmit} >

                        <Row gutter={24} >
                            <Col span={12}>

                        <Form.Item label="Main Bank" hasFeedback>
                            {getFieldDecorator('main_bankid', {
                                initialValue: initialState ? initialState.main_bankid : "",
                                rules: [
                                    { required: true, message: 'Main Bank is required' }
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Select Bank "
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}  >

                                    {bank.map(item => (
                                        <Select.Option key={item.main_bank_id} value={item.main_bank_id}>
                                            {item.bank_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={12}>

                        <Form.Item label="Branch Name"  hasFeedback >
                            {getFieldDecorator("branch_name", {
                                initialValue: initialState ? initialState.branch_name : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Branch name",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={12}>

                        <Form.Item label="Branch Code" hasFeedback >
                            {getFieldDecorator("branch_code", {
                                initialValue: initialState ? initialState.branch_code : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Branch code",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={12}>

                        <Form.Item label="Swift Code" hasFeedback >
                            {getFieldDecorator("swift_code", {
                                initialValue: initialState ? initialState.swift_code : "",
                                rules: [
                                    {
                                        required: false,
                                        message: "Enter the Swift code",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={12}>

                        <Form.Item label="Phone no" hasFeedback >
                            {getFieldDecorator("phone_number", {
                                initialValue: initialState ? initialState.phone_number : "",
                                rules: [
                                    {
                                        required: false,
                                        message: "Enter the Phone No",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={12}>

                        <Form.Item label="Adress" hasFeedback >
                            {getFieldDecorator("address", {
                                initialValue: initialState ? initialState.address : "",
                                rules: [
                                    {
                                        required: false,
                                        message: "Enter the Adress",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>
                        </Col>
                        <Col span={12}>
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
                                    <Button  onClick={this.handleClick} loading={this.state.loading} style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
                                        Update
                                </Button> :
                                    <Button  onClick={this.handleClick} loading={this.state.loading} style={{ marginLeft: 8 }} type="primary" htmlType="submit"  >
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

const WrappedAddPoint = Form.create({ name: 'new-service-points' })(BankBranch);

export default WrappedAddPoint;