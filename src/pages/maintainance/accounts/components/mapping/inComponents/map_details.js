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
  Popconfirm
} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import { MappingService } from '../../../../../../config/_service';
// import VisitAction from "../../Visit/VisitAction";

class MemberType extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: []
  };

  componentDidMount() {

    MappingService.fetchMapping().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ dataSource: res.data.content, isLoading: false })
        message.success('Mapping service fetched successfully')
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
        pathname: "/map/add",
        state: {
          servicePoint: row
        }
      });
    }
  };

  handleConfirms = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.vehicles_mapper_id !== row.vehicles_mapper_id);
    this.setState({ dataSource });

    MappingService.deleteMapping(row.vehicles_mapper_id).then(res => {
      console.log("deleted response", res)
      if (res.status === 202) {
        message.success("Mapping Details deleted succesfully");
      }
    }).catch(error => {
      console.log(error)
    })

  }

  handleCancel = () => {
    message.error("The current object has not deleted")

  }

  render() {
    const columns = [

      {
        title: 'Rescue Vehicle Type',
        dataIndex: 'rescue_vehicle_type_name',
        key: 'rescue_vehicle_type_name',
        ...this.getColumnSearchProps("rescue_vehicle_type_name"),
        render: (text, row) => <Link to={{
          pathname: 'map/add',
          state: { servicePoint: row }
        }}>{text}</Link>
      },

      {
        title: 'Member Vehicle Type',
        dataIndex: 'member_vehicle_types_name',
        key: 'member_vehicle_types_name',

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
                <Menu.Divider />
                <Menu.Item >
                  <Popconfirm
                    title='Are you sure you want to delete this task?'
                    onConfirm={() => { this.handleConfirms(row) }}
                    onCancel={() => this.handleCancel()}
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
          title: 'Member Vehicle Types',
          dataIndex: 'name',
          key: 'name',

        },
      ]
      console.log("record", record)

      const data = [];
      for (let i = 0; i < record.member_vehicle_types.length; i++) {
        data.push({
          key: i,
          name: record.member_vehicle_types[i].member_vehicle_type_name
        })
      }

      return <Table columns={column} dataSource={data} pagination={false} />;
    }
    const { dataSource, isLoading } = this.state;
    return (
      <Card>
        <PageHeader
          // onBack={() => { this.props.history.push('/settings/system') }}
          title="Map Rescue to Member Vehicle"
        
          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/map/add")}

            >
              Map Rescue to member Vehicle
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
          rowKey={record => record.member_type_name}
          // expandedRowRender={record => expandedRowRender(record)}
          pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
        />
      </Card>
    );
  }
}

export default withRouter(MemberType);