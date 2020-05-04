
// import React from "react";
// import {Table, Input, Button, Icon, Modal, Card, Row, Col, message, Form, InputNumber, DatePicker, Select} from 'antd';
// import Highlighter from 'react-highlight-words';
// import TextArea from "antd/lib/input/TextArea";
// import moment from 'moment';
// import { DistanceLimitService } from '../../../../../../config/_service';



// const {Option} = Select;

// function hasErrors(fieldsError) {
//     return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

// class Admission extends React.Component {

//     state = {
//         distanceLimits: []
//     };


//     handleSubmit = e => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 DistanceLimitService.postDistanceLimits(values).then(response => {
//                     if (response.status === 201) {
//                         //message.info(response.message);
//                         this.showConfirm(response);
//                         this.props.form.resetFields();
//                     }
//                 });
//             }
//         });
//     };

//     showConfirm = (response) => {
//         Modal.success({
//             title: 'Success',
//             content: 'Patient details successfully submitted \n Given No. ' + response.data.patient_number,
//             onOk() {
//                 // return new Promise((resolve, reject) => {
//                 //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
//                 // }).catch(() => console.log('Oops errors!'));

//             },
//             onCancel() {
//             },
//         });
//     }

//     componentDidMount() {
//       DistanceLimitService.fetchDistanceLimits().then(res => {
//         console.log("server response", res);
//         if (res.data) {
//             this.setState({ distanceLimit: res.data.content });
//         }
//     }).catch(error => {
//         console.log(error);
//     })
//         this.props.form.validateFields();
//     }


//     render() {

//         const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
//         // Only show error after a field is touched.
//         const given_nameError = isFieldTouched('given_name') && getFieldError('given_name');
//         const { distanceLimits } = this.state;
//         return (
//             <div id="content">
//                 <Card title="In-Patient Admission" type={"inner"}>
//                     <Form layout="horizontal" onSubmit={this.handleSubmit} className="emergency_reg_form">
//                         <Row gutter={24}>
//                             <Col span={8}>
//                                 <Form.Item label="Admission Date" validateStatus={given_nameError ? 'error' : ''}
//                                            help={given_nameError || ''}>
//                                     {getFieldDecorator('admission_date', {
//                                         rules: [{
//                                             required: true,
//                                             message: 'Please input admission date'
//                                         }],
//                                     })(
//                                         <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
//                                                     format={"YYYY/MM/DD"}/>,
//                                     )}
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="Admission Type" validateStatus={given_nameError ? 'error' : ''}
//                                            help={given_nameError || ''}>
//                                     {getFieldDecorator('admission_type', {
//                                         rules: [{
//                                             required: true,
//                                         }],
//                                     })(
//                                         <Select defaultValue="">
//                                             <Option value="Emergency">Emergency</Option>
//                                             <Option value="Maternity">Maternity</Option>
//                                             <Option value="Urgent">Urgent</Option>
//                                             <Option value="Routine">Routine</Option>
//                                             <Option value="Elective">Elective</Option>
//                                         </Select>,
//                                     )}
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="Room Type" validateStatus={given_nameError ? 'error' : ''}
//                                            help={given_nameError || ''}>
//                                     {getFieldDecorator('distance_from', {
//                                         rules: [{
//                                             required: true,
//                                             message: 'Please select room type'
//                                         }],
//                                     })(
//                                         <Select defaultValue="">
//                                             {distanceLimits.map(item => <Option
//                                                 key={item.distance_id}>{item.distance_from}  </Option>)}

//                                         </Select>,
//                                     )}
//                                 </Form.Item>
//                             </Col>

//                             <Col span={8}>
//                                 <Form.Item label="Room No" validateStatus={given_nameError ? 'error' : ''}
//                                            help={given_nameError || ''}>
//                                     {getFieldDecorator('room_no', {
//                                         rules: [{
//                                             required: true,
//                                             message: 'Please select room no'

//                                         }],
//                                     })(
//                                         <Select defaultValue="">
//                                             <Option value="-Select-">-Select-</Option>
//                                         </Select>,
//                                     )}
//                                 </Form.Item>
//                             </Col>

//                             <Col span={8}>
//                                 <Form.Item label="Bed No" validateStatus={given_nameError ? 'error' : ''}
//                                            help={given_nameError || ''}>
//                                     {getFieldDecorator('bed_no', {
//                                         rules: [{
//                                             required: true,
//                                             message: 'Please select bed no'
//                                         }],
//                                     })(
//                                         <Select defaultValue="">
//                                             <Option value="-Select-">-Select-</Option>
//                                         </Select>,
//                                     )}
//                                 </Form.Item>
//                             </Col>

//                             <Col span={8}>
//                                 <Form.Item label="Expected Date of Discharge"
//                                            validateStatus={given_nameError ? 'error' : ''}
//                                            help={given_nameError || ''}>
//                                     {getFieldDecorator('expected_discharge', {
//                                         rules: [{
//                                             required: false,
//                                             message: 'Please input expected date of discharge'
//                                         }],
//                                     })(
//                                         <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
//                                                     format={"YYYY/MM/DD"}/>,
//                                     )}
//                                 </Form.Item>
//                             </Col>

