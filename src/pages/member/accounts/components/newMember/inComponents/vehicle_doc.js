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
  Popconfirm
} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import {MemberVehicleDocsService} from '../../../../../../config/member_service';
// import VisitAction from "../../Visit/VisitAction";

class VehicleDocuments extends Component {
  state = {
    searchText: "",
    isLoading: false,
    dataSource: [],
    vehicleDetails: this.props.location.state.Member 
  };

  componentDidMount() {
      const {vehicleDetails} = this.state
    MemberVehicleDocsService.fetchMemberVehicleDocs(vehicleDetails.users_id).then(res => {
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
   MemberVehicleDocsService.deleteMemberVehicleDocs(row.type_id)
    this.setState({ dataSource: data });
    

  }

  handleCancel = () => {
    message.error("The object you selected has not been deleted")
  }

  render() {
    const columns = [
      {
        title: "Documents Name",
        dataIndex: "doc_name",
        key: "doc_name",
        ...this.getColumnSearchProps("doc_name"),
        render: (text, row) => <Link to={{
          pathname: '/serviceprovider/vehicle',
          state: { servicePoint: row }
        }}>{text}</Link>
      },
     
    {
        title: 'Documents Path',
        dataIndex: 'doc_path',
        key: 'doc_path',

    },

    {
      title: 'Documents Path',
      dataIndex: 'member_vehicle_id',
      key: 'member_vehicle_id',

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
    const { dataSource, isLoading, vehicleDetails } = this.state;
    console.log("initial State", vehicleDetails )
    return (
      <Card type={"inner"} title={vehicleDetails.full_name}>
        <Table
          loading={isLoading}
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey={record => record.visit_number}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}} 
          scroll={{ y: 360 }}
        />
      </Card>
    );
  }
}

export default withRouter(VehicleDocuments);
 


