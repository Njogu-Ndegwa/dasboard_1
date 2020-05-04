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
  Icon,
  Modal,
  DatePicker,
  Form
} from "antd";
import Highlighter from "react-highlight-words";
import {RequestsService} from '../../config/claims_management_service';
import {InsuranceService} from '../../config/_service';
import moment from 'moment';
const { Search } = Input;

class Request extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: [], 
    insuranceId: [],
    payer: 'Select Payer',
    request: 'Select Request No',
    memberId: 'Select Member Id',
    searchBy: '',
    label: 'Search By',
    visible: false,
  };

  componentDidMount() {

    InsuranceService.fetchInsurance().then(res => {
      console.log('insurance response', res)
      this.setState({insuranceId: res.data.content})
    })

    this.requestService()
  }

  requestService = () => {
    RequestsService.fetchRequests().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ dataSource: res.data, isLoading: false })
        message.success('Requests fetched successfully')
      } else {
        message.error('Theres a problem fetching Member request. Try refreshing the page')
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
        pathname: "bank/add",
        state: {
          servicePoint: row
        }
      });
    }
  };

handleSearch = searchText => {
  const {dataSource,searchBy } = this.state
  console.log('datasource', dataSource)
  const filteredEvents = dataSource.filter(({ member_name, request_number, vehicle_reg_no }) => {
    // console.log('title', member_name)
    // console.log('request_nymber', request_number)
    // console.log('vehicle_reg_no', vehicle_reg_no );
if (searchBy === 'number') {
 request_number =request_number.toString();
 return request_number.includes(searchText);
}

else if (searchBy === 'name') {
  member_name = member_name.toLowerCase();
  return member_name.includes(searchText);
}

else if (searchBy === 'reg_no') {
  vehicle_reg_no = vehicle_reg_no.toLowerCase();
  console.log('202', vehicle_reg_no)
  return  vehicle_reg_no.includes(searchText);
}

    // vehicle_reg_no = vehicle_reg_no.toString();
    // return member_name.includes(searchText);
  });
  console.log('filtered events', filteredEvents)

  this.setState({
    dataSource: filteredEvents
  });
  console.log('events data', filteredEvents)
};


  handleSearchBy = (row) => {
    console.log('row', row) 
    const {searchBy} = this.state
   if(row.key === "name"){
     this.setState({searchBy: 'name'})
     this.setState({label: 'Member Name'})

   } 
   
   else if (row.key === 'number') {
     this.setState({searchBy: 'number'})
     this.setState({label: 'Request Number'})

   } 
   
   else if ( row.key === 'reg_no') {
     this.setState({searchBy: 'reg_no'})
     this.setState({label: 'Vehicle Reg No'})
   }  
   
  }

  handleRefresh = () => {
    this.requestService()
  }



  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    })
}

showModal = () => {
  this.setState({visible: true})
}


  handleDate = () => {
    this.props.form.validateFields((err,values) => {
      console.log( 'values', values)
      if(!err) {
        
        RequestsService.fetchRequests({fromDate: values.date_from, toDate: values.date_to}).then(res => {
          console.log("server response", res)
          if (res.data) {
            this.setState({ dataSource: res.data, isLoading: false })
            message.success('Requests fetched successfully')
          } else {
            message.error('Theres a problem fetching Member request. Try refreshing the page')
          }
        }).catch(error => {
          console.log(error)
        })
      }
    } )
   
  }

  

  render() {
    const columns = [


      {
        title: 'Request Number ',
        dataIndex: 'request_number',
        key: 'request_number',

      },

      {
        title: 'Request Date ',
        dataIndex: 'request_date',
        key: 'request_date',

      },
    
          {
            title: 'Registration no: ',
            dataIndex: 'vehicle_reg_no',
            key: 'vehicle_reg_no',
    
          },
    
          {
            title: 'Member Name',
            dataIndex: 'member_name',
            key: 'member_name',
    
          },
    
          {
            title: 'Vehicle Type',
            dataIndex: 'member_vehicle_type',
            key: 'member_vehicle_type',
    
          },

          
          {
            title: 'Amount',
            dataIndex: 'total_services_cost',
            key: 'total_services_cost',
    
          },
    
    
    ];
    const expandedRowRender = ( record ) => {

      const column = [

        {
          title: 'Request Number',
          dataIndex: 'request_number',
          key: 'request_number',
  
        },

        {
            title: 'Service Name',
            dataIndex: 'service_name',
            key: 'service_name',
    
          },

        {
          title: 'Sp Username',
          dataIndex: 'service_pro_user_name',
          key: 'service_pro_user_name',
  
        },

        {
          title: 'Member Name',
          dataIndex: 'member_name',
          key: 'member_name',
  
        },

        
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
    
          },
      ]


console.log("record",record)

// for(record.Branch node:record.bank_branches ){

//   node.getBrachName

// }

      const data = []
      for (let i = 0; i < record.service_requested_data_data.length; i++  ){
        data.push({
          key: i,
          name: record.service_requested_data_data[i].branch_name,
          address:  record.service_requested_data_data[i].address,
      
        })
      }

      return <Table columns={column} dataSource={data} pagination={false} size='small' bordered = 'true' />;
    }


    const { dataSource, isLoading, insuranceId, payer, request, memberId } = this.state;
    const {getFieldDecorator} = this.props.form
    return (
      <Card>
        <PageHeader
          // onBack={() => { this.props.history.push('/settings/system') }}
          title="Requests"
          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            
<Button style={{marginBottom: 10}} onClick={this.handleRefresh} >Refresh</Button>,
<Button onClick={this.showModal} style={{ marginBottom: 10 , marginRight: 10 }} size="medium" type="danger">
             Filter by Date <Icon  />
            </Button>,
         <Dropdown
            overlay={

              <Menu onClick={(row) => this.handleSearchBy(row) } >
                    <Menu.Item key="number"  >
                     Request Number
                    </Menu.Item>
                    <Menu.Item key="name" >
                     Member Name
                    </Menu.Item>

                    <Menu.Item key="reg_no" >
                     Registration Number
                    </Menu.Item>
              </Menu>
            }
          >
            <Button style={{ marginBottom: 10 , marginRight: 10 }} size="medium" type="primary">
             {this.state.label} <Icon type="search" />
            </Button>
          </Dropdown>, 
            <Search
            placeholder="input search text"
            onSearch={searchText => this.handleSearch(searchText)}
            style={{ width: 300 }}
            enterButton
            />,
            
            
                      ]}
     
        />

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

<Modal
          title="Filter Request"
          visible={this.state.visible}
          onOk={this.handleDate}
          onCancel={this.handleCancel}
          style={{ width: 350 }}
        >
       <Card title="Filter by Date" size='small' type='inner' >
       <Form.Item label="Date From"
            >
              {getFieldDecorator('date_from', {
                rules: [{
                  required: false,
                  message: 'Please input Date From'
                }],
              })(
                <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                  format={"YYYY/MM/DD"} />,
              )}
            </Form.Item>

            <Form.Item label="Date to"
            >
              {getFieldDecorator('date_to', {
                rules: [{
                  required: false,
                  message: 'Please input Date to'
                }],
              })(
                <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                  format={"YYYY/MM/DD"} />,
              )}
            </Form.Item>
       </Card>
        </Modal>

      </Card>
    );
  }
}

const WrappedRequest = Form.create()(Request)
export default withRouter(WrappedRequest);