//                             <Col span={16}>
//                                 <Form.Item label="Special Comments" validateStatus={given_nameError ? 'error' : ''}
//                                            help={given_nameError || ''}>
//                                     {getFieldDecorator('special_comments', {
//                                         rules: [{
//                                             required: false,
//                                         }],
//                                     })(
//                                         <TextArea type="text"
//                                                   prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
//                                                   style={{width: '100%', height: '130px'}}/>,
//                                     )}
//                                 </Form.Item>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col span={24} style={{textAlign: 'right'}}>
//                                 <Form.Item>
//                                     <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
//                                         Submit
//                                     </Button>
//                                 </Form.Item>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Card>


//             </div>
//         );
//     }
// }

// export default Form.create({name: 'emergency_reg_form'})(Admission);

// import React from 'react';
// import 'antd/dist/antd.css';
// import { Form, Icon, Input, Button, Row, Col, Select, Card, Menu, Layout } from 'antd';

// const { Option } = Select;
// const {Sider} = Layout

// class AddBankForm extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             incomeAccount: []
//         }
//     }

//     componentDidMount(){

//     }

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//       }
//     });
//   };

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//         <Card>
//       <Form onSubmit={this.handleSubmit} className="login-form" >
//         <Row gutter={8}>
//           <Col span={6}>
//             <Form.Item label="Bank Name">
//               {getFieldDecorator('bank_name', {
//                 rules: [{ required: true, message: 'Please input the bank Name!' }],
//               })(
//                 <Input              
//                     placeholder="bank Name"
//                 />,
//               )}
//             </Form.Item>
//           </Col>
//           <Col span={6}>
//             <Form.Item label="Bank Acc. No">
//               {getFieldDecorator('bank_acc_no', {
//                 rules: [{ required: true, message: 'Please input the account No' }],
//               })(
//                 <Input              
//                   placeholder="Acc. No"
//                 />,
//               )}
//             </Form.Item>
//           </Col>
//           <Col span={6}>
//             <Form.Item label="Branch Name">
//               {getFieldDecorator('branch_namee', {
//                 rules: [{ required: true, message: 'Please input the branch name!' }],
//               })(
//                 <Input              
//                   placeholder="Barnch Name"
//                 />,
//               )}
//             </Form.Item>
//           </Col>          
//           <Col span={6}>
//             <Form.Item label="Address">
//               {getFieldDecorator('address', {
//                 rules: [{ required: true, message: 'Please input the address!' }],
//               })(
//                 <Input              
//                   placeholder="Address"
//                 />,
//               )}
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={8}>
//           <Col span={6}>
//             <Form.Item label="Phone">
//               {getFieldDecorator('phone', {
//                 rules: [{ required: true, message: 'Please input the phone!' }],
//               })(
//                 <Input              
//                     placeholder="Phone"
//                 />,
//               )}
//             </Form.Item>
//           </Col>
//           <Col span={6}>
//             <Form.Item label="Contact Person">
//               {getFieldDecorator('contact_person', {
//                 rules: [{ required: true, message: 'Please input the contact person!' }],
//               })(
//                 <Input              
//                   placeholder="Contact Person"
//                 />,
//               )}
//             </Form.Item>
//           </Col>
//           <Col span={6}>
//             <Form.Item label="Email">
//               {getFieldDecorator('email', {
//                 rules: [{ required: true, message: 'Please input the email!' }],
//               })(
//                 <Input              
//                   placeholder="Email"
//                 />,
//               )}
//             </Form.Item>
//           </Col>      
//         </Row>
//         <Row gutter={12}>  
//           <Col span={12}>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" className="login-form-button">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Col>
//         </Row>
//       </Form>
//       <Row>
//       <Col span={3}>
//           <Sider>
//               <Menu theme="dark" mode="inline" onClick={e => this.handleLinkClick(e)} defaultSelectedKeys={['2']}>
//                   <Menu.Item key="patient_details_link">
//                       <span className="nav-text">Details</span>
//                   </Menu.Item>
//                   <Menu.Item key="visit_details_link">
//                       <span className="nav-text">Visits</span>
//                   </Menu.Item>
//                   <Menu.Item key="vitals_details_link">
//                       <span className="nav-text">Vitals</span>
//                   </Menu.Item>
//                   <Menu.Item key="allergies_details_link">
//                       <span className="nav-text">Allergies</span>
//                   </Menu.Item>
//               </Menu>
//           </Sider>
//       </Col>
//       </Row>
//       </Card>
     
//     );
//   }
// }

// const WrappedAddBankForm = Form.create({ name: 'normal_login' })(AddBankForm);

// export default WrappedAddBankForm;
          
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import { Table, Input, InputNumber, Popconfirm } from 'antd';


const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({form}) => {
 
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    console.log(record, 'record')
    console.log(form, 'form')
    form.setFields({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
      <>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
   
    </>
  );
};
const Editable = Form.create()(EditableTable)
export default Editable;