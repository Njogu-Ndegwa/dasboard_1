import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, Menu, Dropdown, DatePicker,Modal, Row, Col, Card, PageHeader } from 'antd';
import { PrepareInvoiceService, FilterInvoiceService, RecieptsService, DispatchInvoicesService, AllocationService } from '../../../../../config/claims_management_service';
import { InsuranceService } from '../../../../../config/_service';
import Icon from '@ant-design/icons';

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
    count: 2,
  };

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

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
  }

  render() {
    const { loading, selectedRowKeys, dataSource, reciept, insuranceId,  } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
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
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}

export default App