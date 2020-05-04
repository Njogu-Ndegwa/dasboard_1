import React from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class AddWardForm extends React.Component {
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
        <Form.Item label="Ward Name">
          {getFieldDecorator('ward_name', {
            rules: [{ required: true, message: 'Please input the Ward Name!' }],
          })(
            <Input              
              placeholder="Ward Name"
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

const WrappedAddWardForm = Form.create({ name: 'normal_login' })(AddWardForm);

export default WrappedAddWardForm;
          