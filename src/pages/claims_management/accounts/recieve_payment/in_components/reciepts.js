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
  Icon



} from 'antd';
import { RecieptsService } from '../../../../../config/claims_management_service';
import { InsuranceService } from '../../../../../config/_service';
import 'antd/dist/antd.css';
import Highlighter from "react-highlight-words";



class InvoiceDetails extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    isLoading: true,
    dataSource: [],
    insuranceId: [],
    prepareInvoice: [],
    payer: [],
    datas: [],
    label: 'Select Payer',
  };



  componentDidMount() {



    // Insurance Id 

    InsuranceService.fetchInsurance().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ insuranceId: res.data.content })
      }
    }).catch(error => {
      console.log(error)
    });

    // Recipts 

    RecieptsService.fetchReciepts().then(res => {
        console.log('reciepts status', res)
        if(res.data) {
            this.setState({isLoading: false})
            this.setState({dataSource: res.data.content})
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




  handleCancel = () => {
    message.error("The current object has not deleted")

  }

  handlePayer = (insurance, e) => {
    const { payer } = this.state
    console.log('handle Payer')
    if (e.key === 'edit') {
      console.log('insurance', insurance)
      this.setState({ payer: insurance })
      this.setState({label: insurance.name})

      RecieptsService.fetchRecieptId({payerId: insurance.payer_id }).then(res => {
        if(res.data) {
          message.success(insurance.name + ' Reciepts fetched successfully' )
          console.log(res, 'server response')
          this.setState({dataSource: res.data.content })
        }
    
      } )

    //   RequestsService.fetchRequestsByPayerId(insurance.payer_id).then(res => {
    //     console.log('server response by id', res)
    //     this.setState({ isLoading: false })
    //     this.setState({ dataSource: res.data.content })
    //   })

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

  onSelectChange = (selectedRowKeys, row, insurance) => {
    const { dataSource, payer } = this.state
    let data = {}

    // this.setState({payer: row})

    // data.push({
    //   request_data: row,
    //   payer_id: payer.payer_id


    // })

    data = {
      request_data: row,
      payer_id: payer.payer_id
    }
    this.setState({ datas: data })
    console.log('dataaa', data)
    console.log('insureeee', payer)
    console.log('row', row)



    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };



  render() {
    const columns = [

      {
        title: 'Payer Name',
        dataIndex: 'payer_name',
        key: 'payer_name',
      },
      {
        title: 'Payment Mode: ',
        dataIndex: 'mode',
        key: 'mode',

      },
      {
        title: 'Document No: ',
        dataIndex: 'document_number',
        key: 'document_number',

      },

      {
        title: 'Document Date',
        dataIndex: 'document_date',
        key: 'document_date',

      },

      {
        title: 'Amount: ',
        dataIndex: 'amount',
        key: 'amount',

      },

      {
        title: 'Balance: ',
        dataIndex: 'balance',
        key: 'balance',

      },



    ];

    const data = []
    const { loading, selectedRowKeys, dataSource, insuranceId, label } = this.state;
    const rowSelection = {
      selectedRowKeys,

      onChange: this.onSelectChange,
    };



    const hasSelected = selectedRowKeys.length > 0;
    const { isLoading } = this.state
    return (
      <>
        <Card>
          <PageHeader
            title="Reciepts"

            style={{ marginTop: 2, marginBottom: 2 }}
            extra={[
                <Button type="primary" key="1"
                  onClick={() => this.props.history.push("/reciepts/add")}
    
                >
                  New Reciept
                                </Button>
              ]}


          />
         <div>
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
              <Button style={{ marginBottom: 10 }} size="medium" type="primary">
               {label} <Icon type="down" />
              </Button>
            </Dropdown>


          </div>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={dataSource}
          />

        </Card>


      </>
    );
  }
}

export default withRouter(InvoiceDetails);