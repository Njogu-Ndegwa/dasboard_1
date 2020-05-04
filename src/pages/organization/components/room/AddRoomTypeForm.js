import React from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Row, Col, Select, message } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import RoomAction from "./RoomAction";

const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddRoomTypeForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        RoomAction.createRoomType(values).then(resp=>{
          if(resp.success=true){
            message.success(resp.message);
          }else{
            message.error("Error occurred! Please try again.")
          }
        });
        this.props.form.resetFields();
        this.props.onCancel();
      }
    });
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    // Only show error after a field is touched.
    const given_nameError = isFieldTouched('charges_per_night') && getFieldError('type_code') && getFieldError('name');

    return (
      <Form onSubmit={this.handleSubmit} className="room_type_form" >
        <Row gutter={16}>

          <Col span={6}>
            <Form.Item label="Code" validateStatus={given_nameError ? 'error' : ''}
                       help={given_nameError || ''}>
              {getFieldDecorator('type_code', {
                rules: [{ required: true, message: 'Please input the room type code!' }],
              })(
                  <Input
                      placeholder=""
                  />,
              )}
            </Form.Item>
          </Col>


          <Col span={12}>
            <Form.Item label="Name" validateStatus={given_nameError ? 'error' : ''}
                       help={given_nameError || ''}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the room type name!' }],
              })(
                <Input
                  placeholder=""
                />,
              )}
            </Form.Item>
          </Col>


          <Col span={6}>
            <Form.Item label="Charges/Night" validateStatus={given_nameError ? 'error' : ''}
                       help={given_nameError || ''}>
              {getFieldDecorator('charges_per_night', {
                rules: [{ required: true, message: 'Please input the room charges/night!' }],
              })(
                  <Input type={'number'}
                         placeholder=""
                  />,
              )}
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Special Comments">
              {getFieldDecorator('special_comments', {
                rules: [{ required: false}],
              })(
                <TextArea>
                </TextArea>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12} >
          <Col span={24} style={{textAlign: 'right'}}>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAddRoomForm = Form.create({ name: 'room_type_form' })(AddRoomTypeForm);

export default WrappedAddRoomForm;
          