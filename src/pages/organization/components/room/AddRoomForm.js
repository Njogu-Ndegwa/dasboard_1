import React from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Row, Col, Select } from 'antd';

const { Option } = Select;

class AddRoomForm extends React.Component {
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
          <Col span={12}>
            <Form.Item label="Select Ward">
              {getFieldDecorator('ward_name', {
                rules: [{ required: true, message: 'Please input the Ward Name!' }],
              })(
                <Select
                  // value={currency}
                  // size={size}
                >
                  <Option value="rmb">Ward 1</Option>
                  <Option value="dollar">Ward 2</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Room Name">
              {getFieldDecorator('ward_name', {
                rules: [{ required: true, message: 'Please input the room Name!' }],
              })(
                <Input              
                  placeholder="Ward Name"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Room Type">
              {getFieldDecorator('room_type', {
                rules: [{ required: true, message: 'Please select the room type!' }],
              })(
                <Select
                  // value={currency}
                  // size={size}
                >
                  <Option value="rmb">Room Type 1</Option>
                  <Option value="dollar">Room Type 2</Option>
                </Select>
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

const WrappedAddRoomForm = Form.create({ name: 'normal_login' })(AddRoomForm);

export default WrappedAddRoomForm;
          