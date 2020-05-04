import React from 'react';
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
  Icon, 
  Form




} from 'antd';

import { DispatchInvoicesService, FilterInvoiceService } from '../../../../../config/claims_management_service';
import { InsuranceService } from '../../../../../config/_service';
import 'antd/dist/antd.css';
import Highlighter from "react-highlight-words";
import TextArea from "antd/lib/input/TextArea";
import styled from 'styled-components';
import moment from 'moment';
// import { createForm } from "rc-form";
const ButtonContainer = styled.div`
  .ant-btn-default {
    background-color: palevioletred;
  }
`;

class InvoiceDetails extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    isLoading: true,
    dataSource: [],
    insuranceId: [],
    prepareInvoice: [],
    payer: [],
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    invoice_data: [],
    document_date: '',
    value: '',
    details: {
      document_date: '',
      narration: '',
    },
    label: 'Select Payer'
  };
  



  componentDidMount() {

    // Dispatch Invoices

    FilterInvoiceService.fetchFilterInvoiceDraft().then(res => {
      console.log('server response by id', res)

      if(res.data){
        this.setState({ isLoading: false })
        this.setState({ dataSource: res.data.content })
        message.success('Drafted Invoices fetched successfully')
      } else {
        message.error('Theres a problem displaying dispatched Invoices. Try refreshing the page')
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
    const { payer, details, invoice_data, document_date } = this.state

    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });

    this.props.form.validateFields((err, values) => {
      console.log('values', values)
      let invoice = {}

      invoice = {
        invoice_data: invoice_data,
        narration: values.narration,
        document_date: values.document_date
      }

      DispatchInvoicesService.postDispatchInvoices(invoice).then(res => {
        console.log('Saved Response', res)
        if(res.status===201){
          window.location.reload(true)
        }
        this.props.history.push('/dispatch')
      })

      console.log('invoice', invoice)
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
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
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


  handlePayer = (insurance, e) => {
    const { payer } = this.state
    console.log('handle Payer')
    if (e.key === 'edit') {
      console.log('insurance', insurance)
      this.setState({ payer: insurance })
      this.setState({label: insurance.name})

      FilterInvoiceService.fetchInvoice({status: 'Draft', payerId:insurance.payer_id}).then(res => {
        console.log('server response by id', res)
        this.setState({ isLoading: false })
        this.setState({ dataSource: res.data.content })
      })

    }
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



  render() {
    const columns = [

      
      {
        title: 'Invoice Number',
        dataIndex: 'invoice_number',
        key: 'invoice_number',

      },

      


      {
        title: 'Payee Name',
        dataIndex: 'payee_name',
        key: 'payee_name',

      },

      {
        title: 'Payer Name',
        dataIndex: 'payer_name',
        key: 'payer_name',

      },

      {
        title: 'Drafted By',
        dataIndex: 'drafted_by',
        key: 'drafted_by',

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

      },

    ];

    const data = []
    const { loading, selectedRowKeys, dataSource, insuranceId } = this.state;
    const rowSelection = {
      selectedRowKeys,

      onChange: this.onSelectChange,
    };



    const hasSelected = selectedRowKeys.length > 0;
    const { isLoading, visible, confirmLoading } = this.state
    const { getFieldDecorator } = this.props.form
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

    return (
      <>
        <Card>
          <PageHeader
            title="Dispatch Invoice"
            subTitle= 'For the purpose of this Test page is loading  to signify data is comming from the server '
            style={{ marginTop: 2, marginBottom: 2 }}
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
            <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading} danger >
              Refresh
          </Button>

            <br />
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>

          </div>
          <Table
            loading={isLoading}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
          />

          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>



              <Button type='primary' onClick={this.showModal} style={{ marginTop: 12 }}  >
                Proceed
                          </Button>

                          



            </Col>
          </Row>

          <Modal
            title="Add Date and Narration"
            visible={visible}
            onOk={this.handleOk}
            okText='Submit'
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >

            <Form.Item label="Document Date"
            >
              {getFieldDecorator('document_date', {
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

        </Card>


      </>
    );
  }
}
const InvoiceDetailss = Form.create()(InvoiceDetails)
export default withRouter(InvoiceDetailss);