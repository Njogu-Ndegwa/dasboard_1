import React from 'react';
import { Button, PageHeader, Form, Input, Card, Select, Row, Col, Divider, Switch, message, Modal, DatePicker, Icon } from 'antd';
import { PrepareInvoiceService, FilterInvoiceService, RecieptsService, DispatchInvoicesService, AllocationService } from '../../../../../config/claims_management_service';
import TextArea from "antd/lib/input/TextArea";
import styled from 'styled-components';
import moment from 'moment';

class BankBranch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            initialState: this.props.location.state ? this.props.location.state.servicePoint : "",
            reciept: this.props.location.state ? this.props.location.state.myReciept : "",
            payer: this.props.location.state ? this.props.location.state.payer : "",
            bank: [],
            invoice_data: [],
            

        }


    }


    componentDidMount() {


    }
    // handleClick= () => {
    //     this.props.validateFields((values) => {
    //         this.setState({invoice_data: values})
    //     } )
    // }


    handleSubmit = async e => {
        const { initialState, payer, reciept, invoice_data } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({invoice_data: values})

                let data = []

                data.push({
                    amount: values.amount,
                    invoice_number: initialState.invoice_number
                })

        console.log('34', data)
console.log('reciept')
                let allocation = { payer_id: payer.payer_id, invoice_data: data, receipt_number: reciept.receipt_number }
                console.log('38', allocation)
                // allocation = {
                //     payer_id: payer.payer_id,
                //     invoice_data: invoice_data,
                //     narration: values.narration,
                //     document_date: values.document_date,
                //     receipt_number: reciept.receipt_number
                //   }
                  console.log('45')
                  console.log('allocation', allocation)
            
                  AllocationService.postAllocation(allocation).then(res => {
                    console.log('Saved Response', res)
                    this.props.history.push('/allocation')
                  })

                  
            

                // initialState ?
                //     BankBranchService.updateBankBranch(values, values.banck_branch_id).then(res => {
                //         console.log(res, 'saved response');
                //         if (res.status === 201) {
                //             message.success('Bank Branch has been updated successfully')
                //             this.props.history.push("/bank/branch")
                //         } else {
                //             message.error('There was an error updating the Bank Branch')
                //         }
                //     }) :
                //     BankBranchService.postBankBranch(values).then(res => {
                //         console.log(res, 'saved response');
                //         if (res.status === 201) {
                //             // message.success('Bank Branch has been saved successfully');
                //             // this.props.history.push("/bank/branch")
                //             this.showConfirm(res);
                //             this.props.form.resetFields();

                //         } else {
                //             message.error('There was an error saving the Bank Branch');
                //         }

                //     })



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


    // handleClick= () => {
        
    //     this.setState({loading: true})
        
    // setTimeout(() => {
    //     this.setState({
    //    loading:false
    //     });
    //   }, 5000);
        
    // }

    handleBackTolist = () => {
        this.props.form.resetFields();
        this.props.history.push("/allocation")
    };

    render() {

        const  formLayout  = 'horizontal'
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 12 },
                }
                : null;

        const { getFieldDecorator } = this.props.form;
        const { isLoading, initialState, bank } = this.state;
        console.log("initial state",initialState)

        return (
            <div id="content">
                <Card>
                    <PageHeader
                        title="Allocation"
                        subTitle={initialState ? "Edit" : "New"}
                        onBack={() => this.props.history.push("/allocation")} />

                    <Form onSubmit={this.handleSubmit} >

<Form.Item label="Amount" hasFeedback {...formItemLayout} >
    {getFieldDecorator('amount', {
        initialValue: initialState ? initialState.amount : "",
        rules: [
            { required: true, message: 'Main Bank is required' }
        ],
    })(
       <Input/>
    )}
</Form.Item>

<Form.Item label="Document Date" {...formItemLayout} >
              {getFieldDecorator('doc_date', {
                rules: [{
                  required: false,
                  message: 'Please input expected date of discharge'
                }],
              })(
                <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                  format={"YYYY/MM/DD"} />,
              )}
            </Form.Item>

            <Form.Item label="Narration: " {...formItemLayout} >
              {
                getFieldDecorator('narration')(<TextArea type="text"
                  prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  style={{ width: '100%', height: '130px' }}
                  name='narration'

                />)
              }




            </Form.Item>
                       

                        <Divider style={{ marginBottom: 8 }} />
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>

                                <Button onClick={this.handleBackTolist}>
                                    Cancel
                                </Button>
                                {initialState ?
                                    <Button  onClick={this.handleClick} style={{ marginLeft: 8 }} type="primary" htmlType="submit" >
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

const WrappedAddPoint = Form.create({ name: 'new-service-points' })(BankBranch);

export default WrappedAddPoint;