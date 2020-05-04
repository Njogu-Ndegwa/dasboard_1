import React from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Row, Col, Select } from 'antd';

const { Option } = Select;

class AddBankForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" >
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item label="Bank Name">
              {getFieldDecorator('bank_name', {
                rules: [{ required: true, message: 'Please input the bank Name!' }],
              })(
                <Input              
                    placeholder="bank Name"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Bank Acc. No">
              {getFieldDecorator('bank_acc_no', {
                rules: [{ required: true, message: 'Please input the account No' }],
              })(
                <Input              
                  placeholder="Acc. No"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Branch Name">
              {getFieldDecorator('branch_namee', {
                rules: [{ required: true, message: 'Please input the branch name!' }],
              })(
                <Input              
                  placeholder="Barnch Name"
                />,
              )}
            </Form.Item>
          </Col>          
          <Col span={6}>
            <Form.Item label="Address">
              {getFieldDecorator('address', {
                rules: [{ required: true, message: 'Please input the address!' }],
              })(
                <Input              
                  placeholder="Address"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item label="Phone">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input the phone!' }],
              })(
                <Input              
                    placeholder="Phone"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Contact Person">
              {getFieldDecorator('contact_person', {
                rules: [{ required: true, message: 'Please input the contact person!' }],
              })(
                <Input              
                  placeholder="Contact Person"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input the email!' }],
              })(
                <Input              
                  placeholder="Email"
                />,
              )}
            </Form.Item>
          </Col>      
        </Row>
        <Row gutter={12}>  
          <Col span={12}>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAddBankForm = Form.create({ name: 'normal_login' })(AddBankForm);

export default WrappedAddBankForm;
          