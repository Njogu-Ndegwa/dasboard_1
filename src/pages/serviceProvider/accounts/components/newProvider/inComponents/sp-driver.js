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
  PageHeader
} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import {ServiceProviderDriversService} from '../../../../../../config/service_provider';
// import VisitAction from "../../Visit/VisitAction";

class VehicleDocuments extends Component {
  state = {
    searchText: "",
    isLoading: false,
    dataSource: [],
    vehicleDriver: this.props.location.state.Driver,
  };

  componentDidMount() {
      const {vehicleDriver} = this.state
    ServiceProviderDriversService.fetchServiceProviderDrivers(vehicleDriver.users_id).then(res => {
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
         servicePoint: row
        }
      });
    } 
  };

  handlecConfirms = (row) => {
    const data = this.state.dataSource;
   ServiceProviderDriversService.deleteMemberVehicleDocs(row.type_id)
    this.setState({ dataSource: data });
    

  }

  handleCancel = () => {
    message.error("The object you selected has not been deleted")
  }

  render() {
    const columns = [
      {
        title: "Plate Number",
        dataIndex: "plate_number",
        key: "plate_number",
        ...this.getColumnSearchProps("plate_number"),
   
      },
     
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',

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
    const { dataSource, isLoading, vehicleDriver } = this.state;
    console.log("vehicleDriver", vehicleDriver )
    return (
      <Card type={"inner"} title={vehicleDriver.full_name}>
                <PageHeader

title="Drivers"
style={{ marginTop: 2, marginBottom: 2 }}
extra={[
    <Button type="primary" key="1"
        onClick={() => this.props.history.push("/serviceprovider/vehicle/driver/add")}

    >
        New Driver
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
        />
      </Card>
    );
  }
}

export default withRouter(VehicleDocuments);
 


