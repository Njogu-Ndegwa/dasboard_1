import React from 'react';
import { Button, PageHeader,  Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Transfer, Form } from 'antd';
import { UserGroupsService, SystemUsersService } from '../../../../../../config/security';
import {InsuranceService } from '../../../../../../config/_service';


class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userGroup: [],
            incomeAccounts: [],
            expenseAccounts: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            targetKeys: [],
            selectedKeys: [],
            roles: [],
            payer: []
           
        }

    }


    componentDidMount() {
        // User Group

        UserGroupsService.fetchUserGroups().then(res => {
            console.log('server response', res)
            if (res.data) {
                this.setState({ userGroup: res.data.content })
            }
        }).catch(error => {
            console.log(error)
        })

        // Payer
InsuranceService.fetchInsurance().then(res => {
    console.log('server response', res);
    if(res.data) {
        this.setState({payer: res.data.content})
    }
} )


    }


    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });

        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    };

    handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };


    handleChange = (values) => {

        const data = []
        for (let i = 0; i < values.length; i++  ){
          data.push({
            service_id: values[i],
   
          })
        }

        console.log( 'values', data)

        // let service_id = ''
        // console.log('values', service_id= values)

        this.setState({roles: data})

    }


    handleSubmit = e => {
        const { initialState } = this.state;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                let data = {}
                data={
                    ...values,

                }

                initialState ?
                    SystemUsersService.updateSystemUsers(values, values.distance_id).then(res => {
                        console.log('updated response', res);
                        if (res.status === 201) {
                            message.success("Distance limit updated successfully");
                            this.props.history.push('/usergroup');
                        } else { message.error("There was an error updating the distance limit") }
                    }) :

                    SystemUsersService.postSystemUsers(values).then(res => {
                        console.log('saved response', res)
                        if (res.status === 201) {
                            // message.success("Distance limit has been updated successfully");
                            // this.props.history.push('/distance');
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving the distance limit ") }
                    });


            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content: res.data.content.name + 'Successfully Submitted' ,
            onOk() {

            },
            onCancel() {
            },
        });
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/usergroup")
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        console.log('gettt firls', getFieldDecorator)
        const { incomeAccounts, expenseAccounts, isLoading, payer, initialState, userGroup, targetKeys, selectedKeys,  } = this.state;
        


        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 12 },
            },
        };

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Add System User"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/distance")} />

                    <Form onSubmit={this.handleSubmit} >
<Row gutter={24} >
    <Col span={8}>
                        <Form.Item label="Name" hasFeedback>
                            {getFieldDecorator('name', {
                                initialValue: initialState ? initialState.name : "",
                                rules: [
                                    { required: true, message: 'Name is required' }
                                ],
                            })(<Input />)}
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="Username" hasFeedback>
                            {getFieldDecorator('username', {
                                initialValue: initialState ? initialState.username : "",
                                rules: [
                                    { required: true, message: 'Username is required' }
                                ],
                            })(<Input />)}
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="Email" hasFeedback>
                            {getFieldDecorator('email', {
                                initialValue: initialState ? initialState.email : "",
                                rules: [
                                    { required: true, message: 'Email is required' }
                                ],
                            })(<Input />)}
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="Phone Number" hasFeedback>
                            {getFieldDecorator('phone', {
                                initialValue: initialState ? initialState.phone_number : "",
                                rules: [
                                    { required: true, message: 'Phone Number is required' }
                                ],
                            })(<Input />)}
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="User Type" hasFeedback>
                            {getFieldDecorator('user_type', {
                                initialValue: initialState ? initialState.user_type : "",
                                rules: [
                                    { required: true, message: 'Phone Number is required' }
                                ],
                            })(<Select value='user type'>
                                <Select.Option value='payer'>
                                    Payer
                                </Select.Option>
                                <Select.Option value='service_provider'>
                                    ServiceProvider
                                </Select.Option>
                                <Select.Option value='member'>
                                    Member
                                </Select.Option>
                                <Select.Option value='admin'>
                                    Admin
                                </Select.Option>
                            </Select>)}
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="Roles" hasFeedback>
                            {getFieldDecorator('roles', {
                                initialValue: initialState ? initialState.user_group : "",
                                rules: [
                                    { required: true, message: 'User Group is required' }
                                ],
                            })(
                                <Select
                                mode='multiple'
                                    showSearch
                                    placeholder="Select Bank "
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}
                                    onChange={this.handleChange}  >

                                    {userGroup.map(item => (
                                        <Select.Option key={item.name} value={item.name}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="Payer Name" hasFeedback>
                            {getFieldDecorator('payer_id', {
                                initialValue: initialState ? initialState.payer_id : "",
                                rules: [
                                    { required: false, message: 'Payer Name is required' }
                                ],
                            })(
                                <Select
                               
                                    showSearch
                                    placeholder="Select Payer Name "
                                    optionFilterProp="children"
                                    onSearch={this.onSearch}
                                      >

                                    {payer.map(item => (
                                        <Select.Option key={item.payer_id} value={item.payer_id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="" hasFeedback>
                            {getFieldDecorator("distance_id", {
                                initialValue: initialState ? initialState.distance_id : "",
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
                        </Row>

                        <Divider style={{ marginBottom: 5 }} />
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>

                                <Button onClick={this.handleBackTolist}>
                                    Cancel
                                </Button>
                                {initialState ?
                                    <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit">
                                        Update
                                </Button> :
                                    <Button loading={isLoading} style={{ marginLeft: 8 }} type="primary" htmlType="submit">
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