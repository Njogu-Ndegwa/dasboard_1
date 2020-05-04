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
import {MemberPolicyManagementService} from '../../../../../config/claims_management_service'
import {InsuranceService} from '../../../../../config/_service'

class Bank extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: [],
    insuranceId: [],
    payer: 'Select Payer',
    policy: 'Select Policy Number',
    regNo: 'Select Registration Number'
  };

  componentDidMount() {

    InsuranceService.fetchInsurance().then(res => {
      console.log('insurance response', res)
      this.setState({insuranceId: res.data.content})
    })

   MemberPolicyManagementService.fetchMemberPolicyManagement().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ dataSource: res.data.content, isLoading: false })
        message.success('Member Policy Management fetched succesfully')
      } else {
        message.error('Theres a problem displaying Member Policy management')
      }
    }).catch(error => {
      console.log(error)
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
        pathname: "policy/add",
        state: {
          servicePoint: row
        }
      });
    }
  };

handlePayer = (payer) => {
  this.setState({payer: payer.name})
MemberPolicyManagementService.fetchMemberPolicyManagementId({payerId: payer.payer_id }).then(res => {
  console.log('payer', res)
  this.setState({dataSource: res.data.content})
})
}

handlePolicy = (policy) => {
  this.setState({policy: policy.policy_number})
  MemberPolicyManagementService.fetchMemberPolicyManagementId({policyNumber: policy.policy_number }).then(res => {
    console.log('payer', res)
    this.setState({dataSource: res.data.content})
  })
}


handleRegNo= (reg) => {
  this.setState({regNo: reg.vehicle_registration_number})
  MemberPolicyManagementService.fetchMemberPolicyManagementId({vehicleRegistrationNumber: reg.vehicle_registration_number }).then(res => {
    console.log('payer', res)
    this.setState({dataSource: res.data.content})
  })
}


handleRefresh = () => {
  MemberPolicyManagementService.fetchMemberPolicyManagement().then(res => {
    console.log("server response", res)
    if (res.data) {
      this.setState({ dataSource: res.data.content, isLoading: false })
    }
  }).catch(error => {
    console.log(error)
  })

  this.setState({payer:'Select Payer', policy: 'Select Policy', regNo: 'Select Registration no'})
}
  

  handleCancel = () => {
    message.error("The current object has not deleted")

  }

  handleConfirm = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.member_policy_mngt_id !== row.member_policy_mngt_id);
    this.setState({ dataSource });

    MemberPolicyManagementService.deleteMemberPolicyManagement(row.member_policy_mngt_id).then( res => {
      console.log("deleted response", res)
      if (res.status === 202){
        message.success("Member Policy deleted succesfully");
      }
    }).catch (error => {
      console.log(error)
    })
    
  }

  handleCancel = () => {
    message.cancel('Member Policy not deleted')
  }

  render() {
    const columns = [

      {
        title: 'Policy No',
        dataIndex: 'policy_number',
        key: 'policy_number',

      },

      {
        title: 'Registration No',
        dataIndex: 'vehicle_registration_number',
        key: 'vehicle_registration_number',

      },

      {
        title: 'Vehicle Owner',
        dataIndex: 'vehicle_owner',
        key: 'vehicle_owner',

      },

      
      {
        title: 'Payer Name',
        dataIndex: 'payer_name',
        key: 'payer_name',

      },


      {
        title: 'Date From',
        dataIndex: 'date_from',
        key: 'date_from',

      },

      {
        title: 'Date to',
        dataIndex: 'date_to',
        key: 'date_to',

      },

    

      {
        title: 'Limit',
        dataIndex: 'amount_limit',
        key: 'amount_limit',

      },


      {
        title: 'Consumed',
        dataIndex: 'amount_consumed',
        key: 'amount_consumed',

      },

      {
        title: 'Balance',
        dataIndex: 'amount_balance',
        key: 'amount_balance',

      },



      {
        title: "",
        dataIndex: "",
        key: "action",
        render: (text, row) => (
          <Dropdown
            overlay={
              <Menu onClick={e => this.handleMenuClick(row, e)}>
                <Menu.Item key="edit">
                  Edit
                  </Menu.Item>
                  <Menu.Divider/>
                <Menu.Item >
                  <Popconfirm 
                  title = 'Are you sure you want to delete this task?'
                  onConfirm={()=> {this.handleConfirm(row)}}
                  onCancel={()=> this.handleCancel()}
                  okText="Yes"
                  cancelText="No"
                  >
                    Delete
                  </Popconfirm>
                </Menu.Item>

              </Menu>
            }
          >
            <Button size="small" color="blue">
              Action <Icon type="down" />
            </Button>
          </Dropdown>
        )
      }
    
    ];
    const expandedRowRender = ( record ) => {

      const column = [

        {
          title: 'Service Id',
          dataIndex: 'service_id',
          key: 'service_id',
  
        },

        {
          title: 'Service Name',
          dataIndex: 'service_name',
          key: 'service_name',
  
        },



     

        
      ]


console.log("record",record)

// for(record.Branch node:record.bank_branches ){

//   node.getBrachName

// }

      const data = []
      for (let i = 0; i < record.services_covered_data.length; i++  ){
        data.push({
          key: i,
          service_id: record.services_covered_data[i].service_id,
          service_name:  record.services_covered_data[i].service_name,
     

        })
      }

      return ( <Card>  <Table columns={column} dataSource={data} pagination={false} size='small' bordered = 'true' /></Card> ) ;
    }


    const { dataSource, isLoading, insuranceId, payer, policy, regNo } = this.state;
    return (
      <Card>
        <PageHeader
          // onBack={() => { this.props.history.push('/settings/system') }}
          title="Member Policy Management"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/policy/add")}

            >
              New Policy
                            </Button>
          ]}
        />
          <div styl={{marginBottom: 10 , marginRight: 10 }}  >
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
              <Button style={{ marginBottom: 10 , marginRight: 10 }} size="medium" type="primary">
               {payer} <Icon type="down" />
              </Button>
            </Dropdown>

            <Dropdown
              overlay={

                <Menu>
                  {
                    dataSource.map((policy) => (

                      <Menu.Item key="edit" onClick={(e) => this.handlePolicy(policy, e)} >

                        {policy.policy_number}
                      </Menu.Item>

                    ))


                  }


                </Menu>
              }
            >
              <Button style={{ marginBottom: 10 , marginRight: 10 }} size="medium" type="primary">
               {policy} <Icon type="down" />
              </Button>
            </Dropdown>

            <Dropdown
              overlay={

                <Menu>
                  {
                    dataSource.map((reg) => (

                      <Menu.Item key="edit" onClick={(e) => this.handleRegNo(reg, e)} >

                        {reg.vehicle_registration_number}
                      </Menu.Item>

                    ))


                  }


                </Menu>
              }
            >
              <Button style={{ marginBottom: 10 , marginRight: 10 }} size="medium" type="primary">
               {regNo} <Icon type="down" />
              </Button>
            </Dropdown>

<Button style={{marginBottom: 10}} onClick={this.handleRefresh} >Refresh</Button>

          </div>
        <Table
          loading={isLoading}
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey={record => record.member_type_name}
          expandedRowRender= {record => expandedRowRender(record) }
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}}
        />
      </Card>
    );
  }
}

export default withRouter(Bank);