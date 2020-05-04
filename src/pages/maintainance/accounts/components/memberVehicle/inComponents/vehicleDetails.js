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
  Popconfirm,
  PageHeader,
} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import { MemberVehicleTypeService } from '../../../../../../config/_service';


class MemberVehicle extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: []
  };

  componentDidMount() {

    MemberVehicleTypeService.fetchMemberVehicleType().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ dataSource: res.data.content, isLoading: false })
        message.success('Member Vehicle Types fetched successfully')
      } else {
        message.error('There is a problem loading the page. Try refreshing the page')
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
        pathname: "vehicledetails/add",
        state: {
          servicePoint: row
        }
      });
    }
  };

  handleConfirms = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.type_id !== row.type_id);
    this.setState({ dataSource });

   MemberVehicleTypeService.deleteMemberVehicleType(row.type_id).then( res => {
      console.log("deleted response", res)
      if (res.status === 202){
        message.success("Member Vehicle Type deleted succesfully");
      }
    }).catch (error => {
      console.log(error)
    })
    
  }
  handleCancel = () => {
    message.error("The object you selected has not been deleted")
  }

  render() {
    const columns = [

      {
        title: 'Vehicle Type',
        dataIndex: 'member_vehicle_type_name',
        key: 'member_vehicle_type_name',
        ...this.getColumnSearchProps("member_vehicle_type_name"),
        render: (text, row) => <Link to={{
          pathname: 'vehicledetails/add',
          state: { servicePoint: row }
        }}>{text}</Link>
      },

      {
        title: 'Identifier Code',
        dataIndex: 'member_vehicle_type_id_code',
        key: 'member_vehicle_type_id_code',

      },


      {
        title: 'Category Type',
        dataIndex: 'member_vehicle_categories_name',
        key: 'member_vehicle_categories_name',

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
                <Menu.Item key="delete">
                <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={() => this.handleConfirms(row)}
                    onCancel={() => this.handleCancel()}
                    okText="Yes"
                    cancelText="No" >
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
    const { dataSource, isLoading } = this.state;
    return (
      <Card>
        <PageHeader
          // onBack={() => { this.props.history.push('/settings/system') }}
          title="Member Vehicle Type"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/vehicledetails/add")}

            >
              New Member Vehicle
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
          rowKey={record => record.member_vehicle_type_name}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}}
  
        />
      </Card>
    );
  }
}

export default withRouter(MemberVehicle);