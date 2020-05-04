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
  Popconfirm, 
  PageHeader,
} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import { ServiceProviderVehicle} from '../../../../../../config/service_provider';
import { ServiceCategoryService } from "../../../../../../config/_service";
// import VisitAction from "../../Visit/VisitAction";

class ServiceProvider extends Component {
  state = {
    searchText: "",
    isLoading: false,
    dataSource: [],
    MemberDetails: this.props.location.state.Member 
  };

  componentDidMount() {
      const {MemberDetails} = this.state
      ServiceProviderVehicle.fetchServiceProviderVehicleId(MemberDetails.users_id).then(res => {
        console.log(" server response", res);
        if(res.data){
          this.setState({dataSource: res.data.content});
        }
      });
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
      onClick: () => {}
    };
  };
  setRowClassName = record => {
    return "clickRowStyl";
  };

  handleMenuClick = (row, e) => {
    
    if (e.key === "vehicle") {
      this.props.history.push({
        pathname: "/serviceprovider/vehicle",
        state: {
         Member: this.state.MemberDetails
        }
      });
    } 
  };

  handleButtonClick = () => {
    this.props.history.push({
      pathname: "/serviceprovider/vehicle/add",
      state: {
       Member: this.state.MemberDetails
      }
    });
  }

  handlecConfirms = (row) => {
    const data = this.state.dataSource;
    ServiceCategoryService.deleteServiceCategories(row.type_id)
    this.setState({ dataSource: data });
    

  }

  handleCancel = () => {
    message.error("The object you selected has not been deleted")
  }
  handleBack = () => {
    
    this.props.history.push({
        pathname: "/serviceprovider",
        state : {
            Member: this.state.MemberDetails
        }
    })
}

  render() {
    const columns = [
      {
        title: "Reg Number",
        dataIndex: "vehicle_reg_number",
        key: "vehicle_reg_number",
        ...this.getColumnSearchProps("vehicle_reg_number"),
        render: (text, row) => <Link to={{
            pathname: '/serviceprovider/vehicle/driver',
            state: {Driver: row, Member: this.state.MemberDetails  }
          }}>{text}</Link>
      },
     
      {
        title: 'Rescue Vehicle Type',
        dataIndex: 'rescue_vehicle_type_id',
        key: 'rescue_vehicle_type_id',

    },
    {
        title: 'Insurance :',
        dataIndex: 'insurance_policy_no',
        key: 'insurance_policy_no',
       

    },
    {
        title: 'Insurance Id :',
        dataIndex: 'insurance_id',
        key: 'insurance_id',

    },

    {
        title: 'Insurance Start',
        dataIndex: 'insurance_start_date',
        key: 'insurance_end_date',

    },

    {
        title: 'Insurance Expiry',
        dataIndex: 'insurance_end_date',
        key: 'insurance_end_date',

    },

    {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
    },

    
   
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
        

    },
      {
        title: "",
        dataIndex: "",
        key: "action",
        render: (text, row) => (
          <Dropdown
            overlay={
              <Menu onClick={e => this.handleMenuClick(row, e)}>
                <Menu.Item key="vehicle">
                  Add
                </Menu.Item>
                <Menu.Item key="delete">
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

    const expandedRowRender = (record) => {

      const column = [

        {
          title: 'Document Name',
          dataIndex: 'doc_name',
          key: 'name',

        },

        {
          title: 'Document Image',
          dataIndex: 'doc_path',
          key: 'vehicle_type',
          render: (text, row) => <Link to={{
            pathname: '/member/vehicle/documents',
            state: { vehicleDocuments: row }
          }}>{text}</Link>
        
        },

        

        
      ]


      console.log("record", record)
      console.log("recordsss", record.mem_vehicle_docs)


      const data = []
      for (let i = 0; i < record.mem_vehicle_docs.length; i++) {
        data.push({
          key: i,
          doc_name: record.mem_vehicle_docs[i].doc_name,
          doc_path: record.mem_vehicle_docs[i].doc_path,
          
          

        })
      }

      return <Table columns={column} dataSource={data} pagination={false} size='small' bordered = 'true' />;
    }

    const { dataSource, isLoading, MemberDetails } = this.state;
    console.log("initial State", MemberDetails )
    return (
      <Card type={"inner"} >
         <PageHeader
          onBack={() => { this.props.history.push('/serviceprovider') }}
        //   onBack={() => this.handleBack()}
          title= {MemberDetails.full_name}

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="vehicle"
              onClick={() => this.handleButtonClick()}

            >
              New Vehicle 
                            </Button>
          ]}
        />
        <Table
          loading={isLoading}
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey={record => record.visit_number}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}} 
          expandedRowRender = {record  => expandedRowRender(record)}
        />
      </Card>
    );
  }
}

export default withRouter(ServiceProvider);
 


