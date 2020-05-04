import React, { useContext, useState, useEffect, useRef } from 'react';
import { withRouter, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import {
  Table,
  Input,
  Button,
  Card,
  message,
  Menu,
  Dropdown,
  Tag,
  PageHeader,
  Popconfirm,
  Form,
  Col,
  Row,
  Modal,
  DatePicker,
  Select,
  Icon




} from 'antd';
import 'antd/dist/antd.css';
import Highlighter from "react-highlight-words";
import TextArea from "antd/lib/input/TextArea";
import styled from 'styled-components';
import moment from 'moment';
// import { createForm } from "rc-form";
import { PrepareInvoiceService, FilterInvoiceService, RecieptsService, DispatchInvoicesService, AllocationService } from '../../../../../config/claims_management_service';
import { InsuranceService } from '../../../../../config/_service';


const EditableContext = React.createContext();

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async e => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };

const columns = [
    {
        title: 'Invoice Number',
        dataIndex: 'invoice_number',
        key: 'invoice_number',


      },

      {
        title: 'Payer Name',
        dataIndex: 'payer_name',
        key: 'payer_name',

      },

      {
        title: 'Payer Name  ',
        dataIndex: 'payee_name',
        key: 'payee_name',

      },

      {
        title: ' Narration ',
        dataIndex: 'narration',
        key: 'narration',

      },


      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        editable: true,

      },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class App extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    isLoading: true,
    dataSource: [],
    insuranceId: [],
    prepareInvoice: [],
    payer: [],
    datas: [],
    visible: false,
    confirmLoading: false,
    reciept: [],
    invoice_data: [],
    label: 'Select Payer',
    money: 'Select Reciept',
    myReciept: [],
    row: [],
    modal: false,

  };

  
  componentDidMount() {


    RecieptsService.fetchReciepts().then(res => {
      console.log('reciepts status', res)
      if (res.data) {
        this.setState({ isLoading: false })
        this.setState({ reciept: res.data.content })
        message.success(' Invoices to be allocated fetched successfully')
      }
    })

    // Insurance Id 

    InsuranceService.fetchInsurance().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ insuranceId: res.data.content })
      }
    }).catch(error => {
      console.log(error)
    })


  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    const { payer, details, invoice_data, document_date, myReciept } = this.state

    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });

    this.props.form.validateFields((err, values) => {
      console.log('values', values)
      let invoice = {
        invoice_number: invoice_data.invoice_number,
        amount: values.amount
      }

      let allocation = {}

      allocation = {
        payer_id: payer.payer_id,
        invoice_data: invoice_data,
        narration: values.narration,
        doc_date: values.doc_date,
        receipt_number: myReciept.receipt_number
      }

      AllocationService.postAllocation(allocation).then(res => {
        console.log('Saved Response', res)
        if(res.status === 201){
            this.setState({selectedRowKeys: [] })   
            message.success('Invoice allocated Succefully')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        }
        this.props.history.push('/allocation')
      })

      console.log('invoice', allocation)
    })


    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);


  };

  handleClickRow = (record) => {
this.props.history.push({
  pathname: '/allocation/edit',
          state: { 
            servicePoint: record,
            myReciept: this.state.myReciept,
            payer: this.state.payer
          
          }
})
    console.log('record', record)
  }


//   handleClickRow = row => {
//       console.log(row, 'row')
     

