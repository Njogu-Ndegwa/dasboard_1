import React from 'react';
import { Button, PageHeader, Form, Input, Card, Radio, Select, Row, Col, Checkbox, Divider, Switch, message, Modal, Transfer } from 'antd';
import { UserGroupsService, PermissionsService } from '../../../../../../config/security';
const dataSource=[]
const oriTargetKeys = dataSource.map(item => item.key);
class AddPoint extends React.Component {
    constructor(props) {
       
        super(props);
        this.state = {
            
            dataSource: [],
            incomeAccounts: [],
            expenseAccounts: [],
            isLoading: false,
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            targetKeys: oriTargetKeys,
            selectedKeys: [],
            mockData: [],
           
        }

    }


    componentDidMount() {
        const targetKeys = [];
        PermissionsService.fetchPermissions().then(res => {
            console.log('server response', res)
           console.log('data,', )
           this.setState({dataSource: res.data.content})
           this.getMock()
        }).catch(error => {
            console.log(error)
        })

    }


    getMock = () => {
        const targetKeys=[];
        const mockData = [];
    const {dataSource} = this.state
      
    console.log('dataaaaa', dataSource)
      for (let i =0; i<dataSource.length; i++) {
    const data = {
      key: i.toString(),
      chosen: Math.random() * 2 > 1,
      ...dataSource[i],
      title: dataSource[i].name
    }
    
    console.log('mock', data)
    
    if (data.chosen) {
      targetKeys.push(data.key);
    }
    mockData.push(data);
    
      }
    
      this.setState({ mockData, targetKeys });
    
    };
    
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
    
    handleChange = targetKeys => {
      this.setState({ targetKeys });
      console.log( 'targetKeys', targetKeys )
    };
    
    handleSearch = (dir, value) => {
      console.log('search:', dir, value);
    };





    handleSubmit = e => {
        const { initialState } = this.state;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                initialState ?
                    UserGroupsService.updateUserGroups(values, values.distance_id).then(res => {
                        console.log('updated response', res);
                        if (res.status === 201) {
                            message.success("User Role updated successfully");
                            this.props.history.push('/usergroup');
                        } else { message.error("There was an error updating the User Role") }
                    }) :

                    UserGroupsService.postUserGroups(values).then(res => {
                        console.log('saved response', res)
                        if (res.status === 201) {
                            // message.success("User Role has been updated successfully");
                            // this.props.history.push('/distance');
                            this.showConfirm(res);
                            this.props.form.resetFields();

                        } else { message.error("There was an error saving the User Role ") }
                    });


            }
        });
    };

    showConfirm = (res) => {
        Modal.success({
            title: 'Success',
            content:res.data.content.name + 'Successfully Submitted' ,
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
        const { incomeAccounts, expenseAccounts, isLoading, initialState, dataSource, targetKeys, selectedKeys,  } = this.state;
        


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
                        title="Manage User Roles"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/usergroup")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                        <Form.Item label="Role Name" hasFeedback>
                            {getFieldDecorator('name', {
                                initialValue: initialState ? initialState.name : "",
                                rules: [
                                    { required: true, message: 'Role Name is required' }
                                ],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label="Description" hasFeedback>
                            {getFieldDecorator('distance_to', {
                                initialValue: initialState ? initialState.distance_to : "",
                                rules: [
                                    { required: true, message: 'Distance To is required' }
                                ],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="Permissions" hasFeedback>
                            {getFieldDecorator('distance_identifier_code', {
                                initialValue: initialState ? initialState.distance_identifier_code : "",
                                rules: [
                                    { required: true, message: 'Identifier Code is required' }
                                ],
                            })(
                                <Transfer
                                dataSource={this.state.mockData}
                                showSearch
                                filterOption={this.filterOption}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                onSearch={this.handleSearch}
                                render={item => item.title}
                              />
                            )}
                        </Form.Item>

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