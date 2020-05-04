import React from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button } from 'antd';

const { TextArea } = Input;

class AddBedForm extends React.Component {
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
        <Form.Item label="Bed Name">
          {getFieldDecorator('bed_name', {
            rules: [{ required: true, message: 'Please input the Ward Name!' }],
          })(
            <Input              
              placeholder="Ward Name"
            />,
          )}
        </Form.Item>
        <Form.Item label="Bed State">
          {getFieldDecorator('state', {
            rules: [{ required: true, message: 'Please input the Bed State!' }],
          })(
            <TextArea
              placeholder="Bed State"
              autosize={{ minRows: 3, maxRows: 5 }}
          />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedAddBedForm = Form.create({ name: 'normal_login' })(AddBedForm);

export default WrappedAddBedForm;
          