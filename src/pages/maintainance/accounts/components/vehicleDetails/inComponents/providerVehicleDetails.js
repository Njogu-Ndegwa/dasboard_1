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

import {  RescueVehicleTypesService } from '../../../../../../config/_service';
// import VisitAction from "../../Visit/VisitAction";

class ServiceProviderVehicle extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: []
  };

  componentDidMount() {

    RescueVehicleTypesService.fetchRescueVehicleTypes().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ dataSource: res.data.content, isLoading: false })
        message.success(' Rescue Vehicle type fetched successfully')
      } else {
        message.error('Theres a problem loading this page. Please try reloading')
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

  handleMenuClick = (e, row) => {
    if (e.key === "edit") {
      this.props.history.push({
        pathname: "/settings/vehicledetails/add",
        state: {
          servicePoint: row
        }
      });
    }
  };

  handleConfirms = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.rescue_vehicle_id !== row.rescue_vehicle_id);
    this.setState({ dataSource });

    RescueVehicleTypesService.deleteRescueVehicleTypes(row.rescue_vehicle_id).then( res => {
      console.log("deleted response", res)
      if (res.status === 202){
        message.success("Rescue Vehicle Type deleted succesfully");
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
        dataIndex: 'type_name',
        key: 'type_name',
        ...this.getColumnSearchProps("type_name"),
        render: (text, row) => <Link to={{
          pathname: '/settings/vehicledetails/add',
          state: { servicePoint: row }
        }}>{text}</Link>
      },
      {
        title: 'Identifier Code',
        dataIndex: 'rescue_vehicle_id_code',
        key: 'rescue_vehicle_id_code',

      },


      {
        title: 'Running Cost',
        dataIndex: 'running_cost_per_km',
        key: 'running_cost_per_km',

      },


      {
        title: "",
        dataIndex: "",
        key: "action",
        render: (text, row) => (
          <Dropdown
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, row)}>
                <Menu.Item key="edit">
                  Edit
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item >
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
    const expandedRowRender = (record) => {

      const column = [

        {
          title: 'Rescue vehicle type',
          dataIndex: 'rescue_vehicle',
          key: 'name',

        },

        {
          title: 'Member Vehicle Type',
          dataIndex: 'vehicle_type',
          key: 'vehicle_type',

        },

        {
          title: 'Member Vehicle Category',
          dataIndex: 'vehicle_category',
          key: 'vehicle_category',

        },

        
      ]


      console.log("record", record)
      console.log("recordsss", record.vehicles_mapper)


      const data = []
      for (let i = 0; i < record.vehicles_mapper.length; i++) {
        data.push({
          key: i,
          rescue_vehicle: record.vehicles_mapper[i].rescue_vehicle_type_name,
          vehicle_type: record.vehicles_mapper[i].member_vehicle_types_name,
          vehicle_category: record.vehicles_mapper[i].member_vehicle_categories_name,
          

        })
      }

      return <Table columns={column} dataSource={data} pagination={false} size='small' bordered = 'true' />;
    }
    const { dataSource, isLoading } = this.state;
    return (
      <Card>
        <PageHeader
          // onBack={() => { this.props.history.push('/settings/system') }}
          title="Rescue Vehicle Details"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/settings/vehicledetails/add")}

            >
              Add Rescue Vehicle
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
          rowKey={record => record.type_name}
          pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
          expandedRowRender={record => expandedRowRender(record)}
        />
      </Card>
    );
  }
}

export default withRouter(ServiceProviderVehicle);