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

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


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

class InvoiceDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

    };

    this.columns = [

      {
        title: 'Invoice Number',
        dataIndex: 'invoice_number',
        key: 'invoice_number',
        ...this.getColumnSearchProps("invoice_number"),

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
  }




  componentDidMount() {


    RecieptsService.fetchReciepts().then(res => {
      console.log('reciepts status', res)
      if (res.data) {
        this.setState({ isLoading: false })
        this.setState({ reciept: res.data.content })
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
        invoice_data: invoice,
        narration: values.narration,
        document_date: values.document_date,
        receipt_number: myReciept.receipt_number
      }

      AllocationService.postAllocation(allocation).then(res => {
        console.log('Saved Response', res)
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

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  handlePayer = (insurance, e) => {
    const { payer } = this.state
    console.log('handle Payer')
    if (e.key === 'edit') {
      console.log('insurance', insurance)
      this.setState({ payer: insurance })

      FilterInvoiceService.fetchFilterInvoiceDraft(insurance.payer_id).then(res => {
        console.log('server response by id', res)
        this.setState({ isLoading: false })
        this.setState({ dataSource: res.data.content })
        this.setState({ label: insurance.name })
      })

    }

    RecieptsService.fetchRecieptId({payerId: insurance.payer_id}).then(res => {
      console.log('reciepts status', res)
      if (res.data) {
        this.setState({ isLoading: false })
        this.setState({ reciept: res.data.content })
      }
    })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
            </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
            </Button>
        </div>
      ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },

  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  // select the row
  onClickRow = record => {
    return {
      onClick: () => { }
    };
  };
  setRowClassName = record => {
    return "clickRowStyl";
  };

  handleMenuClick = (row, e) => {
    if (e.key === "edit") {
      this.props.history.push({
        pathname: "/invoice/add",
        state: {
          servicePoint: row
        }
      });
    }
  };


  // handlePayer = (insurance, e) => {
  //   const { payer } = this.state
  //   console.log('handle Payer')
  //   if (e.key === 'edit') {
  //     console.log('insurance', insurance)
  //     this.setState({ payer: insurance })

  //     AllocationService.fetchAllocation().then(res => {
  //       console.log('server response by id', res)
  //       this.setState({ isLoading: false })
  //       this.setState({ dataSource: res.data.content })
  //     })

  //   }
  // }

  handleSubmit = (row) => {
    const { payer, datas } = this.state
    const { dataSource, prepareInvoice } = this.state
    console.log('handle Submit', row)
    console.log('prepare Invoice', payer)
    console.log('prepare Invoice details', datas)
    PrepareInvoiceService.postPrepareInvoice(datas).then(res => {
      console.log('prepare invoice', res)
      this.props.history.push('/invoice')
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
  onSelectChange = (selectedRowKeys, row, insurance, ) => {
    const { invoice_data, payer } = this.state
    console.log('row', row)


    this.setState({ invoice_data: row })
    console.log('request data', invoice_data);
    console.log('payer_id', payer)
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleReciept = (reciept) => {
    this.setState({ myReciept: reciept})
    this.setState({ money: reciept.receipt_number })
  }

  render() {


    const data = []

    const { loading, selectedRowKeys, dataSource, insuranceId, isLoading } = this.state;


    const hasSelected = selectedRowKeys.length > 0;

    const rowSelection = {
      selectedRowKeys,

      onChange: this.onSelectChange,
    };

    const expandedRowRender = (record) => {

      const column = [

        {
          title: 'Request Number',
          dataIndex: 'name',
          key: 'name',
          render: (text, row) => <Link to={{
            pathname: '/request',
            state: { Request: row }
          }}>{text}</Link>


        },

      ]


      console.log("record", record)

      // for(record.Branch node:record.bank_branches ){

      //   node.getBrachName

      // }
      console.log('request', record)
      const data = []
      for (let i = 0; i < record.request_data.length; i++) {
        data.push({
          key: i,
          name: record.request_data[i].request_number,

        })
      }

      return <Table columns={column} dataSource={data} pagination={false} size='small' bordered='true' />;
    }

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      } else {

        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      }
    });
    const { visible, confirmLoading, reciept, myReciept } = this.state
    console.log('money',myReciept)
    const { getFieldDecorator } = this.props.form

    return (
      <>
  
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
            components={components}
            rowClassName={() => 'editable-row'}
            loading={isLoading}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            expandedRowRender={record => expandedRowRender(record)}
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
            <Form.Item label="Allocated Amount" hasFeedback>
              {getFieldDecorator('amount')(
                <Input />
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

        </Card>


      </>
    );
  }
}

const InvoiceDetailss = Form.create()(InvoiceDetails)
export default withRouter(InvoiceDetailss);