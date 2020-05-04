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
  Form,
  Col,
  Row,
  Modal,
  Icon



} from 'antd';
import { PrepareInvoiceService, RequestsService, serviceRequestsService  } from '../../../../../config/claims_management_service';
import { InsuranceService } from '../../../../../config/_service';
import 'antd/dist/antd.css';
import TextArea from "antd/lib/input/TextArea";
import Highlighter from "react-highlight-words";



class InvoiceDetails extends React.Component {
  state = {
    service: this.props.location.state.Services,
    payers: this.props.location.state.payer_id,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    isLoading: false,
    dataSource: [],
    insuranceId: [],
    prepareInvoice: [],
    payer: [],
    datas: [],
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    value: '',
    request_data: [],
    service_info: [],
    


  };



  componentDidMount() {
    const {service, payers} = this.state

this.setState({service_info: service.service_requested_data_data})

    // Insurance Id 

    serviceRequestsService.fetchServiceRequested({ payerId: payers.payer_id , requestNumber: service.request_number} ).then(res => {
      if (res.data){
        message.success('Services fetched successfully')
      } else {
        message.error('Theres a problem loading the page. Please try reloading')
      }
      console.log('response', res)
    })

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
    const { payer, value, request_data, service, payers } = this.state

    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });

    console.log('service', service);
    console.log('narration', value);
    console.log('payer id', payers);
    let invoice = {}

    invoice = {
      payer_id: payers.payer_id,
      request_id: service.incoming_request_id,
      request_data: request_data,
      narration: value,
    }

    PrepareInvoiceService.postPrepareInvoice(invoice).then(res => {
      if(res.status ===201 ) {
        message.success('Draft Invoice Prepared Successfully')
        console.log('Saved Response', res)
        this.props.history.push('/newinvoice')
      }
    
    })

    console.log('invoice', invoice)

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
  

      RequestsService.fetchRequestsByPayerId(insurance.payer_id).then(res => {
        console.log('server response by id', res)
        this.setState({ isLoading: false })
        this.setState({ dataSource: res.data.content })
      })

    }
  }

  handleSubmit = (row) => {
    const { payer, datas } = this.state
    console.log('handle Submit', row)
    console.log('prepare Invoice', payer)
    const narrationa = 'ffssdf'
    console.log('prepare Invoice details', datas)

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
    const { request_data, payer } = this.state
    console.log('row', row)
    this.setState({ request_data: row })
    console.log('request data', request_data);
    console.log('payer_id', payer)
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleChange = (event) => {
    console.log('event', event)
    this.setState({ value: event.target.value });
  }

  render() {
    const columns = [

      {
        title: 'Request no',
        dataIndex: 'request_number',
        key: 'request_number',
      },

      {
        title: 'Service Name',
        dataIndex: 'service_name',
        key: 'service_name',
      },

      {
        title: 'Payee Name',
        dataIndex: 'member_name',
        key: 'member_name',

      },

      
      {
        title: 'Payer Name',
        dataIndex: 'payer_name',
        key: 'payer_name',

      },

      {
        title: ' Amount',
        dataIndex: 'amount_billed_to_payer',
        key: 'amount_billed_to_payer',

      },

 


    ];

    const data = []
    const { loading, selectedRowKeys, dataSource, insuranceId, ModalText, visible, confirmLoading } = this.state;
    const rowSelection = {
      selectedRowKeys,

      onChange: this.onSelectChange,
    };



    const hasSelected = selectedRowKeys.length > 0;
    const { isLoading, service, service_info } = this.state
    console.log('services', service)
    console.log('services info', service_info)

    return (
      <>
        <Card>
          <PageHeader
            title="New Invoice"
onBack={()=>this.props.history.push('/newinvoice')}
            style={{ marginTop: 2, marginBottom: 2 }}


          />

<div style={{ marginBottom: 16 }}>



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
            dataSource={service_info}
          />

          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>


              <Button style={{ marginLeft: 8, marginTop: 8 }} type="primary" htmlType="submit" onClick={this.showModal} >
              Proceed
                              </Button>


            </Col>
          </Row>
          <Modal
            title="Add Narration"
            visible={visible}
            onOk={this.handleOk}
            okText='Submit'
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <Form.Item label="Narration: " >

              <TextArea type="text"
                prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                style={{ width: '100%', height: '130px' }}
                onChange={this.handleChange}
                value={this.state.value}
              />,
                                </Form.Item>
          </Modal>
        </Card>

      </>
    );
  }
}

export default withRouter(InvoiceDetails);