//       this.setState({row})
//     const newData = [...this.state.dataSource];
//     console.log('nawData', newData)
//     console.log( 'amount', newData.amount)
//     const index = newData.findIndex(item => console.log( 'item',row), row.key === item.key);
//     console.log('index', index)
//     const item = newData[index];
//     console.log('item',item)
//     newData.splice(index, 1, { ...item, ...row });
//     this.setState({
//       dataSource: newData,
//     });
//   };

  handlePayer = (insurance, e) => {
    const { payer } = this.state
    console.log('handle Payer')
    if (e.key === 'edit') {
      console.log('insurance', insurance)
      this.setState({ payer: insurance })

      FilterInvoiceService.fetchFilterInvoiceSent(insurance.payer_id).then(res => {
        console.log('server response by id', res)
        this.setState({ isLoading: false })
        this.setState({ dataSource: res.data.content })
        this.setState({ label: insurance.name })
        message.success('Payer Fetched Succesfully')
      })

    }

    
  
    RecieptsService.fetchRecieptId({payerId: insurance.payer_id}).then(res => {
      console.log('reciepts status', res)
      if (res.data) {
        this.setState({ isLoading: false })
        this.setState({ reciept: res.data.content })
        message.success('Reciept Number fetched succesfully')
      }
    })
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };


  handleReciept = (reciept) => {
    this.setState({ myReciept: reciept})
    this.setState({ money: reciept.receipt_number })
  }


  onSelectChange = (selectedRowKeys, row) => {
      this.setState({invoice_data: row})
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

 handleSave = () => {
    // const newData = [...this.state.dataSource];
    // const index = newData.findIndex(item => row.key === item.key);
    // console.log('index', index)
    // const item = newData[index];
    // console.log('item',item)
    // newData.splice(index, 1, { ...item, ...row });
    // this.setState({
    //   dataSource: newData,
    // });


    setTimeout(() => {
        this.setState({
          modal: false,
         
        });
      }, 2000);
 }
  render() {

    const components = {
        body: {
          cell: EditableCell,
        },
      };
      const {getFieldDecorator} = this.props.form
    const { loading, selectedRowKeys, myReciept, reciept, insuranceId, isLoading, dataSource, visible, confirmLoading, modal } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <Card>
        <PageHeader
          title="Allocation"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Card title="Reciept Balance" bordered={false}>
          {myReciept.balance}
          </Card>
          ]}

        />

        <div style={{ marginBottom: 16 }}>


          <Dropdown
            overlay={

              <Menu>
                {
                  insuranceId.map((insurance) => (

                    <Menu.Item key="edit" onClick={(e) => this.handlePayer(insurance, e)} >

                      {insurance.name}
                    </Menu.Item>

                  ))


                }


              </Menu>
            }
          >
            <Button style={{ marginRight: 10 }} size="medium" type="primary">
              {this.state.label} <Icon type="down" />
            </Button>
          </Dropdown>

          <Dropdown
            overlay={

              <Menu>
                {
                  reciept.map((reciept) => (

                    <Menu.Item key="edit" onClick={(e) => this.handleReciept(reciept, e)} >

                      {reciept.payer_name} - {reciept.receipt_number}
                    </Menu.Item>

                  ))


                }


              </Menu>
            }
          >
            <Button style={{ marginRight: 10 }} size="medium" type="primary">
              {this.state.money} <Icon type="down" />
            </Button>
          </Dropdown>

          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading} danger >
            Reload
        </Button>


          <br />
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>

        </div>
        <Table
        onRowClick={(record) => this.handleClickRow(record)}
          rowClassName={() => 'editable-row'}
          loading={isLoading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
         
        />

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type='primary' onClick={this.showModal} style={{ marginTop: 12 }}  >
              Proceed
                        </Button>
          </Col>
        </Row>

        <Modal
          title="Add Date, Allocated Amount and Narration"
          visible={visible}
          onOk={this.handleOk}
          okText='Submit'
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >



          <Form.Item label="Document Date"
          >
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
        
          <Form.Item label="Narration: " >
            {
              getFieldDecorator('narration')(<TextArea type="text"
                prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                style={{ width: '100%', height: '130px' }}
                name='narration'

              />)
            }




          </Form.Item>
        </Modal>

        <Modal
          title="Change Amount"
          visible={modal}
          onOk={this.handleSave}
          okText='Submit'
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        
        >

            <Form>
                <Form.Item label='Amount' >
                    {

                        getFieldDecorator('amount', {
                            initialValue: this.state.row.amount
                        })(<Input/>)
                    }

                </Form.Item>
            </Form>


        </Modal>

      </Card>
    );
  }
}

const WrappedApp = Form.create()(App)
export default withRouter(WrappedApp);
