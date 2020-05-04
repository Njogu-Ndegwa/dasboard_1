import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
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
  Icon
} from "antd";
import Highlighter from "react-highlight-words";
import { DispatchInvoicesService, FilterInvoiceService, RequestsService, } from '../../../../../config/claims_management_service';
import { InsuranceService } from '../../../../../config/_service';

// import VisitAction from "../../Visit/VisitAction";

class BankBranch extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: [],
    insuranceId: [],
    payer: [],
    label: 'Select Payer'
  };

  componentDidMount() {
    RequestsService.fetchRequests().then(res => {
      if(res.data){
        console.log('server response by id', res)
        this.setState({ isLoading: false })
        this.setState({ dataSource: res.data })
        message.success('Requests fetched successfully')
      } else {
        message.error('There is a problem displaying requests. Try refreshing the page')
      }
     
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

  handlePayer = (insurance, e) => {
    const { payer } = this.state
    console.log('handle Payer')
    if (e.key === 'edit') {
      console.log('insurance', insurance)
      this.setState({ payer: insurance })
      this.setState({label: insurance.name })

      RequestsService.fetchMemberRequests(insurance.payer_id).then(res => {
        console.log('server response by id', res)
        this.setState({ isLoading: false })
        this.setState({ dataSource: res.data })
      })

    }
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
   console.log('record', record)
  };
  setRowClassName = record => {
    return "clickRowStyl";
  };

  handleMenuClick = (row, e) => {
    if (e.key === "edit") {
      this.props.history.push({
        pathname: "/bank/branch/add",
        state: {
          servicePoint: row
        }
      });
    }
  };
  handleConfirm = (row) => {
  

    // BankBranchService.deleteBankBranch(row.banck_branch_id).then( res => {
    //   console.log("deleted response", res)
    //   if (res.status === 202){
    //     message.success("Bank Branch deleted succesfully");
    //   }
    // }).catch (error => {
    //   console.log(error)
    // })

  }

  handleCancel = () => {
    message.error("The current object has not deleted")

  }

  handleClick = (record) => {
    const {payer} = this.state
this.props.history.push({
  pathname: '/newinvoice/add',
          state: { 
            Services: record,
            payer_id: payer
          
          }
})
    console.log('record', record)
  }

  render() {
   
    const columns = [

      {
        title: 'Registration no: ',
        dataIndex: 'vehicle_reg_no',
        key: 'Registration No ',

      },

      {
        title: 'Member Name',
        dataIndex: 'member_name',
        key: 'member_name',

      },

      {
        title: 'Member Vehicle Type',
        dataIndex: 'member_vehicle_type',
        key: 'member_vehicle_type',

      },

      {
        title: 'Origin',
        dataIndex: 'member_location',
        key: 'member_location',

      },

      {
        title: 'Destination',
        dataIndex: 'destination_name',
        key: 'destination_name',

      },

  
    ];
    const { dataSource, isLoading, insuranceId, label } = this.state;
    console.log('insurance id', insuranceId)
    console.log('datasource', dataSource)
    return (
      <Card>
        <PageHeader
          title="Invoice Preparation"
          subTitle='A List of Requests made by customers'
          style={{ marginTop: 2, marginBottom: 2 }}
          onBack={()=> this.props.history.push('/invoice')}
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


        </div>

        <Table
          loading={isLoading}
          onRowClick={(record) => this.handleClick(record)}
          rowClassName={this.setRowClassName}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey={record => record.member_type_name}
          pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
        />
       
      </Card>
    );
  }
}

export default withRouter(BankBranch);