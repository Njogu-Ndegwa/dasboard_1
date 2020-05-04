import React from 'react';
import { Button, PageHeader,  Input, Card, Select, Row, Col, Divider, Switch, message, Modal, Form } from 'antd'
import { MainBankService } from '../../../../../../config/_service'

class NewBank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            bank: [],
            
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

                      initialState?
                       MainBankService.updateMainBank(values, values.main_bank_id).then(res => {
                          console.log(res, 'saved response');
                          if( res.status===201 ) {
                              message.success('Main Bank has been updated successfully')
                              this.props.history.push("/bank")
                          } else {
                              message.error('There was an error updating the Main Bank')
                          }
                      }) :
                MainBankService.postMainBank(values).then(res => { 
                console.log(res, 'saved response');
                    if(res.status===201){
                        // message.success('Main Bank has been saved successfully');
                        // this.props.history.push("/bank")
                        this.showConfirm(res);
                        this.props.form.resetFields();

                    }else{
                        message.error('There was an error saving the Main Bank');
                    }

                 })


               
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
            content: res.data.content.bank_name + ' successfully submitted ',
            onOk() {
                
            },
            onCancel() {
            },
        });
    }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/bank")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState, bank  } = this.state;
        console.log(initialState)

        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Bank "
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/bank")} />

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>

                        <Form.Item label="" {...formItemLayout}>

                        </Form.Item>


                        <Form.Item label="Bank Name" {...formItemLayout}>
                            {getFieldDecorator("bank_name", {
                                initialValue: initialState ? initialState.bank_name : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Bank name",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>

                        <Form.Item label="Bank Code" {...formItemLayout}>
                            {getFieldDecorator("bank_code", {
                                initialValue: initialState ? initialState.bank_code : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Enter the Bank code",

                                    }
                                ]
                            })
                                (<Input />)}

                        </Form.Item>

                        <Form.Item label="" {...formItemLayout}>
                            {getFieldDecorator("main_bank_id", {
                                initialValue: initialState ? initialState.main_bank_id : "",
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
                                    <Button  onClick={this.handleClick} loading={this.state.loading} style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
                                        Update
                                </Button> :
                                    <Button  onClick={this.handleClick} loading={this.state.loading} style={{ marginLeft: 8 }} type="primary" htmlType="submit"  >
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

const WrappedAddPoint = Form.create({ name: 'new-service-points' })(NewBank);

export default WrappedAddPoint;